# Quiz App 🎯

A German-language sarcastic quiz application with a condescending "Quizmaster" personality. Built for iOS, Android, and Web.

## Project Overview

- **Platforms**: iOS, Android (React Native + Expo), Web (React + Vite)
- **Architecture**: Monorepo with shared TypeScript package
- **Current Phase**: Phase 0 - Foundation & Setup
- **Design**: 2.5D Duolingo-inspired with strong shadows
- **Personality**: Ultra-sarcastic, schadenfroh Quizmaster

## Tech Stack

### Mobile
- React Native with Expo SDK 51+
- TypeScript
- Zustand (state management)
- React Navigation 6
- AsyncStorage
- expo-in-app-purchases

### Web
- React
- Vite
- TypeScript
- Zustand (state management)
- React Router 6
- Tailwind CSS

### Shared
- TypeScript models and utilities
- Quiz engine and game logic
- 700 questions as JSON

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- For mobile: Expo Go app on your device

### Installation

Install all dependencies across the monorepo:

```bash
npm run install:all
```

Or manually:

```bash
npm install
cd packages/mobile && npm install
cd ../web && npm install
cd ../shared && npm install
```

### Running the Apps

**Mobile (iOS/Android):**
```bash
npm run mobile
# Scan QR code with Expo Go app
```

**Web:**
```bash
npm run web
# Opens at http://localhost:5173
```

**Shared package (watch mode):**
```bash
npm run shared:watch
```

## Project Structure

```
quiz-app/
├── packages/
│   ├── mobile/          # React Native + Expo
│   ├── web/             # React + Vite
│   └── shared/          # Shared TypeScript package
├── docs/                # Project documentation
├── CLAUDE.md           # AI assistant guidance
└── package.json        # Root workspace config
```

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

### Building

**Shared package:**
```bash
npm run shared:build
```

**Web production:**
```bash
npm run web:build
```

**Mobile production:**
```bash
cd packages/mobile
eas build --platform ios
eas build --platform android
```

## Documentation

Comprehensive project documentation is in the `/docs` folder:

- `quiz_project_plan.md` - 10-week timeline and milestones
- `quiz_tech_architecture.md` - Technical architecture and ADRs
- `quiz_feature_specs.md` - Complete feature specifications
- `🎨 Quiz App design system.md` - Design system and components
- `quiz_tone_voice.md` - Quizmaster personality guidelines
- `quiz-kanban-tasks Phase 0.md` - Current phase tracking

See [CLAUDE.md](./CLAUDE.md) for detailed development guidance.

## Key Features

- **4-tab navigation**: Spielen, Kategorien, Lexikon, Profil
- **Quiz sessions**: 12 questions with sarcastic Quizmaster comments
- **Encyclopedia system**: Auto-populated on correct answers
- **Category unlocking**: 7 categories, 6 via in-app purchase
- **Scoring & leveling**: 10 points per correct answer, 500 points per level
- **Achievement system**: 10 achievements
- **Offline-first**: All questions bundled, no network required

## Design System

- **Primary Color**: Teal `#169C8F`
- **Accent Color**: Coral `#FF6A5C`
- **Background**: Off-White `#F6F7F9`
- **Style**: 2.5D with strong shadows
- **Interactions**: Touch-first, no hover states

## Current Phase: Phase 0

**Week 1 - Foundation & Setup:**
- ✅ Project structure created
- ✅ Monorepo configured
- 🔄 Dependencies installation
- ⏳ Theme system
- ⏳ Testing setup

Track progress: `docs/quiz-kanban-tasks Phase 0.md`

## Contributing

This is a solo/small team project following a structured 10-week plan. See the project plan for timeline and milestones.

## License

MIT
