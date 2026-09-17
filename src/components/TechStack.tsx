"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";
import { techStackCategories, type StackCategoryId } from "@/data/techstack";

const CATEGORY_LABEL_KEY: Record<StackCategoryId, string> = {
  core: "stack.catCore",
  ai: "stack.catAI",
  devops: "stack.catDevOps",
  exploring: "stack.catExploring",
};

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
            marginBottom: "2rem",
          }}
        >
          {t("stack.title")}
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((cat, index) => {
            return (
              <motion.article
                key={cat.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={!prefersReducedMotion && inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 shadow-sm"
                style={{
                  borderColor: "oklch(from var(--color-text) l c h / 0.10)",
                }}
                aria-labelledby={`stack-cat-${cat.id}`}
              >
                <header className="mb-5 flex items-center justify-between gap-3 border-b border-[rgba(var(--color-accent-rgb),0.12)] pb-3">
                  <h3
                    id={`stack-cat-${cat.id}`}
                    className="font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]"
                  >
                    {t(CATEGORY_LABEL_KEY[cat.id])}
                  </h3>
                </header>

                <ul className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => {
                    return (
                      <li
                        key={`${cat.id}-${item.name}`}
                        className="font-mono px-3 py-1.5 rounded-md border"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-text)",
                          borderColor: "rgba(var(--color-accent-rgb), 0.2)",
                          background: "rgba(var(--color-accent-rgb), 0.04)",
                        }}
                      >
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </ScanReveal>
    </section>
  );
}
