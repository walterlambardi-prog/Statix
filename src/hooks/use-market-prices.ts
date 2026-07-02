import { useCallback, useEffect, useState } from 'react';

const BINANCE_BASE = 'https://api.binance.com';

// Top symbols to display by default
const DEFAULT_SYMBOLS = [
  'BTCUSDT',
  'ETHUSDT',
  'BNBUSDT',
  'SOLUSDT',
  'XRPUSDT',
  'ADAUSDT',
  'DOGEUSDT',
  'AVAXUSDT',
  'MATICUSDT',
  'DOTUSDT',
  'LTCUSDT',
  'LINKUSDT',
  'UNIUSDT',
  'ATOMUSDT',
  'NEARUSDT',
  'AAVEUSDT',
  'SHIBUSDT',
  'TRXUSDT',
  'ICPUSDT',
  'FILUSDT',
  'APTUSDT',
  'ARBUSDT',
  'OPUSDT',
  'INJUSDT',
  'SUIUSDT',
  'SEIUSDT',
  'TIAUSDT',
  'JUPUSDT',
  'WIFUSDT',
  'PEPEUSDT',
];

export interface MarketTicker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
}

interface UseMarketPricesResult {
  tickers: MarketTicker[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

// Stable reference for the default symbols array to avoid effect re-runs
const STABLE_DEFAULT_SYMBOLS = DEFAULT_SYMBOLS;

export function useMarketPrices(symbols: string[] = STABLE_DEFAULT_SYMBOLS): UseMarketPricesResult {
  const [tickers, setTickers] = useState<MarketTicker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Stable JSON key so the effect only re-runs when symbols actually change
  const symbolsKey = JSON.stringify(symbols);

  useEffect(() => {
    let cancelled = false;

    const url = `${BINANCE_BASE}/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsKey)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<MarketTicker[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setTickers(data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load prices');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [symbolsKey, refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return { tickers, loading, error, refresh };
}
