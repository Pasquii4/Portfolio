export type Theme = "dark" | "bloomberg";

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
