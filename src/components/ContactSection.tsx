"use client";

import { useState, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Github, Loader2 } from "lucide-react";
import ScanReveal from "./ui/ScanReveal";
import { useTranslation } from "@/hooks/useTranslation";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--bg-primary)] px-4 py-3 font-mono text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] placeholder:opacity-60 outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[rgba(var(--color-accent-rgb),0.35)]";

export default function ContactSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusDetail, setStatusDetail] = useState<"validation" | "network" | "config" | "generic" | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setStatusDetail("validation");
      return;
    }

    setStatus("loading");
    setStatusDetail(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (res.status === 503 && data.error === "not_configured") {
        setStatus("error");
        setStatusDetail("config");
        return;
      }
      if (res.status === 400) {
        setStatus("error");
        setStatusDetail("validation");
        return;
      }
      setStatus("error");
      setStatusDetail("generic");
    } catch {
      setStatus("error");
      setStatusDetail("network");
    }
  }

  const statusMessage =
    status === "success"
      ? t("contact.formSuccess")
      : status === "error"
        ? statusDetail === "validation"
          ? t("contact.formErrorValidation")
          : statusDetail === "network"
            ? t("contact.formErrorNetwork")
            : statusDetail === "config"
              ? t("contact.formErrorConfig")
              : t("contact.formError")
        : null;

  return (
    <section id="contact" className="py-16 md:py-20">
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
          {t("contact.title")}
        </motion.h2>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          className="bg-[var(--bg-surface)] p-[3rem] rounded-xl text-center border border-[var(--color-border)] max-w-[800px] mx-auto"
        >
          <p className="font-mono text-[var(--color-accent)] text-sm mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" aria-hidden />
            {t("contact.subtitle")}
          </p>

          <p className="text-[1.2rem] text-[var(--color-text-secondary)] mb-10">{t("contact.desc")}</p>

          <form
            onSubmit={handleSubmit}
            className="text-left max-w-[480px] mx-auto mb-10 space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                {t("contact.formName")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={200}
                className={inputClass}
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                {t("contact.formEmail")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={320}
                className={inputClass}
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                {t("contact.formMessage")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                maxLength={8000}
                className={`${inputClass} resize-y min-h-[120px]`}
                disabled={status === "loading"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.12)] px-6 py-3 font-mono text-sm font-medium text-[var(--color-accent)] transition-all hover:bg-[rgba(var(--color-accent-rgb),0.2)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  {t("contact.formSending")}
                </>
              ) : (
                t("contact.formSubmit")
              )}
            </button>
          </form>

          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`min-h-[1.5rem] font-mono text-sm mb-8 ${
              status === "success"
                ? "text-[var(--color-accent)]"
                : status === "error"
                  ? "text-red-400"
                  : "text-transparent"
            }`}
          >
            {statusMessage ?? "\u00a0"}
          </div>

          <p className="font-mono text-xs text-[var(--color-text-secondary)] mb-6">
            <a href="mailto:pascualpau04@gmail.com" className="text-[var(--color-accent)] underline-offset-2 hover:underline">
              {t("contact.mailtoHint")}
            </a>
            {" · "}pascualpau04@gmail.com
          </p>

          <div className="flex items-center gap-4 my-2">
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
              rel="noopener noreferrer"
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
