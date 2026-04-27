"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

type CaseStudy = {
  tag: string;
  title: string;
  status: string;
  description: string;
  tags: string[];
  links: Array<
    | { type: "github"; label: string; href: string }
    | { type: "note"; label: string }
  >;
  snippet: React.ReactNode;
};

function TerminalSnippet({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full font-mono leading-relaxed"
      style={{
        background: "#0a0908",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-md)",
        border: "1px solid oklch(from var(--color-text) l c h / 0.10)",
        color: "var(--color-text)",
        fontSize: "var(--text-base)",
        overflowX: "auto",
      }}
      aria-label="Code snippet"
    >
      {children}
    </div>
  );
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center uppercase tracking-widest font-mono"
      style={{
        fontSize: "var(--text-xs)",
        borderRadius: "999px",
        padding: "0.35rem 0.6rem",
        border: "1px solid oklch(from var(--color-text) l c h / 0.14)",
        color: "var(--color-text)",
        background: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center font-mono"
      style={{
        fontSize: "var(--text-xs)",
        borderRadius: "999px",
        padding: "0.35rem 0.6rem",
        border: "1px solid oklch(from var(--color-text) l c h / 0.12)",
        color: "var(--color-text-muted)",
        background: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function TechPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono"
          style={{
            fontSize: "var(--text-xs)",
            borderRadius: "999px",
            padding: "0.35rem 0.6rem",
            border: "1px solid oklch(from var(--color-text) l c h / 0.10)",
            color: "var(--color-text-muted)",
            background: "transparent",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function LinksRow({
  links,
}: {
  links: CaseStudy["links"];
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 font-mono">
      {links.map((l, idx) => {
        if (l.type === "note") {
          return (
            <span
              key={`${l.type}-${idx}`}
              style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
            >
              {l.label}
            </span>
          );
        }

        return (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors duration-300"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
          >
            {l.label} <span aria-hidden="true">→</span>
          </a>
        );
      })}
    </div>
  );
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <motion.article
      ref={ref}
      {...motionProps}
      className="w-full grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8"
      style={{
        background:
          "oklch(from var(--color-accent) l c h / 0.04)",
        border: "1px solid oklch(from var(--color-text) l c h / 0.10)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-8)",
      }}
    >
      {/* Left (60%) */}
      <div className="md:col-span-3 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <TagPill>{cs.tag}</TagPill>
          <StatusPill>{cs.status}</StatusPill>
        </div>

        <h3
          className="font-heading text-[var(--color-text)]"
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 600,
            lineHeight: 1.25,
          }}
        >
          {cs.title}
        </h3>

        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-muted)",
            maxWidth: "60ch",
            lineHeight: 1.7,
          }}
        >
          {cs.description}
        </p>

        <TechPills tags={cs.tags} />
        <LinksRow links={cs.links} />
      </div>

      {/* Right (40%) */}
      <div className="md:col-span-2">
        <TerminalSnippet>{cs.snippet}</TerminalSnippet>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects() {
  const { t, locale } = useTranslation();

  const caseStudies = useMemo<CaseStudy[]>(() => {
    const trading: CaseStudy = {
      tag: t("featuredProjects.trading.tag"),
      title:
        locale === "es"
          ? t("featuredProjects.trading.titleEs")
          : t("featuredProjects.trading.titleEn"),
      status: t("featuredProjects.trading.status"),
      description:
        locale === "es"
          ? t("featuredProjects.trading.descEs")
          : t("featuredProjects.trading.descEn"),
      tags: [
        "FastAPI",
        "PostgreSQL",
        "React",
        "Vite",
        "Docker",
        "WebSockets",
      ],
      links: [
        {
          type: "github",
          label: t("featuredProjects.links.github"),
          href: "https://github.com/Pasquii4/Trading_Scanner",
        },
        { type: "note", label: t("featuredProjects.trading.tradingDemo") },
      ],
      snippet: (
        <pre className="whitespace-pre">
          <span style={{ color: "var(--color-text-muted)" }}>
            # run.py — orquestación completa
          </span>
          {"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            services
          </span>{" "}
          = [
          {"\n"}
          {"    "}(
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "backend"
          </span>
          ,{"  "}
          <span style={{ color: "oklch(from var(--color-text) l c h / 0.92)" }}>
            "uvicorn app.main:app --reload"
          </span>
          ),{"\n"}
          {"    "}(
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "scanner"
          </span>
          ,{"  "}
          <span style={{ color: "oklch(from var(--color-text) l c h / 0.92)" }}>
            "python scanner/engine.py"
          </span>
          ),{"\n"}
          {"    "}(
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "frontend"
          </span>
          ,{" "}
          <span style={{ color: "oklch(from var(--color-text) l c h / 0.92)" }}>
            "npm run dev --prefix frontend"
          </span>
          ),{"\n"}]
          {"\n\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            async def
          </span>{" "}
          start_all():
          {"\n"}
          {"    "}tasks = [run_service(*s){" "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            for
          </span>{" "}
          s{" "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            in
          </span>{" "}
          services]
          {"\n"}
          {"    "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            await
          </span>{" "}
          asyncio.gather(*tasks)
        </pre>
      ),
    };

    const jarvisr: CaseStudy = {
      tag: t("featuredProjects.jarvisr.tag"),
      title:
        locale === "es"
          ? t("featuredProjects.jarvisr.titleEs")
          : t("featuredProjects.jarvisr.titleEn"),
      status: t("featuredProjects.jarvisr.status"),
      description:
        locale === "es"
          ? t("featuredProjects.jarvisr.descEs")
          : t("featuredProjects.jarvisr.descEn"),
      tags: ["Python", "FastAPI", "llama.cpp", "Ollama", "Rust", "uv"],
      links: [
        {
          type: "github",
          label: t("featuredProjects.links.github"),
          href: "https://github.com/Pasquii4/JARVISR",
        },
      ],
      snippet: (
        <pre className="whitespace-pre">
          <span style={{ color: "var(--color-text-muted)" }}>
            # Setup Windows — un solo comando
          </span>
          {"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.88)" }}>
            ./
          </span>
          setup_jarvisr.bat
          {"\n\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # Verificar motores disponibles
          </span>
          {"\n"}
          uv run python verify_engines.py
          {"\n\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # Arrancar con el engine local
          </span>
          {"\n"}
          uv run jarvis ask{" "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "Resumen de mis emails de hoy"
          </span>
          {"\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # → Engine: llama.cpp (local) ✓
          </span>
          {"\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # → Latency: 340ms
          </span>
        </pre>
      ),
    };

    return [trading, jarvisr];
  }, [locale, t]);

  return (
    <section id="featured-projects" className="py-16 md:py-20">
      <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
        <p
          className="text-xs uppercase tracking-widest mb-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          — {t("featuredProjects.label")}
        </p>

        <div className="flex flex-col gap-6">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.title} cs={cs} />
          ))}
        </div>
      </ScanReveal>
    </section>
  );
}

