import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { type RssItem } from '../../lib/rss-parser';
import { FeedCard } from './feed-card';

interface FeedListProps {
  items: RssItem[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function FeedList({ items, loading, error, onRefresh }: FeedListProps) {
  if (loading && items.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#208AEF" />
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={onRefresh}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => <FeedCard item={item} featured={index === 0} />}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor="#208AEF" />
      }
      contentContainerStyle={items.length === 0 ? styles.center : styles.list}
      ListEmptyComponent={<Text style={styles.emptyText}>No articles available</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 14,
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#208AEF',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
