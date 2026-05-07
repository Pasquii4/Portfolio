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
        desc: "Asistente de IA personal local-first integrado en mi propio ecosistema — PC, Raspberry Pi y NAS — y conectado con Home Assistant y servicios self-hosted vía red interna y VPN. Sistema, no chatbot.",
        longDesc: "Core en Python con FastAPI y motores locales (llama.cpp, Ollama), con fallback opcional a cloud (Groq, OpenRouter) cuando hace falta velocidad. Configuración vía TOML y scripts de instalación para Windows y Raspberry Pi. Diseñado para crecer hacia interfaces más naturales: control por gestos, navegación por planos y orquestación de pantallas y dispositivos, siempre desde filosofía local-first (control, privacidad, libertad).",
        tags: ["Python", "FastAPI", "llama.cpp", "Ollama", "Raspberry Pi", "Home Assistant"],
        image: "/og-image.jpg",
        links: [
            { url: "https://github.com/Pasquii4/JARVISR", label: "Ver Código", icon: "github" }
        ]
    },
    {
        title: "Trading Scanner · Sistema multi-activo de señales y análisis",
        featured: true,
        status: { label: "Archivado · Open Source", type: "public" },
        desc: "Sistema diseñado para escanear más de 500 activos cruzando precio en tiempo real, histórico, indicadores técnicos, noticias y señales externas para producir alertas y zonas LONG/SHORT con entrada, take profit y stop loss.",
        longDesc: "Backend FastAPI + motor de escaneo paralelo en Python + PostgreSQL para histórico y señales + scripts de data population y backtesting. Frontend React/Vite con dashboard interactivo de alertas, predicciones y métricas. Orquestación Docker Compose completa. Pausado por coste real de APIs de datos institucionales en tiempo real, no por la arquitectura.",
        tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "React"],
        image: "/og-image.jpg",
        links: [
            { url: "mailto:pascualpau04@gmail.com?subject=Solicitud%20acceso%20repo%20Trading%20Scanner", label: "🔒 Privado · Solicitar acceso", style: { opacity: 0.6 } }
        ]
    },
    {
        title: "Performance Tracker · Plataforma social de rendimiento y ROI",
        featured: true,
        status: { label: "Beta privada", type: "private" },
        desc: "Plataforma social inspirada en eToro: perfiles verificados, ranking por ROI y métricas de largo plazo. Foco en analytics y comparativa de rendimiento, no en el resultado puntual.",
        longDesc: "Cada perfil mantiene un histórico inmutable y la app calcula ROI por período, evolución de capital, rachas, ranking global y dimensionamiento de riesgo con Kelly Criterion a través de visualizaciones limpias y filtrables. Stack TypeScript + Chart.js + HTML semántico, sin frameworks pesados, pensado para ser rápido y fácil de mantener.",
        tags: ["TypeScript", "Chart.js", "Analytics", "Social", "ROI"],
        image: "/og-image.jpg",
        links: [
            { url: "mailto:pascualpau04@gmail.com?subject=Solicitud%20acceso%20Performance%20Tracker", label: "🔒 Privado · Solicitar acceso", style: { opacity: 0.6 } }
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
