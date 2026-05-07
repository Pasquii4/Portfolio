export type Signal = "LONG" | "SHORT" | "NEUTRAL";

export interface Asset {
  ticker: string;
  name: string;
  price: string;
  change: string;
  changePositive: boolean;
  rsi: number;
  signal: Signal;
  score: number;
  entry: string;
  tp: string;
  sl: string;
  reasoning: string;
}

export const assets: Asset[] = [
  { ticker: "AAPL", name: "Apple Inc.", price: "$182.45", change: "+1.23%", changePositive: true, rsi: 42, signal: "LONG", score: 85, entry: "$181.20", tp: "$192.50", sl: "$176.80", reasoning: "RSI en zona neutra-baja con momentum alcista. MACD cruce positivo en daily. Soporte fuerte en $180. Volumen creciente las últimas 3 sesiones." },
  { ticker: "MSFT", name: "Microsoft Corp.", price: "$378.20", change: "+0.87%", changePositive: true, rsi: 38, signal: "LONG", score: 82, entry: "$376.50", tp: "$395.00", sl: "$368.00", reasoning: "RSI bajo indica margen de subida. Bollinger inferior tocado recientemente. Estructura de precio alcista en semanal." },
  { ticker: "NVDA", name: "NVIDIA Corp.", price: "$495.80", change: "+2.41%", changePositive: true, rsi: 71, signal: "LONG", score: 91, entry: "$493.00", tp: "$530.00", sl: "$478.00", reasoning: "Momentum extremo sostenido. RSI alto pero sin divergencia bajista. Volumen institucional confirmado. Sector IA en expansión." },
  { ticker: "TSLA", name: "Tesla Inc.", price: "$238.60", change: "-1.54%", changePositive: false, rsi: 68, signal: "SHORT", score: 78, entry: "$240.00", tp: "$218.00", sl: "$252.00", reasoning: "RSI descendente desde sobrecompra. MACD cruce negativo. Resistencia fuerte en $245 rechazada 3 veces. Volumen de venta creciente." },
  { ticker: "AMZN", name: "Amazon.com Inc.", price: "$178.90", change: "+0.43%", changePositive: true, rsi: 55, signal: "NEUTRAL", score: 64, entry: "—", tp: "—", sl: "—", reasoning: "Sin señal clara. RSI neutral. Precio en rango lateral. Esperar ruptura de $182 o soporte en $174 para generar señal." },
  { ticker: "GOOGL", name: "Alphabet Inc.", price: "$140.25", change: "+0.91%", changePositive: true, rsi: 44, signal: "LONG", score: 79, entry: "$139.00", tp: "$150.00", sl: "$134.50", reasoning: "Rebote en media de 50 sesiones. RSI en zona de oportunidad. Earnings próximos con expectativas positivas." },
  { ticker: "META", name: "Meta Platforms", price: "$485.30", change: "-0.87%", changePositive: false, rsi: 72, signal: "SHORT", score: 72, entry: "$488.00", tp: "$460.00", sl: "$502.00", reasoning: "Divergencia bajista en RSI. Precio en zona de resistencia histórica. Bollinger superior perforado y rechazo. Volumen decreciente en subidas." },
  { ticker: "BTC", name: "Bitcoin", price: "$67,420", change: "+1.87%", changePositive: true, rsi: 58, signal: "LONG", score: 76, entry: "$66,800", tp: "$72,000", sl: "$63,500", reasoning: "Halving reciente. RSI en zona media con tendencia alcista. Flujos institucionales positivos. Soporte en $65k consolidado." },
  { ticker: "ETH", name: "Ethereum", price: "$3,245", change: "+0.92%", changePositive: true, rsi: 52, signal: "NEUTRAL", score: 61, entry: "—", tp: "—", sl: "—", reasoning: "Correlación alta con BTC pero sin momentum propio. RSI neutral. Esperar confirmación de ruptura de $3,400 para señal alcista." },
  { ticker: "SPY", name: "SPDR S&P 500", price: "$479.80", change: "+0.34%", changePositive: true, rsi: 48, signal: "NEUTRAL", score: 58, entry: "—", tp: "—", sl: "—", reasoning: "Índice en rango lateral. Sin señal direccional clara. Volumen medio. Esperar ruptura de máximos o pérdida de soporte en $475." },
];

export interface Alert {
  time: string;
  ticker: string;
  signal: Signal;
  score: number;
}

export const alerts: Alert[] = [
  { time: "14:32", ticker: "NVDA", signal: "LONG", score: 91 },
  { time: "14:28", ticker: "TSLA", signal: "SHORT", score: 78 },
  { time: "14:15", ticker: "AAPL", signal: "LONG", score: 85 },
  { time: "14:02", ticker: "META", signal: "SHORT", score: 72 },
  { time: "13:58", ticker: "SPY", signal: "NEUTRAL", score: 61 },
];

export const indices = [
  { name: "S&P 500", value: "4,847.23", change: "+0.34%", positive: true },
  { name: "NASDAQ", value: "17,234.10", change: "-0.12%", positive: false },
  { name: "BTC/USD", value: "67,420.00", change: "+1.87%", positive: true },
];

export function signalColor(signal: Signal): string {
  switch (signal) {
    case "LONG": return "text-emerald-400";
    case "SHORT": return "text-red-400";
    case "NEUTRAL": return "text-amber-400";
  }
}

export function signalBg(signal: Signal): string {
  switch (signal) {
    case "LONG": return "bg-emerald-400/15 text-emerald-400 border-emerald-400/30";
    case "SHORT": return "bg-red-400/15 text-red-400 border-red-400/30";
    case "NEUTRAL": return "bg-amber-400/15 text-amber-400 border-amber-400/30";
  }
}

export function signalDot(signal: Signal): string {
  switch (signal) {
    case "LONG": return "bg-emerald-400";
    case "SHORT": return "bg-red-400";
    case "NEUTRAL": return "bg-amber-400";
  }
}

export const candleData = [
  { o: 178, h: 183, l: 176, c: 181 },
  { o: 181, h: 185, l: 179, c: 184 },
  { o: 184, h: 186, l: 180, c: 180 },
  { o: 180, h: 184, l: 178, c: 183 },
  { o: 183, h: 188, l: 182, c: 187 },
  { o: 187, h: 190, l: 184, c: 185 },
  { o: 185, h: 189, l: 183, c: 188 },
  { o: 188, h: 192, l: 186, c: 186 },
  { o: 186, h: 190, l: 185, c: 189 },
  { o: 189, h: 193, l: 187, c: 191 },
  { o: 191, h: 194, l: 188, c: 188 },
  { o: 188, h: 191, l: 186, c: 190 },
  { o: 190, h: 196, l: 189, c: 195 },
  { o: 195, h: 198, l: 192, c: 193 },
  { o: 193, h: 197, l: 191, c: 196 },
  { o: 196, h: 199, l: 193, c: 194 },
  { o: 194, h: 198, l: 192, c: 197 },
  { o: 197, h: 200, l: 194, c: 195 },
  { o: 195, h: 199, l: 193, c: 198 },
  { o: 198, h: 201, l: 195, c: 196 },
];
