"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });
    const hovering = useRef(false);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth <= 768) return;

        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const onMouseOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest("a") || t.closest("button") || t.closest("[data-cursor-hover]")) {
                hovering.current = true;
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest("a") || t.closest("button") || t.closest("[data-cursor-hover]")) {
                hovering.current = false;
            }
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

            if (ringRef.current) {
                const size = hovering.current ? 44 : 24;
                ringRef.current.style.left = `${ring.current.x}px`;
                ringRef.current.style.top = `${ring.current.y}px`;
                ringRef.current.style.width = `${size}px`;
                ringRef.current.style.height = `${size}px`;
                ringRef.current.style.borderColor = hovering.current
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,255,136,0.6)";
                ringRef.current.style.backgroundColor = hovering.current
                    ? "rgba(0,255,136,0.08)"
                    : "transparent";
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    if (typeof window !== "undefined" && window.innerWidth <= 768) return null;

    return (
        <>
            <div
                ref={dotRef}
                style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    left: -100,
                    top: -100,
                    zIndex: 9999,
                    pointerEvents: "none",
                    backgroundColor: "#00ff88",
                }}
            />
            <div
                ref={ringRef}
                style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(0,255,136,0.6)",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    left: -100,
                    top: -100,
                    zIndex: 9998,
                    pointerEvents: "none",
                    transition: "width 200ms ease, height 200ms ease, background-color 200ms ease, border-color 200ms ease",
                }}
            />
        </>
    );
}
