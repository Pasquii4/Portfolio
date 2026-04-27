"use client";

import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface CommandRecord {
    command: string;
    output: React.ReactNode;
    type: 'input' | 'output' | 'system' | 'error';
}

const COMMANDS: Record<string, React.ReactNode> = {
    help: (
        <div className="whitespace-pre font-mono">
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
>   github         Fetch estadísticas GitHub API real
>   ask [pregunta] Pregúntame cualquier cosa
>   clear          Limpiar terminal
>   help           Mostrar este menú`}
        </div>
    ),
    whoami: "pau pascual — builder of systems that work: trading scanners, local AI agents, web products.",
    skills: "Python, FastAPI, React/Next.js, Tailwind, SQL, Docker, APIs Financieras...",
    projects: "Ejecutando escaneo profundo... Accediendo a Trading Scanner, RL Boosting ES y más. Ve a la sección 'Proyectos'.",
    contact: "Contactando... pascualpau04@gmail.com | github.com/Pasquii4",
    clear: "Limpiando terminal...",
    "sudo rm -rf /": "Permiso denegado. Este incidente será reportado.",
    "ls projects/": (
        <div className="whitespace-pre font-mono">
            {`> trading_scanner/
> jarvisr/
> bettracker/
> rlboosting/
> storefront/`}
        </div>
    ),
    "ls proyectos/": (
        <div className="whitespace-pre font-mono">
            {`> trading_scanner/
> jarvisr/
> bettracker/
> rlboosting/
> storefront/`}
        </div>
    ),
    "cat about.txt": (
        <div className="whitespace-pre font-mono">
            {`> Backend-first, product-minded.
> I build from API to deploy.`}
        </div>
    ),
    "cat skills.txt": (
        <div className="whitespace-pre font-mono">
            {`> ── Languages ─────────────────────
>   Python, JavaScript/TypeScript, SQL, Java
>
> ── Frameworks ────────────────────
>   FastAPI, Next.js, Astro, React
>
> ── Infra & Tools ─────────────────
>   Docker, PostgreSQL, MongoDB, Redis, AWS, GCP`}
        </div>
    ),
    experience: (
        <div className="whitespace-pre font-mono">
            {`> Proyectos destacados:
>   · Trading Scanner    — FastAPI + WebSockets + PostgreSQL [Privado]
>   · RL Boosting ES     — Astro + TypeScript + Cloudflare Pages [Live 🟢]
>   · Bet Tracker        — Vanilla JS + Chart.js [Privado]
>   · Tu Espacio Ideal   — Astro SSG + Cloudflare Workers [Live 🟢]
> Rol actual: Junior Developer
> Disponible para: Parcial Remoto · Prácticas`}
        </div>
    ),
    education: (
        <div className="whitespace-pre font-mono">
            {`> CFGM (Grado Medio) ————————————————— Completado ✓
> CFGS DAW (Desarrollo de Aplicaciones Web) — En curso 📚
> Centro d'Estudis Politècnics · Barcelona
> ─────────────────────────────────────────
> Autodidacta: Trading algorítmico, APIs financieras,
>              arquitectura de microservicios`}
        </div>
    ),
    languages: (
        <div className="whitespace-pre font-mono">
            {`> 🇪🇸 Español  ——  Nativo
> 🏴 Català    ——  Nativo
> 🇬🇧 English  ——  Intermedio-Alto (B2)`}
        </div>
    ),
    interests: (
        <div className="whitespace-pre font-mono">
            {`> · FinTech & Trading algorítmico
> · Arquitectura de microservicios y sistemas escalables
> · APIs financieras en tiempo real (Polygon, Alpha Vantage)
> · Optimización de sistemas backend con Python/FastAPI
> · Rocket League (jugador competitivo + coaching)`}
        </div>
    ),
    availability: (
        <div className="whitespace-pre font-mono">
            {`> ╔══════════════════════════════════════╗
> ║  Estado: 🟢 DISPONIBLE               ║
> ║  Modalidad: Parcial Remoto · Prácticas ║
> ║  Ubicación: Barcelona, Catalunya, ES  ║
> ║  Respuesta: < 24h                     ║
> ╚══════════════════════════════════════╝
> → pascualpau04@gmail.com`}
        </div>
    ),
    social: (
        <div className="whitespace-pre font-mono">
            {`> GitHub   → `}<a href="https://github.com/Pasquii4" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">https://github.com/Pasquii4</a>{`               [→ abre nueva pestaña]
> LinkedIn → `}<a href="https://linkedin.com/in/pau-pascual-vallverdu" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">linkedin.com/in/pau-pascual-vallverdu</a>{`      [→ abre nueva pestaña]
> Email    → `}<a href="mailto:pascualpau04@gmail.com" className="hover:text-white underline">pascualpau04@gmail.com</a>{`                     [→ abre mailto]`}
        </div>
    ),
    stack: (
        <div className="whitespace-pre font-mono">
            {`> ── Backend ──────────────────────────────
>   Python 85% · FastAPI 72% · Docker 75%
>   SQL 80% · PostgreSQL 80%
> ── Frontend ─────────────────────────────
>   HTML/CSS 90% · JS/TS 70%
>   Next.js 60% · Astro 60% · React 60%
> ── Otros ────────────────────────────────
>   Java 65% · Git · Cloudflare · Vercel`}
        </div>
    )
};

type QAEntry = { keywords: string[]; response: string };

const qaEntries: QAEntry[] = [
    {
        keywords: ["disponible", "contratar", "hire", "prácticas", "practicas",
            "trabajo", "freelance", "remoto", "parcial", "incorporación", "incorporacion", "empezar"],
        response: "🟢 Sí, estoy disponible para Parcial Remoto o Prácticas.\\n" +
            "   Incorporación: Inmediata, sujeto a acuerdo.\\n" +
            "   Escríbeme → pascualpau04@gmail.com (respondo < 24h)"
    },
    {
        keywords: ["stack", "tecnología", "tecnologia", "lenguaje", "programar",
            "python", "javascript", "typescript", "framework"],
        response: "Stack principal: Python · FastAPI · TypeScript · Next.js\\n" +
            "                 Docker · PostgreSQL · SQL\\n" +
            "Escribe 'stack' para ver todos los porcentajes."
    },
    {
        keywords: ["experiencia", "experience", "proyectos", "portfolio", "trabajos"],
        response: "3+ años de desarrollo autodidacta y proyectos complejos finalizados.\\n" +
            "He desarrollado un Trading Scanner (FastAPI+WS+PostgreSQL),\\n" +
            "landing pages en Astro/Cloudflare y herramientas FinTech.\\n" +
            "Escribe 'experience' para ver el detalle completo."
    },
    {
        keywords: ["sueldo", "salario", "cobrar", "dinero", "salary"],
        response: "Abierto a negociación para roles de junior/prácticas.\\n" +
            "Priorizo el aprendizaje, los retos técnicos y el crecimiento\\n" +
            "dentro del ecosistema FinTech."
    },
    {
        keywords: ["estudios", "educación", "educacion", "formación", "formacion",
            "universidad", "ciclo", "daw", "cfgs"],
        response: "Cursando CFGS DAW en Centre d'Estudis Politècnics, Barcelona.\\n" +
            "CFGM completado ✓ · Escribe 'education' para más detalle."
    },
    {
        keywords: ["ubicación", "ubicacion", "ciudad", "barcelona", "donde", "dónde",
            "remoto", "presencial"],
        response: "Basado en Barcelona, Catalunya, España 🇪🇸\\n" +
            "Disponible para trabajo Parcial Remoto o Prácticas presenciales."
    },
    {
        keywords: ["edad", "años", "cuántos", "cuantos", "old", "how old", "naciste"],
        response: "Tengo 21 años. Llevo más de 3 años programando de forma\\n" +
            "autodidacta, especializado en FinTech desde los 19."
    },
    {
        keywords: ["contacto", "contact", "email", "mail", "linkedin", "teléfono", "telefono"],
        response: "Email   → pascualpau04@gmail.com\\n" +
            "LinkedIn→ linkedin.com/in/pau-pascual-vallverdu\\n" +
            "GitHub  → github.com/Pasquii4\\n" +
            "Escribe 'contact' para los botones directos."
    },
];

function getAskResponse(input: string): string {
    const lower = input.toLowerCase();
    const match = qaEntries.find(entry =>
        entry.keywords.some(kw => lower.includes(kw))
    );
    return match?.response ??
        "No tengo respuesta específica para eso.\\n" +
        "Prueba: 'ask disponible', 'ask stack', 'ask experiencia'\\n" +
        "O escribe 'help' para ver todos los comandos.";
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

    const VALID_COMMANDS = [
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
    }, [history]);

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

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();

        if (!trimmed) return;

        // Add user input to history
        setHistory(prev => [...prev, { command: trimmed, output: trimmed, type: "input" }]);

        // Process command
        setTimeout(async () => {
            if (trimmed === "clear") {
                setHistory([]);
            } else if (trimmed === "github") {
                setHistory(prev => [...prev, { command: trimmed, output: <span className="text-gray-400">Fetching live data from api.github.com/users/Pasquii4...</span>, type: "system" }]);
                try {
                    const res = await fetch("https://api.github.com/users/Pasquii4");
                    if (!res.ok) throw new Error("HTTP error " + res.status);
                    const data = await res.json();
                    
                    const output = (
                        <div className="whitespace-pre font-mono mt-2">
                            {`> 🐙 GITHUB STATS [LIVE] ─────────────────
> Usuario:      ${data.login}
> Nombre:       ${data.name || 'Pau Pascual'}
> Repos:        ${data.public_repos} públicos
> Seguidores:   ${data.followers}
> Bio:          ${data.bio || 'Backend & FinTech'}
>
> > open github (para visitar el perfil)`}
                        </div>
                    );
                    setHistory(prev => [...prev.filter(r => typeof r.output !== 'string' || !r.output.toString().includes('Fetching')), { command: trimmed, output, type: "output" }]);
                } catch (e) {
                    setHistory(prev => [...prev.filter(r => typeof r.output !== 'string' || !r.output.toString().includes('Fetching')), { command: trimmed, output: "Error: No se pudo conectar con la API de GitHub.", type: "error" }]);
                }
            } else if (trimmed === "ask") {
                setHistory(prev => [...prev, { command: trimmed, output: <div className="text-red-400">bash: ask: uso correcto → ask [pregunta sobre mí]</div>, type: "error" }]);
            } else if (trimmed.startsWith("ask ")) {
                const question = trimmed.substring(4).trim();
                if (!question) {
                    setHistory(prev => [...prev, { command: trimmed, output: <div className="text-red-400">bash: ask: uso correcto → ask [pregunta sobre mí]</div>, type: "error" }]);
                } else {
                    setHistory(prev => [...prev, { command: trimmed, output: <div className="break-words whitespace-pre-wrap w-full font-mono text-[var(--color-text)]">{getAskResponse(question)}</div>, type: "output" }]);
                }
            } else if (COMMANDS[trimmed]) {
                if (trimmed === "contact") {
                    setHistory(prev => [...prev, {
                        command: trimmed,
                        output: (
                            <div className="flex flex-col gap-1">
                                <span>📧 <a href="mailto:pascualpau04@gmail.com" className="hover:text-[var(--color-accent)] underline">pascualpau04@gmail.com</a></span>
                                <span>🐙 <a href="https://github.com/Pasquii4" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] underline">github.com/Pasquii4</a></span>
                                <span>💼 <a href="https://linkedin.com/in/pau-pascual-vallverdu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] underline">LinkedIn</a></span>
                            </div>
                        ),
                        type: "output"
                    }]);
                } else {
                    setHistory(prev => [...prev, { command: trimmed, output: COMMANDS[trimmed], type: "output" }]);
                }
            } else if (trimmed === "open linkedin") {
                setHistory(prev => [...prev, { command: trimmed, output: "Abriendo LinkedIn...", type: "system" }]);
                window.open("https://linkedin.com/in/pau-pascual-vallverdu", "_blank");
            } else {
                setHistory(prev => [...prev, { command: trimmed, output: `zsh: command not found: ${trimmed}`, type: "error" }]);
            }
        }, 300); // Artificial delay to mimic reality
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
        <section id="terminal" className="py-16 md:py-20" role="region" aria-label="Interactive terminal">
            <div className="w-[90%] max-w-[800px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="font-mono text-[var(--color-accent)] text-2xl mb-8 flex items-center gap-3"
                >
                    <Terminal className="w-8 h-8" />
                    ~/interactive-term
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-[var(--bg-primary)] border rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${isFocused ? "border-[var(--color-accent)] shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.15)]" : "border-[var(--color-border)]"
                        }`}
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Fake Mac OS Header */}
                    <div className="bg-[var(--bg-surface)] px-4 py-3 flex items-center gap-2 border-b border-[var(--color-border)] relative">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }}></div>
                        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-center text-gray-500">guest@pau-local:~</div>
                    </div>

                    {/* Window Content */}
                    <div ref={scrollContainerRef} className="p-6 h-[350px] overflow-y-auto font-mono text-sm sm:text-base flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <AnimatePresence>
                            {history.map((record, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
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
                <p className="text-[10px] font-mono opacity-30 mt-3 text-right hidden md:block animate-[pulse_2s_ease-in-out_infinite]">
                    Press <kbd className="border border-white/20 rounded px-1">/</kbd> to focus terminal
                </p>
            </div>
        </section>
    );
}
