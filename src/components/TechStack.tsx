"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

export default function TechStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const prefersReducedMotion = useReducedMotion();
    const { t } = useTranslation();

    const techGroups = useMemo(() => ([
        {
            id: 'backend',
            labelKey: 'stack.groupBackend',
            techs: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'WebSockets', 'REST APIs'],
        },
        {
            id: 'ai',
            labelKey: 'stack.groupAI',
            techs: ['llama.cpp', 'Ollama', 'OpenRouter', 'Groq', 'Python Agents', 'uv / Rust'],
        },
        {
            id: 'frontend',
            labelKey: 'stack.groupFrontend',
            techs: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Pages'],
        },
        {
            id: 'exploring',
            labelKey: 'stack.groupExploring',
            exploringNote: 'stack.exploringNote',
            techs: ['Go', 'PyTorch', 'GCP', 'MongoDB'],
        },
    ]), []);

    return (
        <section id="stack" ref={sectionRef} className="py-16 md:py-20 overflow-hidden">
            <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    style={{
                        fontSize: "var(--text-2xl)",
                        fontWeight: 600,
                        color: "var(--color-text)",
                        fontFamily: "var(--font-sans)",
                        letterSpacing: "-0.02em",
                        borderBottom: "2px solid var(--color-accent)",
                        display: "inline-block",
                        paddingBottom: "var(--space-1)",
                        marginBottom: "3rem",
                    }}
                >
                    {t('stack.title')}
                </motion.h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {techGroups.map((group, index) => {
                        const isExploring = group.id === "exploring";
                        const labelColor = isExploring ? "var(--color-text-muted)" : "var(--color-text-muted)";
                        const pillBaseColor = isExploring ? "var(--color-text-muted)" : "var(--color-text)";

                        return (
                            <motion.div
                                key={group.id}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                                animate={
                                    !prefersReducedMotion && inView
                                        ? { opacity: 1, y: 0 }
                                        : {}
                                }
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 0.4,
                                    delay: prefersReducedMotion ? 0 : index * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid oklch(from var(--color-text) l c h / 0.10)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "var(--space-6)",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "var(--text-xs)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        color: labelColor,
                                        marginBottom: "var(--space-3)",
                                        fontWeight: 500,
                                    }}
                                >
                                    {t(group.labelKey)}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {group.techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex"
                                            style={{
                                                display: "inline-flex",
                                                border: "1px solid oklch(from var(--color-text) l c h / 0.12)",
                                                borderRadius: "var(--radius-full)",
                                                padding: "var(--space-1) var(--space-3)",
                                                fontSize: "var(--text-sm)",
                                                color: pillBaseColor,
                                                background: "transparent",
                                                transition: "border-color 180ms, color 180ms",
                                                cursor: "default",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (isExploring) return;
                                                e.currentTarget.style.borderColor = "var(--color-accent)";
                                                e.currentTarget.style.color = "var(--color-accent)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor =
                                                    "oklch(from var(--color-text) l c h / 0.12)";
                                                e.currentTarget.style.color = pillBaseColor;
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {isExploring && (
                                    <p
                                        style={{
                                            fontSize: "var(--text-xs)",
                                            fontStyle: "italic",
                                            color: "var(--color-text-muted)",
                                            marginTop: "var(--space-3)",
                                        }}
                                    >
                                        {t("stack.exploringNote")}
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </ScanReveal>
        </section>
    );
}
