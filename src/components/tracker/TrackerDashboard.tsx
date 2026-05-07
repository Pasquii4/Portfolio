"use client";

import { OPERATIONS } from "@/data/tracker-mockdata";
import type { Operation } from "@/data/tracker-mockdata";
import TrackerChart from "./TrackerChart";

const userOps = OPERATIONS.filter((o) => o.user_id === "u1").slice(0, 8);

const stats = [
  { label: "ROI Total", value: "+24.7%", color: "text-emerald-400" },
  { label: "ROI Mes", value: "+8.3%", color: "text-emerald-400" },
  { label: "Racha", value: "12 ✓", color: "text-amber-400" },
  { label: "Kelly", value: "0.06", color: "text-[var(--color-accent)]" },
];

function borderColor(result: Operation["result"]) {
  switch (result) {
    case "won": return "border-l-emerald-400";
    case "lost": return "border-l-red-400";
    default: return "border-l-amber-400";
  }
}

function profitLabel(op: Operation) {
  if (op.result === "void") return <span className="text-[var(--color-text-secondary)]">void</span>;
  if (op.result === "pending") return <span className="text-amber-400">pendiente</span>;
  return (
    <span className={op.result === "won" ? "text-emerald-400" : "text-red-400"}>
      {op.result === "won" ? "+" : ""}{op.profit_pct.toFixed(2)}%
    </span>
  );
}

export default function TrackerDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left: chart + stat cards */}
      <div className="lg:col-span-3 space-y-6">
        <TrackerChart />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-4 text-center space-y-1">
              <p className="text-xs text-[var(--color-text-secondary)]">{s.label}</p>
              <p className={`text-lg font-heading font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: recent operations */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">Operaciones recientes</h3>
        <div className="space-y-2">
          {userOps.map((op) => (
            <div
              key={op.id}
              className={`rounded-lg border border-[var(--color-border)] border-l-2 ${borderColor(op.result)} bg-[var(--bg-surface)] px-4 py-3 space-y-1`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-[var(--color-text)] truncate">{op.match}</p>
                <span className="text-xs font-mono shrink-0">{profitLabel(op)}</span>
              </div>
              <div className="flex gap-1 text-[10px] text-[var(--color-text-secondary)]">
                <span>{op.league}</span>
                <span>·</span>
                <span>{op.market}</span>
                <span>·</span>
                <span>@{op.odds}</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-secondary)]">
                {new Date(op.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
