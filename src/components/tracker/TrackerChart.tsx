"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from "recharts";
import { BANKROLL_DATA } from "@/data/tracker-mockdata";

const PERIODS = [
  { label: "1 semana", days: 7 },
  { label: "1 mes", days: 30 },
  { label: "3 meses", days: 90 },
] as const;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: {value: number}[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--bg-surface)] px-3 py-2 text-xs shadow-xl">
      <p className="text-[var(--color-text-secondary)] mb-1">{label ? formatDate(label) : ""}</p>
      <p className="text-[var(--color-text)] font-mono font-semibold">
        €{value.toFixed(2)}
      </p>
      <p className={`font-mono text-[10px] mt-0.5 ${value >= 1000 ? "text-emerald-400" : "text-red-400"}`}>
        {value >= 1000 ? "+" : ""}{(value - 1000).toFixed(2)} ({((value / 1000 - 1) * 100).toFixed(1)}%)
      </p>
    </div>
  );
}

export default function TrackerChart() {
  const [period, setPeriod] = useState<7 | 30 | 90>(90);

  const data = useMemo(() => {
    return BANKROLL_DATA.slice(-period);
  }, [period]);

  const tickInterval = Math.floor(data.length / 6);
  const isAboveStart = data[data.length - 1]?.value >= 1000;

  return (
    <div className="space-y-4">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">
          Evolución del bankroll · xavi_stats
        </h3>
        <div className="flex gap-1 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-lg p-1">
          {PERIODS.map((p) => (
            <button
              key={p.days}
              onClick={() => setPeriod(p.days as 7 | 30 | 90)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                period === p.days
                  ? "bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="bankrollGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isAboveStart ? "#34d399" : "#f87171"} stopOpacity={0.18} />
                <stop offset="95%" stopColor={isAboveStart ? "#34d399" : "#f87171"} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(232,230,225,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-secondary)", fontSize: 10, fontFamily: "monospace" }}
              tickFormatter={formatDate}
              interval={tickInterval}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-secondary)", fontSize: 10, fontFamily: "monospace" }}
              tickFormatter={(v: number) => `€${v}`}
              domain={["auto", "auto"]}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={1000}
              stroke="rgba(232,230,225,0.2)"
              strokeDasharray="4 4"
              label={{ value: "inicio", fill: "var(--color-text-secondary)", fontSize: 9, fontFamily: "monospace" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#bankrollGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--color-accent)", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
