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
    tags: string[];
    links: ProjectLink[];
    status?: ProjectBadge;
    badges?: ProjectBadge[];
}

export const projects: Project[] = [
    {
        title: "Trading Scanner",
        status: { label: "En Desarrollo", type: "in-dev" },
        desc: "Escanea múltiples activos con indicadores RSI, MACD y volumen en tiempo real. Arquitectura modular con FastAPI + WebSockets + PostgreSQL. Latencia <300ms en entorno local.",
        tags: ["Python", "FastAPI", "SQL", "Docker"],
        links: [
            { url: "mailto:pascualpau04@gmail.com?subject=Solicitud%20acceso%20repo%20Trading%20Scanner", label: "🔒 Privado · Solicitar acceso", style: { opacity: 0.6 } }
        ]
    },
    {
        title: "RL Boosting ES",
        badges: [{ label: "Público", type: "public" }, { label: "Live 🟢", type: "live" }],
        desc: "Landing page de servicio de boosting para Rocket League. Desplegada en Cloudflare Pages · TypeScript + Astro · Optimizada para conversión y Core Web Vitals.",
        tags: ["TypeScript", "Next.js / Astro"],
        links: [
            { url: "https://github.com/Pasquii4/RLBoosting_es", label: "Ver Código", icon: "github" },
            { url: "https://rlboosting-es.pages.dev/", label: "🌐 Ver Web" }
        ]
    },
    {
        title: "Bet Tracker",
        status: { label: "Privado", type: "private" },
        desc: "Dashboard de seguimiento de apuestas deportivas con estadísticas de ROI, racha y Kelly Criterion. Vanilla JS + Chart.js, sin dependencias externas.",
        tags: ["HTML", "CSS", "JavaScript"],
        links: [
            { url: "mailto:pascualpau04@gmail.com?subject=Solicitud%20acceso%20repo%20Bet%20Tracker", label: "🔒 Privado · Solicitar acceso", style: { opacity: 0.6 } }
        ]
    },
    {
        title: "Tu Espacio Ideal",
        badges: [{ label: "Público", type: "public" }, { label: "Live 🟢", type: "live" }],
        desc: "Storefront aesthetic de productos para escritorio. SSG con Astro + Cloudflare Workers. SEO-first y optimizado para conversión.",
        tags: ["Astro", "SSG"],
        links: [
            { url: "https://github.com/Pasquii4/storefront", label: "Ver Código", icon: "github" },
            { url: "https://storefront.pasqui.workers.dev/", label: "🌐 Ver Web" }
        ]
    },
    {
        title: "Casino Python",
        status: { label: "Público", type: "public" },
        desc: "Juego de casino multi-modal con lógica de apuestas complejas desarrollado enteramente en Python usando estado y concurrencia simple.",
        tags: ["Python", "Game Logic"],
        links: [
            { url: "https://github.com/Pasquii4/Casino", label: "Ver Código", icon: "github" }
        ]
    },
    {
        title: "Fútbol Manager",
        status: { label: "Público", type: "public" },
        desc: "Ejercicio académico de gestión de equipos y jugadores. Arquitectura orientada a objetos avanzada (OOP) — herencia, polimorfismo, encapsulación — en Java puro.",
        tags: ["Java", "OOP"],
        links: [
            { url: "https://github.com/Pasquii4/futbol_manager", label: "Ver Código", icon: "github" }
        ]
    }
];
