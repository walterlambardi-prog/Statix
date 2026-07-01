import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { type RssItem } from '../../lib/rss-parser';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function openArticle(url: string) {
  if (!url) return;
  Linking.openURL(url);
}

interface FeedCardProps {
  item: RssItem;
  featured?: boolean;
}

export function FeedCard({ item, featured = false }: FeedCardProps) {
  if (featured) {
    return (
      <Pressable
        style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}
        onPress={() => openArticle(item.link)}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.featuredImage} resizeMode="cover" />
        ) : (
          <View style={[styles.featuredImage, styles.imagePlaceholder]} />
        )}
        <View style={styles.featuredOverlay}>
          {item.category ? (
            <View style={styles.badgeLight}>
              <Text style={styles.badgeLightText}>{item.category.toUpperCase()}</Text>
            </View>
          ) : null}
          <Text style={styles.featuredTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.featuredDate}>{formatDate(item.pubDate)}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => openArticle(item.link)}>
      <View style={styles.cardBody}>
        {item.category ? (
          <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
        ) : null}
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.date}>{formatDate(item.pubDate)}</Text>
      </View>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} resizeMode="cover" />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Featured (first card)
  featuredCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  featuredImage: {
    width: '100%',
    height: 220,
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  badgeLight: {
    alignSelf: 'flex-start',
    backgroundColor: '#208AEF',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeLightText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.6,
  },
  featuredTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 24,
  },
  featuredDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  imagePlaceholder: {
    backgroundColor: '#e8e8e8',
  },
  pressed: {
    opacity: 0.75,
  },
  // Regular card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    gap: 12,
    backgroundColor: '#fff',
  },
  cardBody: {
    flex: 1,
    gap: 5,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#208AEF',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    lineHeight: 20,
  },
  date: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
});
