import { FlatList, RefreshControl } from 'react-native';
import { Paragraph, Text, YStack } from 'tamagui';
import { type RssItem } from '../../lib/rss-parser';
import { Loader } from '../ui/loader';
import { FeedCard } from './feed-card';

interface FeedListProps {
  items: RssItem[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function FeedList({ items, loading, error, onRefresh }: FeedListProps) {
  if (loading && items.length === 0) {
    return <Loader />;
  }

  if (error && items.length === 0) {
    return (
      <YStack
        flex={1}
        bg="$background"
        style={{ alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 }}>
        <Paragraph fontSize="$4" color="$error" style={{ textAlign: 'center' }}>
          {error}
        </Paragraph>
        <Text
          fontSize="$4"
          color="$primary"
          fontWeight="600"
          onPress={onRefresh}
          pressStyle={{ opacity: 0.7 }}>
          Tap to retry
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="$background">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <FeedCard item={item} featured={index === 0} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        contentContainerStyle={items.length === 0 ? { flex: 1 } : { paddingBottom: 16 }}
        ListEmptyComponent={
          <YStack flex={1} style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <Text fontSize="$4" color="$muted">
              No articles available
            </Text>
          </YStack>
        }
      />
    </YStack>
  );
}
