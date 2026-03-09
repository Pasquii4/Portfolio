"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import ScanReveal from "./ui/ScanReveal";
import HolographicHUD from "@/components/ui/HolographicHUD";
import { SiPython, SiPytorch, SiReact, SiNextdotjs, SiTailwindcss, SiVite, SiDocker, SiNodedotjs, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiRust, SiGo, SiAmazonwebservices, SiGooglecloud } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

const skills = [
    { name: "Python", pct: "85%", delay: 0 },
    { name: "HTML/CSS", pct: "90%", delay: 0.2 },
    { name: "SQL", pct: "80%", delay: 0.4 },
    { name: "Docker", pct: "75%", delay: 0 },
    { name: "FastAPI", pct: "72%", delay: 0.2 },
    { name: "JS / TS", pct: "70%", delay: 0.4 },
    { name: "Java", pct: "65%", delay: 0 },
    { name: "Astro / Next.js", pct: "60%", delay: 0.2 },
];

const Row1Stack = [
    { name: "Python", icon: SiPython },
    { name: "FastAPI", icon: SiFastapi },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Redis", icon: SiRedis },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: SiAmazonwebservices },
    { name: "Go", icon: SiGo },
    { name: "PyTorch", icon: SiPytorch }
];

const Row2Stack = [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Vite", icon: SiVite },
    { name: "GCP", icon: SiGooglecloud },
    { name: "Rust", icon: SiRust }
];

export default function TechStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { t } = useLanguage();

    return (
        <section id="stack" ref={sectionRef} className="py-[100px] overflow-hidden">
            <ScanReveal className="w-[90%] max-w-[1200px] mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="font-mono text-[var(--color-accent)] text-2xl mb-12 inline-block border-b-2 border-[var(--color-accent)] pb-2"
                >
                    {t('stack.title')}
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full flex items-center justify-center relative lg:order-2"
                    >
                        <HolographicHUD />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:order-1">
                        {skills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: skill.delay }}
                                className="bg-[var(--bg-surface)] p-5 rounded-lg border border-[var(--color-border)] transition-all duration-300 hover:border-[rgba(var(--color-accent-rgb),0.3)] hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.08)] hover:-translate-y-[2px]"
                            >
                                <div className="flex justify-between mb-3 font-mono">
                                    <span className="text-[var(--color-accent)] font-bold text-sm">{skill.name}</span>
                                    <span className="text-[var(--color-text-secondary)] text-sm">{skill.pct}</span>
                                </div>
                                <div className="w-full h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={isInView ? { width: skill.pct } : { width: "0%" }}
                                        transition={{ duration: 1.5, delay: skill.delay + 0.3, type: "tween", ease: [0.4, 0, 0.2, 1] }}
                                        className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScanReveal>

            {/* Accessible list for screen readers (to avoid Marquee SEO duplication issues) */}
            <div className="sr-only">
                <h3>Backend Stack</h3>
                <ul>{Row1Stack.map(t => <li key={t.name}>{t.name}</li>)}</ul>
                <h3>Frontend Stack</h3>
                <ul>{Row2Stack.map(t => <li key={t.name}>{t.name}</li>)}</ul>
            </div>

            <div className="w-full flex flex-col gap-6 opacity-60 mt-[80px]" aria-hidden="true">
                <Marquee
                    gradient={true}
                    gradientColor="var(--bg-primary)"
                    gradientWidth="15%"
                    speed={40}
                    className="overflow-hidden"
                >
                    {Row1Stack.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-3 mx-10 text-[var(--color-text-secondary)] grayscale-[50%] hover:grayscale-0 hover:text-[var(--color-accent)] transition-all duration-300">
                            <tech.icon className="w-8 h-8" />
                            <span className="font-heading text-xl">{tech.name}</span>
                        </div>
                    ))}
                </Marquee>

                <Marquee
                    gradient={true}
                    gradientColor="var(--bg-primary)"
                    gradientWidth="15%"
                    speed={35}
                    direction="right"
                    className="overflow-hidden"
                >
                    {Row2Stack.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-3 mx-10 text-[var(--color-text-secondary)] grayscale-[50%] hover:grayscale-0 hover:text-[var(--color-accent)] transition-all duration-300">
                            <tech.icon className="w-8 h-8" />
                            <span className="font-heading text-xl">{tech.name}</span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
