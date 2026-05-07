"use client";

import { useEffect, useRef, useMemo } from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { projects, type Project } from "@/data/projects";

const LINKEDIN = "https://www.linkedin.com/in/pau-pascual-vallverdu/";
const EMAIL = "pascualpau04@gmail.com";

function pickPublicLinks(project: Project) {
  return project.links.filter((l) => l.url.startsWith("http") && !l.url.startsWith("mailto")).slice(0, 2);
}

type RecruiterModeProps = {
  open: boolean;
  onClose: () => void;
};

export default function RecruiterMode({ open, onClose }: RecruiterModeProps) {
  const { t, locale } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const topProjects = useMemo(() => projects.filter((p) => p.featured).slice(0, 3), []);

  const bullets = useMemo(() => [
    { label: t("recruiter.whatIdoLabel"), text: t("recruiter.whatIdo") },
    { label: t("recruiter.howIworkLabel"), text: t("recruiter.howIwork") },
    { label: t("recruiter.lookingForLabel"), text: t("recruiter.lookingFor") },
    { label: t("recruiter.whereIfitLabel"), text: t("recruiter.whereIfit") },
    { label: t("recruiter.howWeStartLabel"), text: t("recruiter.howWeStart") },
  ], [t]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = getFocusable();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      dialog.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const titleId = "recruiter-dialog-title";
  const descId = "recruiter-bullets-list";

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-[1] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id={titleId} className="font-heading text-xl text-[var(--color-text)] tracking-tight">
              {t("recruiter.dialogTitle")}
            </h2>
            <p className="font-mono text-xs text-[var(--color-accent)] mt-1">{t("recruiter.dialogSubtitle")}</p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={t("recruiter.close")}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <ul id={descId} className="space-y-4 mb-6 border-b border-[var(--color-border)] pb-6">
          {bullets.map(({ label, text }) => (
            <li key={label} className="text-sm leading-relaxed">
              <span className="font-semibold text-[var(--color-text)]">{label}. </span>
              <span className="text-[var(--color-text-secondary)]">{text}</span>
            </li>
          ))}
        </ul>

        <section className="mb-6" aria-labelledby="recruiter-projects-heading">
          <h3 id="recruiter-projects-heading" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">
            {t("recruiter.projectsTitle")}
          </h3>
          <ul className="space-y-4">
            {topProjects.map((project) => {
              const links = pickPublicLinks(project);
              const shortDesc =
                project.desc.length > 140 ? `${project.desc.slice(0, 137)}…` : project.desc;
              return (
                <li key={project.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--bg-primary)] p-3">
                  <div className="font-semibold text-[var(--color-text)]">{project.title}</div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">{shortDesc}</p>
                  {links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[var(--color-accent)] underline-offset-2 hover:underline"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <p className="text-sm text-[var(--color-text-secondary)] mb-5 leading-relaxed italic border-l-2 border-[rgba(var(--color-accent-rgb),0.4)] pl-3">
          {t("recruiter.cta")}
        </p>

        <section aria-labelledby="recruiter-contact-heading">
          <h3 id="recruiter-contact-heading" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
            {t("recruiter.contactTitle")}
          </h3>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <a href={`mailto:${EMAIL}`} className="text-[var(--color-accent)] hover:underline">
              {EMAIL}
            </a>
            <a href={LINKEDIN} target="_blank" rel="me noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
              LinkedIn
            </a>
          </div>
        </section>

        <p className="mt-6 font-mono text-[10px] text-[var(--color-text-secondary)] opacity-70">
          {t("recruiter.shortcut")}
        </p>
      </div>
    </div>
  );
}
