"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import ScanReveal from "./ui/ScanReveal";

export default function ContactSection() {
    return (
        <section id="contact" className="py-[100px]">
            <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="font-mono text-[var(--color-accent)] text-2xl mb-12 inline-block border-b-2 border-[var(--color-accent)] pb-2"
                >
                    ~/contacto
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="bg-[var(--bg-surface)] p-[3rem] rounded-xl text-center border border-[var(--color-border)] max-w-[800px] mx-auto"
                >
                    <p className="font-mono text-[var(--color-accent)] text-sm mb-6 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                        Disponible para nuevos proyectos · Respuesta en &lt; 24h
                    </p>

                    <p className="text-[1.2rem] text-[var(--color-text-secondary)] mb-10">
                        ¿Buscas un desarrollador FinTech para tu equipo o tienes un proyecto técnico interesante? Escríbeme directamente.
                    </p>

                    <div className="flex justify-center gap-6 flex-wrap">
                        <a
                            href="mailto:pascualpau04@gmail.com"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono font-bold transition-all duration-300 hover:bg-[var(--bg-hover)] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
                        >
                            <Mail className="w-6 h-6 transition-colors group-hover:text-[var(--color-accent)]" />
                            pascualpau04@gmail.com
                        </a>

                        <a
                            href="https://www.linkedin.com/in/pau-pascual-vallverdu/"
                            target="_blank"
                            rel="me noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono font-bold transition-all duration-300 hover:bg-[var(--bg-hover)] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
                        >
                            <Linkedin className="w-6 h-6 transition-colors group-hover:text-[var(--color-accent)]" />
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/Pasquii4"
                            target="_blank"
                            rel="me noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--bg-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono font-bold transition-all duration-300 hover:bg-[var(--bg-hover)] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
                        >
                            <Github className="w-6 h-6 transition-colors group-hover:text-[var(--color-text)]" />
                            GitHub
                        </a>
                    </div>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
