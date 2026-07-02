/**
 * Settings screen — demonstrates the Tamagui theme system:
 *  • ThemeToggle to switch light ↔ dark
 *  • ThemedCard with different accent colours
 *  • StatusBadge for each status variant
 *  • Raw token access via useAppTheme()
 */

import { Screen } from '@/components/ui/screen';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ThemedCard } from '@/components/ui/themed-card';
import { useThemeContext } from '@/context/theme-context';
import { H3, Paragraph, ScrollView, Separator, Text, XStack, YStack } from 'tamagui';

export default function SettingsScreen() {
  const { theme } = useThemeContext();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p="$4" gap="$6" pb="$10">
          {/* ── Appearance ──────────────────────────────────── */}
          <YStack gap="$3">
            <H3 color="$color">Appearance</H3>
            <XStack
              bg="$surface"
              rounded="$5"
              borderWidth={1}
              borderColor="$borderColor"
              p="$4"
              items="center"
              justify="space-between">
              <YStack gap="$1">
                <Text fontSize="$4" fontWeight="600" color="$color">
                  Color scheme
                </Text>
                <Paragraph fontSize="$3" color="$muted">
                  Currently: <Text fontWeight="700">{theme}</Text>
                </Paragraph>
              </YStack>
              <ThemeToggle />
            </XStack>
          </YStack>

          <Separator borderColor="$borderColor" />

          {/* ── Palette preview — ThemedCard ────────────────── */}
          <YStack gap="$3">
            <H3 color="$color">Theme palette</H3>
            <YStack gap="$3">
              <ThemedCard
                title="Primary"
                description="Brand indigo — buttons, links, focus rings"
                accent="primary"
              />
              <ThemedCard
                title="Secondary"
                description="Brand purple — highlights and accents"
                accent="secondary"
              />
              <ThemedCard
                title="Success"
                description="Positive feedback, confirmations"
                accent="success"
              />
              <ThemedCard
                title="Warning"
                description="Caution states, degraded performance"
                accent="warning"
                elevated
              />
              <ThemedCard
                title="Error"
                description="Failures, destructive actions"
                accent="error"
              />
            </YStack>
          </YStack>

          <Separator borderColor="$borderColor" />

          {/* ── Status badges ───────────────────────────────── */}
          <YStack gap="$3">
            <H3 color="$color">Status badges</H3>
            <XStack gap="$2" flexWrap="wrap">
              <StatusBadge variant="success" label="Active" />
              <StatusBadge variant="warning" label="Pending" />
              <StatusBadge variant="error" label="Failed" />
              <StatusBadge variant="primary" label="New" />
              <StatusBadge variant="secondary" label="Beta" />
              <StatusBadge variant="muted" label="Archived" />
            </XStack>
          </YStack>

          <Separator borderColor="$borderColor" />

          {/* ── Raw token values ────────────────────────────── */}
          <YStack gap="$3">
            <H3 color="$color">Token values</H3>
            <YStack gap="$2">
              {(
                [
                  ['Background', '$background'],
                  ['Surface', '$surface'],
                  ['Text', '$color'],
                  ['Muted', '$muted'],
                  ['Border', '$borderColor'],
                ] as const
              ).map(([label, token]) => (
                <XStack
                  key={label}
                  items="center"
                  justify="space-between"
                  py="$2"
                  px="$3"
                  bg="$surface"
                  rounded="$3"
                  borderWidth={1}
                  borderColor="$borderColor">
                  <Text fontSize="$3" color="$muted">
                    {token}
                  </Text>
                  <XStack gap="$2" items="center">
                    <Text fontSize="$3" color="$color">
                      {label}
                    </Text>
                    <YStack
                      width={16}
                      height={16}
                      rounded="$2"
                      borderWidth={1}
                      borderColor="$borderColor"
                      style={{ backgroundColor: token }}
                    />
                  </XStack>
                </XStack>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </Screen>
  );
}
