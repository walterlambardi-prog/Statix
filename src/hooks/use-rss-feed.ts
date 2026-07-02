import { isWeb } from '@/lib/platform';
import { useCallback, useEffect, useState } from 'react';
import { type RssItem, parseRssFeed } from '../lib/rss-parser';

function resolveFeedUrl(url: string): string {
  // Web: browsers enforce CORS — proxy through the server-side API route.
  // Native: no CORS restrictions, fetch the feed URL directly.
  if (isWeb) return `/api/rss?url=${encodeURIComponent(url)}`;
  return url;
}

interface UseFeedResult {
  items: RssItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useRssFeed(url: string): UseFeedResult {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch(resolveFeedUrl(url))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setItems(parseRssFeed(text));
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load feed');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url, refreshKey]);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshKey((k) => k + 1);
  }, []);

  return { items, loading, error, refresh };
}
