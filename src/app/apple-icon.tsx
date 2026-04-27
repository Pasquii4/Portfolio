import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0f0e0c',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#37cda5',
                    fontSize: 80,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    borderRadius: '16px',
                }}
            >
                {'//'}
            </div>
        ),
        { ...size }
    );
}
