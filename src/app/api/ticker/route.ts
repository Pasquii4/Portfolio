import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.POLYGON_API_KEY;
        const tickers = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'BTC-USD', 'ETH-USD'];

        // Mock data when no API key is provided since the user didn't set one yet
        if (!apiKey || apiKey === "your_api_key_here") {
            const mockData = tickers.map(symbol => {
                const basePrice = symbol.includes('BTC') ? 64000 : symbol.includes('ETH') ? 3500 : 150 + Math.random() * 100;
                const mockChange = (Math.random() * 4) - 2; // -2% to +2%
                return {
                    symbol,
                    price: basePrice + (basePrice * (mockChange / 100)),
                    changePercent: mockChange
                };
            });
            return NextResponse.json(mockData);
        }

        // Polygon API allows 5 calls/minute on free tier.
        // For production we'd use WebSockets or batching. For this demo we'll fetch a group snapshot.
        const response = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers.filter(t => !t.includes('-')).join(',')}&apiKey=${apiKey}`, { next: { revalidate: 60 } });
        const cryptoResponse = await fetch(`https://api.polygon.io/v2/snapshot/locale/global/markets/crypto/tickers?tickers=X:BTCUSD,X:ETHUSD&apiKey=${apiKey}`, { next: { revalidate: 60 } });

        let results: { symbol: string, price: number, changePercent: number }[] = [];

        if (response.ok) {
            const data = await response.json();
            if (data.tickers) {
                const stocks = data.tickers.map((t: any) => ({
                    symbol: t.ticker,
                    price: t.todaysChangePerc === undefined ? t.min?.c || 0 : t.day?.c || 0,
                    changePercent: t.todaysChangePerc || 0
                }));
                results = [...results, ...stocks];
            }
        }

        if (cryptoResponse.ok) {
            const cryptoData = await cryptoResponse.json();
            if (cryptoData.tickers) {
                const cryptos = cryptoData.tickers.map((t: any) => ({
                    symbol: t.ticker.replace('X:', '').replace('USD', '-USD'),
                    price: t.todaysChangePerc === undefined ? t.min?.c || 0 : t.day?.c || 0,
                    changePercent: t.todaysChangePerc || 0
                }));
                results = [...results, ...cryptos];
            }
        }

        if (results.length === 0) {
            throw new Error("No data fetched from Polygon");
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error("Ticker API Error:", error);
        return NextResponse.json({ error: 'Failed to fetch ticker data' }, { status: 500 });
    }
}
