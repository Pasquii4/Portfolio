"use client";

import { useState } from "react";
import TrackerHero from "@/components/tracker/TrackerHero";
import TrackerFeed from "@/components/tracker/TrackerFeed";
import TrackerDashboard from "@/components/tracker/TrackerDashboard";
import TrackerProfile from "@/components/tracker/TrackerProfile";
import TrackerLeaderboard from "@/components/tracker/TrackerLeaderboard";

const TABS = [
  { id: "feed", label: "Feed" },
  { id: "dashboard", label: "Dashboard" },
  { id: "perfil", label: "Perfil" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const problemCards = [
  {
    title: "Cualquiera puede decir que gana",
    text: "Sin historial verificado y público, cualquier porcentaje es marketing. Aquí los números no se pueden editar.",
  },
  {
    title: "El % de aciertos no es suficiente",
    text: "Ganar el 70% de las apuestas con cuotas de 1.10 es perder dinero. El ROI ajustado al riesgo es lo que importa.",
  },
  {
    title: "Las plataformas de seguimiento no tienen capa social",
    text: "Seguir a alguien no debería ser solo ver sus picks. Debería ser competir, comparar y aprender de su metodología.",
  },
];

const howItWorks = [
  {
    title: "Historial inmutable",
    text: "Cada operación se registra con timestamp. No se puede editar ni eliminar. El historial habla por sí solo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Gestión de bankroll matemática",
    text: "El sistema calcula automáticamente el stake óptimo según la probabilidad implícita de la cuota y el edge histórico.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
  },
  {
    title: "Competición real",
    text: "Los rankings son públicos y se actualizan en tiempo real. La transparencia es la única regla.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

const stack = ["JavaScript", "TypeScript", "Chart.js", "Recharts", "HTML semántico", "CSS", "Sin frameworks pesados"];

export default function PerformanceTrackerClient() {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [profileUserId, setProfileUserId] = useState("u1");

  const handleLeaderboardSelect = (userId: string) => {
    setProfileUserId(userId);
    setActiveTab("perfil");
    setTimeout(() => {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--color-border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            ← Volver al portfolio
          </a>
          <span className="text-sm font-mono font-bold text-[var(--color-text)] tracking-wider">
            Performance Tracker
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono border border-[var(--color-text-secondary)]/30 bg-[var(--bg-surface)] text-[var(--color-text-secondary)]">
            EN PAUSA · PRIVADO
          </span>
          <span className="sm:hidden" />
        </div>
      </nav>

      <main className="pt-14">
        <TrackerHero />

        {/* Section 2: Problem */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] text-center">
              Por qué existe este proyecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {problemCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug">{card.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Demo tabs */}
        <section id="demo" className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)]">
                Demo interactiva
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
                Datos simulados. Perfil de usuario, feed social y dashboard completo.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--bg-surface)] p-1 gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-accent)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {activeTab === "feed" && <TrackerFeed />}
              {activeTab === "dashboard" && <TrackerDashboard />}
              {activeTab === "perfil" && <TrackerProfile userId={profileUserId} />}
            </div>
          </div>
        </section>

        {/* Section 4: Leaderboard */}
        <TrackerLeaderboard onSelectUser={handleLeaderboardSelect} />

        {/* Section 5: How it works */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] text-center">
              Bajo el capó
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howItWorks.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.06)] flex items-center justify-center text-[var(--color-accent)]">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Stack + Status */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-[var(--color-text)]">Stack técnico</h3>
              <div className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--bg-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-6 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono border border-[var(--color-text-secondary)]/30 bg-[var(--bg-surface)] text-[var(--color-text-secondary)]">
                EN PAUSA · DESARROLLO
              </span>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Estado</span>
                  <span className="text-[var(--color-text)]">Privado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Concepto</span>
                  <span className="text-[var(--color-text)]">Validado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Próximo paso</span>
                  <span className="text-[var(--color-text)]">Backend social + auth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: CTA */}
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto text-center rounded-2xl border border-[var(--color-border)] bg-[var(--bg-surface)] p-10 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text)]">
              ¿Te interesa el concepto?
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Si buscas una plataforma de este tipo o quieres colaborar en el desarrollo, puedo explicar la arquitectura completa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:pascualpau04@gmail.com?subject=Performance Tracker - Colaboración"
                className="px-6 py-3 rounded-lg font-medium text-sm bg-[var(--color-accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
              >
                Contactar con Pau
              </a>
              <a
                href="/"
                className="px-6 py-3 rounded-lg font-medium text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[rgba(var(--color-accent-rgb),0.4)] hover:text-[var(--color-text)] transition-colors"
              >
                ← Volver al portfolio
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] py-6 px-6 text-center text-xs text-[var(--color-text-secondary)]">
        © Pau Pascual ·{" "}
        <a
          href="https://github.com/Pasquii4/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-text)] transition-colors"
        >
          github.com/Pasquii4/Portfolio
        </a>
      </footer>
    </>
  );
}

