"use client";

import { useState } from "react";
import { getUserById, OPERATIONS } from "@/data/tracker-mockdata";
import type { Operation } from "@/data/tracker-mockdata";

const PAGE_SIZE = 10;

function borderColor(result: Operation["result"]) {
  switch (result) {
    case "won": return "border-l-emerald-400";
    case "lost": return "border-l-red-400";
    default: return "border-l-amber-400";
  }
}

function ResultBadge({ result }: { result: Operation["result"] }) {
  switch (result) {
    case "won":
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-400/10 text-emerald-400">✓ GANADA</span>;
    case "lost":
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-400/10 text-red-400">✗ PERDIDA</span>;
    case "void":
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)]">VOID</span>;
    case "pending":
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-400">PENDIENTE</span>;
  }
}

export default function TrackerProfile({ userId }: { userId: string }) {
  const [page, setPage] = useState(1);
  const user = getUserById(userId);
  const ops = OPERATIONS.filter((o) => o.user_id === userId);
  const visible = ops.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < ops.length;

  const winRate = ops.length > 0 ? ((user.won / (user.won + user.lost)) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.avatar}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">{user.username}</h3>
            {user.verified && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-accent)]">
                ✓ verificado
              </span>
            )}
            <span className="text-xs text-[var(--color-text-secondary)]">{user.sport}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
            <span>{user.total_bets} operaciones</span>
            <span>·</span>
            <span>{user.followers.toLocaleString()} seguidores</span>
            <span>·</span>
            <span>{user.following} siguiendo</span>
          </div>
          <button className="px-4 py-1.5 rounded-lg text-xs border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors">
            Seguir
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">ROI Total</p>
          <p className={`text-2xl font-heading font-bold ${user.roi_total >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {user.roi_total >= 0 ? "+" : ""}{user.roi_total}%
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">▲ desde inicio</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Mejor mes</p>
          <p className="text-2xl font-heading font-bold text-emerald-400">{user.best_month}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">Diciembre 2025</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Win Rate</p>
          <p className="text-2xl font-heading font-bold text-[var(--color-accent)]">{winRate}%</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{user.won}W / {user.lost}L</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Kelly medio</p>
          <p className="text-2xl font-heading font-bold text-[var(--color-accent)]">{user.kelly_avg}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">Gestión óptima</p>
        </div>
      </div>

      {/* Operation history */}
      {ops.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[var(--color-text)]">Historial de operaciones</h4>
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[var(--color-text-secondary)] font-mono uppercase tracking-wider border-b border-[var(--color-border)] bg-[var(--bg-surface)]">
                  <th className="text-left px-4 py-2.5">Fecha</th>
                  <th className="text-left px-4 py-2.5">Partido</th>
                  <th className="text-left px-4 py-2.5 hidden sm:table-cell">Mercado</th>
                  <th className="text-right px-4 py-2.5">Cuota</th>
                  <th className="text-right px-4 py-2.5">Stake%</th>
                  <th className="text-center px-4 py-2.5">Resultado</th>
                  <th className="text-right px-4 py-2.5">Profit%</th>
                </tr>
              </thead>
              <tbody className="bg-[var(--bg-surface)]">
                {visible.map((op, i) => (
                  <tr
                    key={op.id}
                    className={`border-b border-[var(--color-border)] border-l-2 ${borderColor(op.result)} ${i % 2 === 0 ? "" : "bg-[rgba(232,230,225,0.02)]"}`}
                  >
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)] font-mono whitespace-nowrap">
                      {new Date(op.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
                    </td>
                    <td className="px-4 py-2.5 text-[var(--color-text)] max-w-[160px] truncate">{op.match}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)] hidden sm:table-cell max-w-[120px] truncate">{op.market}</td>
                    <td className="px-4 py-2.5 text-right text-[var(--color-text)] font-mono">{op.odds}</td>
                    <td className="px-4 py-2.5 text-right text-[var(--color-text-secondary)] font-mono">{op.stake_pct}%</td>
                    <td className="px-4 py-2.5 text-center"><ResultBadge result={op.result} /></td>
                    <td className={`px-4 py-2.5 text-right font-mono font-semibold ${op.result === "won" ? "text-emerald-400" : op.result === "lost" ? "text-red-400" : "text-[var(--color-text-secondary)]"}`}>
                      {op.result === "won" ? "+" : ""}{op.profit_pct !== 0 ? op.profit_pct.toFixed(2) + "%" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="w-full py-2.5 rounded-lg text-xs border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors"
            >
              Ver más operaciones ({ops.length - visible.length} restantes)
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-[var(--color-text-secondary)] text-center py-8">Sin operaciones disponibles para este usuario.</p>
      )}

      {/* Kelly info */}
      <details className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] overflow-hidden">
        <summary className="px-5 py-4 text-sm font-medium text-[var(--color-text)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors list-none flex items-center justify-between">
          ¿Qué es el Kelly Criterion?
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-secondary)]"><polyline points="6 9 12 15 18 9" /></svg>
        </summary>
        <div className="px-5 pb-5 text-xs text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">
          El Kelly Criterion es una fórmula matemática que calcula el porcentaje óptimo del bankroll a arriesgar en cada operación, maximizando el crecimiento a largo plazo y minimizando el riesgo de ruina. Se calcula como: <span className="font-mono text-[var(--color-accent)]">f* = (b·p - q) / b</span>, donde b es la cuota neta, p es la probabilidad de ganar y q = 1-p.
        </div>
      </details>
    </div>
  );
}
