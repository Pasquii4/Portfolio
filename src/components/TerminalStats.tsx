"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedCounter from "./ui/AnimatedCounter";
import { useTranslation } from "@/hooks/useTranslation";

type GithubStatsPayload = {
  fallback: boolean;
  public_repos: number;
  followers: number;
  public_gists: number;
};

const FALLBACK_CLIENT: GithubStatsPayload = {
  fallback: true,
  public_repos: 10,
  followers: 0,
  public_gists: 0,
};

type GithubLoadState =
  | { status: "loading" }
  | { status: "ready"; data: GithubStatsPayload };

type GithubStatRow = {
  key: string;
  label: string;
  prefix: string;
  suffix: string;
  subtext: string;
  loading?: boolean;
  live?: boolean;
  approxBadge?: boolean;
  value?: string | number;
  animateNumber?: boolean;
};

type CustomStatRow = {
  key: string;
  custom: true;
  render: () => React.ReactNode;
};

type StatRow = GithubStatRow | CustomStatRow;

function isCustomStat(stat: StatRow): stat is CustomStatRow {
  return "custom" in stat && stat.custom === true;
}

export default function TerminalStats() {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [githubState, setGithubState] = useState<GithubLoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/github-stats", { cache: "no-store" });
        const data = (await response.json()) as Partial<GithubStatsPayload>;
        if (cancelled) return;
        const normalized: GithubStatsPayload = {
          fallback: Boolean(data.fallback),
          public_repos: typeof data.public_repos === "number" ? data.public_repos : FALLBACK_CLIENT.public_repos,
          followers: typeof data.followers === "number" ? data.followers : 0,
          public_gists: typeof data.public_gists === "number" ? data.public_gists : 0,
        };
        setGithubState({ status: "ready", data: normalized });
      } catch {
        if (!cancelled) {
          setGithubState({ status: "ready", data: FALLBACK_CLIENT });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const numberLocale = locale === "en" ? "en-GB" : "es-ES";

  const githubRow: GithubStatRow = useMemo(() => {
    if (githubState.status === "loading") {
      return {
        key: "github",
        label: t("terminalStats.githubProjects"),
        prefix: "> ",
        suffix: "",
        subtext: t("terminalStats.loadingGithub"),
        loading: true,
      };
    }
    const { data } = githubState;
    if (data.fallback) {
      return {
        key: "github",
        label: t("terminalStats.githubProjects"),
        prefix: "> ",
        suffix: "",
        value: "10+",
        subtext: t("terminalStats.publicReposApproxSub"),
        approxBadge: true,
        animateNumber: false,
      };
    }
    return {
      key: "github",
      label: t("terminalStats.githubProjects"),
      prefix: "> ",
      suffix: "",
      value: data.public_repos,
      subtext: t("terminalStats.publicReposSub"),
      live: true,
      animateNumber: !reduceMotion,
    };
  }, [githubState, t, reduceMotion]);

  const stats: StatRow[] = useMemo(
    () => [
      githubRow,
      {
        custom: true,
        key: "availability",
        render: () => (
          <div className="stat-card flex items-start gap-4">
            <div className="stat-icon mt-1.5" aria-hidden="true">
              <span className="relative flex h-3 w-3">
                {!reduceMotion && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                )}
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]" />
              </span>
            </div>
            <div className="stat-info">
              <p className="font-mono text-[0.7rem] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 m-0">
                {t("terminalStats.statusLabel")}
              </p>
              <p className="stat-value font-heading text-3xl mb-1 text-[var(--color-accent)]">
                {t("terminalStats.statusValue")}
              </p>
              <p className="text-xs opacity-70 font-mono text-[var(--color-text-secondary)]">
                {t("terminalStats.statusSub")}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "degree",
        label: t("terminalStats.degreeLabel"),
        prefix: "● ",
        suffix: "",
        value: t("terminalStats.degreeValue"),
        subtext: t("terminalStats.degreeSub"),
      },
      {
        key: "bcn",
        label: t("terminalStats.locationLabel"),
        prefix: "📍 ",
        suffix: "",
        value: t("terminalStats.locationValue"),
        subtext: t("terminalStats.locationSub"),
      },
    ],
    [githubRow, reduceMotion, t]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, i) => {
        const motionProps = reduceMotion
          ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
          : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } };
        return (
          <motion.div
            key={stat.key}
            {...motionProps}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : i * 0.1 }}
            className="bg-[var(--bg-surface)] p-5 rounded-lg border border-[var(--color-border)] relative overflow-hidden group hover:border-[rgba(var(--color-accent-rgb),0.2)] transition-colors"
            aria-busy={!isCustomStat(stat) && stat.loading ? true : undefined}
            aria-live={!isCustomStat(stat) && stat.key === "github" ? "polite" : undefined}
          >
            {isCustomStat(stat) ? (
              stat.render()
            ) : (
              <>
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--bg-surface)] group-hover:bg-[var(--color-accent)] transition-colors" />
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[0.7rem] text-[var(--color-text-secondary)] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  {stat.live && (
                    <span className="font-mono text-[0.6rem] bg-[rgba(var(--color-accent-rgb),0.1)] text-[var(--color-accent)] px-2 py-0.5 rounded flex items-center gap-1 animate-pulse-glow">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden />
                      {t("terminalStats.live")}
                    </span>
                  )}
                  {stat.approxBadge && (
                    <span className="font-mono text-[0.6rem] bg-[rgba(var(--color-text-secondary),0.15)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded">
                      {t("terminalStats.approx")}
                    </span>
                  )}
                </div>

                <div className="font-heading text-3xl text-[var(--color-text)] mb-1 min-h-[2.25rem] flex items-center">
                  <span className="text-[var(--color-accent)] opacity-70 text-2xl mr-1">{stat.prefix}</span>
                  {stat.loading ? (
                    <span
                      className={`inline-block h-9 w-16 max-w-[40%] rounded-md bg-[var(--color-border)] ${
                        reduceMotion ? "opacity-90" : "animate-pulse"
                      }`}
                      aria-hidden
                    />
                  ) : typeof stat.value === "number" && stat.animateNumber ? (
                    <AnimatedCounter to={stat.value} duration={1.5} />
                  ) : stat.value !== undefined ? (
                    <span className="text-[var(--color-text)]">
                      {typeof stat.value === "number"
                        ? new Intl.NumberFormat(numberLocale).format(stat.value)
                        : stat.value}
                    </span>
                  ) : null}
                  <span className="text-[var(--color-accent)]">{stat.suffix}</span>
                </div>

                <p className="font-mono text-[0.75rem] text-[var(--color-text-secondary)] opacity-80">{stat.subtext}</p>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
