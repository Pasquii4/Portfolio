"use client";
import React, { useEffect, useRef } from 'react';
import { generateCandle } from '../utils/candleGenerator';
import { Candle } from '../types/backgrounds';

export const CandlestickScroll: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let candles: Candle[] = [];

        const initCandles = () => {
            candles = [];
            const numCandles = Math.ceil(canvas.width / 36) + 5;
            let lastClose = 42000;
            for (let i = 0; i < numCandles; i++) {
                const c = generateCandle(lastClose);
                c.x = i * 36;
                candles.push(c);
                lastClose = c.close;
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initCandles();
        };

        window.addEventListener('resize', resize);
        resize();

        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(255, 140, 0, 0.06)';
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x < canvas.width; x += 80) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines and labels
            ctx.font = "10px 'Courier New', monospace";
            ctx.fillStyle = 'rgba(255, 140, 0, 0.25)';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            let price = 42000;
            for (let y = canvas.height; y >= 0; y -= 60) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();

                ctx.fillText(price.toString(), 10, y - 10);
                price += 50;
            }
        };

        const render = () => {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawGrid();

            // Update positions
            candles.forEach(c => c.x -= 1.2);

            // Remove off-screen
            if (candles.length > 0 && candles[0].x + 28 < 0) {
                candles.shift();
            }

            // Append new
            if (candles.length > 0) {
                const lastCandle = candles[candles.length - 1];
                if (lastCandle.x < canvas.width - 36) {
                    const newCandle = generateCandle(lastCandle.close);
                    newCandle.x = lastCandle.x + 36;
                    candles.push(newCandle);
                }
            }

            // Calculate min/max for scaling
            if (candles.length > 0) {
                const minPrice = Math.min(...candles.map(c => c.low));
                const maxPrice = Math.max(...candles.map(c => c.high));
                const priceRange = Math.max(maxPrice - minPrice, 1);

                const marginMin = canvas.height * 0.15; // Bottom margin (for volume & padding)
                const marginMax = canvas.height * 0.10; // Top margin
                const drawHeight = canvas.height - marginMin - marginMax;

                const getY = (price: number) => {
                    const normalized = (price - minPrice) / priceRange;
                    return canvas.height - marginMin - (normalized * drawHeight);
                };

                // Draw volume and candles
                candles.forEach(c => {
                    const isBullish = c.close >= c.open;

                    // Volume
                    const volHeight = c.volume * (canvas.height * 0.15);
                    ctx.fillStyle = isBullish ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 80, 0, 0.2)';
                    ctx.fillRect(c.x, canvas.height - volHeight, 28, volHeight);

                    // Wick
                    const highY = getY(c.high);
                    const lowY = getY(c.low);
                    ctx.strokeStyle = 'rgba(255, 140, 0, 0.5)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(c.x + 14, highY); // center of 28px
                    ctx.lineTo(c.x + 14, lowY);
                    ctx.stroke();

                    // Body
                    const openY = getY(c.open);
                    const closeY = getY(c.close);
                    const topY = Math.min(openY, closeY);
                    const bodyHeight = Math.max(Math.abs(openY - closeY), 1);

                    ctx.fillStyle = isBullish ? 'rgba(255, 140, 0, 0.55)' : 'rgba(255, 80, 0, 0.35)';
                    ctx.strokeStyle = isBullish ? 'rgba(255, 165, 0, 0.8)' : 'rgba(200, 60, 0, 0.7)';

                    ctx.fillRect(c.x, topY, 28, bodyHeight);
                    ctx.strokeRect(c.x, topY, 28, bodyHeight);
                });
            }

            // Vignette
            const gradient = ctx.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0, 'rgba(10, 10, 10, 0.9)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 200, canvas.height);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-screen h-screen bg-[#0a0a0a] opacity-85 -z-10">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
        </div>
    );
};
