"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "¿Qué servicios tienes activos ahora mismo?",
  "¿Cuál es tu arquitectura interna?",
  "¿Qué puedes controlar en el ecosistema de Pau?",
];

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "JARVISR online. Sistemas operativos. ¿En qué puedo asistirte?",
};

export default function JarvisChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setError(null);

      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/jarvis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok) {
          throw new Error(`${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let assistantText = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const json = JSON.parse(payload);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                assistantText += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: assistantText };
                  return updated;
                });
              }
            } catch {
              /* skip malformed chunks */
            }
          }
        }
      } catch {
        setError("Sistema temporalmente no disponible. Inténtalo de nuevo.");
        setMessages((prev) => {
          if (prev[prev.length - 1]?.role === "assistant" && !prev[prev.length - 1].content) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left — explanation */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-heading font-semibold text-[var(--color-text)]">
          Habla con JARVISR
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Esta demo conecta con Groq usando un system prompt estricto. JARVISR conoce el contexto real del sistema: proyectos, stack, ecosistema.
        </p>
        <div className="space-y-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={loading}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm border border-[var(--color-border)] bg-[var(--bg-surface)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors disabled:opacity-50"
            >
              &quot;{s}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Right — chat */}
      <div className="lg:col-span-3 rounded-2xl border border-[var(--color-border)] bg-[rgba(var(--color-accent-rgb),0.02)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">JARVISR Chat</span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-accent)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse-glow" />
            ONLINE
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 h-80 max-h-80">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-text)]"
                    : "bg-[var(--bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[var(--bg-surface)] border border-[var(--color-border)] px-4 py-2.5 rounded-xl">
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center text-xs text-red-400 py-2">{error}</div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-3 px-5 py-4 border-t border-[var(--color-border)]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
