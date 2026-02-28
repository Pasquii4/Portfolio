"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w: number;
        let h: number;
        let imgData: ImageData;
        let id: number;

        const noise = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            imgData = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(imgData.data.buffer);
            const len = buffer32.length;
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) buffer32[i] = 0xff000000;
                else buffer32[i] = 0x00000000;
            }
            ctx.putImageData(imgData, 0, 0);
        };

        let tick = 0;
        const loop = () => {
            tick++;
            if (tick % 3 === 0) {
                noise();
            }
            id = requestAnimationFrame(loop);
        };

        noise();
        loop();

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9999] pointer-events-none mix-blend-overlay opacity-[0.035]"
        />
    );
}
