export interface User {
  id: string;
  username: string;
  avatar: string;
  avatarColor: string;
  roi_total: number;
  roi_month: number;
  roi_week: number;
  streak: number;
  total_bets: number;
  won: number;
  lost: number;
  kelly_avg: number;
  best_month: string;
  bankroll_start: number;
  bankroll_current: number;
  following: number;
  followers: number;
  sport: string;
  verified: boolean;
}

export type BetResult = "won" | "lost" | "void" | "pending";

export interface Operation {
  id: string;
  user_id: string;
  match: string;
  league: string;
  market: string;
  odds: number;
  stake_pct: number;
  stake_kelly: number;
  result: BetResult;
  profit_pct: number;
  date: string;
  reasoning: string;
}

export interface BankrollPoint {
  date: string;
  value: number;
}

export interface FeedPost {
  id: string;
  user_id: string;
  match: string;
  league: string;
  market: string;
  odds: number;
  stake_pct: number;
  result: BetResult;
  profit_pct: number;
  reasoning: string;
  timestamp: string;
  likes: number;
  comments: number;
}

/* ── Users ── */
export const USERS: User[] = [
  {
    id: "u1", username: "xavi_stats", avatar: "XS", avatarColor: "#10b981",
    roi_total: 24.7, roi_month: 8.3, roi_week: 2.1, streak: 12,
    total_bets: 143, won: 89, lost: 54, kelly_avg: 0.06,
    best_month: "+18.4%", bankroll_start: 1000, bankroll_current: 1247,
    following: 234, followers: 1820, sport: "Fútbol", verified: true,
  },
  {
    id: "u2", username: "marc_analytics", avatar: "MA", avatarColor: "#6366f1",
    roi_total: 18.2, roi_month: 5.1, roi_week: -0.8, streak: 4,
    total_bets: 98, won: 61, lost: 37, kelly_avg: 0.05,
    best_month: "+12.1%", bankroll_start: 1000, bankroll_current: 1182,
    following: 89, followers: 743, sport: "Fútbol", verified: false,
  },
  {
    id: "u3", username: "jordi_value", avatar: "JV", avatarColor: "#f59e0b",
    roi_total: 14.5, roi_month: 3.2, roi_week: 1.4, streak: 7,
    total_bets: 215, won: 128, lost: 87, kelly_avg: 0.04,
    best_month: "+9.8%", bankroll_start: 1000, bankroll_current: 1145,
    following: 112, followers: 562, sport: "Baloncesto", verified: true,
  },
  {
    id: "u4", username: "nuria_picks", avatar: "NP", avatarColor: "#ec4899",
    roi_total: 11.8, roi_month: 4.7, roi_week: 0.9, streak: 3,
    total_bets: 76, won: 48, lost: 28, kelly_avg: 0.07,
    best_month: "+8.2%", bankroll_start: 1000, bankroll_current: 1118,
    following: 45, followers: 389, sport: "Tenis", verified: false,
  },
  {
    id: "u5", username: "dani_quant", avatar: "DQ", avatarColor: "#06b6d4",
    roi_total: 9.3, roi_month: 2.8, roi_week: -0.3, streak: 2,
    total_bets: 187, won: 112, lost: 75, kelly_avg: 0.04,
    best_month: "+7.1%", bankroll_start: 1000, bankroll_current: 1093,
    following: 67, followers: 298, sport: "Fútbol", verified: false,
  },
  {
    id: "u6", username: "pau_model", avatar: "PM", avatarColor: "#8b5cf6",
    roi_total: 6.1, roi_month: 1.4, roi_week: 0.5, streak: 1,
    total_bets: 54, won: 32, lost: 22, kelly_avg: 0.05,
    best_month: "+5.3%", bankroll_start: 1000, bankroll_current: 1061,
    following: 23, followers: 187, sport: "Fútbol", verified: false,
  },
  {
    id: "u7", username: "laia_tips", avatar: "LT", avatarColor: "#14b8a6",
    roi_total: 3.2, roi_month: -0.8, roi_week: -1.2, streak: 0,
    total_bets: 91, won: 52, lost: 39, kelly_avg: 0.04,
    best_month: "+4.1%", bankroll_start: 1000, bankroll_current: 1032,
    following: 34, followers: 124, sport: "Fútbol", verified: false,
  },
  {
    id: "u8", username: "roger_stats", avatar: "RS", avatarColor: "#f97316",
    roi_total: 1.4, roi_month: -2.1, roi_week: -0.9, streak: 0,
    total_bets: 63, won: 37, lost: 26, kelly_avg: 0.05,
    best_month: "+3.8%", bankroll_start: 1000, bankroll_current: 1014,
    following: 18, followers: 92, sport: "Baloncesto", verified: false,
  },
  {
    id: "u9", username: "anna_edge", avatar: "AE", avatarColor: "#a855f7",
    roi_total: -2.8, roi_month: -3.4, roi_week: -1.5, streak: 0,
    total_bets: 44, won: 24, lost: 20, kelly_avg: 0.06,
    best_month: "+2.1%", bankroll_start: 1000, bankroll_current: 972,
    following: 12, followers: 67, sport: "Tenis", verified: false,
  },
  {
    id: "u10", username: "toni_sharp", avatar: "TS", avatarColor: "#ef4444",
    roi_total: -4.2, roi_month: -2.9, roi_week: 0.4, streak: 2,
    total_bets: 38, won: 19, lost: 19, kelly_avg: 0.05,
    best_month: "+1.9%", bankroll_start: 1000, bankroll_current: 958,
    following: 8, followers: 43, sport: "Fútbol", verified: false,
  },
];

