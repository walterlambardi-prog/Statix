import { Screen } from '@/components/ui/screen';
import { FeedList } from '../../components/feed/feed-list';
import { useRssFeed } from '../../hooks/use-rss-feed';

const COINDESK_RSS = 'https://www.coindesk.com/arc/outboundfeeds/rss';

export default function NewsScreen() {
  const { items, loading, error, refresh } = useRssFeed(COINDESK_RSS);

  return (
    <Screen>
      <FeedList items={items} loading={loading} error={error} onRefresh={refresh} />
    </Screen>
  );
}
