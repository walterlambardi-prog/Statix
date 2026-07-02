/**
 * src/components/ui/theme-toggle.tsx
 *
 * A pressable pill that toggles between light and dark themes.
 * Uses only Tamagui primitives — renders natively on iOS/Android
 * and as standard DOM elements on web.
 *
 * Usage:
 *   <ThemeToggle />                 ← default icon + label
 *   <ThemeToggle showLabel={false} /> ← icon only
 */

import { Text, XStack } from 'tamagui';
import { useAppTheme } from '../../hooks/use-app-theme';

interface ThemeToggleProps {
  showLabel?: boolean;
}

export function ThemeToggle({ showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useAppTheme();
  const isDark = theme === 'dark';

  return (
    <XStack
      onPress={toggleTheme}
      gap="$2"
      items="center"
      px="$3"
      py="$2"
      bg="$surface"
      borderWidth={1}
      borderColor="$borderColor"
      rounded="$3"
      cursor="pointer"
      pressStyle={{ opacity: 0.8, scale: 0.97 }}
      hoverStyle={{ borderColor: '$primary' }}>
      <Text fontSize={16} lineHeight={20}>
        {isDark ? '🌙' : '☀️'}
      </Text>

      {showLabel && (
        <Text fontSize="$3" color="$color" fontWeight="500">
          {isDark ? 'Dark' : 'Light'}
        </Text>
      )}
    </XStack>
  );
}
