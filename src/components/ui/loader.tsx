import { ActivityIndicator } from 'react-native';
import { YStack } from 'tamagui';

interface LoaderProps {
  size?: 'small' | 'large';
}

export function Loader({ size = 'large' }: LoaderProps) {
  return (
    <YStack flex={1} items="center" justify="center">
      <ActivityIndicator size={size} color="$primary" />
    </YStack>
  );
}
