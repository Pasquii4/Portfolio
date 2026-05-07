import type { Metadata } from "next";
import TradingHero from "@/components/trading/TradingHero";
import TradingDashboard from "@/components/trading/TradingDashboard";
import TradingArchitecture from "@/components/trading/TradingArchitecture";

export const metadata: Metadata = {
  title: "Trading Scanner · Scanner Multi-activo | Pau Pascual",
  description:
    "Sistema de escaneo de mercados con señales LONG/SHORT, indicadores técnicos y dashboard interactivo. Arquitectura production-grade.",
  openGraph: {
    title: "Trading Scanner · Scanner Multi-activo | Pau Pascual",
    description:
      "Sistema de escaneo de mercados con señales LONG/SHORT, indicadores técnicos y dashboard interactivo. Arquitectura production-grade.",
    url: "https://portfolio-seven-wine-63.vercel.app/projects/trading-scanner",
    siteName: "Pau Pascual",
    type: "website",
  },
};

const problemCards = [
  {
    title: "Los scanners institucionales son inaccesibles",
    text: "Bloomberg, Refinitiv, Polygon Pro. Miles de euros al mes para acceder a datos que la mayoría no puede pagar.",
  },
  {
    title: "Datos sin contexto generan ruido",
    text: "Un RSI en sobrecompra sin volumen, sin noticias y sin estructura de precio no es una señal. Es un número.",
  },
  {
    title: "Los dashboards informan. Este decide.",
    text: "Entrada, take profit, stop loss y razón de la señal en un solo panel. Sin interpretación manual.",
  },
];

const pipelineSteps = [
  {
    label: "Data Ingestion",
    text: "Precio histórico + noticias oficiales + sentiment de foros por activo",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    label: "Cálculo de indicadores",
    text: "RSI, MACD, Bollinger Bands y volumen calculados en paralelo para cada activo",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Scoring y señal",
    text: "Algoritmo de scoring genera señal LONG/SHORT/NEUTRAL con nivel de confianza",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: "Dashboard accionable",
    text: "Entrada, TP, SL y contexto de la señal visualizados en tiempo real",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function TradingScannerPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--color-border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            ← Volver al portfolio
          </a>
          <span className="text-sm font-mono font-bold text-[var(--color-text)] tracking-wider">
            Trading Scanner
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono border border-[var(--color-text-secondary)]/30 bg-[var(--color-text-secondary)]/8 text-[var(--color-text-secondary)]">
            ARCHIVADO · OPEN SOURCE
          </span>
          <span className="sm:hidden" />
        </div>
      </nav>

      <main className="pt-14">
        <TradingHero />

        {/* Section 2: The Problem */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] text-center">
              Por qué existe este proyecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {problemCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug">{card.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Pipeline */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] text-center">
              Pipeline de análisis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="relative flex flex-col items-center text-center space-y-4">
                  {/* Connector line (hidden on first and on mobile) */}
                  {i > 0 && (
                    <div className="hidden lg:block absolute top-7 -left-3 w-6 border-t border-dashed border-[rgba(var(--color-accent-rgb),0.3)]" />
                  )}
                  <div className="w-14 h-14 rounded-xl border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.06)] flex items-center justify-center text-[var(--color-accent)]">
                    {step.icon}
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[var(--color-accent)] uppercase tracking-wider">
                      Paso {i + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--color-text)]">{step.label}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-[200px] mx-auto">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TradingDashboard />
        <TradingArchitecture />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 px-6 text-center text-xs text-[var(--color-text-secondary)]">
        © Pau Pascual ·{" "}
        <a
          href="https://github.com/Pasquii4/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-text)] transition-colors"
        >
          github.com/Pasquii4/Portfolio
        </a>
      </footer>
    </>
  );
}
