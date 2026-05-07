"use client";

import { useState, useEffect, useCallback } from "react";

function rand(base: number, variance: number) {
  return +(base + (Math.random() * 2 - 1) * variance).toFixed(1);
}

function barColor(pct: number) {
  if (pct > 90) return "bg-red-500";
  if (pct > 70) return "bg-orange-400";
  return "bg-[var(--color-accent)]";
}

function MetricCard({ title, icon, value, unit, bar, extra }: {
  title: string;
  icon: React.ReactNode;
  value: string;
  unit?: string;
  bar?: number;
  extra?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 space-y-3">
      <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-xs font-mono uppercase tracking-wider">
        {icon}
        {title}
      </div>
      <div className="text-2xl font-heading font-bold text-[var(--color-text)]">
        {value}
        {unit && <span className="text-base font-normal text-[var(--color-text-secondary)] ml-1">{unit}</span>}
      </div>
      {bar !== undefined && (
        <div className="w-full h-1.5 rounded-full bg-[rgba(var(--color-accent-rgb),0.1)]">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor(bar)}`}
            style={{ width: `${Math.min(bar, 100)}%` }}
          />
        </div>
      )}
      {extra && <p className="text-xs text-[var(--color-text-secondary)]">{extra}</p>}
    </div>
  );
}

const services = [
  { name: "Home Assistant", detail: "192.168.1.x" },
  { name: "NAS Synology", detail: "/mnt/nas mounted" },
  { name: "VPN WireGuard", detail: "túnel activo" },
  { name: "Ollama (local)", detail: "llama3.1:8b loaded" },
  { name: "Groq (fallback)", detail: "conectado" },
];

export default function JarvisSystem() {
  const [cpu, setCpu] = useState(34);
  const [cpuTemp, setCpuTemp] = useState(52);
  const [ramUsed, setRamUsed] = useState(14.2);
  const [gpu, setGpu] = useState(23);
  const [latency, setLatency] = useState(290);

  const tick = useCallback(() => {
    setCpu(rand(34, 5));
    setCpuTemp(Math.round(rand(52, 1)));
    setRamUsed(rand(14.2, 0.4));
    setGpu(rand(23, 4));
    setLatency(Math.round(rand(290, 20)));
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [tick]);

  const chipIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/></svg>
  );
  const ramIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 6V4M10 6V4M14 6V4M18 6V4"/></svg>
  );
  const gpuIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/></svg>
  );
  const nasIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/><circle cx="7" cy="6" r="1"/><circle cx="7" cy="12" r="1"/><circle cx="7" cy="18" r="1"/></svg>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard title="CPU" icon={chipIcon} value={`${cpu}%`} bar={cpu} extra={`Temperatura: ${cpuTemp}°C · AMD Ryzen (simulado)`} />
        <MetricCard title="RAM" icon={ramIcon} value={`${ramUsed} / 32 GB`} bar={(ramUsed / 32) * 100} extra="Disponible para modelo: ~17 GB" />
        <MetricCard title="GPU" icon={gpuIcon} value={`${gpu}%`} bar={gpu} extra="VRAM: 5.1 / 8 GB · AMD RX 570 (simulado)" />
        <MetricCard title="NAS" icon={nasIcon} value="2.1 / 4 TB" bar={(2.1 / 4) * 100} extra="Montado · /mnt/nas" />
      </div>

      {/* Services card */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">Servicios activos</h4>
        <div className="space-y-2.5">
          {services.map((s) => (
            <div key={s.name} className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse-glow shrink-0" />
              <span className="text-[var(--color-text)]">{s.name}</span>
              <span className="text-[var(--color-text-secondary)]">· online · {s.detail}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 text-xs text-[var(--color-text-secondary)]">
          Latencia del modelo local: <span className="text-[var(--color-accent)] font-mono">~{latency}ms</span>
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] text-center pt-2">
        Datos simulados. Los valores reales varían según la carga del sistema.
      </p>
    </div>
  );
}
