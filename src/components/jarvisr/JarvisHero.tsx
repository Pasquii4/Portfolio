"use client";

const terminalLines = [
  { text: "$ jarvisr --status", accent: false, bold: true },
  { text: "", accent: false, bold: false },
  { text: "✓ Core engine     · Ollama (local)", accent: true, bold: false },
  { text: "✓ Home Assistant  · 192.168.1.x connected", accent: true, bold: false },
  { text: "✓ NAS             · /mnt/nas mounted", accent: true, bold: false },
  { text: "✓ VPN             · WireGuard active", accent: true, bold: false },
  { text: "✓ Latency         · 290ms (local model)", accent: true, bold: false },
  { text: "", accent: false, bold: false },
  { text: "> Sistema operativo. ¿En qué puedo ayudarte?", accent: false, bold: false },
];

export default function JarvisHero() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-accent)]">
            IA LOCAL-FIRST
          </span>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-[var(--color-text)]">
              JARVISR
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed">
              Asistente de IA personal, local-first,
              <br className="hidden sm:block" />
              conectado a todo mi ecosistema
            </p>
          </div>

          <p className="text-[var(--color-text-secondary)] text-base max-w-md leading-relaxed">
            Corre en casa. Sin APIs de pago obligatorias. Sin datos en servidores de terceros.
          </p>

          <div className="flex flex-wrap gap-3">
            {["Local-first", "NAS + Home Assistant", "VPN · Acceso remoto"].map((label) => (
              <span
                key={label}
                className="px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--bg-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={scrollToDemo}
              className="px-6 py-3 rounded-lg font-medium text-sm bg-[var(--color-accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
            >
              Probar demo →
            </button>
            <a
              href="https://github.com/Pasquii4"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors"
            >
              Ver en GitHub
            </a>
          </div>
        </div>

        {/* Right column — Terminal */}
        <div className="w-full">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl">
            {/* macOS bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs font-mono text-[var(--color-text-secondary)]">jarvisr — terminal</span>
            </div>
            {/* Terminal body */}
            <div className="p-5 font-mono text-sm leading-relaxed">
              {terminalLines.map((line, i) => (
                <div key={i} className={`${line.accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"} ${line.bold ? "text-[var(--color-text)] font-semibold" : ""}`}>
                  {line.text || "\u00A0"}
                </div>
              ))}
              <span className="inline-block w-2 h-4 bg-[var(--color-accent)] cursor-blink mt-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
