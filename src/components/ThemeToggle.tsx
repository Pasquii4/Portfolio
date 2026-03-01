"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Terminal, BarChart2 } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-[120px] h-10" />; // placeholder
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'bloomberg' : 'dark')}
            className="h-10 px-4 flex items-center justify-center rounded bg-[var(--bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 overflow-hidden relative group font-mono text-sm font-bold"
            aria-label="Toggle Theme"
            title="Toggle Theme"
        >
            <div className={`absolute flex items-center gap-2 transition-all duration-500 ease-spring ${theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 -translate-y-4'}`}>
                <Terminal className="w-4 h-4 text-[#00ff88]" />
                <span className="text-[#00ff88]">DARK</span>
            </div>
            <div className={`absolute flex items-center gap-2 transition-all duration-500 ease-spring ${theme === 'bloomberg' ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 translate-y-4'}`}>
                <BarChart2 className="w-4 h-4 text-[#ff8c00]" />
                <span className="text-[#ff8c00]">BLOOMBERG</span>
            </div>

            {/* Invisible structural layer to maintain width */}
            <div className="opacity-0 flex items-center gap-2 pointer-events-none">
                <BarChart2 className="w-4 h-4" />
                <span>BLOOMBERG</span>
            </div>
        </button>
    );
}
