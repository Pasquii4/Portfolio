"use client";

import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

type CaseStudy = {
  tag: string;
  indexLabel: string;
  title: string;
  subtitle?: string;
  status: string;
  description: string;
  tags: string[];
  landingHref: string;
  viewLabel: string;
  links: Array<
    | { type: "github"; label: string; href: string }
    | { type: "access"; label: string; href: string }
    | { type: "note"; label: string }
  >;
  snippet: React.ReactNode;
};

const SNIPPET_BG = "#0a0908";

function TerminalSnippet({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasMore = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setShowFade(hasMore);
  }, []);

  useEffect(() => {
    checkOverflow();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkOverflow]);

  return (
    <div
      className="relative w-full font-mono leading-relaxed overflow-hidden"
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid oklch(from var(--color-text) l c h / 0.10)",
      }}
    >
      {/* Scrollable code area */}
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        aria-label="Code snippet"
        style={{
          background: SNIPPET_BG,
          padding: "var(--space-6)",
          color: "var(--color-text)",
          fontSize: "var(--text-base)",
          overflowX: "auto",
        }}
      >
        {children}
      </div>

      {/* Right-edge fade — hides when scrolled to end */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${SNIPPET_BG})`,
          opacity: showFade ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Scroll hint — bottom-right corner */}
      <span
        className="pointer-events-none absolute bottom-3 right-3 font-mono text-[0.65rem] tracking-wide transition-opacity duration-300 select-none"
        style={{
          color: "rgba(255,255,255,0.22)",
          opacity: showFade ? 1 : 0,
        }}
        aria-hidden
      >
        scroll →
      </span>
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

function IndexMarker({ label }: { label: string }) {
  return (
    <span
      className="font-mono uppercase tracking-[0.2em] ml-auto"
      style={{
        fontSize: "0.65rem",
        color: "var(--color-text-muted)",
        opacity: 0.7,
      }}
      aria-hidden
    >
      {label}
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
            target={l.href.startsWith("/") ? undefined : "_blank"}
            rel={l.href.startsWith("/") ? undefined : "noopener noreferrer"}
            className="no-underline transition-colors duration-300"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
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
        <div className="flex flex-wrap items-center gap-3 w-full">
          <TagPill>{cs.tag}</TagPill>
          <StatusPill>{cs.status}</StatusPill>
          <IndexMarker label={cs.indexLabel} />
        </div>

        <div className="flex flex-col gap-2">
          <h3
            className="font-heading text-[var(--color-text)]"
            style={{
              fontSize: "clamp(1.375rem, 1.6vw, 1.625rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {cs.title}
          </h3>

          {cs.subtitle && (
            <p
              className="font-mono"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                opacity: 0.85,
                maxWidth: "60ch",
              }}
            >
              {cs.subtitle}
            </p>
          )}
        </div>

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
        <div className="flex flex-col gap-3 pt-1">
          <a
            href={cs.landingHref}
            className="inline-flex w-fit items-center gap-2 no-underline transition-opacity duration-300"
            style={{
              borderRadius: "0.65rem",
              padding: "0.8rem 1.1rem",
              background: "var(--color-accent)",
              color: "var(--bg-primary)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {cs.viewLabel} <span aria-hidden="true">→</span>
          </a>
          <LinksRow links={cs.links} />
        </div>
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
  const reduceMotion = useReducedMotion();

  const caseStudies = useMemo<CaseStudy[]>(() => {
    const viewLabel = t("featuredProjects.viewProject");
    const requestAccess = t("featuredProjects.requestAccess");

    const trading: CaseStudy = {
      tag: t("featuredProjects.trading.tag"),
      indexLabel: "02 / 03",
      title:
        locale === "es"
          ? t("featuredProjects.trading.titleEs")
          : t("featuredProjects.trading.titleEn"),
      subtitle:
        locale === "es"
          ? t("featuredProjects.trading.subtitleEs")
          : t("featuredProjects.trading.subtitleEn"),
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
      landingHref: "/projects/trading-scanner",
      viewLabel,
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
      indexLabel: "01 / 03",
      title:
        locale === "es"
          ? t("featuredProjects.jarvisr.titleEs")
          : t("featuredProjects.jarvisr.titleEn"),
      subtitle:
        locale === "es"
          ? t("featuredProjects.jarvisr.subtitleEs")
          : t("featuredProjects.jarvisr.subtitleEn"),
      status: t("featuredProjects.jarvisr.status"),
      description:
        locale === "es"
          ? t("featuredProjects.jarvisr.descEs")
          : t("featuredProjects.jarvisr.descEn"),
      tags: ["Python", "FastAPI", "llama.cpp", "Ollama", "Home Assistant", "Raspberry Pi"],
      landingHref: "/projects/jarvisr",
      viewLabel,
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
            # jarvis.toml — configuración local-first
          </span>
          {"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            [engine]
          </span>
          {"\n"}
          {"provider  = "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "ollama"
          </span>
          {"  "}
          <span style={{ color: "var(--color-text-muted)" }}># local por defecto</span>
          {"\n"}
          {"fallback  = "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "groq"
          </span>
          {"\n\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            [integrations]
          </span>
          {"\n"}
          {"home_assistant = "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "http://homeassistant.local:8123"
          </span>
          {"\n"}
          {"nas_url        = "}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.85)" }}>
            "http://nas.local:5000"
          </span>
          {"\n\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # → Engine: Ollama (local) ✓
          </span>
          {"\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # → Latency: 290ms · Zero cloud · Full control
          </span>
        </pre>
      ),
    };

    const tracker: CaseStudy = {
      tag: t("featuredProjects.tracker.tag"),
      indexLabel: "03 / 03",
      title:
        locale === "es"
          ? t("featuredProjects.tracker.titleEs")
          : t("featuredProjects.tracker.titleEn"),
      subtitle:
        locale === "es"
          ? t("featuredProjects.tracker.subtitleEs")
          : t("featuredProjects.tracker.subtitleEn"),
      status: t("featuredProjects.tracker.status"),
      description:
        locale === "es"
          ? t("featuredProjects.tracker.descEs")
          : t("featuredProjects.tracker.descEn"),
      tags: ["TypeScript", "Chart.js", "Analytics", "Social", "ROI"],
      landingHref: "/projects/performance-tracker",
      viewLabel,
      links: [
        {
          type: "access",
          label: requestAccess,
          href: "mailto:pascualpau04@gmail.com?subject=Performance%20Tracker%20-%20Acceso",
        },
      ],
      snippet: (
        <pre className="whitespace-pre">
          <span style={{ color: "var(--color-text-muted)" }}>
            # tracker — métricas verificadas
          </span>
          {"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            profile
          </span>{" "}
          = "@trader.alpha"{"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            roi_ytd
          </span>{" "}
          = +24.7%{"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            kelly_avg
          </span>{" "}
          = 0.06{"\n"}
          <span style={{ color: "oklch(from var(--color-accent) l c h / 0.92)" }}>
            rank_global
          </span>{" "}
          = #142 / 5,800{"\n"}
          {"\n"}
          <span style={{ color: "var(--color-text-muted)" }}>
            # histórico inmutable · ranking público · perfiles verificados
          </span>
        </pre>
      ),
    };

    return [jarvisr, trading, tracker];
  }, [locale, t]);

  return (
    <section id="featured-projects" className="py-16 md:py-20">
      <ScanReveal className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h2
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="text-xs uppercase tracking-widest mb-6 m-0 font-sans font-semibold"
          style={{ color: "var(--color-text-muted)" }}
        >
          — {t("featuredProjects.label")}
        </motion.h2>

        <div className="flex flex-col gap-6">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.title} cs={cs} />
          ))}
        </div>
      </ScanReveal>
    </section>
  );
}

