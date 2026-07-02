/**
 * src/hooks/use-app-theme.ts
 *
 * Convenience hook that combines:
 *  - `theme` name + toggle helpers (from ThemeContext)
 *  - Typed Tamagui token values (from Tamagui's own useTheme)
 *
 * Usage:
 *   const { theme, toggleTheme, tokens } = useAppTheme()
 *   // tokens.primary.val → '#6366f1' (light) | '#818cf8' (dark)
 */

import { useTheme } from 'tamagui';
import { useThemeContext } from '../context/theme-context';

export function useAppTheme() {
  const { theme, isSystemTheme, toggleTheme, setTheme, resetToSystem } = useThemeContext();
  const tokens = useTheme();

  return {
    /** 'light' | 'dark' */
    theme,
    /** true when following OS preference */
    isSystemTheme,
    /** Toggle between light ↔ dark */
    toggleTheme,
    /** Override to a specific theme */
    setTheme,
    /** Revert to OS color-scheme */
    resetToSystem,
    /** All typed Tamagui theme tokens — use `.val` to get the raw string */
    tokens,
  };
}
