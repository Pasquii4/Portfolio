"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface TickerData {
    symbol: string;
    price: number;
    changePercent: number;
}

export default function FinTechTicker() {
    const [data, setData] = useState<TickerData[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicker = async () => {
            try {
                const res = await fetch('/api/ticker');
                if (!res.ok) throw new Error("API Error");
                const json = await res.json();

                if (json.error || !Array.isArray(json)) {
                    throw new Error("Invalid format");
                }

                setData(json);
                setError(false);
            } catch (err) {
                console.error("Ticker Error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTicker();
        const interval = setInterval(fetchTicker, 30000); // Pulse every 30s
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-[var(--bg-primary)] border-y border-[var(--color-accent)] h-12 flex items-center justify-center overflow-hidden relative opacity-70">
                <div className="absolute inset-0 bg-[rgba(var(--color-accent-rgb),0.05)] animate-pulse" />
                <span className="font-mono text-xs text-[var(--color-accent)]">INITIALIZING DATAFEED...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-[var(--bg-surface)] border-y border-[var(--color-accent)] h-12 flex items-center overflow-hidden">
                <Marquee speed={60} gradient={false} className="text-[var(--color-accent)] font-mono text-xs md:text-sm">
                    {Array(10).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 mx-8">
                            <AlertTriangle className="w-4 h-4 animate-pulse" />
                            <span className="animate-glitch-1 inline-block relative font-bold">ERR_CONNECTION_REFUSED - FEED OFFLINE</span>
                        </div>
                    ))}
                </Marquee>
            </div>
        );
    }

    return (
        <div className="w-full bg-[var(--bg-primary)]/80 backdrop-blur-md border-y border-[var(--color-border)] h-10 flex items-center overflow-hidden font-mono text-xs md:text-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="bg-[var(--color-accent)] text-[var(--bg-primary)] h-full px-4 flex items-center font-bold tracking-wider relative z-10 shrink-0 uppercase text-[10px] md:text-xs">
                <span className="animate-pulse mr-2">●</span> LIVE FEED
            </div>

            <Marquee speed={50} gradient={false} className="flex-1">
                <div className="flex bg-[var(--bg-primary)]">
                    {data.map((item, idx) => {
                        const isPos = item.changePercent >= 0;
                        const color = isPos ? 'text-[var(--color-accent)]' : 'text-[var(--color-accent)]';
                        const Icon = isPos ? TrendingUp : TrendingDown;

                        return (
                            <div key={`${item.symbol}-${idx}`} className="flex items-center gap-4 mx-10 text-[var(--color-text)] group cursor-default">
                                <span className="font-bold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">{item.symbol}</span>

                                <span className="bg-[var(--bg-surface)] px-2 py-0.5 rounded text-[var(--color-text)] group-hover:bg-[var(--bg-surface)] transition-colors">
                                    {item.symbol.includes('BTC') ? '$' : ''}
                                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: item.symbol.includes('BTC') || item.symbol.includes('ETH') ? undefined : 'currency', currency: 'USD' })}
                                </span>

                                <div className={`flex items-center gap-1 font-bold ${color}`}>
                                    {isPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                                    <Icon className="w-3 h-3" />
                                </div>
                                <div className="w-px h-6 bg-[var(--color-border)] ml-6" /> {/* Separator */}
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        </div>
    );
}
