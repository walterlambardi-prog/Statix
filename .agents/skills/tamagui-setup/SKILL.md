---
name: tamagui-setup
description: Set up Tamagui v2 (config v5) as the universal UI theme system for Expo Router apps targeting iOS, Android, and Web. Covers installation, configuration, TamaguiProvider integration, responsive styling, themes, tokens, custom components, and animations.
version: 1.0.0
license: MIT
---

# Tamagui v2 Setup for Expo Router (Universal: iOS + Android + Web)

Source: https://tamagui.dev/llms.txt

Tamagui is a complete UI solution for React Native and Web. It provides a fully-featured UI kit, styling engine with design tokens, and an optional optimizing compiler. Version 2 targets React Native 0.81+ with New Architecture and React 19+.

---

## Requirements

- **React Native 0.81+** with New Architecture enabled
- **React 19+**
- **TypeScript 5+** (required)
- **Expo SDK 57+** (matches the project's `react-native: 0.86.0`)

---

## Installation

```bash
yarn add tamagui @tamagui/config
# Optional: Metro plugin for better DX (watches tamagui.config.ts)
yarn add @tamagui/metro-plugin
# Optional: Babel plugin for compile-time optimizations
yarn add @tamagui/babel-plugin
# Optional: Inter font pre-configured for Tamagui
yarn add @tamagui/font-inter
```

---

## Configuration: `tamagui.config.ts`

Create at the project root. Uses `@tamagui/config/v5` default preset (Tailwind-aligned shorthands, Radix colors, responsive media queries):

```tsx
// tamagui.config.ts
import { defaultConfig } from '@tamagui/config/v5';
import { animations as animationsCSS } from '@tamagui/config/v5-css';
import { animations as animationsReanimated } from '@tamagui/config/v5-reanimated';
import { createTamagui, isWeb } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  // CSS animations on web (smaller bundle), Reanimated on native (60fps)
  animations: isWeb ? animationsCSS : animationsReanimated,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
```

> Use `isWeb ? animationsCSS : animationsReanimated` to get the best of both platforms. On web: smaller bundle + CSS transitions. On native: smooth spring physics via Reanimated.

---

## Metro Config: `metro.config.js`

```js
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withTamagui } = require('@tamagui/metro-plugin');

const config = getDefaultConfig(__dirname);

module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
});
```

---

## Babel Config: `babel.config.js`

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['@tamagui/babel-plugin'],
  };
};
```

---

## Provider Setup: `src/app/_layout.tsx`

Wrap the root layout with `TamaguiProvider`. Use `defaultTheme` prop (not `<Theme>`) for proper SSR and fast native scheme changes:

```tsx
// src/app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../../tamagui.config';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
```

> For Expo Router web output (`"web": { "output": "server" }`), import `tamagui.generated.css` at the top of `_layout.tsx`:
>
> ```tsx
> import '../../tamagui.generated.css';
> ```

---

## Loading Fonts

```tsx
// src/app/_layout.tsx (add before render)
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
      {/* ... */}
    </TamaguiProvider>
  );
}
```

---

## First Start (Clear Cache)

Always clear Metro cache after adding Tamagui or changing `tamagui.config.ts`:

```bash
yarn start -c
# or
npx expo start -c
```

---

## Core Components

All components accept design tokens via `$token` syntax and platform-conditional props.

### View (YStack / XStack / ZStack)

`YStack` = vertical flex column, `XStack` = horizontal flex row, `ZStack` = absolute stacking.

```tsx
import { YStack, XStack, ZStack } from 'tamagui'

// Vertical layout
<YStack gap="$4" p="$3" bg="$background">
  <Text>Hello</Text>
</YStack>

// Horizontal layout
<XStack gap="$2" items="center">
  <Icon />
  <Text>Label</Text>
</XStack>
```

### Text & Paragraph

```tsx
import { Text, Paragraph, H1, H2, H3, H4 } from 'tamagui'

<H1 color="$color">Welcome</H1>
<Paragraph size="$4" color="$colorSubtle">Body text</Paragraph>
<Text fontSize="$3" fontWeight="600">Label</Text>
```

### Button

```tsx
import { Button } from 'tamagui'

