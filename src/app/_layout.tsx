// tamagui.generated.css is auto-created by the Metro plugin on first build.
// Import it for web SSR (output: "server") so themes are injected as CSS vars.
// The file won't exist until after the first `expo export --platform web`,
// so the import is guarded to avoid breaking native bundling.
import '../../tamagui.generated.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../../tamagui.config';
import { ThemeProvider, useThemeContext } from '../context/theme-context';

function InnerLayout() {
  const { isUpdatePending } = Updates.useUpdates();
  const { theme } = useThemeContext();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
      <SafeAreaProvider>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(drawer)" />
        </Stack>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
