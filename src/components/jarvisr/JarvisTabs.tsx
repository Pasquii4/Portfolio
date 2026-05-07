"use client";

import { useState } from "react";
import JarvisChat from "./JarvisChat";
import JarvisSystem from "./JarvisSystem";
import JarvisGestures from "./JarvisGestures";

const tabs = [
  { id: "chat", label: "Chat" },
  { id: "sistema", label: "Sistema" },
  { id: "gestos", label: "Gestos" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function JarvisTabs() {
  const [active, setActive] = useState<TabId>("chat");

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
            Demo interactiva
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Versión simplificada del sistema real. Sin acceso a red interna ni dispositivos reales.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--bg-surface)] p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === tab.id
                    ? "bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div>
          {active === "chat" && <JarvisChat />}
          {active === "sistema" && <JarvisSystem />}
          {active === "gestos" && <JarvisGestures />}
        </div>
      </div>
    </section>
  );
}
