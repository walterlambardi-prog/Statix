# Stratix

An [Expo](https://expo.dev) app built with Expo SDK 57, Expo Router, and React Native 0.86, with EAS Build and OTA updates via EAS Update.

## Requirements

- Node.js 18+
- Yarn 1.x
- Xcode (for iOS)
- Android Studio (for Android)
- [EAS CLI](https://docs.expo.dev/eas/) — `npm install -g eas-cli`

## Setup

```bash
yarn install
eas login
```

## Development

```bash
# Start the dev server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android

# Run on web
yarn web
```

## Native builds

```bash
# Generate native projects (android/ and ios/)
yarn prebuild

# Regenerate from scratch (cleans existing native folders)
yarn prebuild:clean

# Platform-specific
yarn prebuild:ios
yarn prebuild:android
```

## EAS Build

Builds are run on Expo's cloud infrastructure. Requires an [Expo account](https://expo.dev) and EAS CLI.

| Profile       | iOS                 | Android | Distribution |
| ------------- | ------------------- | ------- | ------------ |
| `development` | Simulator build     | APK     | Internal     |
| `preview`     | Ad-hoc / TestFlight | APK     | Internal     |
| `production`  | App Store           | AAB     | Store        |

```bash
# Development builds (requires dev client installed on device/simulator)
yarn eas:build:dev              # both platforms
yarn eas:build:dev:ios          # iOS Simulator only
yarn eas:build:dev:android      # Android APK only

# Preview builds (internal testing)
yarn eas:build:preview          # both platforms
yarn eas:build:preview:ios      # iOS only
yarn eas:build:preview:android  # Android APK only

# Production builds
yarn eas:build:ios              # iOS App Store
yarn eas:build:android          # Android AAB

# Inspect existing builds
yarn eas:build:list
```

> After an Android build finishes, EAS provides a direct download link for the `.apk`.

## OTA Updates (EAS Update)

The app checks for JavaScript updates automatically on launch. When a new update is detected it downloads in the background and reloads on the next app open.

Update channels map to build profiles:

| Channel       | Used by            |
| ------------- | ------------------ |
| `development` | development builds |
| `preview`     | preview builds     |
| `production`  | production builds  |

```bash
# Publish an update to un canal específico
yarn eas:update:dev             # → channel development
yarn eas:update:preview         # → channel preview
yarn eas:update:prod            # → channel production

# Con mensaje personalizado (directo con EAS CLI)
eas update --channel development --message "descripción del cambio"

# Ver canales configurados
yarn eas:channel:list
```

### OTA update workflow

1. Make a JavaScript/TypeScript change in `src/`
2. Run `eas update --channel <channel> --message "..."`
3. Open the app — it downloads the update automatically and reloads

> OTA updates only ship JS/TS and asset changes. Native code changes (new native modules, `app.json` plugin changes) require a new EAS Build.

## EAS Submit

```bash
yarn eas:submit:ios        # Submit latest iOS build to App Store Connect
yarn eas:submit:android    # Submit latest Android build to Google Play
```

## Code quality

```bash
# Lint
yarn lint

# Format all files in src/
yarn format

# Check formatting without modifying files
yarn format:check

# TypeScript type check
yarn type-check
```

Git hooks run automatically on every commit:

- **pre-commit** — ESLint + Prettier on staged files via `lint-staged`
- **commit-msg** — validates the message follows [Conventional Commits](https://www.conventionalcommits.org/)

### Commit message format

```
<type>(scope): description

Types: feat, fix, chore, docs, style, refactor, test, ci
```

## Project links

- Builds: https://expo.dev/accounts/walterlambardi/projects/Stratix/builds
- Updates: https://expo.dev/accounts/walterlambardi/projects/Stratix/updates

## Tech stack

|            |                                                            |
| ---------- | ---------------------------------------------------------- |
| Framework  | [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)     |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/)  |
| UI         | [@expo/ui](https://docs.expo.dev/versions/v57.0.0/sdk/ui/) |
| Styling    | CSS Modules + global.css                                   |
| Language   | TypeScript (strict)                                        |
| Linting    | ESLint + eslint-config-expo                                |
| Formatting | Prettier                                                   |
| Git hooks  | Husky + lint-staged + commitlint                           |
| CI/CD      | EAS Build + EAS Update                                     |
