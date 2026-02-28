import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  title: "Pau Pascual | Backend & FinTech Developer",
  description: "Desarrollador enfocado en Python, FastAPI, React y Arquitecturas FinTech.",
  authors: [{ name: "Pau Pascual" }],
  openGraph: {
    title: "Pau Pascual | FinTech Developer",
    description: "Portfolio de Pau Pascual. Desarrollador Full-Stack especializado en FinTech, algoritmos de trading, Python y FastAPI.",
    url: "https://pasquii4.github.io/personal/",
    siteName: "Pau Pascual Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 400,
        height: 400,
        alt: "Pau Pascual - FinTech Developer",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pau Pascual | FinTech & Full-Stack Developer",
    description: "Portfolio de Pau Pascual. Desarrollador Full-Stack especializado en FinTech, algoritmos de trading, Python y FastAPI.",
    images: ["/avatar.png"],
  },
  alternates: {
    canonical: "https://pasquii4.github.io/personal/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pau Pascual",
    "alternateName": "Pau Pascual Vallverdú",
    "jobTitle": "FinTech & Full-Stack Developer",
    "description": "Desarrollador Full-Stack especializado en FinTech, Python, FastAPI y algoritmos de trading. Basado en Barcelona, España.",
    "url": "https://pasquii4.github.io/personal/",
    "email": "pascualpau04@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barcelona",
      "addressRegion": "Catalunya",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.linkedin.com/in/pau-pascual-vallverdu/",
      "https://github.com/Pasquii4"
    ],
    "knowsAbout": [
      "Python", "FastAPI", "FinTech", "Trading Algorithms",
      "Docker", "SQL", "JavaScript", "TypeScript", "Astro",
      "Next.js", "Microservices Architecture", "REST APIs"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Centre d'Estudis Politècnics",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressCountry": "ES"
      }
    }
  };

  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-[var(--bg-primary)] text-[var(--color-text)] overflow-x-hidden min-h-screen relative">
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
