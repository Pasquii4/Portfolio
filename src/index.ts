import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { MatrixRainComposition } from './compositions/MatrixRainComposition';
import { CandlestickComposition } from './compositions/CandlestickComposition';

// Export components for typical React usage
export { AppBackground } from './components/AppBackground';
export { MatrixRain } from './components/MatrixRain';
export { CandlestickScroll } from './components/CandlestickScroll';
export * from './types/backgrounds';
export { generateCandle } from './utils/candleGenerator';

export const RemotionRoot: React.FC = () => {
    return React.createElement(React.Fragment, null,
        React.createElement(Composition, {
            id: "MatrixRain",
            component: MatrixRainComposition,
            durationInFrames: 600,
            fps: 20,
            width: 1920,
            height: 1080
        }),
        React.createElement(Composition, {
            id: "CandlestickScroll",
            component: CandlestickComposition,
            durationInFrames: 900,
            fps: 30,
            width: 1920,
            height: 1080
        })
    );
};

// Register the root
registerRoot(RemotionRoot);
