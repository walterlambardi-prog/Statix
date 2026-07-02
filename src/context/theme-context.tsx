/**
 * src/context/theme-context.tsx
 *
 * Provides `theme` (current name), `toggleTheme`, and `setTheme` to the
 * whole app. Initial value follows the OS color-scheme; manual changes
 * override it for the session.
 */

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeName = 'light' | 'dark';

interface ThemeContextValue {
  /** Current active theme name */
  theme: ThemeName;
  /** Whether the theme currently matches the OS setting */
  isSystemTheme: boolean;
  /** Toggle between light and dark */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (name: ThemeName) => void;
  /** Reset to OS color-scheme */
  resetToSystem: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const rawScheme = useColorScheme();
  // RN 0.86 ColorSchemeName includes 'unspecified'; normalize to ThemeName
  const systemScheme = (rawScheme === 'dark' ? 'dark' : 'light') as ThemeName;
  const [override, setOverride] = useState<ThemeName | null>(null);

  const theme: ThemeName = override ?? systemScheme;
  const isSystemTheme = override === null;

  const toggleTheme = useCallback(() => {
    setOverride((prev) => {
      const current = prev ?? systemScheme;
      return current === 'light' ? 'dark' : 'light';
    });
  }, [systemScheme]);

  const setTheme = useCallback((name: ThemeName) => {
    setOverride(name);
  }, []);

  const resetToSystem = useCallback(() => {
    setOverride(null);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isSystemTheme, toggleTheme, setTheme, resetToSystem }),
    [theme, isSystemTheme, toggleTheme, setTheme, resetToSystem]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within <ThemeProvider>');
  }
  return ctx;
}
