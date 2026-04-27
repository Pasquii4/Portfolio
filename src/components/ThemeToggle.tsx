"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[120px] h-10" />; // placeholder
  }

  // Only allow: system + dark. Any other legacy value falls back to system.
  const currentTheme: "system" | "dark" = theme === "dark" ? "dark" : "system";

  const nextTheme: "system" | "dark" = currentTheme === "system" ? "dark" : "system";
  const label =
    currentTheme === "system" ? t("nav.themeDark") : t("nav.themeSystem");

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="h-10 px-4 flex items-center justify-center font-mono text-sm font-bold"
      style={{
        color: "var(--color-text-muted)",
        background: "transparent",
        border: "none",
        transition: "color 180ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--color-text)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--color-text-muted)")
      }
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {label}
    </button>
  );
}
