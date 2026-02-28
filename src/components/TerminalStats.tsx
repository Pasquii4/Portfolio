"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./ui/AnimatedCounter";

export default function TerminalStats() {
    const [repoCount, setRepoCount] = useState<number | null>(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Pasquii4');
                if (response.ok) {
                    const data = await response.json();
                    setRepoCount(data.public_repos);
                    setIsLive(true);
                } else {
                    setRepoCount(22);
                }
            } catch (error) {
                console.error("Error fetching GitHub repos:", error);
                setRepoCount(22);
            }
        };

        fetchRepos();
    }, []);

    const stats = [
        {
            label: "Proyectos en GitHub",
            value: repoCount !== null ? repoCount : 0,
            suffix: "",
            subtext: "Repositorios públicos",
            prefix: "> ",
            live: isLive
        },
        {
            custom: true,
            label: "Disponibilidad",
            render: () => (
                <div className="stat-card flex items-start gap-4">
                    <div className="stat-icon mt-1.5" aria-hidden="true">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]" />
                        </span>
                    </div>
                    <div className="stat-info">
                        <h3 className="font-mono text-[0.7rem] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Estado</h3>
                        <p className="stat-value font-heading text-3xl mb-1 text-[#00ff88]">
                            Disponible
                        </p>
                        <p className="text-xs opacity-70 font-mono text-[var(--color-text-secondary)]">
                            Parcial Remoto · Prácticas
                        </p>
                    </div>
                </div>
            )
        },
        {
            label: "Grado de Ingeniería",
            value: "En Curso",
            suffix: "",
            subtext: "CFGS Desarrollo de Aplicaciones Web",
            prefix: "● "
        },
        {
            label: "Base de Operaciones",
            value: "BCN", // Strings can't be animated with AnimatedCounter easily, we'll render it directly
            suffix: "",
            subtext: "Barcelona, España",
            prefix: "📍 "
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-[var(--bg-surface)] p-5 rounded-lg border border-[var(--color-border)] relative overflow-hidden group hover:border-[rgba(var(--color-accent-rgb),0.2)] transition-colors"
                >
                    {stat.custom ? stat.render() : (
                        <>
                            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--bg-surface)] group-hover:bg-[var(--color-accent)] transition-colors"></div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-[0.7rem] text-[var(--color-text-secondary)] uppercase tracking-wider">{stat.label}</span>
                                {stat.live && (
                                    <span className="font-mono text-[0.6rem] bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] px-2 py-0.5 rounded flex items-center gap-1 animate-pulse-glow">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
                                        EN VIVO
                                    </span>
                                )}
                            </div>

                            <div className="font-heading text-3xl text-[var(--color-text)] mb-1">
                                <span className="text-[var(--color-accent)] opacity-70 text-2xl mr-1">{stat.prefix}</span>
                                {typeof stat.value === "number" ? (
                                    <AnimatedCounter to={stat.value} duration={1.5} />
                                ) : (
                                    stat.value
                                )}
                                <span className="text-[var(--color-accent)]">{stat.suffix}</span>
                            </div>

                            <p className="font-mono text-[0.75rem] text-[var(--color-text-secondary)] opacity-80">{stat.subtext}</p>
                        </>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
