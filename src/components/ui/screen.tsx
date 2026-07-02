import { type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
}

export function Screen({ children, style, edges = ['left', 'right', 'bottom'] }: ScreenProps) {
  return (
    <YStack flex={1} bg="$background">
      <SafeAreaView style={[{ flex: 1, backgroundColor: 'transparent' }, style]} edges={edges}>
        {children}
      </SafeAreaView>
    </YStack>
  );
}
