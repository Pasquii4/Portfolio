"use client";

import type { Asset } from "@/data/trading-mockdata";
import { signalBg, signalColor } from "@/data/trading-mockdata";
import TradingChart from "./TradingChart";

export default function TradingSignalPanel({ asset }: { asset: Asset }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text)]">{asset.ticker}</h4>
          <p className="text-xs text-[var(--color-text-secondary)]">{asset.name}</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${signalBg(asset.signal)}`}>
          {asset.signal}
        </span>
      </div>

      <TradingChart ticker={asset.ticker} />

      {/* Score */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-secondary)]">Score</span>
          <span className={`font-mono font-semibold ${signalColor(asset.signal)}`}>{asset.score}/100</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[rgba(var(--color-accent-rgb),0.1)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500"
            style={{ width: `${asset.score}%` }}
          />
        </div>
      </div>

      {/* Levels */}
      {asset.signal !== "NEUTRAL" && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Entrada", value: asset.entry },
            { label: "Take Profit", value: asset.tp },
            { label: "Stop Loss", value: asset.sl },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--bg-primary)] p-2.5 text-center">
              <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">{item.label}</p>
              <p className="text-xs font-mono text-[var(--color-text)] mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reasoning */}
      <div className="space-y-2">
        <h5 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">Razonamiento</h5>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          {asset.reasoning}
        </p>
      </div>
    </div>
  );
}
