import type { Metadata } from "next";
import JarvisHero from "@/components/jarvisr/JarvisHero";
import JarvisTabs from "@/components/jarvisr/JarvisTabs";
import JarvisArch from "@/components/jarvisr/JarvisArch";
import JarvisCapabilities from "@/components/jarvisr/JarvisCapabilities";

export const metadata: Metadata = {
  title: "JARVISR · Asistente de IA Local-first | Pau Pascual",
  description:
    "Asistente de IA personal que corre localmente, conectado a NAS, Home Assistant y VPN. Construido por Pau Pascual.",
  openGraph: {
    title: "JARVISR · Asistente de IA Local-first | Pau Pascual",
    description:
      "Asistente de IA personal que corre localmente, conectado a NAS, Home Assistant y VPN. Construido por Pau Pascual.",
    url: "https://portfolio-seven-wine-63.vercel.app/projects/jarvisr",
    siteName: "Pau Pascual",
    type: "website",
  },
};

export default function JarvisrPage() {
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
            JARVISR
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.08)] text-[var(--color-accent)]">
            ACTIVO · USO PERSONAL
          </span>
          <span className="sm:hidden" />
        </div>
      </nav>

      <main className="pt-14">
        <JarvisHero />
        <JarvisTabs />
        <JarvisArch />
        <JarvisCapabilities />
      </main>

      {/* Footer */}
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
