"use client";

import { candleData } from "@/data/trading-mockdata";

const SVG_W = 400;
const SVG_H = 180;
const PADDING = 16;
const CANDLE_W = 12;
const GAP = (SVG_W - PADDING * 2 - candleData.length * CANDLE_W) / (candleData.length - 1);

const allPrices = candleData.flatMap((c) => [c.h, c.l]);
const minPrice = Math.min(...allPrices);
const maxPrice = Math.max(...allPrices);
const priceRange = maxPrice - minPrice || 1;

function yFromPrice(price: number) {
  return PADDING + ((maxPrice - price) / priceRange) * (SVG_H - PADDING * 2);
}

export default function TradingChart({ ticker }: { ticker: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--color-text-secondary)]">{ticker} · 1D</span>
        <span className="text-xs font-mono text-[var(--color-text-secondary)]">20 sesiones</span>
      </div>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pct) => {
          const y = PADDING + pct * (SVG_H - PADDING * 2);
          return (
            <line
              key={pct}
              x1={PADDING}
              y1={y}
              x2={SVG_W - PADDING}
              y2={y}
              stroke="rgba(232,230,225,0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Candles */}
        {candleData.map((candle, i) => {
          const x = PADDING + i * (CANDLE_W + GAP);
          const cx = x + CANDLE_W / 2;
          const bullish = candle.c >= candle.o;
          const color = bullish ? "rgb(52,211,153)" : "rgb(248,113,113)";
          const bodyTop = yFromPrice(Math.max(candle.o, candle.c));
          const bodyBot = yFromPrice(Math.min(candle.o, candle.c));
          const bodyH = Math.max(bodyBot - bodyTop, 1);

          return (
            <g key={i}>
              <line x1={cx} y1={yFromPrice(candle.h)} x2={cx} y2={yFromPrice(candle.l)} stroke={color} strokeWidth="1" />
              <rect x={x + 2} y={bodyTop} width={CANDLE_W - 4} height={bodyH} fill={color} rx="1" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
