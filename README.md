# Stratix

An [Expo](https://expo.dev) app built with Expo SDK 57, Expo Router, and React Native 0.86.

## Requirements

- Node.js 18+
- Yarn 1.x
- Xcode (for iOS)
- Android Studio (for Android)

## Setup

```bash
yarn install
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
