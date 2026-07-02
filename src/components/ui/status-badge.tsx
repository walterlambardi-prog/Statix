/**
 * src/components/ui/status-badge.tsx
 *
 * Compact badge component that maps our theme's success / warning /
 * error / primary / secondary tokens to tinted pill labels.
 *
 * Usage:
 *   <StatusBadge variant="success" label="Active" />
 *   <StatusBadge variant="error"   label="Failed" icon="●" />
 */

import { Text, View, XStack, styled } from 'tamagui';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'primary' | 'secondary' | 'muted';

interface StatusBadgeProps {
  variant: BadgeVariant;
  label: string;
  /** Optional leading character/icon string */
  icon?: string;
}

// Maps each variant to its muted background token and foreground token
const variantMap: Record<BadgeVariant, { bg: string; fg: string; dot: string }> = {
  success: { bg: '$successMuted', fg: '$success', dot: '$success' },
  warning: { bg: '$warningMuted', fg: '$warning', dot: '$warning' },
  error: { bg: '$errorMuted', fg: '$error', dot: '$error' },
  primary: { bg: '$primary', fg: '$primaryFg', dot: '$primaryFg' },
  secondary: { bg: '$secondary', fg: '$secondaryFg', dot: '$secondaryFg' },
  muted: { bg: '$surface', fg: '$muted', dot: '$muted' },
};

const BadgeRoot = styled(View, {
  rounded: '$10',
  display: 'flex',
  flexDirection: 'row',
  items: 'center',
  gap: 4,
});

export function StatusBadge({ variant, label, icon }: StatusBadgeProps) {
  const { bg, fg } = variantMap[variant];

  return (
    <BadgeRoot
      bg={bg as any}
      style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3 }}>
      <XStack gap="$1" items="center">
        <Text
          fontSize="$2"
          fontWeight="600"
          color={fg as any}
          style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {icon ? `${icon} ${label}` : label}
        </Text>
      </XStack>
    </BadgeRoot>
  );
}
