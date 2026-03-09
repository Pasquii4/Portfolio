import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

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
  description: "Desarrollador backend especializado en FinTech, Python, FastAPI y algoritmos de trading. Construyendo sistemas escalables desde Barcelona.",
  keywords: ["Desarrollador Backend", "FinTech Developer", "Python", "FastAPI", "React", "Next.js", "Trading Algorítmico", "Microservicios"],
  authors: [{ name: "Pau Pascual", url: "https://pasquii4.github.io/personal-2/" }],
  creator: "Pau Pascual",
  metadataBase: new URL("https://pasquii4.github.io/personal-2/"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pau Pascual | Backend & FinTech Developer",
    description: "Desarrollador backend especializado en FinTech, Python, FastAPI y algoritmos de trading. Construyendo sistemas escalables desde Barcelona.",
    url: "https://pasquii4.github.io/personal-2/",
    siteName: "Pau Pascual Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pau Pascual | Backend & FinTech Developer",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pau Pascual | Backend & FinTech Developer",
    description: "Desarrollador backend especializado en FinTech, Python, FastAPI y algoritmos de trading.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://pasquii4.github.io/personal-2/",
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
    "url": "https://pasquii4.github.io/personal-2/",
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
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-[var(--bg-primary)] text-[var(--color-text)] overflow-x-hidden min-h-screen relative">
        <LanguageProvider>
          <ThemeProvider>
            <GrainOverlay />
            <CustomCursor />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
