"use client";

const terminalLines = [
  { text: "$ scanner --run --assets 500", accent: false, bold: true },
  { text: "", accent: false, bold: false },
  { text: "Cargando universo de activos...    ✓", accent: true, bold: false },
  { text: "Conectando data feeds...           ✓", accent: true, bold: false },
  { text: "Inicializando indicadores...       ✓", accent: true, bold: false },
  { text: "", accent: false, bold: false },
  { text: "[████████████████████] 100%", accent: true, bold: false },
  { text: "", accent: false, bold: false },
  { text: "✓ 487 activos analizados", accent: true, bold: false },
  { text: "✓ 23 señales generadas", accent: true, bold: false },
  { text: "✓ 8 LONG · 12 SHORT · 3 NEUTRAL", accent: true, bold: false },
  { text: "", accent: false, bold: false },
  { text: "> Dashboard listo. Abriendo interfaz...", accent: false, bold: false },
];

export default function TradingHero() {
  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-accent)]">
            FINTECH · ANALYTICS
          </span>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-[var(--color-text)]">
              Trading Scanner
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed">
              Scanner de mercados multi-activo
              <br className="hidden sm:block" />
              con señales accionables
            </p>
          </div>

          <p className="text-[var(--color-text-secondary)] text-base max-w-md leading-relaxed">
            +500 activos · Indicadores técnicos · Señales LONG/SHORT · TP y SL automático
          </p>

          <div className="flex flex-wrap gap-3">
            {["+500 activos analizados", "RSI · MACD · Bollinger", "Production-grade architecture"].map((label) => (
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
              onClick={scrollToDashboard}
              className="px-6 py-3 rounded-lg font-medium text-sm bg-[var(--color-accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
            >
              Ver dashboard →
            </button>
            <a
              href="https://github.com/Pasquii4"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors"
            >
              Ver código en GitHub
            </a>
          </div>
        </div>

        <div className="w-full">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs font-mono text-[var(--color-text-secondary)]">scanner — terminal</span>
            </div>
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
