<div align="center">

<!-- Banner Image Placeholder -->
<img src="./docs/assets/banner.png" alt="Quiz App Banner" width="100%">

# 🎯 Quiz App

### _Der ultimative Versagens-Simulator mit Schadenfreude-Garantie_

**Eine sarkastische Quiz-App, die dein Unwissen mit deutschem Humor kommentiert**

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-51+-black.svg)](https://expo.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Features](#-features) • [Demo](#-screenshots) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation)

</div>

---

## 📖 Über das Projekt

**Quiz App** ist eine mehrsprachige Trivia-Anwendung mit einem einzigartigen Twist: Der "Quizmaster" ist ein ultra-sarkastischer, schadenfreudiger Kommentator, der deine Antworten mit beißendem deutschen Humor begleitet.

### 🎭 Das besondere Erlebnis

- **🎪 Sarkastische Persönlichkeit**: Jede Antwort wird vom Quizmaster kommentiert – falsche Antworten mit Schadenfreude, richtige mit Skepsis
- **🌍 Plattformübergreifend**: Native Apps für iOS & Android + moderne Web-App
- **📚 700 Fragen**: 7 Kategorien mit je 100 handverlesenen Fragen
- **🎓 Lerneffekt**: Auto-generiertes Lexikon mit jedem richtig beantworteten Wissen
- **🏆 Gamification**: Level-System, Achievements, Streaks und In-App-Käufe

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Quiz-Erlebnis
- **12 Fragen pro Session** mit 4 Antwortmöglichkeiten
- **Echtzeit-Feedback** mit Quizmaster-Kommentaren
- **Streak-System** für Erfolgserlebnisse
- **Fortschritts-Tracking** mit visueller Anzeige

</td>
<td width="50%">

### 📱 Multi-Platform
- **iOS** (ab iOS 13)
- **Android** (ab API 21)
- **Web** (alle modernen Browser)
- **Offline-First** – funktioniert ohne Internet

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Design
- **2.5D Duolingo-Style** mit starken Schatten
- **Teal & Coral** Farbschema
- **Touch-First** Interaktionen
- **Responsive** für alle Bildschirmgrößen

</td>
<td width="50%">

### 🛒 Monetarisierung
- **1 kostenlose Kategorie** (Allgemeinwissen)
- **6 Premium-Kategorien** je €2,99
- **Bundle-Angebot** alle Kategorien für €9,99
- **In-App-Purchases** via Expo IAP

</td>
</tr>
</table>

---

## 📱 Screenshots

<div align="center">

<!-- Screenshots Gallery Placeholder -->

### Mobile App (iOS & Android)

<table>
<tr>
<td width="25%">
<img src="./docs/assets/screenshots/mobile-play.png" alt="Play Screen" width="100%">
<p align="center"><strong>Spielen</strong><br/>Quiz-Hub & Schnellstart</p>
</td>
<td width="25%">
<img src="./docs/assets/screenshots/mobile-quiz.png" alt="Quiz Session" width="100%">
<p align="center"><strong>Quiz Session</strong><br/>12 Fragen mit Feedback</p>
</td>
<td width="25%">
<img src="./docs/assets/screenshots/mobile-encyclopedia.png" alt="Encyclopedia" width="100%">
<p align="center"><strong>Lexikon</strong><br/>Dein Wissensarchiv</p>
</td>
<td width="25%">
<img src="./docs/assets/screenshots/mobile-profile.png" alt="Profile" width="100%">
<p align="center"><strong>Profil</strong><br/>Stats & Achievements</p>
</td>
</tr>
</table>

### Web App (Desktop & Tablet)

<table>
<tr>
<td width="50%">
<img src="./docs/assets/screenshots/web-desktop.png" alt="Web Desktop View" width="100%">
<p align="center"><strong>Desktop Ansicht</strong><br/>Vollständiges Quiz-Erlebnis im Browser</p>
</td>
<td width="50%">
<img src="./docs/assets/screenshots/web-responsive.png" alt="Web Responsive View" width="100%">
<p align="center"><strong>Responsive Design</strong><br/>Optimiert für alle Bildschirmgrößen</p>
</td>
</tr>
</table>

### Quiz Flow & Quizmaster

<table>
<tr>
<td width="33%">
<img src="./docs/assets/screenshots/quiz-correct.png" alt="Correct Answer" width="100%">
<p align="center"><strong>Richtige Antwort</strong><br/>"Glück gehabt..."</p>
</td>
<td width="33%">
<img src="./docs/assets/screenshots/quiz-incorrect.png" alt="Incorrect Answer" width="100%">
<p align="center"><strong>Falsche Antwort</strong><br/>"Natürlich falsch..."</p>
</td>
<td width="33%">
<img src="./docs/assets/screenshots/quiz-results.png" alt="Results Screen" width="100%">
<p align="center"><strong>Ergebnisse</strong><br/>Session-Statistiken</p>
</td>
</tr>
</table>

_🖼️ Screenshots coming soon! App currently in active development (Phase 0)._

</div>

---

## 🏗️ Tech Stack

<div align="center">

### Frontend

[![React Native](https://img.shields.io/badge/React_Native-0.81-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51+-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### State Management & Navigation

[![Zustand](https://img.shields.io/badge/Zustand-State-443E38?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![React Navigation](https://img.shields.io/badge/React_Navigation-6-5A45FF?style=for-the-badge)](https://reactnavigation.org/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)

### Styling

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![StyleSheet](https://img.shields.io/badge/React_Native_StyleSheet-API-20232A?style=for-the-badge)](https://reactnative.dev/docs/stylesheet)

### Storage & Data

[![AsyncStorage](https://img.shields.io/badge/AsyncStorage-React_Native-61DAFB?style=for-the-badge)](https://react-native-async-storage.github.io/async-storage/)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-Web_API-F7DF1E?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

</div>

### Architecture

- **Monorepo**: npm workspaces with 3 packages (mobile, web, shared)
- **Local-First**: All data stored locally, no backend required for MVP
- **Offline-Capable**: 700 questions bundled with app
- **Type-Safe**: TypeScript throughout with strict mode
- **Shared Business Logic**: Quiz engine, models, and utilities shared between platforms

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
Node.js >= 18.0.0
npm >= 9.0.0

# For mobile development
iOS Simulator (Xcode) or Expo Go app
Android Emulator (Android Studio) or Expo Go app
```

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app

# 2. Install all dependencies (monorepo)
npm run install:all

# 3a. Run mobile app
npm run mobile
# Scan QR code with Expo Go app on your phone

# 3b. Run web app
npm run web
# Opens at http://localhost:5173
```

### Development Commands

```bash
# Mobile
npm run mobile          # Start Expo development server
npm run mobile:ios      # Open iOS simulator
npm run mobile:android  # Open Android emulator

# Web
npm run web            # Start Vite dev server (with HMR)
npm run web:build      # Build for production

# Shared package
npm run shared:build   # Compile TypeScript
npm run shared:watch   # Watch mode for development

# All packages
npm run lint           # ESLint check
npm run format         # Prettier format
npm run clean          # Clean node_modules and build artifacts
```

---

## 📂 Project Structure

```
quiz-app/
├── packages/
│   ├── mobile/                 # 📱 React Native + Expo
│   │   ├── src/
│   │   │   ├── screens/        # Screen components (4 tabs)
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── ui/         # Design system components
│   │   │   │   ├── quiz/       # Quiz-specific components
│   │   │   │   └── encyclopedia/
│   │   │   ├── stores/         # Zustand state management
│   │   │   ├── services/       # Business logic
│   │   │   │   ├── storage/    # AsyncStorage implementation
│   │   │   │   ├── quiz/       # Quiz engine
│   │   │   │   ├── quizmaster/ # Comment generation
│   │   │   │   └── purchase/   # IAP logic
│   │   │   ├── navigation/     # React Navigation setup
│   │   │   ├── theme/          # Design system tokens
│   │   │   └── utils/          # Helper functions
│   │   └── app.json            # Expo configuration
│   │
│   ├── web/                    # 🌐 React + Vite
│   │   ├── src/
│   │   │   ├── pages/          # Page components (4 routes)
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── stores/         # Zustand state management
│   │   │   ├── services/       # Business logic
│   │   │   │   └── storage/    # localStorage implementation
│   │   │   ├── routes/         # React Router setup
│   │   │   └── theme/          # Design system tokens
│   │   └── vite.config.ts
│   │
│   └── shared/                 # 📦 Shared TypeScript package
│       ├── src/
│       │   ├── models/         # Data models (Question, User, etc.)
│       │   ├── utils/          # Shared utilities
│       │   ├── gameLogic/      # Quiz engine logic
│       │   ├── services/       # StorageService interface
│       │   ├── constants/      # Game constants, storage keys
│       │   └── data/
│       │       └── questions/  # 700 questions JSON (future)
│       └── tsconfig.json
│
├── docs/                       # 📚 Comprehensive documentation
│   ├── quiz_project_plan.md
│   ├── quiz_tech_architecture.md
│   ├── quiz_feature_specs.md
│   ├── 🎨 Quiz App design system.md
│   ├── quiz_tone_voice.md
│   └── quiz-kanban-tasks Phase 0.md
│
├── CLAUDE.md                   # 🤖 AI development guidance
├── README.md                   # 📖 You are here
├── package.json                # Root workspace configuration
└── .gitignore
```

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| **[Project Plan](./docs/quiz_project_plan.md)** | 10-week development timeline, milestones, and risk management |
| **[Tech Architecture](./docs/quiz_tech_architecture.md)** | Technical decisions (ADRs), architecture patterns, data flow |
| **[Feature Specs](./docs/quiz_feature_specs.md)** | Complete user flows, screen specifications, edge cases |
| **[Design System](./docs/🎨%20Quiz%20App%20design%20system.md)** | Colors, typography, components, shadows, accessibility |
| **[Tone & Voice](./docs/quiz_tone_voice.md)** | Quizmaster personality, comment templates, writing guidelines |
| **[Kanban Board](./docs/quiz-kanban-tasks%20Phase%200.md)** | Current phase tracking and task management |
| **[CLAUDE.md](./CLAUDE.md)** | Development guidance for AI assistants |

---

## 🎨 Design System

### Color Palette

```css
/* Primary (60%) */
--teal-500: #169C8F;      /* Buttons, active states, links */
--teal-700: #0E7066;      /* Pressed states */
--teal-300: #4DB5A9;      /* Disabled states */

/* Accent (10%) */
--coral-500: #FF6A5C;     /* CTAs, purchase buttons */
--coral-700: #E54A3C;     /* Pressed states */

/* Background (30%) */
--off-white: #F6F7F9;     /* Main background */
--white: #FFFFFF;         /* Cards, surfaces */

/* Semantic */
--success: #22C55E;       /* Correct answers */
--error: #EF4444;         /* Wrong answers */
--warning: #F59E0B;       /* Alerts */
--info: #3B82F6;          /* Information */
```

### 2.5D Shadow System

The design uses strong shadows to create a pseudo-3D "Duolingo-style" effect:

- **Level 1** (Subtle): `0 2px 4px rgba(0,0,0,0.1)` - Input fields
- **Level 2** (Default): `0 4px 12px rgba(0,0,0,0.15)` - Cards
- **Level 3** (Elevated): `0 8px 24px rgba(0,0,0,0.2)` - Buttons
- **Level 4** (Floating): `0 16px 48px rgba(0,0,0,0.25)` - Modals

### Typography Scale

- **H1 (Hero)**: 32px / 700 - Quiz scores
- **H2 (Page Title)**: 24px / 700 - Screen titles
- **H3 (Section)**: 20px / 600 - Section headers
- **Body Large**: 18px / 400 - Question text
- **Body**: 16px / 400 - Default text
- **Caption**: 12px / 500 - Labels

---

## 🎯 Development Roadmap

### Phase 0: Foundation ✅ (Week 1)
- [x] Project setup & monorepo structure
- [x] Dependencies & folder structure
- [x] Core infrastructure (storage, models, navigation)
- [ ] Theme system
- [ ] Testing setup

### Phase 1: Design (Week 2)
- [ ] Complete design system in Figma
- [ ] All screens designed (mobile + web)
- [ ] Assets exported

### Phase 2: Core Development (Week 3-5)
- [ ] Storage implementation
- [ ] Zustand stores
- [ ] Quiz engine core
- [ ] Quiz UI (PlayScreen, QuizSessionScreen)
- [ ] Results screen

### Phase 3: Features (Week 6-7)
- [ ] Encyclopedia system
- [ ] Categories & IAP
- [ ] Profile & stats
- [ ] Achievement system

### Phase 4: Content (Week 7-8)
- [ ] 700 questions (7 categories × 100)
- [ ] 50 Quizmaster comments
- [ ] Category metadata

### Phase 5: Polish (Week 8-9)
- [ ] Animations & transitions
- [ ] Testing (unit, integration, E2E)
- [ ] Bug fixes

### Phase 6: Launch (Week 10)
- [ ] App Store submission
- [ ] Play Store submission
- [ ] Web deployment

**Current Status**: Phase 0 - D3 Complete ✅ (3.5h / 18-24h estimated)

Track detailed progress: [`docs/quiz-kanban-tasks Phase 0.md`](./docs/quiz-kanban-tasks%20Phase%200.md)

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=mobile
npm test --workspace=web
npm test --workspace=shared

# Run tests in watch mode
npm test -- --watch

# Run E2E tests
npm run test:e2e
```

### Testing Strategy

- **Unit Tests** (Jest): Business logic, utilities, stores
- **Integration Tests**: Complete quiz flow, storage operations
- **E2E Tests**: Detox (mobile), Playwright (web)
- **Manual QA**: Comprehensive checklist in feature specs

---

## 🏆 Key Features Deep Dive

### 🎮 Quiz Mechanics

- **12-question sessions** per category
- **Fisher-Yates shuffle** for answer randomization
- **10 points** per correct answer
- **500 points** = 1 level up
- **Streak system** with visual feedback
- **Session history** persisted locally

### 💬 Quizmaster Comments

The Quizmaster has 3 "cruelty levels":

1. **Mild** (sarcastic): First correct, easy questions
   - _"Glück gehabt. Das war wohl geraten, oder?"_

2. **Medium** (mocking): Wrong answers
   - _"Natürlich falsch. Wie vorhersagbar."_

3. **Brutal** (savage): Easy questions wrong, multiple failures
   - _"Das wussten schon Grundschüler."_

### 📖 Encyclopedia System

- Auto-populated on correct answers
- Each entry includes:
  - Question & correct answer
  - TL;DR explanation
  - Fun fact
  - Source reference
- Searchable & filterable by category
- One entry per question (no duplicates)

### 🏅 Achievements (10 Total)

| Achievement | Trigger | Icon |
|-------------|---------|------|
| Anfänger-Versager | Complete 1 session | 🎯 |
| Glückssträhne | Streak of 5 | ⚡ |
| Unmöglicher Zufall | Streak of 10 | ⚡⚡ |
| Unverschämtes Glück | Perfect session (12/12) | 💯 |
| Geschwätzig | 100 questions answered | 💬 |
| Ausnahmetalent | 100 correct answers | ✅ |
| Halbwegs Kompetent | Reach level 5 | 🎖️ |
| Nicht Mehr Peinlich | Reach level 10 | 🏅 |
| Geldverschwendung | Unlock all categories | 🎁 |
| Chronischer Unwissender | Play 10 sessions | 📚 |

---

## 💰 Monetization

### In-App Purchases (Mobile)

- **Free**: 1 category (Allgemeinwissen) + 100 questions
- **Premium**: 6 categories @ €2,99 each
  - Skurriles für Ahnungslose
  - Wissenschaft für Zweifler
  - Geschichte für Vergessliche
  - Popkultur für Ahnungslose
  - Tierwissen für Stadtmenschen
  - Technik für Analoge
- **Bundle**: All categories @ €9,99 (40% discount)

Implemented via `expo-in-app-purchases` with receipt validation.

### Future Monetization (Post-MVP)

- Web payments via Stripe
- Premium features (custom categories, multiplayer)
- Ad-free experience

---

## 🤝 Contributing

This project is currently in active development (Phase 0). Contributions are welcome once the MVP is complete!

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests and linting (`npm test && npm run lint`)
5. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or tooling changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Developer** - Initial work & implementation
- **Designer** - UI/UX design & assets

---

## 🙏 Acknowledgments

- Inspired by **Duolingo's** playful 2.5D design language
- **Expo** for making cross-platform mobile development accessible
- **Vite** for blazing-fast web development
- The **React** and **TypeScript** communities

---

## 📞 Support

- 📧 Email: support@quizapp.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/quiz-app/issues)
- 📖 Documentation: [Project Wiki](https://github.com/yourusername/quiz-app/wiki)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/quiz-app/discussions)

---

<div align="center">

**Built with ❤️ and a healthy dose of Schadenfreude**

Made with TypeScript • React • React Native • Expo • Vite

⭐ Star us on GitHub — it helps!

[⬆ Back to Top](#-quiz-app)

</div>