/* ── Operations for xavi_stats (u1) — 20 ops ── */
export const OPERATIONS: Operation[] = [
  { id: "op1", user_id: "u1", match: "Real Madrid vs Barcelona", league: "La Liga", market: "Over 2.5 goles", odds: 1.85, stake_pct: 5, stake_kelly: 0.06, result: "won", profit_pct: 4.25, date: "2026-05-03", reasoning: "Ambos equipos con más de 2.5 en últimos 5 partidos. Alta motivación en el clásico." },
  { id: "op2", user_id: "u1", match: "Arsenal vs Man City", league: "Premier League", market: "BTTS - Ambos marcan", odds: 1.75, stake_pct: 4, stake_kelly: 0.05, result: "won", profit_pct: 3.00, date: "2026-05-01", reasoning: "Arsenal en casa sin clean sheet en 7 partidos. City marca en todos sus desplazamientos." },
  { id: "op3", user_id: "u1", match: "Atlético vs Sevilla", league: "La Liga", market: "1X · No gana Sevilla", odds: 1.45, stake_pct: 8, stake_kelly: 0.08, result: "won", profit_pct: 3.60, date: "2026-04-28", reasoning: "Atlético en Metropolitano es fortísimo. Sevilla sin ganar fuera en 8 partidos." },
  { id: "op4", user_id: "u1", match: "Bayern vs PSG", league: "Champions League", market: "Bayern gana", odds: 2.10, stake_pct: 3, stake_kelly: 0.04, result: "lost", profit_pct: -3.00, date: "2026-04-25", reasoning: "Bayern en casa con racha de 5 victorias seguidas en UCL. PSG sin su goleador." },
  { id: "op5", user_id: "u1", match: "Liverpool vs Tottenham", league: "Premier League", market: "Over 3.5 goles", odds: 2.20, stake_pct: 3, stake_kelly: 0.04, result: "won", profit_pct: 3.60, date: "2026-04-22", reasoning: "Liverpool marca 2.4 goles por partido en casa. Tottenham no cierra bien atrás." },
  { id: "op6", user_id: "u1", match: "Inter vs Milan", league: "Serie A", market: "Inter gana", odds: 1.95, stake_pct: 5, stake_kelly: 0.06, result: "won", profit_pct: 4.75, date: "2026-04-19", reasoning: "Inter domina el derbi en las últimas 4 ediciones. Milan con bajas en defensa." },
  { id: "op7", user_id: "u1", match: "Barcelona vs Atlético", league: "La Liga", market: "Over 2.5 goles", odds: 1.80, stake_pct: 5, stake_kelly: 0.06, result: "lost", profit_pct: -5.00, date: "2026-04-16", reasoning: "Barça en casa produce muchos goles, pero el Atlético es el mejor equipo defensivo." },
  { id: "op8", user_id: "u1", match: "Man City vs Liverpool", league: "Premier League", market: "Empate", odds: 3.50, stake_pct: 2, stake_kelly: 0.03, result: "lost", profit_pct: -2.00, date: "2026-04-13", reasoning: "Clásico muy igualado con histórico de empates recientes en el Etihad." },
  { id: "op9", user_id: "u1", match: "Real Madrid vs Inter", league: "Champions League", market: "Real Madrid gana", odds: 1.70, stake_pct: 6, stake_kelly: 0.07, result: "won", profit_pct: 4.20, date: "2026-04-10", reasoning: "Madrid invicto en el Bernabéu en UCL esta temporada. Inter flojea fuera." },
  { id: "op10", user_id: "u1", match: "Sevilla vs Valencia", league: "La Liga", market: "BTTS", odds: 1.85, stake_pct: 4, stake_kelly: 0.05, result: "won", profit_pct: 3.40, date: "2026-04-07", reasoning: "Ambos equipos con problemas defensivos. Valencia marca fuera con regularidad." },
  { id: "op11", user_id: "u1", match: "Arsenal vs PSG", league: "Champions League", market: "Arsenal gana o empata", odds: 1.60, stake_pct: 7, stake_kelly: 0.08, result: "won", profit_pct: 4.20, date: "2026-04-04", reasoning: "Arsenal en el Emirates es muy sólido. PSG con historial negativo en Inglaterra." },
  { id: "op12", user_id: "u1", match: "Atlético vs Inter", league: "Champions League", market: "Under 2.5 goles", odds: 1.75, stake_pct: 5, stake_kelly: 0.06, result: "won", profit_pct: 3.75, date: "2026-04-01", reasoning: "Atlético el equipo con menos goles encajados en UCL. Inter también muy sólido atrás." },
  { id: "op13", user_id: "u1", match: "Barcelona vs Bayern", league: "Champions League", market: "Over 2.5 goles", odds: 1.90, stake_pct: 5, stake_kelly: 0.06, result: "lost", profit_pct: -5.00, date: "2026-03-28", reasoning: "Partido histórico con ambos ataques brillantes. Ambos equipos marcan más de 2 de media." },
  { id: "op14", user_id: "u1", match: "Real Madrid vs Man City", league: "Champions League", market: "Empate o Man City", odds: 2.80, stake_pct: 3, stake_kelly: 0.04, result: "lost", profit_pct: -3.00, date: "2026-03-25", reasoning: "City ha eliminado al Madrid las dos últimas veces. Odio al Madrid en este torneo." },
  { id: "op15", user_id: "u1", match: "Inter vs PSG", league: "Champions League", market: "Inter gana", odds: 2.40, stake_pct: 4, stake_kelly: 0.05, result: "won", profit_pct: 5.60, date: "2026-03-22", reasoning: "Inter sólido en casa. PSG sin sus mejores jugadores por lesión." },
  { id: "op16", user_id: "u1", match: "Villarreal vs Betis", league: "La Liga", market: "Over 2.5 goles", odds: 1.80, stake_pct: 5, stake_kelly: 0.06, result: "void", profit_pct: 0, date: "2026-03-19", reasoning: "Partido aplazado por lluvia." },
  { id: "op17", user_id: "u1", match: "Liverpool vs Arsenal", league: "Premier League", market: "Liverpool gana", odds: 1.85, stake_pct: 5, stake_kelly: 0.06, result: "won", profit_pct: 4.25, date: "2026-03-16", reasoning: "Liverpool en Anfield con 9 victorias seguidas en liga. Arsenal de visita pierde concentración." },
  { id: "op18", user_id: "u1", match: "Milan vs Juventus", league: "Serie A", market: "Milan gana", odds: 2.10, stake_pct: 4, stake_kelly: 0.05, result: "won", profit_pct: 4.40, date: "2026-03-13", reasoning: "Derby d'Italia en San Siro. Milan en racha de 4 victorias. Juventus irregular." },
  { id: "op19", user_id: "u1", match: "Getafe vs Celta", league: "La Liga", market: "Under 2.5 goles", odds: 1.70, stake_pct: 6, stake_kelly: 0.07, result: "won", profit_pct: 4.20, date: "2026-03-10", reasoning: "Getafe el equipo con menos goles del campeonato. Celta flojo en desplazamientos." },
  { id: "op20", user_id: "u1", match: "Osasuna vs Athletic", league: "La Liga", market: "BTTS", odds: 1.75, stake_pct: 4, stake_kelly: 0.05, result: "lost", profit_pct: -4.00, date: "2026-03-07", reasoning: "Ambos equipos marcan con regularidad. Partido muy abierto históricamente." },
];

