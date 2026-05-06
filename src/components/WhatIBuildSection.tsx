"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

type Card = {
  tag: string;
  title: string;
  desc: string;
  techTags?: string[];
  stat?: string;
};

export default function WhatIBuildSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const title = t("whatIBuild.title");

  const cards: { c1: Card; c2: Card; c3: Card } = {
    c1: {
      tag: t("whatIBuild.card1.tag"),
      title: t("whatIBuild.card1.title"),
      desc: t("whatIBuild.card1.desc"),
      techTags: ["Python", "Ollama", "llama.cpp", "FastAPI", "Raspberry Pi"],
      stat: t("whatIBuild.card1.stat"),
    },
    c2: {
      tag: t("whatIBuild.card2.tag"),
      title: t("whatIBuild.card2.title"),
      desc: t("whatIBuild.card2.desc"),
    },
    c3: {
      tag: t("whatIBuild.card3.tag"),
      title: t("whatIBuild.card3.title"),
      desc: t("whatIBuild.card3.desc"),
    },
  };

  const cardBorder = "oklch(from var(--color-text) l c h / 0.10)";

  return (
    <section id="what-i-build" className="py-16 md:py-20">
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
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          <motion.article
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            className="rounded-2xl bg-[var(--bg-surface)] border p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between gap-6"
            style={{ borderColor: cardBorder }}
          >
            <div>
              <p className="font-mono text-[0.75rem] text-[var(--color-text-secondary)] tracking-wide mb-3">
                <span className="text-[var(--color-accent)]">{cards.c1.tag}</span>
              </p>
              <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-text)] mb-4">
                {cards.c1.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-[70ch]">
                {cards.c1.desc}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {cards.c1.techTags && (
                <div className="flex flex-wrap gap-2">
                  {cards.c1.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.7rem] px-2 py-1 rounded border text-[var(--color-accent)] border-[rgba(var(--color-accent-rgb),0.25)] bg-[rgba(var(--color-accent-rgb),0.06)] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {cards.c1.stat && (
                <p className="font-mono text-[0.7rem] text-[var(--color-text-secondary)] opacity-60 tracking-wide">
                  {cards.c1.stat}
                </p>
              )}
            </div>
          </motion.article>

          <motion.article
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.05 }}
            className="rounded-2xl bg-[var(--bg-surface)] border p-8 md:col-span-1 md:row-span-1"
            style={{ borderColor: cardBorder }}
          >
            <p className="font-mono text-[0.75rem] text-[var(--color-text-secondary)] tracking-wide mb-3">
              <span className="text-[var(--color-accent)]">{cards.c2.tag}</span>
            </p>
            <h3 className="font-heading text-xl text-[var(--color-text)] mb-4">
              {cards.c2.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {cards.c2.desc}
            </p>
          </motion.article>

          <motion.article
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.1 }}
            className="rounded-2xl bg-[var(--bg-surface)] border p-8 md:col-span-1 md:row-span-1"
            style={{ borderColor: cardBorder }}
          >
            <p className="font-mono text-[0.75rem] text-[var(--color-text-secondary)] tracking-wide mb-3">
              <span className="text-[var(--color-accent)]">{cards.c3.tag}</span>
            </p>
            <h3 className="font-heading text-xl text-[var(--color-text)] mb-4">
              {cards.c3.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {cards.c3.desc}
            </p>
          </motion.article>
        </div>
      </ScanReveal>
    </section>
  );
}

