import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeedList } from '../../components/feed/feed-list';
import { useRssFeed } from '../../hooks/use-rss-feed';

const COINDESK_RSS = 'https://www.coindesk.com/arc/outboundfeeds/rss';

export default function NewsScreen() {
  const { items, loading, error, refresh } = useRssFeed(COINDESK_RSS);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.appName}>Stratix</Text>
        <Text style={styles.screenName}>News</Text>
      </View>
      <FeedList items={items} loading={loading} error={error} onRefresh={refresh} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  screenName: {
    fontSize: 13,
    fontWeight: '400',
    color: '#999',
    marginTop: 2,
  },
});
