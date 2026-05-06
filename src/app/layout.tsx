import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import { Providers } from "@/components/Providers";

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
  title: "Pau Pascual — Product Builder",
  description:
    "Sistemas de trading, agentes IA y webs a medida. Backend-first, product-minded. Basado en Barcelona · Disponible para prácticas y proyectos remotos.",
  keywords: ["Desarrollador Backend", "FinTech Developer", "Python", "FastAPI", "React", "Next.js", "Trading Algorítmico", "Microservicios"],
  authors: [{ name: "Pau Pascual", url: SITE_URL }],
  creator: "Pau Pascual",
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pau Pascual — Product Builder",
    description: "Trading · IA · Webs a medida · Barcelona",
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
    title: "Pau Pascual — Product Builder",
    description: "Trading · IA · Webs a medida · Barcelona",
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
  jobTitle: "FinTech & Full-Stack Developer",
  description:
    "Desarrollador Full-Stack especializado en FinTech, Python, FastAPI y algoritmos de trading. Basado en Barcelona, España.",
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
    "Python",
    "FastAPI",
    "FinTech",
    "Trading Algorithms",
    "Docker",
    "SQL",
    "JavaScript",
    "TypeScript",
    "Astro",
    "Next.js",
    "Microservices Architecture",
    "REST APIs",
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
  name: "Pau Pascual — Product Builder",
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
      </body>
    </html>
  );
}
