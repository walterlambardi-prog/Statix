import { Linking } from 'react-native';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function openArticle(url: string) {
  if (url) Linking.openURL(url);
}
