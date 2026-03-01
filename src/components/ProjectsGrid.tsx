"use client";

import { motion, Variants } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { projects, ProjectBadge, ProjectLink } from "@/data/projects";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function ProjectsGrid() {
    return (
        <section id="projects" className="py-[100px]">
            <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="font-mono text-[var(--color-accent)] text-2xl mb-12 inline-block border-b-2 border-[var(--color-accent)] pb-2"
                >
                    ~/proyectos
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((proj) => (
                        <motion.div
                            key={proj.title}
                            variants={itemVariants}
                            className="project-card relative group bg-[var(--bg-surface)] rounded-xl p-8 flex flex-col h-full overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:scale-[1.02] hover:bg-[rgba(var(--color-accent-rgb),0.03)] z-[1]"
                        >
                            {/* Animated gradient border pseudo-element effect implemented inside div since we can't reliably do before borders in tailwind without arbitrary complex gradients over masking */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-hover:animate-gradient-x transition-opacity duration-300 pointer-events-none" style={{ padding: "1px", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", borderRadius: "0.75rem" }} />

                            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                                <div className="flex flex-col xl:flex-row justify-between xl:items-start mb-6 gap-3">
                                    <div>
                                        <h3 className="text-2xl text-[var(--color-text)] font-heading group-hover:text-[var(--color-accent)] transition-colors">{proj.title}</h3>
                                        {(proj.title === "Trading Scanner" || proj.title === "Bet Tracker") && (
                                            <p className="font-mono text-[var(--color-text-secondary)] text-[0.75rem] opacity-80 mt-1">
                                                Demo disponible bajo solicitud
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {proj.status && (
                                            <span className={`font-mono text-[0.65rem] px-3 py-1 rounded-full uppercase font-bold shrink-0 ${proj.status.type === 'in-dev' ? 'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)] animate-pulse-gold' :
                                                proj.status.type === 'public' ? 'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)]' :
                                                    'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)]'
                                                }`}>
                                                {proj.status.label}
                                            </span>
                                        )}
                                        {proj.badges && proj.badges.map((b: ProjectBadge) => (
                                            <span key={b.label} className={`font-mono text-[0.65rem] px-3 py-1 rounded-full uppercase font-bold shrink-0 ${b.type === 'live' ? 'bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)] animate-pulse-glow' :
                                                'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)]'
                                                }`}>
                                                {b.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[var(--color-text-secondary)] text-[0.95rem] mb-8 grow leading-[1.6]">
                                    {proj.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8 pointer-events-auto">
                                    {proj.tags.map((tag: string) => (
                                        <span key={tag} className="font-mono text-[0.75rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-[0.6rem] py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-5 mt-auto pointer-events-auto pt-4 border-t border-[var(--color-border)]">
                                    {proj.links.map((link: ProjectLink) => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target={link.url.startsWith('mailto') ? undefined : "_blank"}
                                            rel={link.url.startsWith('mailto') ? undefined : "noopener noreferrer"}
                                            style={link.style}
                                            className="inline-flex items-center gap-2 text-[var(--color-text)] no-underline font-mono text-[0.85rem] transition-colors duration-300 hover:text-[var(--color-accent)]"
                                        >
                                            {link.icon === 'github' && (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                </svg>
                                            )}
                                            {link.label}
                                        </a>
                                    ))}
                                    {(proj.title === "Casino Python" || proj.title === "Fútbol Manager") && (
                                        <span className="text-[var(--color-text-secondary)] text-[0.8rem] opacity-70 mt-1 w-full xl:w-auto xl:mt-0 font-mono xl:ml-auto">
                                            {proj.title === "Casino Python" ? "Proyecto académico · Sin deploy" : "Solo backend · Sin interfaz web"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="col-span-full flex justify-center pt-16"
                >
                    <a href="https://github.com/Pasquii4?tab=repositories&type=public" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-mono text-[0.95rem] font-bold text-[var(--color-text)] bg-[var(--bg-surface)] border border-[var(--color-border)] transition-all duration-300 hover:bg-[var(--bg-hover)] hover:text-[var(--color-accent)] hover:border-[rgba(var(--color-accent-rgb),0.4)] no-underline hover:-translate-y-1 hover:shadow-lg">
                        Ver todas las repos públicas en GitHub →
                    </a>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
