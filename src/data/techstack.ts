/**
 * Stack técnico por categoría y nivel de dominio.
 * - strong:      uso habitual en proyectos reales, me siento seguro
 * - comfortable: proyectos reales, menos profundidad o frecuencia
 * - exploring:   uso práctico pero aún en aprendizaje activo
 */
export type StackLevel = "strong" | "comfortable" | "exploring";

export type StackCategoryId = "backend" | "frontend" | "infra" | "ai" | "trading";

export interface StackTech {
  name: string;
  level: StackLevel;
}

export interface StackCategory {
  id: StackCategoryId;
  items: StackTech[];
}

export const techStackCategories: StackCategory[] = [
  {
    id: "backend",
    items: [
      // Fuerte
      { name: "Python · FastAPI (pipelines, APIs, automatización)", level: "strong" },
      { name: "PostgreSQL · SQL (modelos de datos, queries complejas)", level: "strong" },
      { name: "APIs REST y WebSockets (diseño y patrones básicos de arquitectura)", level: "strong" },
      // Cómodo
      { name: "Node.js (servicios sencillos, integraciones, utilidades)", level: "comfortable" },
      { name: "Jobs, colas ligeras y tareas programadas", level: "comfortable" },
    ],
  },
  {
    id: "frontend",
    items: [
      { name: "React · Next.js App Router (dashboards, productos web)", level: "comfortable" },
      { name: "TypeScript", level: "comfortable" },
      { name: "Tailwind CSS", level: "comfortable" },
      { name: "Astro · Vite (landings, SSG, SEO y conversión)", level: "comfortable" },
    ],
  },
  {
    id: "ai",
    items: [
      // Fuerte en local-first
      { name: "llama.cpp · Ollama (modelos locales, local-first)", level: "strong" },
      { name: "Groq · OpenRouter (cloud fallback por coste/latencia)", level: "strong" },
      { name: "Agentes con herramientas, contexto y APIs propias", level: "strong" },
      // Cómodo
      { name: "Python agents sin frameworks pesados", level: "comfortable" },
    ],
  },
  {
    id: "trading",
    items: [
      { name: "Indicadores técnicos: RSI, MACD, Bollinger Bands, volumen", level: "strong" },
      { name: "Pipelines de backtesting y análisis de señales históricas", level: "strong" },
      { name: "Dashboards para decisiones de trading y análisis de performance", level: "strong" },
      { name: "Data feeds REST y WebSocket estilo Binance / Polygon", level: "comfortable" },
    ],
  },
  {
    id: "infra",
    items: [
      { name: "Docker · Docker Compose (desarrollo y demos reproducibles)", level: "comfortable" },
      { name: "Vercel · Cloudflare Pages/Workers (deploys low-cost)", level: "comfortable" },
      { name: "Home infra: NAS, Raspberry Pi, VPN (agentes locales y servicios propios)", level: "comfortable" },
      { name: "Git · Linux · uv", level: "comfortable" },
      { name: "CI/CD avanzado · MLOps · orquestación cloud", level: "exploring" },
    ],
  },
];
