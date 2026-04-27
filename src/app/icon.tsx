import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const size = { width: 32, height: 32 };
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
                    fontSize: 22,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    borderRadius: '6px',
                }}
            >
                {'//'}
            </div>
        ),
        { ...size }
    );
}
