import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pau Pascual - Backend & FinTech Developer';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                    borderLeft: '15px solid #00ff9d',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ color: '#00ff9d', fontSize: 40, marginRight: 20 }}>{'>_'}</div>
                    <div style={{ fontSize: 40, color: '#00ff9d', letterSpacing: '-0.02em', fontWeight: 600 }}>Pau Pascual</div>
                </div>
                <div style={{ fontSize: 90, fontWeight: 800, marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Backend &<br />FinTech Developer
                </div>
                <div style={{ fontSize: 32, color: '#888888', marginTop: '30px' }}>
                    Python · FastAPI · JS/TS · Algoritmos de Trading
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
