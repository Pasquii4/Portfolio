"use client";

const inDemo = [
  "Chat con contexto del ecosistema",
  "Panel de estado del sistema",
  "Detección de gestos (en desarrollo)",
];

const production = [
  "Esfera de activación por voz",
  "Conversación oral continua activada por voz",
  "Control total de dispositivos Home Assistant en tiempo real",
  "Navegación interactiva por planos del hogar",
  "Gestión de archivos NAS (buscar, mover, montar)",
  "Acceso remoto completo vía VPN desde cualquier dispositivo",
  "Configuración vía ficheros TOML (sin tocar código)",
  "Scripts de instalación para Windows y Raspberry Pi",
];

const stack = [
  "Python", "FastAPI", "llama.cpp", "Ollama", "Groq",
  "Home Assistant API", "Docker", "WireGuard",
  "Raspberry Pi", "NAS Synology",
];

export default function JarvisCapabilities() {
  return (
    <>
      {/* Capabilities grid */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
              Sistema completo · No solo esta demo
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Lo que hay en producción va más allá de esta demo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inDemo.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5">
                <span className="text-[var(--color-accent)] mt-0.5 shrink-0">✓</span>
                <div>
                  <p className="text-sm text-[var(--color-text)]">{f}</p>
                  <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">En esta demo</span>
                </div>
              </div>
            ))}
            {production.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5">
                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-accent)] shrink-0 mt-0.5">
                  COMPLETO
                </span>
                <p className="text-sm text-[var(--color-text)]">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack & Status */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Stack */}
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

          {/* Status */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-accent)]">
              ACTIVO · EN DESARROLLO
            </span>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Uso</span>
                <span className="text-[var(--color-text)]">Personal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Código</span>
                <span className="text-[var(--color-text)]">Privado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Arquitectura</span>
                <span className="text-[var(--color-text)]">Local-first</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center rounded-2xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-10 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text)]">
            ¿Quieres hablar sobre esto?
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Si te interesa la arquitectura, cómo escala o cómo aplicarlo a un proyecto real, puedo explicarlo en detalle.
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
