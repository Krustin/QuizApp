# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Quiz App** is a German-language sarcastic quiz application for iOS, Android, and Web. The app features a condescending "Quizmaster" personality who mocks users through their quiz journey while they build knowledge through answering trivia questions.

- **Current Phase**: Phase 0 - Foundation & Setup (Week 1)
- **Architecture**: Local-first, offline-capable, no backend required for MVP
- **Platforms**: iOS, Android (via Expo), Web (via Vite)
- **Team**: Developer + Designer collaboration
- **Timeline**: 8-10 weeks to MVP

## Tech Stack

### Mobile (iOS/Android)
- **Framework**: React Native with Expo SDK 51+
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation 6
- **Storage**: @react-native-async-storage/async-storage
- **IAP**: expo-in-app-purchases
- **Testing**: Jest + Detox

### Web
- **Framework**: React
- **Bundler**: Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Routing**: React Router 6
- **Styling**: Tailwind CSS
- **Storage**: LocalStorage + IndexedDB
- **Testing**: Jest + Playwright

### Shared
- Monorepo structure with shared package for:
  - TypeScript data models
  - Game logic (quiz engine, scoring)
  - Utility functions
  - Question data (700 questions as JSON)

## Monorepo Structure

```
quiz-app/
├── packages/
│   ├── mobile/              # React Native + Expo
│   │   ├── App.tsx
│   │   ├── app.json
│   │   └── src/
│   │       ├── screens/     # PlayScreen, QuizSessionScreen, etc.
│   │       ├── components/  # UI components (buttons, cards)
│   │       ├── stores/      # Zustand stores (userStore, quizStore)
│   │       ├── services/    # Business logic (QuizEngine, IAPService)
│   │       ├── navigation/  # React Navigation setup
│   │       └── theme/       # Design tokens (colors, shadows)
│   │
│   ├── web/                 # React + Vite
│   │   ├── src/
│   │   │   ├── pages/       # Page components
│   │   │   ├── components/  # Shared with mobile structure
│   │   │   ├── stores/      # Same Zustand stores
│   │   │   └── routes/      # React Router 6
│   │   └── vite.config.ts
│   │
│   └── shared/              # Shared TypeScript package
│       ├── models/          # Question, User, Session types
│       ├── utils/           # shuffle, dateHelpers, uuid
│       ├── gameLogic/       # QuizEngine, scoring algorithms
│       └── data/
│           └── questions/   # 700 questions as JSON
│               ├── general.json (100 questions)
│               ├── skurriles.json (100 questions)
│               ├── wissenschaft.json (100 questions)
│               ├── geschichte.json (100 questions)
│               ├── popkultur.json (100 questions)
│               ├── tierwissen.json (100 questions)
│               └── technik.json (100 questions)
│
└── docs/                    # Project documentation
```

## Architecture Principles

### Local-First Design
- All 700 questions bundled with app (no network requests for gameplay)
- User data stored locally (AsyncStorage/LocalStorage)
- App works completely offline
- No backend authentication for MVP

### Storage Service Pattern
A unified `StorageService` interface with platform-specific implementations:

```typescript
// Shared interface
interface StorageService {
  save(key: string, data: any): Promise<void>;
  load(key: string): Promise<any>;
  delete(key: string): Promise<void>;
}

// Mobile: AsyncStorageImpl.ts
// Web: LocalStorageImpl.ts
```

This abstraction allows identical business logic across platforms.

### State Management with Zustand

Five main stores (identical structure mobile & web):
- `userStore`: Profile, stats, level, achievements
- `quizStore`: Active quiz session, current question, score
- `encyclopediaStore`: Unlocked encyclopedia entries
- `categoryStore`: Category unlock status
- `settingsStore`: App preferences

Stores persist to local storage automatically.

## Design System

### Color Palette
- **Primary (Teal)**: `#169C8F` - buttons, active states, links
- **Accent (Coral)**: `#FF6A5C` - CTAs, purchase buttons, errors
- **Background (Off-White)**: `#F6F7F9` - main app background
- **Success Green**: `#22C55E` - correct answers
- **Error Red**: `#EF4444` - wrong answers