<Button theme="blue" size="$4" onPress={handlePress}>
  Tap me
</Button>

// Icon button
<Button theme="active" icon={<Icon />} circular />

// Variants: size, theme, variant, disabled
<Button size="$3" variant="outlined" theme="red" disabled>
  Delete
</Button>
```

### Input

```tsx
import { Input, TextArea } from 'tamagui'

<Input
  size="$4"
  placeholder="Search..."
  value={value}
  onChangeText={setValue}
  bg="$backgroundHover"
  borderColor="$borderColor"
  focusStyle={{ borderColor: '$blue10' }}
/>

<TextArea size="$4" numberOfLines={4} placeholder="Write something..." />
```

### Image

```tsx
import { Image } from 'tamagui';

<Image
  source={{ uri: 'https://example.com/photo.jpg', width: 300, height: 200 }}
  width={300}
  height={200}
  borderRadius="$4"
/>;
```

### Sheet (Bottom Sheet)

```tsx
import { Sheet } from 'tamagui';

<Sheet open={open} onOpenChange={setOpen} snapPoints={[50]} dismissOnSnapToBottom>
  <Sheet.Overlay />
  <Sheet.Handle />
  <Sheet.Frame p="$4">
    <Paragraph>Content</Paragraph>
  </Sheet.Frame>
</Sheet>;
```

### Dialog

```tsx
import { Button, Dialog, Paragraph, YStack } from 'tamagui';

<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content p="$5">
      <Dialog.Title>Title</Dialog.Title>
      <Paragraph>Content</Paragraph>
      <Dialog.Close asChild>
        <Button>Close</Button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>;
```

### ScrollView

```tsx
import { ScrollView } from 'tamagui';

<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, padding: 16 }}>
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</ScrollView>;
```

---

## Responsive Styling (Media Queries)

v5 breakpoints align with Tailwind CSS. Use `$breakpoint` prefix:

| Token   | Width          |
| ------- | -------------- |
| `$xxxs` | minWidth: 260  |
| `$xxs`  | minWidth: 340  |
| `$xs`   | minWidth: 460  |
| `$sm`   | minWidth: 640  |
| `$md`   | minWidth: 768  |
| `$lg`   | minWidth: 1024 |
| `$xl`   | minWidth: 1280 |
| `$xxl`  | minWidth: 1536 |

Max-width variants: `$max-sm`, `$max-md`, `$max-lg`, etc.
Device: `$touchable` (touch devices), `$hoverable` (pointer devices).

```tsx
<YStack
  p="$3"
  $md={{ p: '$6', flexDirection: 'row' }}
  $lg={{ maxW: 1024, mx: 'auto' }}
>
  <Text
    fontSize="$4"
    $sm={{ fontSize: '$5' }}
    $lg={{ fontSize: '$7' }}
  >
    Responsive heading
  </Text>
</YStack>

// Touchable vs hoverable
<Button
  $touchable={{ p: '$4', minH: 44 }}
  $hoverable={{ hoverStyle: { bg: '$color5' } }}
>
  Tap/Click me
</Button>
```

**Web-first responsive layout pattern:**

```tsx
<XStack
  flexDirection="column" // mobile: stack vertically
  $md={{ flexDirection: 'row', gap: '$6' }} // tablet+: side by side
  gap="$4">
  <YStack flex={1}>
    <SidebarContent />
  </YStack>
  <YStack flex={3}>
    <MainContent />
  </YStack>
</XStack>
```

---

## Pseudo States

```tsx
<YStack
  bg="$background"
  hoverStyle={{ bg: '$backgroundHover' }}
  pressStyle={{ bg: '$backgroundPress', scale: 0.98 }}
  focusStyle={{ outlineColor: '$blue10', outlineWidth: 2, outlineStyle: 'solid' }}
  focusVisibleStyle={{ outlineColor: '$blue10', outlineWidth: 2 }}
  disabledStyle={{ opacity: 0.5 }}
