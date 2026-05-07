export type ProjectThumbnailType =
  | "rl-boosting"
  | "performance-tracker-grid"
  | "tu-espacio-ideal"
  | "casino"
  | "futbol-manager";

interface ProjectThumbnailProps {
  type?: ProjectThumbnailType;
}

export default function ProjectThumbnail({ type }: ProjectThumbnailProps) {
  const common = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 400 160",
    xmlns: "http://www.w3.org/2000/svg",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": true,
  } as const;

  switch (type) {
    // "rl-boosting": mantener RL tal cual
    case "rl-boosting":
      return (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1a1917 0%, #111010 100%)" }}
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "oklch(from var(--color-text) l c h / 0.08)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "-0.02em",
            }}
          >
            RL
          </span>
        </div>
      );

    case "performance-tracker-grid":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="pt-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0a0f" />
              <stop offset="100%" stopColor="#0f0f2a" />
            </linearGradient>
          </defs>
          <rect width="400" height="160" fill="url(#pt-bg)" />
          <path
            d="M90 112 L150 98 L210 86 L260 64 L310 44"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <circle cx="310" cy="44" r="4" fill="#34d399" opacity="0.95" />
          <text
            x="200"
            y="132"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="10"
            fill="#34d399"
            letterSpacing="4"
            opacity="0.7"
          >
            TRACKER
          </text>
        </svg>
      );

    case "tu-espacio-ideal":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="tei-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d111a" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>
          <rect width="400" height="160" fill="url(#tei-bg)" />
          <text
            x="200"
            y="98"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="68"
            fontWeight="700"
            fill="#ffffff"
            opacity="0.15"
            letterSpacing="-2"
          >
            TEI
          </text>
          <rect
            x="130"
            y="42"
            width="140"
            height="70"
            rx="12"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.1"
          />
          <text
            x="200"
            y="132"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="10"
            fill="#9ca3af"
            opacity="0.5"
            letterSpacing="4"
          >
            STOREFRONT
          </text>
        </svg>
      );

    case "casino":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="cs-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f0a00" />
              <stop offset="100%" stopColor="#1a1200" />
            </linearGradient>
          </defs>
          <rect width="400" height="160" fill="url(#cs-bg)" />
          <g opacity="0.6">
            <rect x="168" y="44" width="64" height="64" rx="14" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="186" cy="62" r="4" fill="#fbbf24" />
            <circle cx="200" cy="76" r="4" fill="#fbbf24" />
            <circle cx="214" cy="90" r="4" fill="#fbbf24" />
          </g>
          <text
            x="200"
            y="132"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="10"
            fill="#fbbf24"
            opacity="0.5"
            letterSpacing="4"
          >
            CASINO.PY
          </text>
        </svg>
      );

    case "futbol-manager":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="fm-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0f0a" />
              <stop offset="100%" stopColor="#0f1a0f" />
            </linearGradient>
          </defs>
          <rect width="400" height="160" fill="url(#fm-bg)" />
          <g stroke="#059669" strokeWidth="2" opacity="0.4" fill="none">
            <rect x="110" y="34" width="180" height="92" rx="10" />
            <line x1="200" y1="34" x2="200" y2="126" />
            <circle cx="200" cy="80" r="18" />
          </g>
          <text
            x="200"
            y="132"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="10"
            fill="#059669"
            opacity="0.5"
            letterSpacing="4"
          >
            MANAGER
          </text>
        </svg>
      );

    default:
      return (
        <div
          className="w-full h-full"
          style={{ background: "linear-gradient(135deg, #1a1917 0%, #111010 100%)" }}
          aria-hidden="true"
        />
      );
  }
}