### 2.5D Shadow System
Strong shadows create elevated, Duolingo-like depth:
- **Level 1**: `0 2px 4px rgba(0,0,0,0.1)` - subtle elements
- **Level 2**: `0 4px 12px rgba(0,0,0,0.15)` - standard cards
- **Level 3**: `0 8px 24px rgba(0,0,0,0.2)` - buttons, important cards
- **Level 4**: `0 16px 48px rgba(0,0,0,0.25)` - modals

### Touch Interactions
- **Press effect**: scale(0.95) + shadow reduction
- **Duration**: 100ms for feedback, 300ms for animations
- **No hover states** - mobile-first, touch-only

### Typography
- System fonts (SF Pro on iOS, Roboto on Android, system stack on web)
- 8px base grid for spacing
- 6 type levels: H1 (32px), H2 (24px), H3 (20px), Body Large (18px), Body (16px), Caption (12px)

## Core Features

### 4-Tab Navigation
1. **Spielen** (Play) - Quiz hub with category selection
2. **Kategorien** (Categories) - View/unlock all 7 categories
3. **Lexikon** (Encyclopedia) - Browse knowledge unlocked from correct answers
4. **Profil** (Profile) - Stats, level, achievements, settings

### Quiz Flow
1. User selects category (GENERAL unlocked by default, others via IAP)
2. System selects 12 random questions from category
3. User answers each question (4 multiple choice options)
4. Immediate feedback: correct (green) or incorrect (red)
5. **Quizmaster comment** appears (sarcastic/condescending)
6. Correct answer → +10 points, encyclopedia entry created
7. After 12 questions → Results screen with stats
8. Check for level-up (every 500 points = +1 level)

### Quizmaster Personality
**Critical**: All UI copy must maintain the sarcastic, condescending tone.

- Never encouraging or supportive
- Attributes correct answers to luck, not skill
- Relishes in user's failures (schadenfreude)
- Short, punchy German sentences (5-12 words)
- Three intensity levels: Mild, Medium, Brutal

**Example comments:**
- Correct: "Glück gehabt. Das war wohl geraten, oder?"
- Wrong: "Natürlich falsch. War ja klar."
- Brutal: "Das wussten schon Grundschüler."

See `docs/quiz_tone_voice.md` for complete guidelines.

### Encyclopedia System
- Auto-populated when user answers correctly
- Each question has: question text, correct answer, TL;DR, fun fact
- One entry per question (no duplicates)
- Searchable and filterable by category

### Scoring & Leveling
- **Points**: +10 per correct answer, 0 for wrong
- **Leveling**: `Level = floor(totalPoints / 500) + 1`
- **Streak tracking**: Consecutive correct answers (resets on wrong answer)

### In-App Purchases (Mobile)
- 7 total categories: GENERAL (free), 6 locked (€2.99 each)
- Bundle option: All categories for €9.99
- Uses `expo-in-app-purchases` for unified iOS/Android API
- Purchase status stored locally, restorable via receipt validation

## Development Workflow

### Running the App

**Mobile (once setup):**
```bash
cd packages/mobile
npx expo start
# Scan QR code with Expo Go app
```

**Web (once setup):**
```bash
cd packages/web
npm run dev
# Opens on http://localhost:5173
```

### Testing

**Unit tests:**
```bash
npm test                    # All tests
npm test -- QuizEngine      # Specific file
npm test -- --watch         # Watch mode
```

**E2E tests (Mobile):**
```bash
detox test --configuration ios.sim.debug
```

**E2E tests (Web):**
```bash
playwright test
```

### Building

**Mobile production:**
```bash
eas build --platform ios --profile production
eas build --platform android --profile production
```

**Web production:**
```bash
cd packages/web
npm run build
# Output in packages/web/dist
```

## Important Patterns

### Question Data Structure
```typescript
interface Question {
  id: string;
  category: QuizCategory;
  difficulty: DifficultyLevel;
  questionText: string;
  correctAnswer: string;
  wrongAnswers: string[];  // Exactly 3 wrong answers
  tldr: string;            // Encyclopedia explanation
  funFact?: string;        // Optional fun fact
  source?: string;         // Optional source URL
}
```

### Quiz Session Flow
1. `QuestionSelector.getRandomQuestions(category, 12)` - fetches from JSON
2. Shuffle answers using Fisher-Yates algorithm
3. User answers → validate → update streak
4. Generate Quizmaster comment based on:
   - Correct/incorrect
   - Current streak
   - Difficulty level
