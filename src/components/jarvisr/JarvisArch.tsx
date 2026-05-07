"use client";

export default function JarvisArch() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
            Cómo está construido
          </h2>
        </div>

        {/* Architecture diagram */}
        <div className="flex justify-center overflow-x-auto">
          <svg
            viewBox="0 0 720 440"
            className="w-full max-w-3xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arrows */}
            <line x1="360" y1="72" x2="360" y2="148" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arrowhead)" />
            <line x1="360" y1="212" x2="220" y2="288" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arrowhead)" />
            <line x1="360" y1="212" x2="360" y2="288" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arrowhead)" />
            <line x1="360" y1="212" x2="500" y2="288" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arrowhead)" />
            <line x1="220" y1="352" x2="220" y2="388" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="rgb(55,205,165)" fillOpacity="0.6" />
              </marker>
            </defs>

            {/* Node: Remote device */}
            <rect x="260" y="24" width="200" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.5" />
            <text x="360" y="53" textAnchor="middle" fill="#e8e6e1" fontSize="13" fontFamily="monospace">Dispositivo remoto</text>

            {/* Label: VPN */}
            <text x="378" y="118" textAnchor="start" fill="rgb(55,205,165)" fontSize="10" fontFamily="monospace" fillOpacity="0.7">VPN (WireGuard)</text>

            {/* Node: JARVISR Core */}
            <rect x="260" y="148" width="200" height="64" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1.5" strokeOpacity="0.7" />
            <text x="360" y="175" textAnchor="middle" fill="rgb(55,205,165)" fontSize="14" fontFamily="monospace" fontWeight="bold">JARVISR Core</text>
            <text x="360" y="195" textAnchor="middle" fill="#b6b0a6" fontSize="11" fontFamily="monospace">FastAPI</text>

            {/* Node: Ollama */}
            <rect x="120" y="288" width="200" height="64" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.5" />
            <text x="220" y="315" textAnchor="middle" fill="#e8e6e1" fontSize="12" fontFamily="monospace">llama.cpp / Ollama</text>
            <text x="220" y="335" textAnchor="middle" fill="#b6b0a6" fontSize="10" fontFamily="monospace">Motor local</text>

            {/* Node: Home Assistant */}
            <rect x="260" y="288" width="200" height="64" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.5" />
            <text x="360" y="315" textAnchor="middle" fill="#e8e6e1" fontSize="12" fontFamily="monospace">Home Assistant</text>
            <text x="360" y="335" textAnchor="middle" fill="#b6b0a6" fontSize="10" fontFamily="monospace">Domótica</text>

            {/* Node: NAS */}
            <rect x="400" y="288" width="200" height="64" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.5" />
            <text x="500" y="315" textAnchor="middle" fill="#e8e6e1" fontSize="12" fontFamily="monospace">NAS Synology</text>
            <text x="500" y="335" textAnchor="middle" fill="#b6b0a6" fontSize="10" fontFamily="monospace">Almacenamiento</text>

            {/* Node: Groq */}
            <rect x="120" y="388" width="200" height="48" rx="12" fill="#151311" stroke="rgb(55,205,165)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
            <text x="220" y="417" textAnchor="middle" fill="#b6b0a6" fontSize="11" fontFamily="monospace">Groq API (fallback cloud)</text>
          </svg>
        </div>

        {/* Principles */}
        <div className="flex flex-wrap justify-center gap-3">
          {["Local-first", "Privacidad total", "Coste predecible"].map((label) => (
            <span
              key={label}
              className="px-4 py-2 rounded-full text-xs font-mono border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-accent)]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
