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
        // Fallback data when API is unreachable or offline
        const fallbackData = [
            { symbol: "BTC", price: 68450.20, changePercent: 1.25 },
            { symbol: "ETH", price: 3450.80, changePercent: 0.85 },
            { symbol: "AAPL", price: 175.50, changePercent: -0.45 },
            { symbol: "MSFT", price: 420.15, changePercent: 0.30 },
            { symbol: "GOOGL", price: 168.40, changePercent: 1.10 },
            { symbol: "NVDA", price: 890.00, changePercent: 2.15 },
        ];
        
        return (
            <div className="w-full bg-[var(--bg-primary)]/80 backdrop-blur-md border-y border-[var(--color-border)] h-10 flex items-center overflow-hidden font-mono text-xs md:text-sm shadow-[0_0_20px_rgba(0,0,0,0.5)] opacity-80 mix-blend-luminosity">
                <div className="bg-gray-600 text-white h-full px-4 flex items-center font-bold tracking-wider relative z-10 shrink-0 uppercase text-[10px] md:text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" /> OFFLINE
                </div>

                <Marquee speed={40} gradient={false} className="flex-1">
                    <div className="flex bg-[var(--bg-primary)]">
                        {fallbackData.map((item, idx) => {
                            const isPos = item.changePercent >= 0;
                            const color = isPos ? 'text-gray-400' : 'text-gray-500';
                            const Icon = isPos ? TrendingUp : TrendingDown;

                            return (
                                <div key={`${item.symbol}-fb-${idx}`} className="flex items-center gap-4 mx-10 text-[var(--color-text-secondary)] group cursor-default grayscale">
                                    <span className="font-bold opacity-60">{item.symbol}</span>

                                    <span className="bg-[var(--bg-surface)] px-2 py-0.5 rounded opacity-60">
                                        {item.symbol.includes('BTC') ? '$' : ''}
                                        {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: item.symbol.includes('BTC') || item.symbol.includes('ETH') ? undefined : 'currency', currency: 'USD' })}
                                    </span>

                                    <div className={`flex items-center gap-1 font-bold ${color} opacity-60`}>
                                        {isPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                                        <Icon className="w-3 h-3" />
                                    </div>
                                    <div className="w-px h-6 bg-[var(--color-border)] ml-6 opacity-30" />
                                </div>
                            );
                        })}
                    </div>
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
