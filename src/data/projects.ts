import { CSSProperties } from 'react';

export interface ProjectLink {
    url: string;
    label: string;
    icon?: string;
    style?: CSSProperties;
}

export interface ProjectBadge {
    label: string;
    type: string;
}

export interface Project {
    title: string;
    desc: string;
    longDesc?: string;
    tags: string[];
    links: ProjectLink[];
    status?: ProjectBadge;
    badges?: ProjectBadge[];
    image?: string;
    featured?: boolean;
    thumbnailType?: "rl-boosting" | "performance-tracker-grid" | "tu-espacio-ideal" | "casino" | "futbol-manager";
}

export const projects: Project[] = [
    // ── FEATURED ────────────────────────────────────────────────────────────────
    {
        title: "JARVISR · Asistente de IA local-first",
        featured: true,
        status: { label: "Activo · Open Source", type: "live" },
        desc: "Asistente de IA personal que corre localmente por defecto, conectado a NAS, Home Assistant y otros servicios propios a través de red interna y VPN. Gestiona información, dispara automatizaciones y es accesible desde cualquier dispositivo.",
        longDesc: "Core en Python con FastAPI, engines locales (llama.cpp, Ollama) y fallback opcional a cloud (Groq, OpenRouter). Configuración vía TOML y scripts de instalación para Windows y Raspberry Pi. En desarrollo: detección de gestos, navegación por planos y control de pantallas y dispositivos, siempre desde filosofía local-first.",
        tags: ["Python", "FastAPI", "llama.cpp", "Ollama", "Raspberry Pi"],
        image: "/og-image.jpg",
        links: [
            { url: "https://github.com/Pasquii4/JARVISR", label: "Ver Código", icon: "github" }
        ]
    },
    {
        title: "Trading Scanner · Scanner multi-activo",
        featured: true,
        status: { label: "Archivado · Open Source", type: "public" },
        desc: "Sistema de escaneo de mercados que analiza cientos de activos combinando precio, histórico, indicadores técnicos (RSI, MACD, Bollinger Bands) y fuentes externas para generar señales con contexto (LONG/SHORT, entrada, take profit, stop loss).",
        longDesc: "Backend FastAPI + motor de escaneo paralelo en Python + PostgreSQL para histórico y señales + scripts de data population y backtesting. Frontend React/Vite con dashboard interactivo. Orquestación Docker Compose completa. Pausado por coste real de APIs de datos institucionales en tiempo real — arquitectura production-grade.",
        tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "React"],
        image: "/og-image.jpg",
        links: [
            { url: "mailto:pascualpau04@gmail.com?subject=Solicitud%20acceso%20repo%20Trading%20Scanner", label: "🔒 Privado · Solicitar acceso", style: { opacity: 0.6 } }
        ]
    },
    {
        title: "Performance Tracker · Plataforma de rendimiento y ROI",
        featured: true,
        status: { label: "Privado", type: "private" },
        desc: "Aplicación social centrada en rendimiento y estadísticas: registro de operaciones, comparación de rentabilidades, seguimiento de perfiles y análisis de rachas y métricas de largo plazo.",
        longDesc: "Foco en la parte analítica: cálculo de ROI por período, análisis de rachas, Kelly Criterion para dimensionar riesgo y visualización de la evolución del capital en el tiempo con gráficos limpios y filtrables. Construido con JavaScript/TypeScript, HTML semántico y Chart.js, sin frameworks pesados.",
        tags: ["JavaScript", "TypeScript", "Chart.js", "HTML", "CSS"],
        image: "/og-image.jpg",
        links: [
            { url: "mailto:pascualpau04@gmail.com?subject=Solicitud%20acceso%20repo%20Performance%20Tracker", label: "🔒 Privado · Solicitar acceso", style: { opacity: 0.6 } }
        ]
    },
    // ── OTROS ───────────────────────────────────────────────────────────────────
    {
        title: "Tu Espacio Ideal",
        thumbnailType: "tu-espacio-ideal",
        badges: [{ label: "Público", type: "public" }, { label: "Live 🟢", type: "live" }],
        desc: "Storefront aesthetic de productos para escritorio. SSG con Astro + Cloudflare Workers. SEO-first y optimizado para conversión.",
        tags: ["Astro", "SSG", "Cloudflare"],
        image: "/og-image.jpg",
        links: [
            { url: "https://github.com/Pasquii4/storefront", label: "Ver Código", icon: "github" },
            { url: "https://storefront.pasqui.workers.dev/", label: "🌐 Ver Web" }
        ]
    },
    {
        title: "RL Boosting ES",
        thumbnailType: "rl-boosting",
        badges: [{ label: "Público", type: "public" }, { label: "Live 🟢", type: "live" }],
        desc: "Landing page de servicio de boosting para Rocket League. Desplegada en Cloudflare Pages · TypeScript + Astro · Optimizada para conversión y Core Web Vitals.",
        tags: ["TypeScript", "Astro", "Cloudflare Pages"],
        image: "/og-image.jpg",
        links: [
            { url: "https://github.com/Pasquii4/RLBoosting_es", label: "Ver Código", icon: "github" },
            { url: "https://rlboosting-es.pages.dev/", label: "🌐 Ver Web" }
        ]
    },
    {
        title: "Casino Python",
        thumbnailType: "casino",
        status: { label: "Público", type: "public" },
        desc: "Juego de casino multi-modal con lógica de estados complejos desarrollado enteramente en Python usando concurrencia simple.",
        tags: ["Python", "Game Logic"],
        links: [
            { url: "https://github.com/Pasquii4/Casino", label: "Ver Código", icon: "github" }
        ]
    },
    {
        title: "Fútbol Manager",
        thumbnailType: "futbol-manager",
        status: { label: "Público", type: "public" },
        desc: "Ejercicio académico de gestión de equipos y jugadores. Arquitectura orientada a objetos avanzada (OOP) — herencia, polimorfismo, encapsulación — en Java puro.",
        tags: ["Java", "OOP"],
        links: [
            { url: "https://github.com/Pasquii4/futbol_manager", label: "Ver Código", icon: "github" }
        ]
    }
];
