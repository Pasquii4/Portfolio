"use client";

import { SORTED_USERS } from "@/data/tracker-mockdata";

const medals = ["🥇", "🥈", "🥉"];

interface Props {
  onSelectUser: (userId: string) => void;
}

export default function TrackerLeaderboard({ onSelectUser }: Props) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
            Rankings · Top rendimiento
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Clasificación por ROI en los últimos 3 meses.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[var(--color-text-secondary)] font-mono uppercase tracking-wider border-b border-[var(--color-border)] bg-[var(--bg-primary)]/40">
                  <th className="text-center px-4 py-3 w-10">#</th>
                  <th className="text-left px-4 py-3">Usuario</th>
                  <th className="text-right px-4 py-3">ROI 3M</th>
                  <th className="text-right px-4 py-3 hidden sm:table-cell">Ops.</th>
                  <th className="text-right px-4 py-3 hidden md:table-cell">Racha</th>
                  <th className="text-right px-4 py-3 hidden lg:table-cell">Mejor mes</th>
                  <th className="text-right px-4 py-3">Bankroll</th>
                </tr>
              </thead>
              <tbody>
                {SORTED_USERS.map((user, i) => (
                  <tr
                    key={user.id}
                    onClick={() => onSelectUser(user.id)}
                    className={`border-b border-[var(--color-border)] cursor-pointer transition-colors hover:bg-[var(--bg-hover)] ${i === 0 ? "bg-[rgba(var(--color-accent-rgb),0.04)]" : ""}`}
                  >
                    <td className="text-center px-4 py-3 text-base">
                      {i < 3 ? medals[i] : <span className="font-mono text-[var(--color-text-secondary)]">{i + 1}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ backgroundColor: user.avatarColor }}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <span className="text-[var(--color-text)] font-medium">
                            {user.username}
                            {user.verified && (
                              <span className="ml-1 text-[var(--color-accent)] text-[10px]">✓</span>
                            )}
                          </span>
                          <p className="text-[var(--color-text-secondary)] text-[10px]">{user.sport}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`text-right px-4 py-3 font-mono font-semibold ${user.roi_total >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {user.roi_total >= 0 ? "+" : ""}{user.roi_total}%
                    </td>
                    <td className="text-right px-4 py-3 text-[var(--color-text-secondary)] font-mono hidden sm:table-cell">
                      {user.total_bets}
                    </td>
                    <td className={`text-right px-4 py-3 font-mono hidden md:table-cell ${user.streak > 5 ? "text-amber-400" : "text-[var(--color-text-secondary)]"}`}>
                      {user.streak > 0 ? `${user.streak} ✓` : "—"}
                    </td>
                    <td className="text-right px-4 py-3 text-emerald-400 font-mono hidden lg:table-cell">
                      {user.best_month}
                    </td>
                    <td className="text-right px-4 py-3 font-mono">
                      <span className={`${user.bankroll_current >= user.bankroll_start ? "text-emerald-400" : "text-red-400"}`}>
                        €{user.bankroll_current.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
