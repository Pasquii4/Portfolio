"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function WhatImLookingForSection() {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        setMounted(true);
    }, []);

    const list = [
        t('whatImLookingFor.list1'),
        t('whatImLookingFor.list2'),
        t('whatImLookingFor.list3')
    ];

    if (!mounted) return null;

    return (
        <section id="what-im-looking-for" className="py-16 md:py-20 bg-[var(--bg-surface)] border-y border-[var(--color-border)] my-8">
            <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
                <motion.h2
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
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
                    {t('whatImLookingFor.title')}
                </motion.h2>

                <motion.div
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: reduceMotion ? 0 : 0.8 }}
                    className="flex flex-col gap-6 text-[1.1rem] text-[var(--color-text-secondary)]"
                >
                    <p className="text-[1.05rem] md:text-[1.1rem] max-w-4xl text-[var(--color-text)]">
                        {t('whatImLookingFor.desc')}
                    </p>

                    <ul className="flex flex-col gap-6 mt-4 list-none pl-0 max-w-4xl">
                        {list.map((item, index) => (
                            <li key={index} className="flex gap-4 items-start relative bg-[var(--bg-primary)] p-4 rounded-lg border border-[var(--color-border)] shadow-sm">
                                <span className="text-[var(--color-accent)] font-mono font-bold mt-0.5 bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-0.5 rounded text-sm shrink-0">
                                    0{index + 1}
                                </span>
                                <span className="text-[0.95rem] md:text-[1.05rem] text-[var(--color-text-secondary)]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
