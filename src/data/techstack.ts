/**
 * Stack técnico por categoría y nivel de dominio.
 *
 * Niveles a nivel de ITEM y de CATEGORÍA:
 *   - strong:      uso habitual en proyectos reales propios; defiendo decisiones técnicas.
 *   - comfortable: proyectos reales pero menos profundidad/frecuencia.
 *   - exploring:   uso práctico, todavía aprendiendo activamente.
 *
 * Reglas para mantener honestidad:
 *   - Solo aparece aquí lo que se usa en proyectos reales (JARVISR, Trading Scanner,
 *     Performance Tracker, landings freelance, este portfolio).
 *   - "strong" requiere evidencia: hay un proyecto donde esa pieza es protagonista.
 *   - Cuando una pieza se usa pero no es protagonista, se marca "comfortable".
 *   - "exploring" se reserva para tooling/áreas que se están integrando ahora.
 *
 * Orden de categorías = orden de aparición en la UI:
 *   backend → ai → trading → frontend → infra
 *   (los 3 buckets "strong" quedan en la fila 1 del grid xl; los 2 secundarios en la fila 2).
 */
export type StackLevel = "strong" | "comfortable" | "exploring";

export type StackCategoryId = "backend_data" | "ai_agents" | "trading_analytics" | "web_deploy";

export interface StackTech {
  name: string;
  level: StackLevel;
  note?: string;
}

export interface StackCategory {
  id: StackCategoryId;
  level: StackLevel;
  items: StackTech[];
}

export const techStackCategories: StackCategory[] = [
  // 1 ── Backend & Datos ─────────────────────────────────────────────
  {
    id: "backend_data",
    level: "strong",
    items: [
      { name: "Python · FastAPI", level: "strong" },
      { name: "SQL · PostgreSQL", level: "strong" },
      { name: "APIs REST", level: "strong" },
      { name: "WebSockets", level: "comfortable" },
      { name: "Jobs · colas básicas", level: "comfortable" },
    ],
  },
  // 2 ── AI & Agents ──────────────────────────────────────────────────
  {
    id: "ai_agents",
    level: "strong",
    items: [
      { name: "Trabajo con LLMs", level: "strong" },
      { name: "Motores locales (llama.cpp/Ollama)", level: "strong" },
      { name: "Diseño de agentes con herramientas", level: "strong" },
      { name: "Proveedores cloud (cuando conviene)", level: "comfortable" },
      { name: "Orquestación simple", level: "comfortable" },
    ],
  },
  // 3 ── Trading & Analytics ──────────────────────────────────────────
  {
    id: "trading_analytics",
    level: "strong",
    items: [
      { name: "Indicadores técnicos", level: "strong" },
      { name: "Backtesting básico", level: "comfortable" },
      { name: "Integración de datos de mercado", level: "strong" },
      { name: "Dashboards de ROI y drawdown", level: "strong" },
      { name: "Análisis de rendimiento", level: "strong" },
    ],
  },
  // 4 ── Web & Deploy ─────────────────────────────────────────────────
  {
    id: "web_deploy",
    level: "comfortable",
    items: [
      { name: "JavaScript · TypeScript", level: "comfortable" },
      { name: "React · Next.js", level: "comfortable" },
      { name: "Astro · Vite", level: "comfortable" },
      { name: "HTML · CSS · Tailwind", level: "comfortable" },
      { name: "Docker", level: "comfortable" },
      { name: "Vercel · Cloudflare", level: "comfortable" },
      { name: "CI/CD avanzado · MLOps", level: "exploring", note: "En aprendizaje activo" },
    ],
  },
];
