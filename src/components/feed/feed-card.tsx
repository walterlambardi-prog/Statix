import { Image } from 'expo-image';
import { Paragraph, Text, YStack, styled } from 'tamagui';
import { formatDate, openArticle } from '../../lib/feed-utils';
import { type RssItem } from '../../lib/rss-parser';

// ─── Styled primitives ────────────────────────────────────────────────────────

const PressableCard = styled(YStack, {
  cursor: 'pointer',
  pressStyle: { opacity: 0.72 },
});

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ label }: { label: string }) {
  return (
    <YStack
      bg="$primary"
      style={{
        alignSelf: 'flex-start',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 4,
      }}>
      <Text fontSize={10} fontWeight="700" color="$primaryFg" letterSpacing={0.6}>
        {label.toUpperCase()}
      </Text>
    </YStack>
  );
}

// ─── Featured card (first item) ───────────────────────────────────────────────

function FeaturedCard({ item }: { item: RssItem }) {
  return (
    <YStack style={{ marginLeft: 16, marginRight: 16, marginTop: 16, marginBottom: 8 }}>
      <PressableCard
        position="relative"
        rounded="$5"
        overflow="hidden"
        bg="$surface"
        borderWidth={1}
        borderColor="$borderColor"
        onPress={() => openArticle(item.link)}>
        {/* Hero image */}
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: '100%', height: 220 }}
            contentFit="cover"
          />
        ) : (
          <YStack width="100%" height={220} bg="$surface" />
        )}

        {/* Overlay */}
        <YStack
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            gap: 8,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          {item.category && <CategoryBadge label={item.category} />}
          <Paragraph fontSize="$5" fontWeight="700" color="white" numberOfLines={3} lineHeight={24}>
            {item.title}
          </Paragraph>
          <Text fontSize="$2" color="rgba(255,255,255,0.7)">
            {formatDate(item.pubDate)}
          </Text>
        </YStack>
      </PressableCard>
    </YStack>
  );
}

// ─── Regular card ─────────────────────────────────────────────────────────────

const RegularPressable = styled(YStack, {
  flexDirection: 'row',
  gap: '$3',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  bg: '$background',
  cursor: 'pointer',
  pressStyle: { opacity: 0.72 },
});

function RegularCard({ item }: { item: RssItem }) {
  return (
    <RegularPressable
      onPress={() => openArticle(item.link)}
      style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12 }}>
      <YStack flex={1} style={{ gap: 4 }}>
        {item.category && (
          <Text fontSize={10} fontWeight="700" color="$primary" letterSpacing={0.6}>
            {item.category.toUpperCase()}
          </Text>
        )}
        <Paragraph fontSize="$3" fontWeight="600" color="$color" numberOfLines={3} lineHeight={20}>
          {item.title}
        </Paragraph>
        <Text fontSize="$2" color="$muted" style={{ marginTop: 4 }}>
          {formatDate(item.pubDate)}
        </Text>
      </YStack>

      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 80, height: 80, borderRadius: 10 }}
          contentFit="cover"
        />
      )}
    </RegularPressable>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

interface FeedCardProps {
  item: RssItem;
  featured?: boolean;
}

export function FeedCard({ item, featured = false }: FeedCardProps) {
  return featured ? <FeaturedCard item={item} /> : <RegularCard item={item} />;
}
