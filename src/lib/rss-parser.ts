export interface RssItem {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category?: string;
  imageUrl?: string;
}

function extractTag(xml: string, tag: string): string {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();

  const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const plainMatch = xml.match(plainRe);
  if (plainMatch) return plainMatch[1].trim();

  return '';
}

function extractMediaUrl(xml: string): string | undefined {
  const match = xml.match(/<media:content[^>]+url="([^"]+)"/);
  return match ? match[1] : undefined;
}

export function parseRssFeed(xml: string): RssItem[] {
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];
  return itemMatches.map((item, index) => {
    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link');
    const description = extractTag(item, 'description');
    const pubDate = extractTag(item, 'pubDate');
    const category = extractTag(item, 'category');
    const imageUrl = extractMediaUrl(item);
    return {
      id: link || String(index),
      title,
      link,
      description: description.replace(/<[^>]+>/g, '').trim(),
      pubDate,
      category: category || undefined,
      imageUrl,
    };
  });
}
