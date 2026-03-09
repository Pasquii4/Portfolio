"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScanReveal from "./ui/ScanReveal";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function AboutSection() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    const avatarSrc = mounted && currentTheme === 'bloomberg' ? '/avatar2.png' : '/avatar.png';

    return (
        <section id="about" className="py-[100px]">
            <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="font-mono text-[var(--color-accent)] text-2xl mb-12 inline-block border-b-2 border-[var(--color-accent)] pb-2"
                >
                    ~/sobre-mi
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    <div className="flex flex-col gap-6 text-[1.1rem] text-[var(--color-text-secondary)]">
                        <div>
                            <span className="font-mono text-[var(--color-accent)] text-lg mb-4 block font-bold border-b border-[var(--color-border)] pb-2">// Background & Skills</span>
                            <p className="mb-6">
                                Desarrollador de software enfocado en <strong className="text-[var(--color-text)]">sistemas FinTech, trading algorítmico y backends escalables</strong>. 
                                Trabajo principalmente con <strong className="text-[var(--color-text)]">Python, FastAPI, SQL y TypeScript</strong>, 
                                diseñando microservicios de baja latencia e integraciones de datos en tiempo real.
                            </p>

                            <div className="relative border-l border-[var(--color-border)] ml-3 pl-6 mt-8 flex flex-col gap-8">
                                <div className="relative">
                                    <div className="absolute w-3 h-3 bg-[var(--color-accent)] rounded-full -left-[31px] top-1.5 shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.8)]"></div>
                                    <h4 className="text-[var(--color-text)] font-bold text-lg leading-tight">CFGS Desarrollo de Aplicaciones Web</h4>
                                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-1 mb-2">Centre d'Estudis Politècnics · Presente</p>
                                    <p className="text-[0.95rem]">Ampliando y estructurando mi base de ingeniería de software con arquitectura empresarial.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute w-3 h-3 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-full -left-[31px] top-1.5 transition-colors group-hover:border-[var(--color-accent)]"></div>
                                    <h4 className="text-[var(--color-text)] font-bold text-lg leading-tight">Desarrollo Freelance & Proyectos FinTech</h4>
                                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-1 mb-2">2023 — Presente</p>
                                    <p className="text-[0.95rem]">Desarrollo de <span className="text-[var(--color-accent)]">Trading Scanner</span> (FastAPI+WS), dashboards de analítica de apuestas y landing pages de alto rendimiento en Astro (<span className="text-[var(--color-accent)]">RL Boosting ES</span>).</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute w-3 h-3 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-full -left-[31px] top-1.5 transition-colors group-hover:border-[var(--color-accent)]"></div>
                                    <h4 className="text-[var(--color-text)] font-bold text-lg leading-tight">CFGM Sistemas Microinformáticos</h4>
                                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-1 mb-2">Completado</p>
                                    <p className="text-[0.95rem]">Fundamentos de sistemas, redes y hardware.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-[var(--color-border)]">
                            <p className="mb-4">Actualmente <strong className="text-[var(--color-text)]">disponible para Prácticas o Parcial Remoto</strong> en el sector FinTech/trading. Si buscas un perfil técnico con visión de producto, escríbeme directamente.</p>

                            <div className="flex flex-wrap gap-2">
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"></span> Disponible ahora
                                </span>
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                                    📍 Barcelona, ES
                                </span>
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                                    Presencial / Remoto
                                </span>
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                                    Prácticas · Freelance
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="font-mono text-[0.8rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-1 rounded">🇪🇸 Español</span>
                            <span className="font-mono text-[0.8rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-1 rounded">🏴 Català</span>
                            <span className="font-mono text-[0.8rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-1 rounded" title="Intermedio-Alto">🇬🇧 English (B2)</span>
                        </div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-[rgba(var(--color-accent-rgb),0.2)] group cursor-default">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-accent-rgb),0.1)] to-transparent pointer-events-none z-10" />
                        <Image
                            src={avatarSrc}
                            alt="Pau Pascual"
                            width={600}
                            height={600}
                            className="w-full aspect-square object-cover grayscale-0 contrast-[1.1] transition-all duration-300 group-hover:contrast-100 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
