"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

type Card = {
  index: string;
  tag: string;
  title: string;
  desc: string;
  techTags?: string[];
};

const TOTAL = 3;
const CARD_BORDER = "oklch(from var(--color-text) l c h / 0.10)";

function IndexMarker({ index }: { index: string }) {
  return (
    <span
      className="font-mono uppercase tracking-[0.2em] text-[var(--color-text-secondary)] opacity-60"
      style={{ fontSize: "0.65rem" }}
      aria-hidden
    >
      {index} / 0{TOTAL}
    </span>
  );
}

function TagLabel({ tag }: { tag: string }) {
  return (
    <span
      className="font-mono text-[var(--color-accent)] tracking-wide"
      style={{ fontSize: "0.75rem" }}
    >
      {tag}
    </span>
  );
}

function CardEyebrow({ index, tag }: { index: string; tag: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <IndexMarker index={index} />
      <span
        className="h-px flex-1 max-w-[1.5rem] bg-[var(--color-border)] opacity-70"
        aria-hidden
      />
      <TagLabel tag={tag} />
    </div>
  );
}

export default function WhatIBuildSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const title = t("whatIBuild.title");

  const c1: Card = {
    index: "01",
    tag: t("whatIBuild.card1.tag"),
    title: t("whatIBuild.card1.title"),
    desc: t("whatIBuild.card1.desc"),
    techTags: ["Ollama", "llama.cpp", "Python", "FastAPI", "Raspberry Pi", "NAS"],
  };
  const c2: Card = {
    index: "02",
    tag: t("whatIBuild.card2.tag"),
    title: t("whatIBuild.card2.title"),
    desc: t("whatIBuild.card2.desc"),
  };
  const c3: Card = {
    index: "03",
    tag: t("whatIBuild.card3.tag"),
    title: t("whatIBuild.card3.title"),
    desc: t("whatIBuild.card3.desc"),
  };

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
          {/* ── Card 1: hero of the section (2x2) ───────────────────────── */}
          <motion.article
            aria-labelledby="what-i-build-card-01"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            className="rounded-2xl bg-[var(--bg-surface)] border p-8 md:p-10 md:col-span-2 md:row-span-2 flex flex-col justify-between gap-8"
            style={{ borderColor: CARD_BORDER }}
          >
            <div>
              <CardEyebrow index={c1.index} tag={c1.tag} />
              <h3
                id="what-i-build-card-01"
                className="font-heading text-[var(--color-text)] mt-1 mb-5"
                style={{
                  fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {c1.title}
              </h3>
              <p
                className="text-[var(--color-text-secondary)]"
                style={{ maxWidth: "60ch", lineHeight: 1.7 }}
              >
                {c1.desc}
              </p>
            </div>

            {c1.techTags && (
              <div className="flex flex-wrap gap-2">
                {c1.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono px-2 py-1 rounded border tracking-wide"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-accent)",
                      borderColor: "rgba(var(--color-accent-rgb), 0.22)",
                      background: "rgba(var(--color-accent-rgb), 0.05)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.article>

          {/* ── Card 2 ──────────────────────────────────────────────────── */}
          <motion.article
            aria-labelledby="what-i-build-card-02"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: "easeOut",
              delay: reduceMotion ? 0 : 0.05,
            }}
            className="rounded-2xl bg-[var(--bg-surface)] border p-8 flex flex-col"
            style={{ borderColor: CARD_BORDER }}
          >
            <CardEyebrow index={c2.index} tag={c2.tag} />
            <h3
              id="what-i-build-card-02"
              className="font-heading text-[var(--color-text)] mt-1 mb-4"
              style={{
                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.005em",
              }}
            >
              {c2.title}
            </h3>
            <p
              className="text-[var(--color-text-secondary)]"
              style={{ lineHeight: 1.7 }}
            >
              {c2.desc}
            </p>
          </motion.article>

          {/* ── Card 3 ──────────────────────────────────────────────────── */}
          <motion.article
            aria-labelledby="what-i-build-card-03"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: "easeOut",
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="rounded-2xl bg-[var(--bg-surface)] border p-8 flex flex-col"
            style={{ borderColor: CARD_BORDER }}
          >
            <CardEyebrow index={c3.index} tag={c3.tag} />
            <h3
              id="what-i-build-card-03"
              className="font-heading text-[var(--color-text)] mt-1 mb-4"
              style={{
                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.005em",
              }}
            >
              {c3.title}
            </h3>
            <p
              className="text-[var(--color-text-secondary)]"
              style={{ lineHeight: 1.7 }}
            >
              {c3.desc}
            </p>
          </motion.article>
        </div>
      </ScanReveal>
    </section>
  );
}
