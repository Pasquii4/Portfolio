"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Github, Mail, ArrowRight } from "lucide-react";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="py-16 md:py-20">
      <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h2
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
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
          {t("contact.title")}
        </motion.h2>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          className="bg-[var(--bg-surface)] p-8 md:p-[3rem] rounded-xl text-center border border-[var(--color-border)] max-w-[800px] mx-auto shadow-sm"
        >
          <p className="font-mono text-[var(--color-accent)] text-sm mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" aria-hidden />
            {t("contact.subtitle")}
          </p>

          <p className="text-[1.1rem] sm:text-[1.2rem] text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            {t("contact.desc")}
          </p>

          <div className="font-mono text-base md:text-lg text-[var(--color-text)] mb-8 py-3 px-6 border border-[rgba(var(--color-accent-rgb),0.15)] bg-[rgba(var(--color-accent-rgb),0.04)] rounded-lg inline-block">
            pascualpau04@gmail.com
          </div>

          <div className="flex flex-col gap-4 max-w-[480px] mx-auto mb-10">
            <a
              href="mailto:pascualpau04@gmail.com"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-4 font-mono text-sm sm:text-base font-medium text-[var(--bg-primary)] transition-all hover:opacity-90"
            >
              <Mail className="w-5 h-5" aria-hidden />
              {t("contact.btnEmail")}
            </a>
            
            <a
              href="https://growthos.paupascual.work/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(var(--color-accent-rgb),0.3)] bg-[var(--bg-primary)] px-6 py-3 font-mono text-sm font-medium text-[var(--color-text)] transition-all hover:bg-[rgba(var(--color-accent-rgb),0.05)] hover:border-[var(--color-accent)]"
            >
              {t("contact.btnGrowthOS")}
              <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)]" aria-hidden />
            </a>
            
            <a
              href="#recruiters"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(var(--color-accent-rgb),0.3)] bg-[var(--bg-primary)] px-6 py-3 font-mono text-sm font-medium text-[var(--color-text)] transition-all hover:bg-[rgba(var(--color-accent-rgb),0.05)] hover:border-[var(--color-accent)]"
            >
              {t("contact.btnRecruiter")}
              <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)]" aria-hidden />
            </a>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-[var(--color-border)] flex-1" />
            <span className="font-mono text-xs text-[var(--color-text-secondary)]">{t("contact.or")}</span>
            <div className="h-px bg-[var(--color-border)] flex-1" />
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <a
              href="https://www.linkedin.com/in/pau-pascual-vallverdu/"
              target="_blank"
              rel="me noopener noreferrer"
              className="group w-full sm:w-auto flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono text-sm transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-[2px]"
            >
              <Linkedin className="w-5 h-5 shrink-0" aria-hidden />
              LinkedIn
            </a>

            <a
              href="https://github.com/Pasquii4"
              target="_blank"
              rel="me noopener noreferrer"
              className="group w-full sm:w-auto flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 bg-[var(--bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] no-underline font-mono text-sm transition-all duration-300 hover:border-gray-400 hover:text-white hover:-translate-y-[2px]"
            >
              <Github className="w-5 h-5 shrink-0" aria-hidden />
              GitHub
            </a>
          </div>
        </motion.div>
      </ScanReveal>
    </section>
  );
}