/>
```

---

## Platform-Conditional Styles

```tsx
<YStack
  $platform-ios={{ paddingTop: '$safe' }}
  $platform-android={{ elevation: 4 }}
  $platform-web={{ boxShadow: '0 2px 8px $shadowColor' }}
  $platform-native={{ shadowColor: '$shadowColor', shadowOpacity: 0.2 }}
/>
```

---

## Theming

### Using Theme Tokens

All semantic tokens automatically adapt to `light` / `dark`:

```tsx
<YStack bg="$background" borderColor="$borderColor">
  <Text color="$color">Adapts to theme</Text>
  <Text color="$colorSubtle">Muted text</Text>
</YStack>
```

### Color Themes (Sub-themes)

```tsx
<Button theme="blue">Blue</Button>
<Card theme="green">
  <Text>Green card</Text>
</Card>
<YStack theme="red">
  {/* everything inside uses red theme */}
</YStack>
```

Available color themes: `gray`, `blue`, `green`, `red`, `yellow`, `orange`, `pink`, `purple`, `teal`, `neutral`, `black`, `white`.

### Theme Component

```tsx
import { Theme } from 'tamagui';

<Theme name="dark">
  <YStack bg="$background">
    <Text color="$color">Always dark</Text>
  </YStack>
</Theme>;
```

### Accent Colors

```tsx
<Button theme="accent">Primary Action</Button>
<YStack bg="$accentBackground" color="$accentColor" />
```

### Dynamic Theme Toggle

```tsx
import { useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
      <Button onPress={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
        Toggle theme
      </Button>
    </TamaguiProvider>
  );
}
```

---

## Design Tokens

Access tokens with `$` prefix. Token groups: `size`, `space`, `radius`, `color`, `zIndex`.

```tsx
// Size tokens: $1–$16 (hybrid scale, Tamagui convention)
<YStack p="$4" gap="$3" />         // space tokens
<View w="$10" h="$10" />           // size tokens
<View borderRadius="$4" />         // radius tokens
<Text color="$blue10" />           // color tokens
<View zIndex="$1" />               // zIndex tokens

// Semantic theme tokens
<View bg="$background" />
<View borderColor="$borderColor" />
<Text color="$color" />
<Text color="$colorSubtle" />      // alias for color with lower opacity
```

### Token Shorthands (Tailwind-aligned)

```tsx
<YStack
  p="$4" // padding
  px="$3" // paddingHorizontal
  py="$2" // paddingVertical
  m="$2" // margin
  mx="auto" // marginHorizontal
  bg="$bg" // backgroundColor
  rounded="$3" // borderRadius
  w={200} // width
  h={100} // height
  minW="$10" // minWidth
  maxW={640} // maxWidth
  grow={1} // flexGrow
  items="center" // alignItems
  justify="between" // justifyContent
  z={10} // zIndex
/>
```

---

## Custom Components with `styled()`

```tsx
import { styled, View, Text, GetProps } from 'tamagui'

