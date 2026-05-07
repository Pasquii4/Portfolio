/**
 * Stack técnico por categoría y nivel de dominio.
 *
 * Niveles a nivel de ITEM y de CATEGORÍA:
 *   - strong:      uso habitual en proyectos reales propios; defiendo decisiones técnicas.
 *   - comfortable: proyectos reales pero menos profundidad/frecuencia.
 *   - exploring:   uso práctico, todavía aprendiendo activamente.
 *
 * Reglas para mantener honestidad:
 *   - Solo aparece aquí lo que se usa en proyectos reales (JARVISR, Trading Scanner,
 *     Performance Tracker, landings freelance, este portfolio).
 *   - "strong" requiere evidencia: hay un proyecto donde esa pieza es protagonista.
 *   - Cuando una pieza se usa pero no es protagonista, se marca "comfortable".
 *   - "exploring" se reserva para tooling/áreas que se están integrando ahora.
 *
 * Orden de categorías = orden de aparición en la UI:
 *   backend → ai → trading → frontend → infra
 *   (los 3 buckets "strong" quedan en la fila 1 del grid xl; los 2 secundarios en la fila 2).
 */
export type StackLevel = "strong" | "comfortable" | "exploring";

export type StackCategoryId = "backend" | "frontend" | "infra" | "ai" | "trading";

export interface StackTech {
  name: string;
  level: StackLevel;
  note?: string;
}

export interface StackCategory {
  id: StackCategoryId;
  level: StackLevel;
  items: StackTech[];
}

export const techStackCategories: StackCategory[] = [
  // 1 ── Backend (fuerte) ─────────────────────────────────────────────
  {
    id: "backend",
    level: "strong",
    items: [
      { name: "Python · FastAPI", level: "strong", note: "APIs, pipelines y agentes" },
      { name: "PostgreSQL · SQL", level: "strong", note: "modelos, queries y persistencia" },
      { name: "REST APIs", level: "strong", note: "diseño y patrones de arquitectura" },
      { name: "WebSockets", level: "comfortable", note: "tiempo real y streaming" },
      { name: "Node.js", level: "comfortable", note: "servicios e integraciones" },
      { name: "Automatización · pipelines · jobs programados", level: "comfortable" },
    ],
  },
  // 2 ── IA · Local-first (fuerte) ────────────────────────────────────
  {
    id: "ai",
    level: "strong",
    items: [
      { name: "llama.cpp · Ollama", level: "strong", note: "modelos locales en hardware propio" },
      { name: "Despliegue local-first e integración self-hosted", level: "strong", note: "Home Assistant, NAS, VPN" },
      { name: "Agentes con tools, contexto y APIs propias", level: "strong" },
      { name: "Groq · OpenRouter", level: "comfortable", note: "cloud fallback por coste y latencia" },
      { name: "Python agents sin frameworks pesados", level: "comfortable" },
    ],
  },
  // 3 ── Trading · Analytics (fuerte) ────────────────────────────────
  {
    id: "trading",
    level: "strong",
    items: [
      { name: "Indicadores técnicos", level: "strong", note: "RSI · MACD · Bollinger · volumen" },
      { name: "Backtesting y análisis de señales históricas", level: "strong" },
      { name: "Generación de señales LONG/SHORT con contexto", level: "strong" },
      { name: "Dashboards de análisis y performance", level: "strong", note: "ROI · capital · rachas" },
      { name: "Pipelines de datos de mercado", level: "comfortable", note: "REST y WebSocket" },
    ],
  },
  // 4 ── Frontend (cómodo) ────────────────────────────────────────────
  {
    id: "frontend",
    level: "comfortable",
    items: [
      { name: "React · Next.js App Router", level: "comfortable", note: "dashboards y productos web" },
      { name: "TypeScript", level: "comfortable" },
      { name: "Tailwind CSS", level: "comfortable" },
      { name: "Astro · Vite", level: "comfortable", note: "landings, SSG y conversión" },
    ],
  },
  // 5 ── Infra · Deployment (cómodo / explorando) ────────────────────
  {
    id: "infra",
    level: "comfortable",
    items: [
      { name: "Docker · Docker Compose", level: "comfortable", note: "entornos reproducibles" },
      { name: "Vercel · Cloudflare Pages/Workers", level: "comfortable", note: "deploys low-cost" },
      { name: "Raspberry Pi · NAS · VPN", level: "comfortable", note: "self-hosting ligero" },
      { name: "Git · Linux · uv", level: "comfortable" },
      { name: "CI/CD avanzado · MLOps · orquestación cloud", level: "exploring" },
    ],
  },
];
