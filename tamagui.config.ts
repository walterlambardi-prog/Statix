/**
 * tamagui.config.ts
 *
 * Global Tamagui configuration with a custom 10-color palette mapped
 * to `light` and `dark` themes. Extends @tamagui/config/v5 defaults
 * so all built-in sub-themes (blue, green, red, …) remain available.
 *
 * Custom semantic tokens added to every theme:
 *   $primary     $secondary    $surface      $muted
 *   $success      $warning      $error
 *   (plus *Fg, *Muted variants for accessible contrast / tinted backgrounds)
 */

import { defaultConfig } from '@tamagui/config/v5';
import { animations as animationsCSS } from '@tamagui/config/v5-css';
import { animations as animationsReanimated } from '@tamagui/config/v5-reanimated';
import { createTamagui, isWeb } from 'tamagui';

// ─────────────────────────────────────────────────────────────────────────────
// Palette — raw hex values (not tokens; used only inside this file)
// ─────────────────────────────────────────────────────────────────────────────

const light = {
  // Core semantic
  background: '#ffffff',
  surface: '#f8fafc',
  color: '#0f172a',
  colorSubtle: '#64748b',
  borderColor: '#e2e8f0',

  // Brand
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  primaryPress: '#4338ca',
  primaryFg: '#ffffff',
  secondary: '#a855f7',
  secondaryHover: '#9333ea',
  secondaryFg: '#ffffff',

  // Muted (alias for colorSubtle, kept as dedicated token for clarity)
  muted: '#64748b',

  // Status
  success: '#22c55e',
  successFg: '#ffffff',
  successMuted: '#dcfce7',
  warning: '#f59e0b',
  warningFg: '#ffffff',
  warningMuted: '#fef3c7',
  error: '#ef4444',
  errorFg: '#ffffff',
  errorMuted: '#fee2e2',
};

const dark = {
  // Core semantic
  background: '#09090b',
  surface: '#18181b',
  color: '#f4f4f5',
  colorSubtle: '#a1a1aa',
  borderColor: '#27272a',

  // Brand
  primary: '#818cf8',
  primaryHover: '#6366f1',
  primaryPress: '#4f46e5',
  primaryFg: '#0f172a',
  secondary: '#c084fc',
  secondaryHover: '#a855f7',
  secondaryFg: '#0f172a',

  // Muted
  muted: '#71717a',

  // Status
  success: '#4ade80',
  successFg: '#052e16',
  successMuted: '#14532d',
  warning: '#fbbf24',
  warningFg: '#451a03',
  warningMuted: '#78350f',
  error: '#f87171',
  errorFg: '#450a0a',
  errorMuted: '#7f1d1d',
};

// ─────────────────────────────────────────────────────────────────────────────
// Config — spread defaults then override/extend the root light + dark themes
// ─────────────────────────────────────────────────────────────────────────────

export const tamaguiConfig = createTamagui({
  ...defaultConfig,

  // CSS transitions on web (smaller bundle), Reanimated on native (60fps physics)
  animations: isWeb ? animationsCSS : animationsReanimated,

  themes: {
    // Keep all default sub-themes (blue, green, red, orange, …) unchanged
    ...defaultConfig.themes,

    // Extend root themes with our custom tokens
    light: {
      ...defaultConfig.themes.light,
      ...light,
    },

    dark: {
      ...defaultConfig.themes.dark,
      ...dark,
    },
  },
});

export default tamaguiConfig;

// ─────────────────────────────────────────────────────────────────────────────
// TypeScript: make custom tokens available in all Tamagui styled() calls
// ─────────────────────────────────────────────────────────────────────────────

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
