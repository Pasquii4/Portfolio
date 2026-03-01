"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MatrixRain } from './MatrixRain';
import { CandlestickScroll } from './CandlestickScroll';

export const AppBackground: React.FC = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 w-full h-full z-0 bg-black" />; // SSR fallback
    }

    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full ease-in-out"
                style={{
                    opacity: theme === 'dark' ? 1 : 0,
                    transitionDuration: '400ms',
                    transitionProperty: 'opacity'
                }}
            >
                <MatrixRain />
            </div>
            <div
                className="absolute inset-0 w-full h-full ease-in-out"
                style={{
                    opacity: theme === 'bloomberg' ? 1 : 0,
                    transitionDuration: '400ms',
                    transitionProperty: 'opacity'
                }}
            >
                <CandlestickScroll />
            </div>
        </div>
    );
};
