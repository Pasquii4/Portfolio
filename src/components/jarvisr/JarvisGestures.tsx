"use client";

const gestures = [
  {
    name: "Palma abierta",
    action: "Pausa · Para la reproducción o acción activa",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28V14a2 2 0 114 0v10M20 24V11a2 2 0 114 0v13M24 24V13a2 2 0 114 0v11M28 24V16a2 2 0 114 0v12" />
        <path d="M12 28c0 7.18 5.82 13 13 13h1c7.18 0 13-5.82 13-13v-4a2 2 0 10-4 0" />
      </svg>
    ),
  },
  {
    name: "Puño cerrado",
    action: "Stop · Detiene el proceso actual",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="14" width="20" height="22" rx="10" />
        <path d="M20 14V11M24 14V10M28 14V11" />
      </svg>
    ),
  },
  {
    name: "Dedo índice arriba",
    action: "Siguiente · Avanza en la lista o acción",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 30V10a2 2 0 114 0v20" />
        <path d="M18 30c0 5.52 4.48 10 10-0h-8a2 2 0 010-4h0" />
        <rect x="16" y="28" width="16" height="12" rx="6" />
      </svg>
    ),
  },
  {
    name: "Dos dedos",
    action: "Seleccionar · Confirma una opción",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 28V12a2 2 0 114 0v16M24 28V12a2 2 0 114 0v16" />
        <rect x="14" y="28" width="20" height="10" rx="5" />
      </svg>
    ),
  },
  {
    name: "Mano izquierda",
    action: "Anterior · Retrocede",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 24H12M12 24l8-6M12 24l8 6" />
        <rect x="14" y="18" width="22" height="12" rx="6" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    name: "Mano derecha",
    action: "Siguiente pantalla · Cambia de plano",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 24h20M36 24l-8-6M36 24l-8 6" />
        <rect x="12" y="18" width="22" height="12" rx="6" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

export default function JarvisGestures() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-heading font-semibold text-[var(--color-text)]">
          Sistema de detección de gestos
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          En desarrollo activo. Usa computer vision para mapear acciones a gestos físicos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gestures.map((g) => (
          <div
            key={g.name}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 flex flex-col items-center text-center space-y-3 hover:border-[rgba(var(--color-accent-rgb),0.3)] transition-colors"
          >
            <div className="text-[var(--color-accent)]">{g.svg}</div>
            <h4 className="text-sm font-semibold text-[var(--color-text)]">{g.name}</h4>
            <p className="text-xs text-[var(--color-text-secondary)]">{g.action}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[rgba(var(--color-accent-rgb),0.2)] bg-[rgba(var(--color-accent-rgb),0.04)] px-6 py-4 text-center text-sm text-[var(--color-text-secondary)]">
        ⚡ En desarrollo: navegación por planos del hogar, control de pantallas externas y mapeo de gestos personalizado.
      </div>
    </div>
  );
}
