"use client";

import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface CommandRecord {
    command: string;
    output: React.ReactNode;
    type: 'input' | 'output' | 'system' | 'error';
}

const COMMANDS: Record<string, React.ReactNode> = {
    help: (
        <div className="whitespace-pre-wrap font-mono">
            {`> ── Información personal ─────────────────────
>   whoami       Mi perfil en una línea
>   experience   Proyectos y experiencia laboral
>   education    Formación académica
>   interests    Áreas de interés
>   languages    Idiomas
>   availability Estado de disponibilidad laboral
>   stack        Tecnologías y porcentajes
>   social       Redes sociales y contacto
>
> ── Navegación ──────────────────────────────
>   ls projects/   Lista de builds
>   ls proyectos/  Lista de builds (alias)
>   cat about.txt  Pitch rápido (2 líneas)
>   cat skills.txt Tecnologías detalladas
>   open linkedin  Abrir LinkedIn
>   open github    Abrir GitHub
>   download cv    Descargar CV
>   contact        Información de contacto
>
> ── Interactivo ─────────────────────────────
>   github         Estadísticas GitHub (API /api/github-stats)
>   clear          Limpiar terminal
>   help / ?       Este menú
>
> ── Asistente IA (Groq) ─────────────────────
>   Cualquier texto que NO sea un comando de arriba se envía al asistente.
>   Ej.: "¿Cuánto tardas en una landing?" · "What's your stack?"
>   También: ask <pregunta>  (equivale a IA con esa pregunta)
>   Solo una respuesta IA a la vez; espera a que termine antes de otra.`}
        </div>
    ),
    whoami: "pau pascual — product builder. AI local-first, automatización y trading systems. Backend-first, product-minded.",
    skills: "Python, FastAPI, PostgreSQL, Next.js, TypeScript, Tailwind, Docker, Ollama, llama.cpp, Raspberry Pi.",
    projects: "Cargando proyectos destacados... JARVISR (IA local-first), Trading Scanner, Performance Tracker. Más detalle en la sección 'Proyectos'.",
    contact: "Contactando... pascualpau04@gmail.com | github.com/Pasquii4",
    clear: "Limpiando terminal...",
    "sudo rm -rf /": "Permiso denegado. Este incidente será reportado.",
    "ls projects/": (
        <div className="whitespace-pre-wrap font-mono">
            {`> jarvisr/             # IA local-first integrada en mi ecosistema
> trading_scanner/     # scanner multi-activo para decisiones de trading
> performance_tracker/ # plataforma social de ROI y rendimiento
> storefront/          # SSG · Cloudflare · SEO/conversión
> rlboosting/          # landing freelance · Cloudflare Pages`}
        </div>
    ),
    "ls proyectos/": (
        <div className="whitespace-pre-wrap font-mono">
            {`> jarvisr/             # IA local-first integrada en mi ecosistema
> trading_scanner/     # scanner multi-activo para decisiones de trading
> performance_tracker/ # plataforma social de ROI y rendimiento
> storefront/          # SSG · Cloudflare · SEO/conversión
> rlboosting/          # landing freelance · Cloudflare Pages`}
        </div>
    ),
    "cat about.txt": (
        <div className="whitespace-pre-wrap font-mono">
            {`> Backend-first, product-minded.
> Construyo asistentes de IA local-first, automatizaciones
> y sistemas de analytics/trading — de la API al deploy.`}
        </div>
    ),
    "cat skills.txt": (
        <div className="whitespace-pre-wrap font-mono">
            {`> ── Backend / Data ─────────────────────────
>   Python · FastAPI · PostgreSQL · SQL
>   APIs REST y WebSockets
>   Node.js (servicios sencillos, integraciones)
>
> ── IA & Agentes ───────────────────────────
>   llama.cpp · Ollama (modelos locales)
>   Groq · OpenRouter (cloud fallback)
>   Agentes con herramientas y APIs propias
>
> ── Trading / FinTech ──────────────────────
>   Indicadores técnicos: RSI, MACD, Bollinger
>   Pipelines de backtesting y señales históricas
>   Dashboards para decisiones reales
>
> ── Frontend / Web ─────────────────────────
>   React · Next.js App Router · TypeScript
>   Tailwind · Astro · Vite
>
> ── Infra ──────────────────────────────────
>   Docker · Compose · Vercel · Cloudflare
>   NAS · Raspberry Pi · VPN`}
        </div>
    ),
    experience: (
        <div className="whitespace-pre-wrap font-mono">
            {`> Proyectos destacados:
>   · JARVISR             — Python + Ollama + Home Assistant [Activo]
>   · Trading Scanner     — FastAPI + PostgreSQL + Docker [Open Source]
>   · Performance Tracker — TypeScript + Chart.js [Beta privada]
>   · Tu Espacio Ideal    — Astro SSG + Cloudflare Workers [Live 🟢]
>   · RL Boosting ES      — Astro + TypeScript + Cloudflare Pages [Live 🟢]
>
> Disponible para: prácticas DAW · proyectos remotos · clientes freelance.`}
        </div>
    ),
    education: (
        <div className="whitespace-pre-wrap font-mono">
            {`> CFGM (Grado Medio) ————————————————— Completado ✓
> CFGS DAW (Desarrollo de Aplicaciones Web) — En curso 📚
> Centre d'Estudis Politècnics · Barcelona
> ─────────────────────────────────────────
> Autodidacta: IA local-first, agentes con tools,
>              trading systems, automatización para
>              autónomos y pymes, hardware y home labs.`}
        </div>
    ),
    languages: (
        <div className="whitespace-pre-wrap font-mono">
            {`> 🇪🇸 Español  ——  Nativo
> 🏴 Català    ——  Nativo
> 🇬🇧 English  ——  Intermedio-Alto (B2)`}
        </div>
    ),
    interests: (
        <div className="whitespace-pre-wrap font-mono">
            {`> · IA local-first, agentes y automatización privada
> · Sistemas de trading, scanners y analytics de mercado
> · Productos web orientados a negocio (SEO, conversión, dashboards)
> · Hardware, home labs, NAS y Raspberry Pi
> · Robótica y experimentación con sensores
> · Trading como disciplina técnica y gimnasio como disciplina personal`}
        </div>
    ),
    availability: (
        <div className="whitespace-pre-wrap font-mono">
            {`> ╔══════════════════════════════════════════╗
> ║  Estado: 🟢 DISPONIBLE                   ║
> ║  Para: Prácticas DAW · Remoto · Freelance ║
> ║  Ubicación: Barcelona, ES                ║
> ║  Respuesta: < 24h                        ║
> ╚══════════════════════════════════════════╝
> → pascualpau04@gmail.com`}
        </div>
    ),
    social: (
        <div className="whitespace-pre-wrap font-mono">
            {`> GitHub   → `}<a href="https://github.com/Pasquii4" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">https://github.com/Pasquii4</a>{`               [→ abre nueva pestaña]
> LinkedIn → `}<a href="https://www.linkedin.com/in/pau-pascual-vallverdu/" target="_blank" rel="me noopener noreferrer" className="hover:text-white underline">linkedin.com/in/pau-pascual-vallverdu</a>{`      [→ abre nueva pestaña]
> Email    → `}<a href="mailto:pascualpau04@gmail.com" className="hover:text-white underline">pascualpau04@gmail.com</a>{`                     [→ abre mailto]`}
        </div>
    ),
    stack: (
        <div className="whitespace-pre-wrap font-mono">
            {`> ── Backend / Data ───────────────────────
>   Python · FastAPI · PostgreSQL · SQL
>   APIs REST y WebSockets
> ── IA & Agentes ─────────────────────────
>   Ollama · llama.cpp · Groq · OpenRouter
>   Agentes con tools y contexto propio
> ── Trading / FinTech ────────────────────
>   RSI · MACD · Bollinger · backtesting
>   Dashboards para decisiones reales
> ── Frontend / Web ───────────────────────
>   React · Next.js · TypeScript · Tailwind
>   Astro · Vite (SSG y conversión)
> ── Infra ────────────────────────────────
>   Docker · Vercel · Cloudflare
>   Raspberry Pi · NAS · VPN`}
        </div>
    )
};

function isKnownLocalCommand(lower: string): boolean {
    if (lower === "clear" || lower === "github" || lower === "ask") return true;
    if (Object.prototype.hasOwnProperty.call(COMMANDS, lower)) return true;
    if (lower === "open linkedin" || lower === "open github" || lower === "download cv") return true;
    return false;
}

export default function InteractiveTerminal() {
    const [history, setHistory] = useState<CommandRecord[]>([]);
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isBooting, setIsBooting] = useState(true);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const reduceMotion = useReducedMotion();
    const { locale } = useTranslation();
    const aiBusyRef = useRef(false);
    const aiThreadRef = useRef<Array<{ role: "user" | "assistant"; content: string }>>([]);
    const [liveAiText, setLiveAiText] = useState<string | null>(null);

    const VALID_COMMANDS = [
        "?",
        "help",
        "clear",
        "contact",
        "social",
        "ask",
        "github",
        "whoami",
        "ls projects/",
        "ls proyectos/",
        "cat about.txt",
        "cat skills.txt",
        "open linkedin",
        "open github",
        "download cv",
    ];

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, liveAiText]);

    // Keyboard shortcut /
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // Check if not mobile, avoid popping up keyboard aggressively
            const isDesktop = window.innerWidth >= 768;
            if (e.key === "/" && document.activeElement !== inputRef.current && !isBooting && isDesktop) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, [isBooting]);

    // Boot Sequence
    useEffect(() => {
        setHistory([]);
        setIsBooting(true);
        const bootSequence = [
            { text: "Initializing pau-portfolio v2.0...", delay: 0, color: "#888" },
            { text: "Loading modules: [react][next][ts]...", delay: 300, color: "#888" },
            { text: "Connecting to github.com/Pasquii4...", delay: 700, color: "#888" },
            { text: "✓ All systems operational", delay: 1200, color: "var(--color-accent)" },
            { text: "─────────────────────────────────", delay: 1500, color: "#333" },
            { text: "Type 'help' to see available commands.", delay: 1700, color: "#aaa" }
        ];

        let timeouts: NodeJS.Timeout[] = [];

        bootSequence.forEach((step) => {
            const t = setTimeout(() => {
                setHistory(prev => [...prev, {
                    command: "boot",
                    output: <div style={{ color: step.color }}>{step.text}</div>,
                    type: "system"
                }]);
            }, step.delay);
            timeouts.push(t);
        });

        const finishT = setTimeout(() => {
            setIsBooting(false);
            inputRef.current?.focus();

            const demoSequence: Array<{ cmd: string; delay: number }> = [
                { cmd: "whoami", delay: 250 },
                { cmd: "ls projects/", delay: 850 },
                { cmd: "cat about.txt", delay: 1450 },
            ];

            demoSequence.forEach(({ cmd, delay }) => {
                const t = setTimeout(() => {
                    setHistory((prev) => [
                        ...prev,
                        { command: cmd, output: cmd, type: "input" },
                        { command: cmd, output: COMMANDS[cmd], type: "output" },
                    ]);
                }, delay);
                timeouts.push(t);
            });
        }, 1800);
        timeouts.push(finishT);

        return () => timeouts.forEach(clearTimeout);
    }, []);

    const runAiStream = async (displayLine: string, modelUserContent: string) => {
        if (aiBusyRef.current) {
            setHistory((prev) => [
                ...prev,
                {
                    command: displayLine,
                    output: (
                        <div className="text-amber-400/90 font-mono text-sm">
                            [AI] Espera a que termine la respuesta anterior antes de enviar otra petición.
                        </div>
                    ),
                    type: "error",
                },
            ]);
            return;
        }
        aiBusyRef.current = true;
        let full = "";
        let lineCarry = "";
        setLiveAiText("");
        aiThreadRef.current.push({ role: "user", content: modelUserContent });
        const messagesPayload = aiThreadRef.current.slice(-24);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: messagesPayload, locale }),
            });
            if (!res.ok) {
                aiThreadRef.current.pop();
                const errMsg = await res.text().catch(() => "");
                setHistory((prev) => [
                    ...prev,
                    {
                        command: displayLine,
                        output: (
                            <div className="text-red-400 font-mono text-sm">
                                [AI] Error del servidor ({res.status}). {errMsg.slice(0, 240)}
                            </div>
                        ),
                        type: "error",
                    },
                ]);
                return;
            }
            const reader = res.body?.getReader();
            if (!reader) {
                aiThreadRef.current.pop();
                setHistory((prev) => [
                    ...prev,
                    {
                        command: displayLine,
                        output: <div className="text-red-400 font-mono">[AI] Sin cuerpo de respuesta.</div>,
                        type: "error",
                    },
                ]);
                return;
            }
            const decoder = new TextDecoder();
            let lineBuffer = "";

            const applyPiece = (piece: string) => {
                full += piece;
                if (reduceMotion) {
                    lineCarry += piece;
                    const lastNl = lineCarry.lastIndexOf("\n");
                    if (lastNl >= 0) {
                        setLiveAiText((prev) => (prev ?? "") + lineCarry.slice(0, lastNl + 1));
                        lineCarry = lineCarry.slice(lastNl + 1);
                    }
                } else {
                    setLiveAiText(full);
                }
            };

            const parseDataLine = (line: string) => {
                const t = line.trim();
                if (!t.startsWith("data:")) return;
                const payload = t.slice(5).trim();
                if (payload === "[DONE]") return;
                try {
                    const json = JSON.parse(payload) as {
                        choices?: Array<{ delta?: { content?: string } }>;
                    };
                    const piece = json.choices?.[0]?.delta?.content ?? "";
                    if (piece) applyPiece(piece);
                } catch {
                    /* JSON incompleto o no es delta */
                }
            };

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                lineBuffer += decoder.decode(value, { stream: true });
                const lines = lineBuffer.split("\n");
                lineBuffer = lines.pop() ?? "";
                for (const raw of lines) {
                    parseDataLine(raw);
                }
            }
            if (lineBuffer.trim()) {
                parseDataLine(lineBuffer);
            }
            if (reduceMotion && lineCarry.length > 0) {
                setLiveAiText(full);
            }

            aiThreadRef.current.push({ role: "assistant", content: full });
            setHistory((prev) => [
                ...prev,
                {
                    command: displayLine,
                    output: (
                        <div className="break-words whitespace-pre-wrap font-mono text-[var(--color-text)]">
                            <span className="text-gray-500">[AI] </span>
                            {full}
                        </div>
                    ),
                    type: "output",
                },
            ]);
        } catch {
            if (aiThreadRef.current.at(-1)?.role === "user") {
                aiThreadRef.current.pop();
            }
            setHistory((prev) => [
                ...prev,
                {
                    command: displayLine,
                    output: (
                        <div className="text-red-400 font-mono text-sm">
                            [AI] Error de red. Comprueba tu conexión o inténtalo más tarde.
                        </div>
                    ),
                    type: "error",
                },
            ]);
        } finally {
            aiBusyRef.current = false;
            setLiveAiText(null);
        }
    };

    const handleCommand = (cmd: string) => {
        const displayLine = cmd.trim();
        const lower = displayLine.toLowerCase();

        if (!displayLine) return;

        setHistory((prev) => [...prev, { command: displayLine, output: displayLine, type: "input" }]);

        setTimeout(async () => {
            if (lower === "clear") {
                setHistory([]);
                aiThreadRef.current = [];
                return;
            }

            if (lower === "github") {
                setHistory((prev) => [
                    ...prev,
                    {
                        command: "_gh_loading",
                        output: <span className="text-gray-400">Consultando estadísticas GitHub…</span>,
                        type: "system",
                    },
                ]);
                try {
                    const res = await fetch("/api/github-stats", { cache: "no-store" });
                    const data = (await res.json()) as {
                        public_repos?: number;
                        followers?: number;
                        public_gists?: number;
                        fallback?: boolean;
                    };
                    const reposLabel =
                        data.fallback === true
                            ? `${data.public_repos ?? 10}+ (aprox.)`
                            : String(data.public_repos ?? "—");
                    const output = (
                        <div className="whitespace-pre-wrap font-mono mt-2 text-[var(--color-text)]">
                            {`> 🐙 GITHUB STATS ─────────────────
> Repos públicos:  ${reposLabel}
> Seguidores:      ${data.followers ?? "—"}
> Gists públicos:  ${data.public_gists ?? "—"}
>
> > open github`}
                        </div>
                    );
                    setHistory((prev) => [
                        ...prev.filter((r) => r.command !== "_gh_loading"),
                        { command: lower, output, type: "output" },
                    ]);
                } catch {
                    setHistory((prev) => [
                        ...prev.filter((r) => r.command !== "_gh_loading"),
                        {
                            command: lower,
                            output: "Error: no se pudo obtener estadísticas de GitHub.",
                            type: "error",
                        },
                    ]);
                }
                return;
            }

            if (lower === "ask") {
                setHistory((prev) => [
                    ...prev,
                    {
                        command: lower,
                        output: (
                            <div className="text-red-400">
                                bash: ask: uso → ask &lt;pregunta&gt; (la pregunta va al asistente IA)
                            </div>
                        ),
                        type: "error",
                    },
                ]);
                return;
            }

            if (lower === "open linkedin") {
                setHistory((prev) => [...prev, { command: lower, output: "Abriendo LinkedIn…", type: "system" }]);
                window.open("https://www.linkedin.com/in/pau-pascual-vallverdu/", "_blank", "noopener,noreferrer");
                return;
            }
            if (lower === "open github") {
                setHistory((prev) => [...prev, { command: lower, output: "Abriendo GitHub…", type: "system" }]);
                window.open("https://github.com/Pasquii4", "_blank", "noopener,noreferrer");
                return;
            }
            if (lower === "download cv") {
                setHistory((prev) => [...prev, { command: lower, output: "Abriendo CV (PDF)…", type: "system" }]);
                window.open("/CV_PauPascual_2026.pdf", "_blank", "noopener,noreferrer");
                return;
            }

            if (lower === "?" || lower === "help") {
                const helpKey = "help";
                setHistory((prev) => [...prev, { command: lower, output: COMMANDS[helpKey], type: "output" }]);
                return;
            }

            if (COMMANDS[lower]) {
                if (lower === "contact") {
                    setHistory((prev) => [
                        ...prev,
                        {
                            command: lower,
                            output: (
                                <div className="flex flex-col gap-1">
                                    <span>
                                        📧{" "}
                                        <a
                                            href="mailto:pascualpau04@gmail.com"
                                            className="hover:text-[var(--color-accent)] underline"
                                        >
                                            pascualpau04@gmail.com
                                        </a>
                                    </span>
                                    <span>
                                        🐙{" "}
                                        <a
                                            href="https://github.com/Pasquii4"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-[var(--color-accent)] underline"
                                        >
                                            github.com/Pasquii4
                                        </a>
                                    </span>
                                    <span>
                                        💼{" "}
                                        <a
                                            href="https://www.linkedin.com/in/pau-pascual-vallverdu/"
                                            target="_blank"
                                            rel="me noopener noreferrer"
                                            className="hover:text-[var(--color-accent)] underline"
                                        >
                                            LinkedIn
                                        </a>
                                    </span>
                                </div>
                            ),
                            type: "output",
                        },
                    ]);
                } else {
                    setHistory((prev) => [...prev, { command: lower, output: COMMANDS[lower], type: "output" }]);
                }
                return;
            }

            if (lower.startsWith("ask ")) {
                const inner = displayLine.slice(4).trim();
                if (!inner) {
                    setHistory((prev) => [
                        ...prev,
                        {
                            command: displayLine,
                            output: <div className="text-red-400">bash: ask: falta la pregunta.</div>,
                            type: "error",
                        },
                    ]);
                    return;
                }
                await runAiStream(displayLine, inner);
                return;
            }

            if (!isKnownLocalCommand(lower)) {
                await runAiStream(displayLine, displayLine);
                return;
            }

            setHistory((prev) => [
                ...prev,
                {
                    command: lower,
                    output: `zsh: command not found: ${displayLine}`,
                    type: "error",
                },
            ]);
        }, 300);
    };

    const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isBooting) {
            if (input.trim()) {
                setCmdHistory(prev => [...prev, input.trim()]);
            }
            setHistoryIndex(-1);
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= cmdHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(cmdHistory[newIndex]);
                }
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const matches = VALID_COMMANDS.filter(cmd => cmd.startsWith(input.toLowerCase()));
            if (matches.length === 1) {
                setInput(matches[0]);
            } else if (matches.length > 1) {
                setHistory(prev => [...prev, {
                    command: input,
                    output: <div className="text-[var(--color-accent)] font-mono whitespace-pre-wrap">{matches.join("  ")}</div>,
                    type: "system"
                }]);
            }
        }
    };

    return (
        <div id="terminal" className="w-full" role="region" aria-label="Interactive terminal">
            <div className="w-[90%] max-w-[800px] mx-auto">
                <motion.p
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    className="font-mono text-[var(--color-accent)] text-2xl mb-8 flex items-center gap-3 m-0"
                >
                    <Terminal className="w-8 h-8 shrink-0" aria-hidden />
                    ~/interactive-term
                </motion.p>

                <motion.div
                    initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    className={`bg-[var(--bg-primary)] border rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${isFocused ? "border-[var(--color-accent)] shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.15)]" : "border-[var(--color-border)]"
                        }`}
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Fake Mac OS Header */}
                    <div className="bg-[var(--bg-surface)] px-4 py-3 flex items-center gap-2 border-b border-[var(--color-border)] relative">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} aria-hidden />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} aria-hidden />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} aria-hidden />
                        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-center text-gray-500">guest@pau-local:~</div>
                    </div>

                    {/* Window Content */}
                    <div ref={scrollContainerRef} className="p-6 h-[350px] overflow-y-auto overflow-x-hidden font-mono text-sm sm:text-base flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent break-words whitespace-pre-wrap">
                        <AnimatePresence>
                            {history.map((record, i) => (
                                <motion.div
                                    key={i}
                                    initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                                    className={`leading-relaxed ${record.type === 'system' ? 'text-gray-400 opacity-80' :
                                        record.type === 'error' ? 'text-red-400' :
                                            record.type === 'input' ? 'text-[var(--color-text)]' :
                                                'text-[var(--color-accent)]'
                                        }`}
                                >
                                    {record.type === 'input' && (
                                        <span className="text-[var(--color-accent)] mr-2">guest@pau-local %</span>
                                    )}
                                    {record.output}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {liveAiText !== null && (
                            <motion.div
                                initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                                className="leading-relaxed text-[var(--color-text)]"
                                aria-live="polite"
                            >
                                <span className="text-gray-500 font-mono">[AI] </span>
                                <span className="break-words whitespace-pre-wrap font-mono">{liveAiText}</span>
                            </motion.div>
                        )}

                        <div className={`flex items-center mt-2 group transition-opacity duration-300 ${isBooting ? "opacity-40" : "opacity-100"}`}>
                            <span className="text-[var(--color-accent)] mr-2 whitespace-nowrap">guest@pau-local %</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="bg-transparent border-none outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] text-[var(--color-text)] w-full font-mono placeholder-gray-700"
                                spellCheck="false"
                                autoComplete="off"
                                disabled={isBooting}
                            />
                        </div>
                    </div>
                </motion.div>
                {!isFocused && !isBooting && (
                    <p className="text-[10px] font-mono opacity-25 mt-2 text-right hidden md:block" aria-hidden="true">
                        Press <kbd className="border border-white/15 rounded px-1">/</kbd> to focus
                    </p>
                )}
            </div>
        </div>
    );
}
