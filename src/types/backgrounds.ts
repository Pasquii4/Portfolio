export type Theme = "dark" | "system";

export interface Candle {
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    x: number;  // current canvas x position (mutable during scroll)
}

export interface AppBackgroundProps {
    theme: Theme;
}
