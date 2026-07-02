import { Screen } from '@/components/ui/screen';
import { Paragraph, YStack } from 'tamagui';

export default function HomeScreen() {
  return (
    <Screen>
      <YStack flex={1} style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Paragraph fontSize="$5" color="$muted" style={{ textAlign: 'center' }}>
          Welcome to Stratix
        </Paragraph>
      </YStack>
    </Screen>
  );
}
