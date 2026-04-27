import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pau Pascual — Product Builder';
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
                    background: '#0f0e0c',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    color: '#e8e6e1',
                    fontFamily: 'monospace',
                    borderLeft: '15px solid #37cda5',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ color: '#37cda5', fontSize: 40, marginRight: 20 }}>{'>_'}</div>
                    <div style={{ fontSize: 40, color: '#37cda5', letterSpacing: '-0.02em', fontWeight: 600 }}>Pau Pascual</div>
                </div>
                <div style={{ fontSize: 90, fontWeight: 800, marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Product Builder
                </div>
                <div style={{ fontSize: 32, color: '#b6b0a6', marginTop: '30px' }}>
                    Trading systems · Local AI agents · Custom web apps
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
