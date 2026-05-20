import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://paupascual.dev";
const OG_IMAGE_URL = `${SITE_URL}/api/og`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pau Pascual — Product Builder · AI Local-first & Trading Systems",
  description:
    "Asistentes de IA local-first, automatización para autónomos y pymes, sistemas de trading y producto web a medida. Backend-first, product-minded. Basado en Barcelona · Disponible para prácticas DAW, proyectos remotos y clientes freelance.",
  keywords: [
    "Product Builder",
    "AI Local-first",
    "Agentes de IA",
    "Automatización",
    "Asistentes IA",
    "Python",
    "FastAPI",
    "Ollama",
    "llama.cpp",
    "Trading Systems",
    "FinTech",
    "Next.js",
    "TypeScript",
    "Raspberry Pi",
    "Home Lab",
  ],
  authors: [{ name: "Pau Pascual", url: SITE_URL }],
  creator: "Pau Pascual",
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pau Pascual — Product Builder · AI Local-first & Trading Systems",
    description: "AI local-first · Automatización · Trading systems · Producto web · Barcelona",
    url: SITE_URL,
    siteName: "Pau Pascual",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Pau Pascual — Product Builder",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pau Pascual — Product Builder · AI Local-first & Trading Systems",
    description: "AI local-first · Automatización · Trading systems · Producto web · Barcelona",
    images: [OG_IMAGE_URL],
    creator: "@pasquii4",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pau Pascual",
  alternateName: "Pau Pascual Vallverdú",
  jobTitle: "Product Builder · AI Local-first & Trading Systems",
  description:
    "Product builder técnico backend-first. Construyo asistentes de IA local-first, automatizaciones para autónomos y pymes, y sistemas de trading y analytics. Basado en Barcelona, España.",
  url: SITE_URL,
  image: OG_IMAGE_URL,
  email: "pascualpau04@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressRegion: "Catalunya",
    addressCountry: "ES",
  },
  sameAs: [
    "https://www.linkedin.com/in/pau-pascual-vallverdu/",
    "https://github.com/Pasquii4",
  ],
  knowsAbout: [
    "Local-first AI",
    "AI Agents",
    "LLM tooling",
    "Ollama",
    "llama.cpp",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "Trading Systems",
    "Backtesting",
    "Technical Indicators",
    "TypeScript",
    "Next.js",
    "Astro",
    "Cloudflare",
    "Vercel",
    "Raspberry Pi",
    "Home Automation",
    "REST APIs",
    "WebSockets",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Centre d'Estudis Politècnics",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pau Pascual — Product Builder · AI Local-first & Trading Systems",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [jsonLdPerson, jsonLdWebSite];

  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased font-sans bg-[var(--bg-primary)] text-[var(--color-text)] overflow-x-hidden min-h-screen relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          Saltar al contenido principal
        </a>
        <Providers>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