// Basic custom view
export const Card = styled(View, {
  bg: '$background',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  p: '$4',
  shadowColor: '$shadowColor',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  $platform-web: {
    boxShadow: '0 2px 8px $shadowColor',
  },

  variants: {
    size: {
      sm: { p: '$2', borderRadius: '$2' },
      md: { p: '$4', borderRadius: '$4' },
      lg: { p: '$6', borderRadius: '$6' },
    },
    elevated: {
      true: {
        shadowOpacity: 0.2,
        shadowRadius: 16,
        $platform-web: {
          boxShadow: '0 4px 24px $shadowColor',
        },
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export type CardProps = GetProps<typeof Card>

// Usage
<Card size="lg" elevated>
  <Text>Content</Text>
</Card>
```

### Extending existing Tamagui components

```tsx
import { styled, Button } from 'tamagui'

export const PrimaryButton = styled(Button, {
  theme: 'blue',
  size: '$4',
  fontWeight: '600',

  variants: {
    fullWidth: {
      true: { w: '100%' },
    },
  } as const,
})

// Usage
<PrimaryButton fullWidth onPress={handleSubmit}>
  Submit
</PrimaryButton>
```

### Styleable wrapper (for HOCs)

```tsx
import { styled, Text } from 'tamagui';

const BaseLabel = styled(Text, { fontSize: '$3', fontWeight: '600' });

// Wrap a functional component so it can itself be styled()
const AnimatedLabel = BaseLabel.styleable((props, ref) => (
  <BaseLabel ref={ref} {...props} enterStyle={{ opacity: 0 }} animation="quick" />
));
```

---

## Animations

Configure in `tamagui.config.ts` (see above). Use `animation` prop + enter/exit styles:

```tsx
// Fade in on mount
<YStack
  animation="quick"
  enterStyle={{ opacity: 0, y: 10 }}
  exitStyle={{ opacity: 0, y: -10 }}
>
  <Text>Animated content</Text>
</YStack>

// Spring animations
<View
  animation="bouncy"
  enterStyle={{ scale: 0.8, opacity: 0 }}
>
  <Text>Bouncy!</Text>
</View>
```

Available named animations (v5): `0ms`, `50ms`–`500ms`, `quick`, `quickLessBouncy`, `quicker`, `medium`, `slow`, `lazy`, `bouncy`, `superBouncy`.

---

## `useMedia` Hook

```tsx
import { useMedia } from 'tamagui';

function ResponsiveComponent() {
  const media = useMedia();

  return <YStack>{media.lg ? <DesktopLayout /> : <MobileLayout />}</YStack>;
}
```

---

## `useTheme` Hook

```tsx
import { useTheme } from 'tamagui';

function Component() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.background.val }}>
      <Text style={{ color: theme.color.val }}>Current theme color</Text>
    </View>
  );
}
```

---

## Server-Side Rendering (Web)

For Expo Router with `"output": "server"`, Tamagui generates CSS variables for all themes. Import the generated CSS in `_layout.tsx`:

```tsx
// src/app/_layout.tsx
import '../../tamagui.generated.css';
// ... rest of layout
```

The CSS file is auto-generated by the Metro plugin / compiler. On the client, Tamagui hydrates themes from CSS variables (no JS theme bundle needed).

---

## Customizing the Config (v5)

### Custom Theme Colors

```tsx
// tamagui.config.ts
import { createV5Theme, defaultChildrenThemes, defaultConfig } from '@tamagui/config/v5';
import { cyan, cyanDark } from '@tamagui/colors';
import { createTamagui } from 'tamagui';

const themes = createV5Theme({
  childrenThemes: {
    ...defaultChildrenThemes,
    cyan: { light: cyan, dark: cyanDark },
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes,
});
```

### Custom Tokens

```tsx
import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    radius: {
      ...defaultConfig.tokens.radius,
      pill: 9999,
    },
  },
});
```

### Custom Media Queries

```tsx
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media,
    // extra breakpoint for ultra-wide
    xxxl: { minWidth: 1920 },
  },
});
```

---

## Key v5 Differences from v4

| v4                                      | v5                                                                 |
| --------------------------------------- | ------------------------------------------------------------------ |
| Animations bundled in `@tamagui/config` | Import separately: `v5-css`, `v5-rn`, `v5-reanimated`, `v5-motion` |
| `$2xl` / `$2xs`                         | `$xxl` / `$xxs`                                                    |
| `$max2Xl`                               | `$max-xxl`                                                         |
| `flexBasis: auto` default               | `flexBasis: 0` (React Native style)                                |
| `defaultPosition: 'relative'`           | No default (browser `static`)                                      |

---

## Project-Specific Notes (Stratix)

This project uses:

- **Expo SDK 57** / React Native 0.86.0 — fully compatible with Tamagui v2
- **react-native-reanimated 4.5.0** — use `@tamagui/config/v5-reanimated` for native animations
- **Expo Router** with `"output": "server"` on web — import `tamagui.generated.css` in `_layout.tsx`
- **React 19.2.3** — satisfies Tamagui v2 requirement of React 19+
- `userInterfaceStyle: "automatic"` in `app.json` — dark mode already supported

### Suggested `package.json` additions

```json
{
  "scripts": {
    "start": "expo start -c",
    "build:web": "expo export --platform web",
    "build:web:optimized": "tamagui build --target web ./src/app -- expo export --platform web"
  }
}
```
