"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { projects, ProjectBadge, ProjectLink } from "@/data/projects";
import { useTranslation } from "@/hooks/useTranslation";
import { ChevronDown } from "lucide-react";

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
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const [academicOpen, setAcademicOpen] = useState(false);

    const brokenThumbInitials: Record<string, string> = {
        "Bet Tracker": "BT",
        "RL Boosting ES": "RL",
        "Tu Espacio Ideal": "TEI",
    };

    const { mainProjects, academicProjects } = useMemo(() => {
        const featuredTitles = new Set(["Trading Scanner", "JARVISR"]);
        const academicTitles = new Set([
            "Casino Python",
            "Fútbol Manager",
            "VirtualPet",
            "Quiz-Pet",
            "Quiz Pet",
        ]);

        const isAcademic = (title: string) => {
            if (academicTitles.has(title)) return true;
            const lower = title.toLowerCase();
            return (
                lower.includes("casino") ||
                lower.includes("fútbol") ||
                lower.includes("futbol") ||
                lower.includes("virtualpet") ||
                lower.includes("quiz")
            );
        };

        const priority: Record<string, number> = {
            "Bet Tracker": 0,
            "RL Boosting ES": 1,
        };

        const academic = projects.filter((p) => isAcademic(p.title));
        const main = projects
            .filter((p) => !isAcademic(p.title))
            .filter((p) => !featuredTitles.has(p.title))
            .slice()
            .sort((a, b) => (priority[a.title] ?? 99) - (priority[b.title] ?? 99));

        return { mainProjects: main, academicProjects: academic };
    }, []);

    return (
        <section id="projects" className="py-16 md:py-20">
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
                    {t('projects.title')}
                </motion.h2>

                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-muted)' }}>
                    — {t('featuredProjects.otherLabel')}
                </p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                >
                    {mainProjects.map((proj) => (
                        <motion.div
                            key={proj.title}
                            variants={itemVariants}
                            className={`project-card relative group bg-[var(--bg-surface)] rounded-xl p-8 flex flex-col h-full overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:scale-[1.02] z-[1] ${
                                (proj.status?.type === 'private' || proj.status?.type === 'in-dev') 
                                ? 'hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                                : 'hover:bg-[rgba(var(--color-accent-rgb),0.03)] hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.1)]'
                            }`}
                        >
                            <div className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 group-hover:animate-gradient-x transition-opacity duration-300 pointer-events-none ${
                                (proj.status?.type === 'private' || proj.status?.type === 'in-dev')
                                ? 'bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600'
                                : 'bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent)]'
                            }`} style={{ padding: "1px", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", borderRadius: "0.75rem" }} />

                            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                                {brokenThumbInitials[proj.title] ? (
                                    <div
                                        className="w-full -mt-8 -mx-8 mb-6"
                                        style={{
                                            background: "linear-gradient(135deg, #1a1917 0%, #111010 100%)",
                                            borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                                            height: "160px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderBottom: "1px solid oklch(from var(--color-text) l c h / 0.08)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "3rem",
                                                fontWeight: 700,
                                                color: "oklch(from var(--color-text) l c h / 0.08)",
                                                fontFamily: "var(--font-mono)",
                                                letterSpacing: "-0.02em",
                                            }}
                                        >
                                            {brokenThumbInitials[proj.title]}
                                        </span>
                                    </div>
                                ) : proj.image ? (
                                    <div className="w-full h-40 -mt-8 -mx-8 mb-6 relative overflow-hidden rounded-t-[0.65rem] border-b border-[var(--color-border)] group-hover:border-[rgba(var(--color-accent-rgb),0.3)] transition-colors">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent z-10 opacity-60"></div>
                                        <div className="absolute inset-0 bg-[var(--color-accent)] mix-blend-overlay opacity-10 group-hover:opacity-20 transition-opacity z-10"></div>
                                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                                    </div>
                                ) : null}
                                <div className={`flex flex-col xl:flex-row justify-between xl:items-start mb-6 gap-3 ${!proj.image ? '' : 'px-0'}`}>
                                    <div>
                                        <h3 className="text-2xl text-[var(--color-text)] font-sans group-hover:text-[var(--color-accent)] transition-colors">{proj.title}</h3>
                                        {(proj.title === "Bet Tracker") && (
                                            <p className="font-mono text-[var(--color-text-secondary)] text-[0.75rem] opacity-80 mt-1">
                                                {t('projects.demo')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {proj.status && (
                                            <span className={`font-mono text-[0.65rem] px-3 py-1 rounded-full uppercase font-bold shrink-0 ${proj.status.type === 'in-dev' ? 'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]' :
                                                proj.status.type === 'public' ? 'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)]' :
                                                    'bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)]'
                                                }`}>
                                                {proj.status.type === 'in-dev' ? t('projects.statusInDev') : 
                                                 proj.status.type === 'private' ? t('projects.statusPrivate') : t('projects.statusPublic')}
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
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Collapsible academic section */}
                <div className="mt-4">
                    <button
                        onClick={() => setAcademicOpen(!academicOpen)}
                        className="inline-flex items-center gap-2 font-mono text-sm no-underline transition-colors duration-300"
                        style={{
                            color: "var(--color-text-muted)",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                        }}
                        aria-expanded={academicOpen}
                        aria-controls="academic-projects"
                    >
                        <span>{t("featuredProjects.academicToggle")}</span>
                        <motion.span
                            animate={{
                                rotate: academicOpen ? 180 : 0,
                            }}
                            transition={
                                reduceMotion
                                    ? { duration: 0 }
                                    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                            }
                            className="inline-flex"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.span>
                    </button>

                    <motion.div
                        id="academic-projects"
                        initial={false}
                        animate={{
                            height: academicOpen ? "auto" : 0,
                            opacity: academicOpen ? 1 : 0,
                            marginTop: academicOpen ? 24 : 0,
                        }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                        }
                        style={{ overflow: "hidden" }}
                    >
                        <motion.div
                            variants={containerVariants}
                            initial={reduceMotion ? false : "hidden"}
                            animate={reduceMotion ? undefined : (academicOpen ? "visible" : "hidden")}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90 grayscale-[30%]"
                        >
                            {academicProjects.map((proj) => (
                                <motion.div
                                    key={proj.title}
                                    variants={itemVariants}
                                    className="project-card relative group bg-[var(--bg-surface)] rounded-xl p-6 flex flex-col h-full overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:scale-[1.01] hover:grayscale-0 z-[1]"
                                >
                                    <div className="relative z-10 flex flex-col h-full pointer-events-none">
                                        <div className="flex flex-col xl:flex-row justify-between xl:items-start mb-4 gap-3">
                                            <div>
                                                <h3 className="text-xl text-[var(--color-text)] font-heading group-hover:text-[var(--color-accent)] transition-colors">{proj.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-[var(--color-text-secondary)] text-[0.9rem] mb-6 grow leading-[1.6]">
                                            {proj.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
                                            {proj.tags.map((tag: string) => (
                                                <span key={tag} className="font-mono text-[0.7rem] text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.05)] px-[0.5rem] py-1 rounded-md">
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
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="col-span-full flex justify-center pt-16"
                >
                    <a href="https://github.com/Pasquii4?tab=repositories&type=public" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-mono text-[0.95rem] font-bold text-[var(--color-text)] bg-[var(--bg-surface)] border border-[var(--color-border)] transition-all duration-300 hover:bg-[var(--bg-hover)] hover:text-[var(--color-accent)] hover:border-[rgba(var(--color-accent-rgb),0.4)] no-underline hover:-translate-y-1 hover:shadow-lg">
                        {t('projects.btnGithub')}
                    </a>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
