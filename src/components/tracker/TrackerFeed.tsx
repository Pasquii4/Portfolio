"use client";

import { FEED_POSTS, getUserById } from "@/data/tracker-mockdata";
import type { BetResult } from "@/data/tracker-mockdata";

function resultBadge(result: BetResult, profit: number) {
  switch (result) {
    case "won":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/25">
          ✓ GANADA
          <span className="ml-1 text-emerald-400">+{profit.toFixed(2)}%</span>
        </span>
      );
    case "lost":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-400/10 text-red-400 border border-red-400/25">
          ✗ PERDIDA
          <span className="ml-1 text-red-400">{profit.toFixed(2)}%</span>
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/25">
          ◌ PENDIENTE
        </span>
      );
    case "void":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)] border border-[var(--color-border)]">
          ⊘ VOID
        </span>
      );
  }
}

const FILTERS = ["Todos", "GANADAS", "PENDIENTES", "PERDIDAS"] as const;

export default function TrackerFeed() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={`px-3 py-1 rounded-full text-xs font-mono border cursor-pointer transition-colors ${
              i === 0
                ? "border-[rgba(var(--color-accent-rgb),0.4)] bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.3)]"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {FEED_POSTS.map((post) => {
          const user = getUserById(post.user_id);
          const roiColor = user.roi_total >= 0 ? "text-emerald-400" : "text-red-400";
          return (
            <article key={post.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] overflow-hidden">
              {/* Post header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    {user.avatar}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      {user.username}
                      {user.verified && (
                        <span className="ml-1 text-[var(--color-accent)] text-xs">✓</span>
                      )}
                    </span>
                    <p className="text-xs text-[var(--color-text-secondary)]">{post.timestamp}</p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-semibold ${roiColor}`}>
                  ROI {user.roi_total >= 0 ? "+" : ""}{user.roi_total}%
                </span>
              </div>

              {/* Post body */}
              <div className="px-4 py-3 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <span className="font-medium text-[var(--color-text)]">{post.match}</span>
                  <span>·</span>
                  <span>{post.league}</span>
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">
                  {post.market} · Cuota {post.odds} · Stake {post.stake_pct}%
                </div>
                {post.reasoning && (
                  <p className="text-xs text-[var(--color-text-secondary)] italic leading-relaxed">
                    &ldquo;{post.reasoning}&rdquo;
                  </p>
                )}
              </div>

              {/* Post footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--color-border)]">
                {resultBadge(post.result, post.profit_pct)}
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    {post.likes}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
