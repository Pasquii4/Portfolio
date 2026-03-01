import React from 'react';
import { MatrixRain } from '../components/MatrixRain';

export const MatrixRainComposition: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <MatrixRain />
        </div>
    );
};
