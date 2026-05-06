"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";
import {
  techStackCategories,
  type StackCategoryId,
  type StackLevel,
} from "@/data/techstack";

const CATEGORY_LABEL_KEY: Record<StackCategoryId, string> = {
  backend: "stack.catBackend",
  frontend: "stack.catFrontend",
  infra: "stack.catInfra",
  ai: "stack.catAI",
  trading: "stack.catTrading",
};

const LEVEL_LABEL_KEY: Record<StackLevel, string> = {
  strong: "stack.levelStrong",
  comfortable: "stack.levelComfortable",
  exploring: "stack.levelExploring",
};

function LevelDots({ level, label }: { level: StackLevel; label: string }) {
  const filled = level === "strong" ? 3 : level === "comfortable" ? 2 : 1;
  const activeClass =
    level === "strong"
      ? "bg-[var(--color-accent)] shadow-[0_0_6px_rgba(var(--color-accent-rgb),0.45)]"
      : level === "comfortable"
        ? "bg-amber-400/90"
        : "bg-zinc-500";

  return (
    <span
      className="inline-flex items-center gap-0.5 shrink-0"
      title={label}
      aria-label={label}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full border border-[rgba(var(--color-accent-rgb),0.25)] ${
            i < filled ? activeClass : "bg-transparent opacity-35"
          }`}
        />
      ))}
    </span>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const categories = useMemo(() => techStackCategories, []);

  return (
    <section id="stack" ref={sectionRef} className="py-16 md:py-20 overflow-hidden">
      <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h2
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 600,
            color: "var(--color-text)",
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.02em",
            borderBottom: "2px solid var(--color-accent)",
            display: "inline-block",
            paddingBottom: "var(--space-1)",
            marginBottom: "1.25rem",
          }}
        >
          {t("stack.title")}
        </motion.h2>

        <p className="font-mono text-[11px] sm:text-xs text-[var(--color-text-secondary)] mb-8 max-w-2xl border-l-2 border-[rgba(var(--color-accent-rgb),0.35)] pl-3">
          {t("stack.stackLegend")}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat, index) => (
            <motion.article
              key={cat.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={!prefersReducedMotion && inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--bg-surface)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <header className="mb-4 border-b border-[rgba(var(--color-accent-rgb),0.12)] pb-2">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {t(CATEGORY_LABEL_KEY[cat.id])}
                </h3>
              </header>

              <ul className="flex flex-col gap-2.5">
                {cat.items.map((item) => {
                  const levelLabel = t(LEVEL_LABEL_KEY[item.level]);
                  return (
                    <li
                      key={`${cat.id}-${item.name}`}
                      className="group flex items-center gap-3 rounded-md border border-transparent px-1 py-0.5 transition-colors hover:border-[rgba(var(--color-accent-rgb),0.15)] hover:bg-[rgba(var(--color-accent-rgb),0.04)]"
                    >
                      <LevelDots level={item.level} label={levelLabel} />
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                        <span className="font-mono text-[13px] text-[var(--color-text)]">{item.name}</span>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider ${
                            item.level === "strong"
                              ? "text-emerald-400/90"
                              : item.level === "comfortable"
                                ? "text-amber-300/85"
                                : "text-zinc-500"
                          } max-w-[min(100%,11rem)] truncate opacity-70 transition-opacity group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100`}
                        >
                          {levelLabel}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}
        </div>
      </ScanReveal>
    </section>
  );
}
