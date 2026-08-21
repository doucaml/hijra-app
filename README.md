# Hijra

A mobile application for the Hijri (Islamic lunar) calendar. Hijra shows the current Hijri month along with its Gregorian equivalent, and highlights religious events (holidays, sacred days, etc.) using an embedded static dataset.

The app is built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/), and ships with two native Kotlin modules:

- **`calendar-bridge`** — Hijri ↔ Gregorian conversion and month properties (length, first-day-of-week position), implemented natively on Android.
- **`app-widget-android`** — Android home-screen widget displaying the current date.

## Features

- Monthly calendar view of the current Hijri month with previous / next month navigation and a quick "jump to today" button.
- Simultaneous display of the corresponding Gregorian date.
- Highlighted religious events / holidays, opening a detailed *bottom sheet* on tap.
- Bidirectional Hijri ↔ Gregorian conversion.
- Native Android home-screen widget for the current date.

## Tech stack

- **Framework**: Expo SDK 54, React Native 0.81, React 19.
- **Navigation / routing**: `expo-router` (file-based routing, typed routes enabled).
- **UI**: `uniwind` + Tailwind CSS v4 for styling, `lucide-react-native` for icons, `expo-image`, `expo-haptics`.
- **Custom fonts** loaded via `expo-font`: Open Sans, Oleo Script, Oldenburg.
- **Native modules (Kotlin / Android)**:
  - `modules/calendar-bridge` — calendar computations.
  - `modules/app-widget-android` — home-screen widget.
- **TypeScript** with React Compiler enabled (experimental).
- **Build & distribution**: EAS Build (`eas.json`).

## Requirements

- Node.js ≥ 18 (recommended: 20 LTS)
- npm 11+
- [Android Studio](https://developer.android.com/studio) with an emulator or a connected Android device (min SDK 26, see `expo-build-properties`).
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (invoked through `npx expo …`).

> The app targets **Android only** (`platforms: ["android"]` in `app.json`). The bundle identifier is `com.doukouss.hijra`.

## Installation

```bash
npm install
```

## Running

```bash
# Start the Metro / dev server
npm run start

# Launch on a connected Android device or emulator
npm run android

# Lint
npm run lint
```

`npm run reset-project` resets the `app/` directory to a clean initial state (useful at the start of a project).

## Production build

Builds are orchestrated via [EAS](https://docs.expo.dev/build/introduction/):

```bash
# Development build (internal distribution)
eas build --profile development --platform android

# Production build
eas build --profile production --platform android
```

Available profiles (`development`, `preview`, `production`) are defined in `eas.json`.

## Project layout

```
.
├── app/                          # Expo Router routes
│   ├── _layout.tsx               # Root layout (Stack)
│   ├── index.tsx                 # Main calendar screen
│   └── (bottom-sheets)/
│       ├── _layout.tsx           # Bottom-sheets layout (formSheet)
│       └── holiday.tsx           # Religious event details
├── modules/                      # Native Expo modules (Android / Kotlin)
│   ├── calendar-bridge/          # Hijri ↔ Gregorian conversion
│   └── app-widget-android/       # Android home-screen widget
├── assets/
│   ├── fonts/                    # Open Sans, Oleo Script, Oldenburg
│   └── images/                   # Icon, splash
├── data/
│   ├── events.json               # Religious events (month → day → title/description)
│   └── months.json               # Hijri month metadata
├── scripts/
│   ├── reset-project.js          # Reset app/ directory
│   └── extract-events.ts         # Extract / format events
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build profiles
├── global.css                    # Tailwind v4 + theme (brown palette, fonts)
├── utils.ts                      # Calendar helpers + useDate() hook
└── package.json
```

## Design system

Visual direction and design tokens are defined in [`global.css`](./global.css) (Tailwind v4 theme):

- **Full `brown` palette** (from `brown-50` to `brown-900`) — warm, traditional-inspired tones.
- **Fonts**: `font-sans` (Open Sans) for body text, `font-oleo-script` (Oleo Script) for decorative accents (event titles), `font-oldenburg` (Oldenburg) for a calligraphic look.

## Data

Religious events and month metadata are stored as static JSON:

- [`data/events.json`](./data/events.json) — shape `Record<month, Record<day, { title, description, actions? }>>`.
- [`data/months.json`](./data/months.json) — name and description for each Hijri month.

The `npm run extract:events` script regenerates / formats `events.json` from an external source.

## Native modules

### `calendar-bridge`

Exposes, via JSI / Expo Modules, the following operations:

- Today's Hijri and Gregorian dates.
- Month properties (length, first-day-of-week position).
- Bidirectional Hijri ↔ Gregorian conversion.
- `onDateChange` event consumed by the `useDate()` hook (see [`utils.ts`](./utils.ts)).

### `app-widget-android`

Implements an Android-native `AppWidgetProvider` that displays the current date and refreshes itself through module broadcasts.

## License

See [`LICENSE`](./LICENSE).
