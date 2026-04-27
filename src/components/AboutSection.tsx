"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScanReveal from "./ui/ScanReveal";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutSection() {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, []);

    const avatarSrc = '/avatar.png';

    return (
        <section id="about" className="py-16 md:py-20">
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
                    {t('about.title')}
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
                            <span className="font-mono text-[var(--color-accent)] text-lg mb-4 block font-bold border-b border-[var(--color-border)] pb-2">{t('about.bgTitle')}</span>
                            <p className="mb-6 text-[0.95rem] md:text-[1.1rem]">
                                {t('about.bgDesc')}
                            </p>

                            <div className="relative border-l border-[var(--color-border)] ml-3 pl-6 mt-8 flex flex-col gap-8">
                                <div className="relative">
                                    <div className="absolute w-3 h-3 bg-[var(--color-accent)] rounded-full -left-[31px] top-1.5 shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.8)]"></div>
                                    <h4 className="text-[var(--color-text)] font-bold text-lg leading-tight">{t('about.cfgs')}</h4>
                                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-1 mb-2">{t('about.cfgsDate')}</p>
                                    <p className="text-[0.95rem]">{t('about.cfgsDesc')}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute w-3 h-3 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-full -left-[31px] top-1.5 transition-colors group-hover:border-[var(--color-accent)]"></div>
                                    <h4 className="text-[var(--color-text)] font-bold text-lg leading-tight">{t('about.freelance')}</h4>
                                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-1 mb-2">{t('about.freelanceDate')}</p>
                                    <p className="text-[0.95rem]">{t('about.freelanceDesc')}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute w-3 h-3 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-full -left-[31px] top-1.5 transition-colors group-hover:border-[var(--color-accent)]"></div>
                                    <h4 className="text-[var(--color-text)] font-bold text-lg leading-tight">{t('about.cfgm')}</h4>
                                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-1 mb-2">{t('about.cfgmDate')}</p>
                                    <p className="text-[0.95rem]">{t('about.cfgmDesc')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-[var(--color-border)]">
                            <p className="mb-4 text-[0.95rem] md:text-[1.1rem]">{t('about.availability')}</p>

                            <div className="flex flex-wrap gap-2">
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"></span> {t('about.tagAvailable')}
                                </span>
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                                    📍 Barcelona, ES
                                </span>
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                                    {t('about.tagRemote')}
                                </span>
                                <span className="font-mono text-[0.7rem] px-3 py-1.5 rounded-full uppercase font-bold shrink-0 bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                                    {t('about.tagInternship')}
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
