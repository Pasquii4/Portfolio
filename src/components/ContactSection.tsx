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

                    <div className="flex flex-col gap-8 w-full">
                        <form
                            action="mailto:pascualpau04@gmail.com"
                            method="GET"
                            encType="text/plain"
                            className="flex flex-col gap-5 w-full text-left"
                        >
                            <div>
                                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2" htmlFor="subject">Asunto</label>
                                <input type="text" name="subject" id="subject" placeholder="Propuesta / Proyecto FinTech..." className="w-full bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-lg px-4 py-3 font-mono text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.1)] transition-all" required />
                            </div>
                            <div>
                                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2" htmlFor="body">Mensaje</label>
                                <textarea name="body" id="body" rows={4} placeholder="Hola Pau, ¡me gustaría hablar contigo sobre..." className="w-full bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-lg px-4 py-3 font-mono text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.1)] transition-all resize-none" required></textarea>
                            </div>
                            <button type="submit" className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-[rgba(var(--color-accent-rgb),0.1)] border border-[rgba(var(--color-accent-rgb),0.3)] text-[var(--color-accent)] rounded-lg font-mono font-bold transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--bg-primary)] hover:-translate-y-[2px] mt-2">
                                <Mail className="w-5 h-5 transition-colors" />
                                Enviar Mensaje Localmente
                            </button>
                        </form>

                        <div className="flex items-center gap-4 my-2">
                            <div className="h-px bg-[var(--color-border)] flex-1"></div>
                            <span className="font-mono text-xs text-[var(--color-text-secondary)]">O contáctame vía</span>
                            <div className="h-px bg-[var(--color-border)] flex-1"></div>
                        </div>

                        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                            <a
                                href="https://www.linkedin.com/in/pau-pascual-vallverdu/"
                                target="_blank"
                                rel="me noopener noreferrer"
                                className="group w-full sm:w-auto flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono text-sm transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-[2px]"
                            >
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </a>

                            <a
                                href="https://github.com/Pasquii4"
                                target="_blank"
                                rel="me noopener noreferrer"
                                className="group w-full sm:w-auto flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono text-sm transition-all duration-300 hover:border-gray-400 hover:text-white hover:-translate-y-[2px]"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
