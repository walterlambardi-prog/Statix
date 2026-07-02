import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XStack, YStack } from 'tamagui';
import { useThemeContext } from '../../context/theme-context';

export interface DrawerHeaderProps {
  showBurger?: boolean;
}

export function DrawerHeader({ showBurger = true }: DrawerHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const iconColor = theme === 'dark' ? '#f4f4f5' : '#0f172a';

  return (
    <XStack
      bg="$background"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      px="$4"
      pb="$3"
      gap="$3"
      items="center"
      style={{ paddingTop: insets.top + 10 }}>
      {showBurger && (
        <YStack
          width={34}
          height={34}
          rounded="$2"
          items="center"
          justify="center"
          pressStyle={{ bg: '$surface', opacity: 0.8 }}
          cursor="pointer"
          onPress={() => navigation.dispatch({ type: 'TOGGLE_DRAWER' })}>
          <Ionicons name="menu" size={24} color={iconColor} />
        </YStack>
      )}

      <Text fontSize="$5" fontWeight="700" color="$color" letterSpacing={0.3}>
        Stratix
      </Text>
    </XStack>
  );
}
