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

export type StackCategoryId = "core" | "ai" | "devops" | "exploring";

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
  // 1 ── Core diario ─────────────────────────────────────────────
  {
    id: "core",
    level: "strong",
    items: [
      { name: "Python", level: "strong" },
      { name: "FastAPI", level: "strong" },
      { name: "PostgreSQL", level: "strong" },
      { name: "Docker", level: "strong" },
      { name: "Next.js / Astro", level: "comfortable" },
      { name: "Tailwind CSS", level: "strong" },
    ],
  },
  // 2 ── IA local y agentes ──────────────────────────────────────
  {
    id: "ai",
    level: "strong",
    items: [
      { name: "llama.cpp", level: "strong" },
      { name: "Ollama", level: "strong" },
      { name: "Modelos locales", level: "strong" },
      { name: "Groq / OpenRouter", level: "comfortable" },
    ],
  },
  // 3 ── DevOps / deploy ──────────────────────────────────────────
  {
    id: "devops",
    level: "comfortable",
    items: [
      { name: "Cloudflare Pages", level: "comfortable" },
      { name: "Vercel", level: "comfortable" },
      { name: "Contenedores Docker", level: "strong" },
      { name: "GitHub Actions", level: "comfortable" },
    ],
  },
  // 4 ── Explorando ───────────────────────────────────────────────
  {
    id: "exploring",
    level: "exploring",
    items: [
      { name: "Go", level: "exploring", note: "En aprendizaje activo" },
      { name: "GCP", level: "exploring" },
      { name: "MongoDB", level: "exploring" },
      { name: "Otras DBs NoSQL", level: "exploring" },
    ],
  },
];
