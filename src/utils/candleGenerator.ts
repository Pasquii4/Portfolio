import { Candle } from "../types/backgrounds";

export function generateCandle(previousClose: number): Candle {
    const open = previousClose;
    const close = open + (Math.random() - 0.49) * 120; // slight bullish bias
    const high = Math.max(open, close) + Math.random() * 60;
    const low = Math.min(open, close) - Math.random() * 60;
    const volume = Math.random() * 0.7 + 0.3; // normalized 0-1

    return {
        open,
        close,
        high,
        low,
        volume,
        x: 0, // mutable, set later by the renderer
    };
}
