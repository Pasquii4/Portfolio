"use client";

import { alerts, signalDot, signalColor } from "@/data/trading-mockdata";

export default function TradingAlerts() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">
            Filtrar por señal
          </h4>
          <div className="space-y-1.5">
            {(["LONG", "SHORT", "NEUTRAL"] as const).map((s) => (
              <label key={s} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] cursor-pointer">
                <span className="w-3.5 h-3.5 rounded border border-[var(--color-border)] bg-[rgba(var(--color-accent-rgb),0.15)] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.2" className="text-[var(--color-accent)]" /></svg>
                </span>
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">
            Score mínimo
          </h4>
          <div className="space-y-1">
            <div className="w-full h-1.5 rounded-full bg-[rgba(var(--color-accent-rgb),0.1)] relative">
              <div className="absolute left-0 top-0 h-full w-[65%] rounded-full bg-[var(--color-accent)]" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[65%] -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] border-2 border-[var(--bg-primary)]" />
            </div>
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">65%</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">
            Sector
          </h4>
          <div className="w-full px-3 py-2 rounded-lg text-xs border border-[var(--color-border)] bg-[var(--bg-surface)] text-[var(--color-text-secondary)]">
            Todos los sectores ▾
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--color-border)]" />

      {/* Alerts */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">
          Alertas recientes
        </h4>
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full shrink-0 ${signalDot(a.signal)}`} />
              <span className="text-[var(--color-text-secondary)] font-mono w-10">{a.time}</span>
              <span className="text-[var(--color-text)] font-semibold w-10">{a.ticker}</span>
              <span className={`font-mono ${signalColor(a.signal)}`}>{a.signal}</span>
              <span className="text-[var(--color-text-secondary)] ml-auto font-mono">{a.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
