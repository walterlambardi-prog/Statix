import { Screen } from '@/components/ui/screen';
import { MarketList } from '../../components/feed/market-list';
import { useMarketPrices } from '../../hooks/use-market-prices';

export default function MarketScreen() {
  const { tickers, loading, error, refresh } = useMarketPrices();

  return (
    <Screen>
      <MarketList tickers={tickers} loading={loading} error={error} onRefresh={refresh} />
    </Screen>
  );
}