5. Save `SessionQuestion` to active session
6. On completion: save full `QuizSession`, update `UserProfile`

### Storage Keys Convention
```
@quiz_user_profile        - UserProfile object
@quiz_sessions           - Array of QuizSession
@quiz_encyclopedia       - Array of EncyclopediaEntry
@quiz_category_access    - CategoryAccess object
```

## Current Phase: Phase 0 Tasks

Track progress in: `docs/quiz-kanban-tasks Phase 0.md`

**Priority tasks (Week 1):**
1. **D1**: Project Setup - Create monorepo, init Expo/Vite, configure TypeScript/ESLint
2. **D2**: Dependencies & Structure - Install Zustand, React Navigation, setup folders
3. **D3**: Core Infrastructure - Implement StorageService, navigation skeleton, data models
4. **D4**: Theme System - Create design tokens (colors, shadows, spacing, typography)
5. **D5**: Testing Setup - Configure Jest, write initial tests, setup CI/CD

**Blocked pending designer:**
- **Des1**: Design Kickoff - Figma setup, design system creation
- **Des2**: Component Library - Button variants, answer buttons, cards

## Documentation

Comprehensive documentation in `/docs`:
- `quiz_project_plan.md` - 10-week timeline, milestones, risk management
- `quiz_tech_architecture.md` - Detailed technical decisions (ADRs)
- `quiz_feature_specs.md` - Complete user flows, screen specs, edge cases
- `🎨 Quiz App design system.md` - Colors, typography, components, shadows
- `quiz_tone_voice.md` - Quizmaster personality guidelines, comment templates
- `quiz-kanban-tasks Phase 0.md` - Current sprint kanban board

## Key Conventions

### Naming
- **Screens**: `PlayScreen.tsx`, `QuizSessionScreen.tsx` (mobile: `/screens`, web: `/pages`)
- **Components**: PascalCase, e.g., `AnswerButton.tsx`, `QuizmasterComment.tsx`
- **Stores**: `userStore.ts`, `quizStore.ts` (lowercase + Store suffix)
- **Services**: `QuizEngine.ts`, `IAPService.ts` (PascalCase)
- **Utils**: `shuffle.ts`, `dateHelpers.ts` (camelCase)

### File Organization
- Group by feature/domain, not by type
- Collocate related components
- Shared code goes in `/packages/shared`

### German Language
- All UI copy in German
- Variable names in English (code convention)
- Comments in English
- User-facing strings in German

### Git Workflow
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- Branch naming: `feature/quiz-session`, `fix/storage-bug`
- No force push to main

## Testing Strategy

### Unit Tests
- All business logic in `services/` and `utils/`
- QuizEngine, scoring, streak calculation
- Storage service implementations
- Zustand stores

### Integration Tests
- Complete quiz session flow
- Encyclopedia auto-population
- Level-up trigger
- IAP unlock flow (mocked)

### Manual QA Checklist
- First launch experience
- Complete 12-question session
- Correct/incorrect answer feedback
- Encyclopedia entry creation
- Level-up animation
- IAP purchase & restore

## Common Issues

### Questions Not Loading
- Ensure JSON files exist in `packages/shared/data/questions/`
- Verify JSON structure matches `Question` interface
- Check file paths in import statements

### Storage Not Persisting
- Mobile: Check AsyncStorage permissions
- Web: Check localStorage quota (5MB limit)
- Verify `StorageService` implementation

### Shadows Not Showing (Android)
- Use `elevation` property, not `shadowProps`
- shadowProps work on iOS, elevation on Android

### Type Errors with Shared Package
- Ensure TypeScript configured in shared package
- Check `tsconfig.json` paths are correct
- Rebuild shared package if types not updating

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/) (web only)

## Quick Reference

**Question Count**: 700 total (100 per category × 7 categories)
**Quiz Length**: 12 questions per session
**Points per Correct**: 10 points
**Points per Level**: 500 points
**Free Categories**: 1 (GENERAL)
**Locked Categories**: 6 (€2.99 each, €9.99 bundle)
**Achievements**: 10 total in MVP
**Quizmaster Comments**: Minimum 50 unique comments
