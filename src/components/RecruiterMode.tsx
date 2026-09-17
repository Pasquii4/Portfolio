"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

const GITHUB = "https://github.com/Pasquii4";
const LINKEDIN = "https://www.linkedin.com/in/pau-pascual-vallverdu/";
const GROWTHOS = "https://growthos.paupascual.work/";

const STACK_ITEMS = [
  "Python / FastAPI",
  "PostgreSQL",
  "Docker",
  "Next.js / Astro",
  "Tailwind CSS",
  "Local AI (Ollama / llama.cpp)",
];

const LINKS = [
  { href: GITHUB,   label: "GitHub",   Icon: Github,      rel: "me noopener noreferrer" },
  { href: LINKEDIN, label: "LinkedIn", Icon: Linkedin,     rel: "me noopener noreferrer" },
  { href: GROWTHOS, label: "GrowthOS", Icon: ExternalLink, rel: "noopener noreferrer" },
] as const;

export default function RecruiterMode() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <section id="recruiters" className="py-16 md:py-20">
      <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">

        {/* Heading */}
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
            marginBottom: "2rem",
          }}
        >
          {t("recruiter.sectionTitle")}
        </motion.h2>

        {/* Grid: content left · links card right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8 lg:gap-12 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-8">

            {/* EN summary */}
            <motion.div
              {...fade(0)}
              className="rounded-xl border p-6"
              style={{
                borderColor: "oklch(from var(--color-text) l c h / 0.10)",
                background: "var(--bg-surface)",
              }}
            >
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.08)] border border-[rgba(var(--color-accent-rgb),0.2)] px-2 py-0.5 rounded mb-3">
                EN
              </span>
              <p
                className="leading-relaxed"
                style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}
              >
                Product-minded backend developer &amp; technical growth partner
                based in Barcelona. I build backend systems, automation and
                applied AI solutions focused on measurable business impact.
              </p>
            </motion.div>

            {/* What I'm looking for */}
            <motion.div {...fade(0.06)}>
              <h3
                className="font-mono uppercase tracking-[0.14em] mb-3"
                style={{ fontSize: "0.7rem", color: "var(--color-accent)" }}
              >
                {t("recruiter.lookingForTitle")}
              </h3>
              <p
                className="leading-relaxed mb-4"
                style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}
              >
                {t("recruiter.lookingForDesc")}
              </p>
              <p
                className="font-mono border-l-2 border-[rgba(var(--color-accent-rgb),0.4)] pl-3 leading-relaxed"
                style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", opacity: 0.7 }}
              >
                {t("recruiter.notLookingFor")}
              </p>
            </motion.div>

            {/* Stack */}
            <motion.div {...fade(0.1)}>
              <h3
                className="font-mono uppercase tracking-[0.14em] mb-3"
                style={{ fontSize: "0.7rem", color: "var(--color-accent)" }}
              >
                {t("recruiter.stackTitle")}
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label={t("recruiter.stackTitle")}>
                {STACK_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="font-mono px-2.5 py-1 rounded-md border"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text)",
                      borderColor: "rgba(var(--color-accent-rgb), 0.2)",
                      background: "rgba(var(--color-accent-rgb), 0.04)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── Right column: links card ── */}
          <motion.aside
            {...fade(0.12)}
            aria-label={t("recruiter.linksTitle")}
            className="rounded-xl border p-6 flex flex-col gap-3 lg:sticky lg:top-[90px]"
            style={{
              borderColor: "oklch(from var(--color-text) l c h / 0.10)",
              background: "var(--bg-surface)",
            }}
          >
            <h3
              className="font-mono uppercase tracking-[0.14em] mb-1"
              style={{ fontSize: "0.7rem", color: "var(--color-accent)" }}
            >
              {t("recruiter.linksTitle")}
            </h3>

            {LINKS.map(({ href, label, Icon, rel }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel={rel}
                className="group flex items-center gap-3 rounded-lg border border-[var(--color-border)] px-4 py-3 font-mono text-sm text-[var(--color-text)] no-underline transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-[1px]"
                style={{ background: "var(--bg-primary)" }}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden />
                {label}
                <span
                  className="ml-auto font-mono opacity-25 group-hover:opacity-60 transition-opacity"
                  aria-hidden
                  style={{ fontSize: "0.65rem" }}
                >
                  ↗
                </span>
              </a>
            ))}

            <p
              className="mt-2 font-mono leading-relaxed"
              style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", opacity: 0.6 }}
            >
              {t("recruiter.responseTime")}
            </p>
          </motion.aside>
        </div>

      </ScanReveal>
    </section>
  );
}

