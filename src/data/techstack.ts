/**
 * Stack técnico por categoría y nivel de dominio.
 * - strong: uso habitual en producción o proyectos serios
 * - comfortable: proyectos reales, menos exposición
 * - exploring: aprendizaje activo o uso puntual
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
      { name: "Python", level: "strong" },
      { name: "FastAPI", level: "strong" },
      { name: "PostgreSQL", level: "strong" },
      { name: "SQL", level: "strong" },
      { name: "REST APIs", level: "strong" },
      { name: "WebSockets", level: "strong" },
      { name: "Node.js", level: "comfortable" },
    ],
  },
  {
    id: "frontend",
    items: [
      { name: "React", level: "comfortable" },
      { name: "Next.js", level: "comfortable" },
      { name: "TypeScript", level: "comfortable" },
      { name: "Tailwind CSS", level: "comfortable" },
      { name: "Astro", level: "comfortable" },
      { name: "Vite", level: "comfortable" },
    ],
  },
  {
    id: "infra",
    items: [
      { name: "Docker", level: "strong" },
      { name: "Cloudflare Pages", level: "comfortable" },
      { name: "Vercel", level: "comfortable" },
      { name: "Git / CI", level: "comfortable" },
      { name: "Linux · deploy", level: "comfortable" },
      { name: "uv · Rust (tooling)", level: "exploring" },
    ],
  },
  {
    id: "ai",
    items: [
      { name: "Groq", level: "comfortable" },
      { name: "llama.cpp", level: "comfortable" },
      { name: "Ollama", level: "comfortable" },
      { name: "OpenRouter", level: "comfortable" },
      { name: "Python agents", level: "comfortable" },
      { name: "PyTorch", level: "exploring" },
    ],
  },
  {
    id: "trading",
    items: [
      { name: "Technical indicators (RSI, MACD, BB)", level: "strong" },
      { name: "Scanner / real-time feeds", level: "strong" },
      { name: "Binance-style REST & WebSocket APIs", level: "comfortable" },
      { name: "Polygon / Alpha Vantage-style data", level: "comfortable" },
      { name: "Backtesting pipelines", level: "comfortable" },
    ],
  },
];
