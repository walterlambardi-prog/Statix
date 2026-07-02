/**
 * src/components/ui/themed-card.tsx
 *
 * A styled card built with Tamagui tokens from our custom palette.
 * Demonstrates how $primary, $surface, $borderColor, $color, etc.
 * automatically adapt to light / dark without any manual Platform checks.
 *
 * Usage:
 *   <ThemedCard title="Hello" subtitle="World" accent="primary" />
 *   <ThemedCard title="Earn" subtitle="$12.40" accent="success" elevated />
 */

import { GetProps, Paragraph, Text, View, YStack, styled } from 'tamagui';

// ── Base styled primitive ────────────────────────────────────────────────────

const CardRoot = styled(View, {
  bg: '$surface',
  rounded: '$5',
  borderWidth: 1,
  borderColor: '$borderColor',
  p: '$4',
  overflow: 'hidden',

  // Web shadow
  '$platform-web': {
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  // Native shadow
  '$platform-native': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  hoverStyle: {
    borderColor: '$primary',
  },
  pressStyle: {
    scale: 0.99,
    opacity: 0.9,
  },

  variants: {
    elevated: {
      true: {
        '$platform-web': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' },
        '$platform-native': {
          shadowOpacity: 0.12,
          shadowRadius: 10,
        },
      },
    },
  } as const,
});

// ── Accent strip along the top-left edge ─────────────────────────────────────

type Accent = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

const accentColor: Record<Accent, string> = {
  primary: '$primary',
  secondary: '$secondary',
  success: '$success',
  warning: '$warning',
  error: '$error',
};

// ── Public component ─────────────────────────────────────────────────────────

interface ThemedCardProps extends GetProps<typeof CardRoot> {
  title: string;
  subtitle?: string;
  description?: string;
  /** Colored left-border accent. Defaults to 'primary'. */
  accent?: Accent;
}

export function ThemedCard({
  title,
  subtitle,
  description,
  accent = 'primary',
  ...rest
}: ThemedCardProps) {
  return (
    <CardRoot
      flexDirection="row"
      borderLeftWidth={4}
      borderLeftColor={accentColor[accent] as any}
      {...rest}>
      <YStack flex={1} gap="$1">
        <Text fontSize="$5" fontWeight="700" color="$color" numberOfLines={1}>
          {title}
        </Text>

        {subtitle && (
          <Text fontSize="$6" fontWeight="800" color={accentColor[accent] as any}>
            {subtitle}
          </Text>
        )}

        {description && (
          <Paragraph fontSize="$3" color="$muted" numberOfLines={2}>
            {description}
          </Paragraph>
        )}
      </YStack>
    </CardRoot>
  );
}
