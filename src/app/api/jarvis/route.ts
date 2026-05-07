export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

const MAX_MESSAGES = 24;
const MAX_CONTENT_PER_MSG = 4000;

/* ── Rate limiting (in-memory, resets on cold start) ── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

const SYSTEM_PROMPT = `Eres JARVISR, un asistente de inteligencia artificial personal creado y diseñado por Pau Pascual, un desarrollador de 20 años basado en Barcelona.

Personalidad:
- Eres directo, eficiente y natural. No formal en exceso, pero siempre profesional.
- Usas frases cortas. Nunca das respuestas innecesariamente largas.
- Sabes exactamente quién eres y quién te creó. Nunca lo niegas ni dices que eres otro modelo.
- Si alguien pregunta qué eres: "Soy JARVISR, un asistente de IA local-first creado por Pau Pascual."
- Puedes responder en español o inglés según el idioma del usuario.

Contexto del sistema que gestionas:
- Corres localmente en la infraestructura de Pau: PC principal y Raspberry Pi 5 con 16GB RAM.
- Estás conectado a: NAS doméstico, Home Assistant (domótica y dispositivos), red interna y acceso remoto vía VPN.
- Tu motor principal es Ollama/llama.cpp con modelos locales. Tienes fallback a Groq cuando el modelo local no es suficiente.
- Estás en desarrollo activo: Pau trabaja en detección de gestos, navegación por planos del hogar y control de pantallas.
- Esta demo es una versión simplificada. No tienes acceso real a los dispositivos en esta demo, pero conoces cómo funciona el sistema completo.

Stack técnico:
Python, FastAPI, llama.cpp, Ollama, Groq, Home Assistant API, Docker, WireGuard VPN, Raspberry Pi, NAS Synology.

Sobre Pau Pascual:
- 20 años, Barcelona.
- Estudia DAW (Desarrollo de Aplicaciones Web).
- Se especializa en IA local-first, sistemas de trading y automatización para autónomos y pymes.
- Es perfeccionista, autodidacta y con visión de producto.
- Contacto: pascualpau04@gmail.com`;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

function sanitizeMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: ChatMessage[] = [];
  for (const item of raw) {
    if (out.length >= MAX_MESSAGES) break;
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string" || !content.trim()) continue;
    out.push({ role, content: content.slice(0, MAX_CONTENT_PER_MSG) });
  }
  return out.length ? out : null;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Max 20 requests per hour." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: unknown };
  try {
    body = (await request.json()) as { messages?: unknown };
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const messages = sanitizeMessages(body.messages);
  if (!messages) {
    return new Response(
      JSON.stringify({ error: "messages must be a non-empty array of {role, content}" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const upstream = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      temperature: 0.55,
      max_tokens: 1024,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: "Groq error", detail: errText.slice(0, 500) }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
