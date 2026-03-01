"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveTerminal from "./InteractiveTerminal";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function HeroDashboard() {

    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    const fullTitle = "Pau Pascual";
    const titles = [
        "FinTech & Full-Stack Developer",
        "Backend Developer",
        "Frontend Developer",
        "FinTech Integrator"
    ];

    const { displayedTexts, activeIndex, isFinished } = useTypewriter([fullTitle]);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (isFinished) {
            const timer = setTimeout(() => setShowCursor(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isFinished]);

    useEffect(() => {
        if (!isFinished) return;

        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isFinished, titles.length]);

    return (
        <section id="dashboard" className="py-[100px] min-h-[calc(100vh-70px)] pt-[40px] flex items-center relative z-[1]">
            <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <div className="bg-[var(--bg-surface)] px-4 py-3 rounded-t-lg flex items-center gap-2 border border-[var(--color-border)] border-b-0">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }}></span>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }}></span>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }}></span>
                        <span className="ml-[max(0.5rem,auto)] font-mono text-[0.8rem] text-[var(--color-text-secondary)]">
                            bash - pascualpau04@localhost
                        </span>
                    </div>
                    <div className="bg-[var(--bg-surface)] p-6 md:p-10 rounded-b-lg border border-[var(--color-border)]">
                        <p className="font-mono text-[var(--color-accent)] mb-4 before:content-['>_'] before:text-[var(--color-accent)] flex items-center">
                            whoami
                        </p>
                        <h1 className="font-heading text-4xl md:text-[4rem] leading-[1.1] mb-2 text-[var(--color-text)]">
                            {displayedTexts[0]}
                            {activeIndex === 0 && showCursor && (
                                <span className="inline-block text-[var(--color-accent)] cursor-blink ml-[2px] font-normal">_</span>
                            )}
                        </h1>
                        <div className="h-[36px] mb-6 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={currentTitleIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-heading text-xl md:text-[1.5rem] text-[var(--color-accent)] absolute left-0 top-0"
                                >
                                    {titles[currentTitleIndex]}
                                </motion.h2>
                            </AnimatePresence>
                        </div>
                        <p className="text-[var(--color-text-secondary)] text-[1.1rem] mb-8 max-w-[500px]">
                            Construyo sistemas FinTech escalables — Python, FastAPI y algoritmos de
                            trading en tiempo real. Basado en Barcelona, disponible para prácticas o proyectos
                            freelance.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 rounded font-mono text-[0.9rem] font-bold text-[var(--color-accent)] border border-[var(--color-accent)] transition-all duration-300 hover:shadow-[inset_0_4rem_0_0_var(--color-accent)] hover:text-[var(--bg-primary)] no-underline">
                                Ver Proyectos
                            </a>
                            <a href="/CV_2.0.pdf" download="PauPascual_CV.pdf" className="inline-flex items-center justify-center px-6 py-3 rounded font-mono text-[0.9rem] font-bold text-[var(--color-text)] bg-[var(--bg-surface)] border border-[var(--bg-hover)] transition-all duration-300 hover:bg-[var(--bg-hover)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] no-underline">
                                Descargar CV
                            </a>
                        </div>
                    </div>
                </motion.div>

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <InteractiveTerminal />
                </div>

            </div>
        </section>
    );
}
