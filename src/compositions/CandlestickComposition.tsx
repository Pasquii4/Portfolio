import React from 'react';
import { CandlestickScroll } from '../components/CandlestickScroll';

export const CandlestickComposition: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <CandlestickScroll />
        </div>
    );
};
