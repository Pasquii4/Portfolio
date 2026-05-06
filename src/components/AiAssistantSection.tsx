"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import ScanReveal from "./ui/ScanReveal";

type Message = { role: "user" | "assistant"; content: string };

async function streamChat(
  messages: Message[],
  locale: string,
  onChunk: (full: string) => void
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, locale }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No body");

  const decoder = new TextDecoder();
  let lineBuffer = "";
  let full = "";

  const parseLine = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return;
    const payload = trimmed.slice(5).trim();
    if (payload === "[DONE]") return;
    try {
      const json = JSON.parse(payload) as {
        choices?: Array<{ delta?: { content?: string } }>;
      };
      const piece = json.choices?.[0]?.delta?.content ?? "";
      if (piece) {
        full += piece;
        onChunk(full);
      }
    } catch {
      /* incomplete JSON chunk */
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lineBuffer += decoder.decode(value, { stream: true });
    const lines = lineBuffer.split("\n");
    lineBuffer = lines.pop() ?? "";
    for (const raw of lines) parseLine(raw);
  }
  if (lineBuffer.trim()) parseLine(lineBuffer);

  return full;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Escribiendo…">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="block h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

export default function AiAssistantSection() {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [liveText, setLiveText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveText]);

  /* Auto-resize textarea */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [input]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    threadRef.current = [...threadRef.current, userMsg];
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);
    setLiveText("");

    try {
      const payload = threadRef.current.slice(-20);
      const full = await streamChat(payload, locale, (chunk) =>
        setLiveText(chunk)
      );
      const assistantMsg: Message = { role: "assistant", content: full };
      threadRef.current = [...threadRef.current, assistantMsg];
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errMsg: Message = {
        role: "assistant",
        content:
          locale === "es"
            ? "Ha habido un error de red. Inténtalo de nuevo."
            : "A network error occurred. Please try again.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setStreaming(false);
      setLiveText(null);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [input, streaming, locale]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0 && liveText === null;
  const bullets: string[] = [
    t("aiAssistant.bullet1"),
    t("aiAssistant.bullet2"),
    t("aiAssistant.bullet3"),
  ];

  return (
    <section id="ai-assistant" className="py-16 md:py-20">
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
          {t("aiAssistant.title")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-16 items-start">
          {/* ── Left: copy ── */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
          >
            <p
              className="leading-relaxed mb-7"
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "var(--text-base)",
                maxWidth: "52ch",
              }}
            >
              {t("aiAssistant.description")}
            </p>

            <ul className="space-y-3.5">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}
                >
                  <span
                    className="font-mono shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden
                  >
                    —
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <p
              className="mt-8 font-mono"
              style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", opacity: 0.5 }}
            >
              {t("aiAssistant.poweredBy")}
            </p>
          </motion.div>

          {/* ── Right: chat card ── */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.08 }}
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(from var(--color-text) l c h / 0.10)",
              background: "var(--bg-surface)",
              boxShadow: "0 2px 24px oklch(from var(--color-text) l c h / 0.04)",
            }}
          >
            {/* Messages area */}
            <div
              className="flex flex-col gap-3 overflow-y-auto p-5"
              style={{ minHeight: "340px", maxHeight: "420px" }}
            >
              {/* Greeting shown when chat is empty */}
              {isEmpty && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[88%] leading-relaxed"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid oklch(from var(--color-text) l c h / 0.08)",
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    {t("aiAssistant.greeting")}
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[88%] leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "var(--color-accent)",
                            color: "var(--bg-primary)",
                            fontSize: "var(--text-sm)",
                          }
                        : {
                            background: "var(--bg-primary)",
                            border: "1px solid oklch(from var(--color-text) l c h / 0.08)",
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--text-sm)",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Live streaming bubble */}
              {liveText !== null && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[88%] leading-relaxed whitespace-pre-wrap break-words"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid oklch(from var(--color-text) l c h / 0.08)",
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-sm)",
                    }}
                    aria-live="polite"
                  >
                    {liveText || <TypingDots />}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input row */}
            <div
              className="flex items-end gap-3 px-4 py-3"
              style={{ borderTop: "1px solid oklch(from var(--color-text) l c h / 0.08)" }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("aiAssistant.placeholder")}
                rows={1}
                disabled={streaming}
                aria-label={t("aiAssistant.placeholder")}
                className="flex-1 resize-none bg-transparent outline-none font-sans leading-relaxed"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text)",
                  maxHeight: "8rem",
                  opacity: streaming ? 0.5 : 1,
                  caretColor: "var(--color-accent)",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                aria-label={t("aiAssistant.sendLabel")}
                className="shrink-0 rounded-lg p-2 transition-all duration-200 disabled:opacity-30"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--bg-primary)",
                }}
                onMouseEnter={(e) => {
                  if (!streaming && input.trim())
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "";
                }}
              >
                <Send className="w-4 h-4" aria-hidden />
              </button>
            </div>
          </motion.div>
        </div>
      </ScanReveal>
    </section>
  );
}
