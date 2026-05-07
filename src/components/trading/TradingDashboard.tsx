"use client";

import { useState, useEffect } from "react";
import { assets, indices, signalBg, signalColor } from "@/data/trading-mockdata";
import TradingAlerts from "./TradingAlerts";
import TradingSignalPanel from "./TradingSignalPanel";

export default function TradingDashboard() {
  const [selected, setSelected] = useState(2); // NVDA by default (highest score)
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="dashboard" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
            Dashboard interactivo
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Datos mock. En producción el scanner analiza +500 activos en tiempo real.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--bg-surface)] overflow-hidden">
          {/* Dashboard header */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 border-b border-[var(--color-border)] bg-[var(--bg-primary)]/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse-glow" />
              <span className="text-xs font-mono text-[var(--color-text)]">TRADING SCANNER · EN VIVO</span>
            </div>
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">{time}</span>
            <div className="hidden md:flex items-center gap-5">
              {indices.map((idx) => (
                <div key={idx.name} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[var(--color-text-secondary)]">{idx.name}</span>
                  <span className="text-[var(--color-text)]">{idx.value}</span>
                  <span className={idx.positive ? "text-emerald-400" : "text-red-400"}>{idx.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)]">
            {/* Left: Filters + Alerts */}
            <div className="lg:col-span-3 p-4 max-h-[600px] overflow-y-auto">
              <TradingAlerts />
            </div>

            {/* Center: Table */}
            <div className="lg:col-span-6 p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[var(--color-text-secondary)] font-mono uppercase tracking-wider border-b border-[var(--color-border)]">
                    <th className="text-left py-2 pr-2">Ticker</th>
                    <th className="text-right py-2 px-2">Precio</th>
                    <th className="text-right py-2 px-2">24h</th>
                    <th className="text-right py-2 px-2">RSI</th>
                    <th className="text-center py-2 px-2">Señal</th>
                    <th className="text-right py-2 pl-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((a, i) => (
                    <tr
                      key={a.ticker}
                      onClick={() => setSelected(i)}
                      className={`border-b border-[var(--color-border)] cursor-pointer transition-colors ${
                        selected === i
                          ? "bg-[rgba(var(--color-accent-rgb),0.06)]"
                          : "hover:bg-[var(--bg-hover)]"
                      }`}
                    >
                      <td className="py-2.5 pr-2">
                        <span className="font-semibold text-[var(--color-text)]">{a.ticker}</span>
                      </td>
                      <td className="text-right py-2.5 px-2 font-mono text-[var(--color-text)]">{a.price}</td>
                      <td className={`text-right py-2.5 px-2 font-mono ${a.changePositive ? "text-emerald-400" : "text-red-400"}`}>
                        {a.change}
                      </td>
                      <td className="text-right py-2.5 px-2 font-mono text-[var(--color-text-secondary)]">{a.rsi}</td>
                      <td className="text-center py-2.5 px-2">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono border ${signalBg(a.signal)}`}>
                          {a.signal}
                        </span>
                      </td>
                      <td className={`text-right py-2.5 pl-2 font-mono font-semibold ${signalColor(a.signal)}`}>
                        {a.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Signal panel */}
            <div className="lg:col-span-3 p-4 max-h-[600px] overflow-y-auto">
              <TradingSignalPanel asset={assets[selected]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
