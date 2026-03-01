"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScanReveal from "./ui/ScanReveal";

export default function AboutSection() {
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
                        <p>Soy un desarrollador de software enfocado en construir herramientas fiables, escalables y optimizadas. Actualmente estoy cursando el <strong className="text-[var(--color-text)]">CFGS de Desarrollo de Aplicaciones Web</strong> en el Centre d&apos;Estudis Politècnics en Barcelona, ampliando y estructurando mi base de ingeniería de software.</p>
                        <p>Mi principal área de interés y especialización es la industria <strong className="text-[var(--color-text)]">FinTech y los algoritmos de trading</strong>. Empleo tecnologías modernas como <strong className="text-[var(--color-text)]">Python, FastAPI y SQL</strong> para diseñar arquitecturas de microservicios resilientes, capturar datos en tiempo real mediante integraciones de APIs (como Alpha Vantage o Polygon), y desarrollar sistemas automatizados de análisis de mercados.</p>
                        <p>A lo largo de los años he fortalecido mis habilidades trabajando tanto en el Back-end (arquitectura de bases de datos, APIs RESTful) como en el Front-end (UI atractivas y funcionales en vanilla y con frameworks modernos), asegurando que los requerimientos técnicos y de negocio se cumplan siempre al más alto nivel.</p>
                        <p>Actualmente <strong className="text-[var(--color-text)]">disponible para Prácticas o Parcial Remoto</strong> en el sector FinTech/trading. Si buscas un perfil técnico con visión de producto, escríbeme directamente.</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="font-mono text-[0.8rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-1 rounded">🇪🇸 Español</span>
                            <span className="font-mono text-[0.8rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-1 rounded">🏴 Català</span>
                            <span className="font-mono text-[0.8rem] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.1)] px-2 py-1 rounded">🇬🇧 English</span>
                        </div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-[rgba(var(--color-accent-rgb),0.2)] group cursor-default">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-accent-rgb),0.1)] to-transparent pointer-events-none z-10" />
                        <Image
                            src="/avatar.png"
                            alt="Pau Pascual"
                            width={600}
                            height={600}
                            className="w-full aspect-square object-cover grayscale-[20%] contrast-[1.1] transition-all duration-300 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </ScanReveal>
        </section>
    );
}
