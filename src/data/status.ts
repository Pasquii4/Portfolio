/**
 * Disponibilidad global (badge en navbar + tooltip).
 *
 * Para cambiar el estado sin tocar el resto del código:
 * 1. Edita `status` a "open" | "limited" | "closed".
 * 2. Ajusta `messageEs` y `messageEn` al copy que quieras mostrar en el badge.
 *
 * Textos sugeridos por estado:
 * - open:    "Aceptando proyectos" / "Open to new projects"
 * - limited: "Disponibilidad limitada" / "Limited availability"
 * - closed:  "Actualmente no acepto nuevos proyectos" / "Not accepting new projects"
 */
export type AvailabilityStatus = "open" | "limited" | "closed";

export const availability = {
  status: "open" as AvailabilityStatus,
  messageEs: "Aceptando proyectos",
  messageEn: "Open to new projects",
};
