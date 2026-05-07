"use client";

const stack = [
  "Python", "FastAPI", "PostgreSQL", "Redis",
  "pandas", "NumPy", "TA-Lib", "Groq",
  "Docker", "React", "Next.js", "Tailwind CSS",
];

export default function TradingArchitecture() {
  return (
    <>
      {/* Architecture diagram */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
              Arquitectura del sistema
            </h2>
          </div>

          <div className="flex justify-center overflow-x-auto">
            <svg
              viewBox="0 0 720 380"
              className="w-full max-w-3xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker id="arrow-t" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="rgb(55,205,165)" fillOpacity="0.6" />
                </marker>
              </defs>

              {/* Row 1: Data sources */}
              <rect x="40" y="24" width="160" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="120" y="53" textAnchor="middle" fill="#e8e6e1" fontSize="11" fontFamily="monospace">Market Data APIs</text>

              <rect x="230" y="24" width="160" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="310" y="53" textAnchor="middle" fill="#e8e6e1" fontSize="11" fontFamily="monospace">News &amp; Sentiment</text>

              <rect x="420" y="24" width="160" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="500" y="53" textAnchor="middle" fill="#e8e6e1" fontSize="11" fontFamily="monospace">Forum Scraping</text>

              {/* Arrows down to core */}
              <line x1="120" y1="72" x2="310" y2="148" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow-t)" />
              <line x1="310" y1="72" x2="310" y2="148" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow-t)" />
              <line x1="500" y1="72" x2="310" y2="148" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow-t)" />

              {/* Row 2: Core */}
              <rect x="200" y="148" width="220" height="56" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.7" />
              <text x="310" y="173" textAnchor="middle" fill="rgb(55,205,165)" fontSize="13" fontFamily="monospace" fontWeight="bold">Scanner Core</text>
              <text x="310" y="191" textAnchor="middle" fill="#b6b0a6" fontSize="10" fontFamily="monospace">FastAPI · TA-Lib · Scoring</text>

              {/* Arrows down to outputs */}
              <line x1="240" y1="204" x2="140" y2="268" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow-t)" />
              <line x1="310" y1="204" x2="310" y2="268" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow-t)" />
              <line x1="380" y1="204" x2="480" y2="268" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.35" markerEnd="url(#arrow-t)" />

              {/* Row 3: Outputs */}
              <rect x="40" y="268" width="200" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="140" y="289" textAnchor="middle" fill="#e8e6e1" fontSize="11" fontFamily="monospace">PostgreSQL</text>
              <text x="140" y="304" textAnchor="middle" fill="#b6b0a6" fontSize="9" fontFamily="monospace">Histórico + Señales</text>

              <rect x="210" y="268" width="200" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="310" y="289" textAnchor="middle" fill="#e8e6e1" fontSize="11" fontFamily="monospace">Dashboard UI</text>
              <text x="310" y="304" textAnchor="middle" fill="#b6b0a6" fontSize="9" fontFamily="monospace">Next.js · Real-time</text>

              <rect x="380" y="268" width="200" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="480" y="289" textAnchor="middle" fill="#e8e6e1" fontSize="11" fontFamily="monospace">Alertas</text>
              <text x="480" y="304" textAnchor="middle" fill="#b6b0a6" fontSize="9" fontFamily="monospace">Email · Webhook</text>

              {/* Side: Redis */}
              <rect x="520" y="148" width="150" height="56" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
              <text x="595" y="173" textAnchor="middle" fill="#b6b0a6" fontSize="11" fontFamily="monospace">Redis Cache</text>
              <text x="595" y="191" textAnchor="middle" fill="#b6b0a6" fontSize="9" fontFamily="monospace">Rate limit + Queue</text>
              <line x1="420" y1="176" x2="520" y2="176" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.25" markerEnd="url(#arrow-t)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stack + Status */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-semibold text-[var(--color-text)]">Stack técnico</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--bg-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono border border-[var(--color-text-secondary)]/30 bg-[var(--color-text-secondary)]/8 text-[var(--color-text-secondary)]">
              ARCHIVADO · OPEN SOURCE
            </span>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Estado</span>
                <span className="text-[var(--color-text)]">Archivado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Código</span>
                <span className="text-[var(--color-text)]">Open Source</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Arquitectura</span>
                <span className="text-[var(--color-text)]">Microservicios</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Activos</span>
                <span className="text-[var(--color-text)]">+500 multi-mercado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center rounded-2xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-10 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text)]">
            ¿Te interesa el proyecto?
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            El código es open source. Si quieres hablar sobre la arquitectura, el scoring engine o cómo adaptarlo a otro mercado, hablemos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:pascualpau04@gmail.com"
              className="px-6 py-3 rounded-lg font-medium text-sm bg-[var(--color-accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
            >
              Contactar con Pau
            </a>
            <a
              href="/"
              className="px-6 py-3 rounded-lg font-medium text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors"
            >
              ← Volver al portfolio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
