"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);

        const onMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setRingPos({ x: e.clientX, y: e.clientY });
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button") || target.closest("[data-cursor-hover]")) {
                setIsHovering(true);
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button") || target.closest("[data-cursor-hover]")) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("resize", checkDesktop);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, []);

    if (!isDesktop) return null;

    return (
        <>
            <div
                style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    left: mousePos.x,
                    top: mousePos.y,
                    zIndex: 9999,
                    pointerEvents: "none",
                    transition: "background-color 150ms ease",
                    backgroundColor: isHovering ? "#ffffff" : "#00ff88",
                }}
            />
            <div
                style={{
                    width: isHovering ? "38px" : "22px",
                    height: isHovering ? "38px" : "22px",
                    borderRadius: "50%",
                    border: `1px solid ${isHovering ? "rgba(255,255,255,0.6)" : "rgba(0,255,136,0.5)"}`,
                    backgroundColor: isHovering ? "rgba(0,255,136,0.06)" : "transparent",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    left: ringPos.x,
                    top: ringPos.y,
                    zIndex: 9998,
                    pointerEvents: "none",
                    transition: "width 200ms ease, height 200ms ease, border-color 200ms ease, background-color 200ms ease, left 80ms linear, top 80ms linear",
                }}
            />
        </>
    );
}
