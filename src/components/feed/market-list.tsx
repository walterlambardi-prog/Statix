import { type MarketTicker } from '@/hooks/use-market-prices';
import { ActivityIndicator, FlatList, Image, RefreshControl } from 'react-native';
import { Paragraph, Separator, Text, XStack, YStack, useTheme } from 'tamagui';

// Strip "USDT" suffix for a cleaner label: "BTCUSDT" → "BTC"
function formatSymbol(symbol: string): string {
  return symbol.replace(/USDT$/, '');
}

// CoinCap serves icons by lowercase ticker: btc, eth, bnb...
function getIconUrl(symbol: string): string {
  return `https://assets.coincap.io/assets/icons/${formatSymbol(symbol).toLowerCase()}@2x.png`;
}

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (num >= 1000) return `$${num.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (num >= 1) return `$${num.toFixed(4)}`;
  return `$${num.toFixed(6)}`;
}

function formatChange(pct: string): string {
  const num = parseFloat(pct);
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
}

interface TickerRowProps {
  item: MarketTicker;
}

function TickerRow({ item }: TickerRowProps) {
  const theme = useTheme();
  const changeNum = parseFloat(item.priceChangePercent);
  const isPositive = changeNum >= 0;

  const positiveColor = theme.green10?.val ?? '#22c55e';
  const negativeColor = theme.red10?.val ?? '#ef4444';
  const changeColor = isPositive ? positiveColor : negativeColor;

  return (
    <XStack
      px="$4"
      py="$3"
      bg="$background"
      style={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <XStack gap="$3" flex={1} style={{ alignItems: 'center' }}>
        <YStack
          width={40}
          height={40}
          bg="$surface"
          overflow="hidden"
          style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={{ uri: getIconUrl(item.symbol) }}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
        </YStack>
        <YStack>
          <Text fontSize="$4" fontWeight="600" color="$color">
            {formatSymbol(item.symbol)}
          </Text>
          <Paragraph fontSize="$2" color="$muted">
            Vol {parseFloat(item.volume).toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </Paragraph>
        </YStack>
      </XStack>
      <YStack style={{ alignItems: 'flex-end' }}>
        <Text fontSize="$4" fontWeight="600" color="$color">
          {formatPrice(item.lastPrice)}
        </Text>
        <Text fontSize="$2" fontWeight="500" style={{ color: changeColor }}>
          {formatChange(item.priceChangePercent)}
        </Text>
      </YStack>
    </XStack>
  );
}

interface MarketListProps {
  tickers: MarketTicker[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function MarketList({ tickers, loading, error, onRefresh }: MarketListProps) {
  const theme = useTheme();

  if (loading && tickers.length === 0) {
    return (
      <YStack flex={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary?.val ?? '#6366f1'} />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} px="$6" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Paragraph fontSize="$4" color="$muted" style={{ textAlign: 'center' }}>
          {error}
        </Paragraph>
      </YStack>
    );
  }

  return (
    <FlatList
      data={tickers}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => <TickerRow item={item} />}
      ItemSeparatorComponent={() => <Separator borderColor="$borderColor" />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={theme.primary?.val ?? '#6366f1'}
        />
      }
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
}