/* ── Bankroll data (90 days, xavi_stats) ── */
function generateBankroll(): BankrollPoint[] {
  const points: BankrollPoint[] = [];
  let value = 1000;
  const start = new Date("2026-02-06");
  for (let i = 0; i < 90; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    // General uptrend with realistic drawdowns
    let delta: number;
    if (i < 15) delta = (Math.random() - 0.35) * 8; // early slight downtrend
    else if (i >= 15 && i < 30) delta = (Math.random() - 0.3) * 10; // recovery
    else if (i >= 30 && i < 45) delta = (Math.random() + 0.1) * 6; // uptrend
    else if (i >= 45 && i < 55) delta = (Math.random() - 0.55) * 9; // drawdown
    else if (i >= 55 && i < 75) delta = (Math.random() + 0.15) * 7; // strong uptrend
    else delta = (Math.random() - 0.2) * 6; // consolidation
    value = Math.max(940, value + delta);
    // Anchor final value near 1247
    if (i === 89) value = 1247;
    points.push({ date: dateStr, value: Math.round(value * 10) / 10 });
  }
  return points;
}

export const BANKROLL_DATA: BankrollPoint[] = generateBankroll();

/* ── Feed posts (15) ── */
export const FEED_POSTS: FeedPost[] = [
  { id: "f1", user_id: "u1", match: "Real Madrid vs Barcelona", league: "La Liga", market: "Over 2.5 goles", odds: 1.85, stake_pct: 5, result: "won", profit_pct: 4.25, reasoning: "Ambos equipos con más de 2.5 en últimos 5 partidos. Alta motivación.", timestamp: "hace 5 min", likes: 34, comments: 12 },
  { id: "f2", user_id: "u2", match: "Arsenal vs Man City", league: "Premier League", market: "BTTS", odds: 1.75, stake_pct: 4, result: "won", profit_pct: 3.00, reasoning: "Arsenal sin clean sheet en 7 partidos. City marca siempre.", timestamp: "hace 18 min", likes: 21, comments: 7 },
  { id: "f3", user_id: "u3", match: "Denver vs LA Lakers", league: "NBA", market: "Over 218.5", odds: 1.90, stake_pct: 4, result: "pending", profit_pct: 0, reasoning: "Ambos equipos por encima de 220 de media. Partido sin presión defensiva.", timestamp: "hace 32 min", likes: 8, comments: 3 },
  { id: "f4", user_id: "u1", match: "Atlético vs Sevilla", league: "La Liga", market: "1X", odds: 1.45, stake_pct: 8, result: "won", profit_pct: 3.60, reasoning: "Atlético en Metropolitano. Sevilla sin ganar fuera en 8.", timestamp: "hace 2h", likes: 47, comments: 18 },
  { id: "f5", user_id: "u4", match: "Alcaraz vs Sinner", league: "ATP", market: "Alcaraz gana", odds: 2.10, stake_pct: 3, result: "lost", profit_pct: -3.00, reasoning: "Alcaraz en tierra batida es favorito. Sinner no está al 100%.", timestamp: "hace 3h", likes: 15, comments: 9 },
  { id: "f6", user_id: "u2", match: "Liverpool vs Tottenham", league: "Premier League", market: "Over 3.5 goles", odds: 2.20, stake_pct: 3, result: "won", profit_pct: 3.60, reasoning: "Anfield muy goleador. Tottenham sin defensa.", timestamp: "hace 4h", likes: 29, comments: 11 },
  { id: "f7", user_id: "u5", match: "Bayern vs Dortmund", league: "Bundesliga", market: "Bayern gana", odds: 1.60, stake_pct: 6, result: "won", profit_pct: 3.60, reasoning: "Bayern invicto en el Allianz Arena en 2026.", timestamp: "hace 5h", likes: 19, comments: 6 },
  { id: "f8", user_id: "u1", match: "Inter vs Milan", league: "Serie A", market: "Inter gana", odds: 1.95, stake_pct: 5, result: "won", profit_pct: 4.75, reasoning: "Inter domina el derbi. Milan con bajas.", timestamp: "hace 7h", likes: 52, comments: 23 },
  { id: "f9", user_id: "u3", match: "Barcelona vs Real Madrid", league: "ACB", market: "Barcelona gana", odds: 1.80, stake_pct: 5, result: "lost", profit_pct: -5.00, reasoning: "Barça en casa con ventaja histórica en el Palau.", timestamp: "hace 9h", likes: 11, comments: 4 },
  { id: "f10", user_id: "u6", match: "Real Sociedad vs Osasuna", league: "La Liga", market: "Over 2.5", odds: 1.85, stake_pct: 4, result: "pending", profit_pct: 0, reasoning: "La Real con nuevo entrenador ataca más. Osasuna flojo atrás.", timestamp: "hace 11h", likes: 6, comments: 2 },
  { id: "f11", user_id: "u2", match: "Chelsea vs Newcastle", league: "Premier League", market: "Under 2.5 goles", odds: 1.70, stake_pct: 5, result: "won", profit_pct: 3.50, reasoning: "Chelsea con nueva defensa sólida. Newcastle muy conservador fuera.", timestamp: "hace 14h", likes: 18, comments: 7 },
  { id: "f12", user_id: "u1", match: "Bayern vs PSG", league: "Champions League", market: "Bayern gana", odds: 2.10, stake_pct: 3, result: "lost", profit_pct: -3.00, reasoning: "Bayern en casa con racha de 5 victorias en UCL.", timestamp: "hace 16h", likes: 31, comments: 14 },
  { id: "f13", user_id: "u4", match: "Djokovic vs Fritz", league: "ATP", market: "Djokovic gana", odds: 1.55, stake_pct: 6, result: "won", profit_pct: 3.30, reasoning: "Djokovic en pista rápida es imbatible. Fritz sin forma.", timestamp: "hace 19h", likes: 24, comments: 8 },
  { id: "f14", user_id: "u5", match: "Sevilla vs Valencia", league: "La Liga", market: "BTTS", odds: 1.85, stake_pct: 4, result: "won", profit_pct: 3.40, reasoning: "Ambos equipos con problemas defensivos crónicos.", timestamp: "hace 22h", likes: 14, comments: 5 },
  { id: "f15", user_id: "u7", match: "Villarreal vs Girona", league: "La Liga", market: "Over 2.5 goles", odds: 1.90, stake_pct: 4, result: "lost", profit_pct: -4.00, reasoning: "Girona el equipo más goleador de la liga. Villarreal con portero lesionado.", timestamp: "hace 1d", likes: 9, comments: 3 },
];

/* ── Helpers ── */
export function getUserById(id: string): User {
  return USERS.find((u) => u.id === id) ?? USERS[0];
}

export function getOperationsForUser(userId: string): Operation[] {
  return OPERATIONS.filter((o) => o.user_id === userId);
}

export const SORTED_USERS = [...USERS].sort((a, b) => b.roi_total - a.roi_total);
