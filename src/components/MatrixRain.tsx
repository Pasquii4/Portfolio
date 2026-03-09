"use client";
import React, { useEffect, useRef } from 'react';

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const BINARY = '01';
const FINANCIAL = '$€£₿¥%+-~';

function getRandomChar() {
    const r = Math.random();
    if (r < 0.55) return KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
    if (r < 0.85) return BINARY[Math.floor(Math.random() * BINARY.length)];
    return FINANCIAL[Math.floor(Math.random() * FINANCIAL.length)];
}

interface Column {
    x: number;
    y: number;
    speed: number;
    charRefreshRate: number;
    currentChar: string;
    frameCount: number;
}

export const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initColumns();
        };

        let columns: Column[] = [];

        const initColumns = () => {
            columns = [];
            const colWidth = 18;
            const totalColumns = Math.floor(canvas.width / colWidth);

            for (let i = 0; i < totalColumns; i++) {
                columns.push({
                    x: i * colWidth,
                    y: Math.random() * -canvas.height, // Initial staggered position
                    speed: 0.4 + Math.random() * 0.7, // 0.4 to 1.1 px/frame
                    charRefreshRate: Math.floor(Math.random() * 5) + 4, // 4 to 8 frames
                    currentChar: getRandomChar(),
                    frameCount: 0,
                });
            }
        };

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        window.addEventListener('resize', resize);
        resize();

        // Initial fill
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const render = () => {
            if (mediaQuery.matches) {
                // Return static stylized code if prefers reduced motion
                ctx.fillStyle = 'rgba(0, 50, 20, 0.4)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = "16px 'Courier New', monospace";
                ctx.fillStyle = 'rgba(180, 255, 180, 0.45)';
                for (let i=0; i<300; i++) {
                    ctx.fillText(getRandomChar(), Math.random() * canvas.width, Math.random() * canvas.height);
                }
                return;
            }

            // Trail decay effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "16px 'Courier New', monospace";

            columns.forEach(col => {
                col.frameCount++;
                if (col.frameCount % col.charRefreshRate === 0) {
                    col.currentChar = getRandomChar();
                }

                // Overwrite the previous frame with trail color to establish the trail
                ctx.fillStyle = 'rgba(0, 200, 70, 0.45)';
                ctx.fillText(col.currentChar, col.x, col.y - col.speed);

                // Draw the head character
                ctx.fillStyle = 'rgba(180, 255, 180, 0.85)';
                ctx.fillText(col.currentChar, col.x, col.y);

                col.y += col.speed;

                if (col.y > canvas.height + Math.random() * 500) {
                    col.y = 0;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-screen h-screen bg-black opacity-45 -z-10">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
        </div>
    );
};
