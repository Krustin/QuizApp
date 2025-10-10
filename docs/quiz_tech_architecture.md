# 🏗️ Quiz App - Technical Architecture

**Platform:** iOS, Android, Web  
**Architecture:** Local-First, Offline-Capable  
**Team:** Developer + Designer  
**Version:** 1.0.0 MVP

---

## 🎯 Architecture Decision Records (ADRs)

### ADR-001: React Native + Expo (Mobile) + Separate React (Web)

**DECISION:** Use React Native with Expo for iOS/Android, separate React app for Web

**REASONING:**
- ✅ Expo provides fastest mobile development (no native code needed for MVP)
- ✅ Built-in OTA updates for bug fixes without app store review
- ✅ Expo SDK has everything needed: AsyncStorage, IAP, splash screens, icons
- ✅ Separate React web app = better performance, no react-native-web compromises
- ✅ Shared code: Data models, business logic, game mechanics (import as package)

**ALTERNATIVES REJECTED:**
- ❌ react-native-web: Performance issues, limited web features, styling compromises
- ❌ Bare React Native: Too complex for MVP, requires native development knowledge
- ❌ Flutter: Team already knows React/TypeScript

---

### ADR-002: Zustand for State Management

**DECISION:** Use Zustand instead of Redux or Context API

**REASONING:**
- ✅ Simplest API (less boilerplate than Redux)
- ✅ Works identically in React Native and React Web
- ✅ Built-in TypeScript support
- ✅ Easy to persist state to AsyncStorage/LocalStorage
- ✅ No provider hell like Context API
- ✅ Excellent DevTools

**STORE STRUCTURE:**
- `userStore`: Profile, stats, achievements
- `quizStore`: Active session, current question, score
- `encyclopediaStore`: Unlocked entries
- `categoryStore`: Unlock status, progress
- `settingsStore`: App preferences, sound, theme

---

### ADR-003: React Navigation 6 (Mobile) + React Router 6 (Web)

**DECISION:** Platform-specific navigation libraries

**MOBILE (React Navigation 6):**
- ✅ Industry standard for React Native
- ✅ Bottom tab navigator built-in
- ✅ Native animations and gestures
- ✅ Deep linking support for future

**WEB (React Router 6):**
- ✅ Standard for React web apps
- ✅ URL-based routing
- ✅ Browser history integration

---

### ADR-004: AsyncStorage (Mobile) + LocalStorage (Web)

**DECISION:** Use platform-native storage, wrap in unified API

**MOBILE:** `@react-native-async-storage/async-storage`  
**WEB:** Browser LocalStorage + IndexedDB for large data

**SHARED:** StorageService interface (from data models)
- Mobile implementation uses AsyncStorage
- Web implementation uses LocalStorage + IndexedDB
- Identical API for both platforms

---

### ADR-005: Questions Bundled as JSON

**DECISION:** Ship 700 questions as static JSON file in app bundle

**REASONING:**
- ✅ No network requests = instant gameplay
- ✅ Works completely offline
- ✅ Questions loaded on app startup
- ✅ Easy to update via app update or OTA (Expo)

**STRUCTURE:**
```
/assets/questions/
  ├── general.json (100 questions)
  ├── skurriles.json (100 questions)
  ├── wissenschaft.json (100 questions)
  ├── geschichte.json (100 questions)
  ├── popkultur.json (100 questions)
  ├── tierwissen.json (100 questions)
  └── technik.json (100 questions)
```

**FUTURE:** Could move to SQLite for faster queries (Phase 2)

---

### ADR-006: Expo In-App Purchases

**DECISION:** Use expo-in-app-purchases for IAP

**REASONING:**
- ✅ Unified API for iOS App Store + Google Play
- ✅ No native code required
- ✅ Receipt validation built-in

**IMPLEMENTATION:**
- Non-consumable products (unlock categories)
- Bundle as separate product
- Purchase status stored locally (verified on restore)

---

## 📁 Project Structure - Mobile (React Native + Expo)

```
quiz-app-mobile/
├── app.json                    # Expo configuration
├── package.json
├── tsconfig.json
├── babel.config.js
│
├── App.tsx                     # Entry point
│
├── src/
│   ├── navigation/             # React Navigation setup
│   │   ├── RootNavigator.tsx   # Main navigator
│   │   ├── BottomTabNavigator.tsx
│   │   └── types.ts            # Navigation types
│   │
│   ├── screens/                # All screen components
│   │   ├── PlayScreen.tsx      # Main quiz selection
│   │   ├── QuizSessionScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   ├── EncyclopediaScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── OnboardingScreen.tsx
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── AnswerButton.tsx
│   │   │   └── QuizmasterComment.tsx
│   │   ├── quiz/               # Quiz-specific components
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ScoreDisplay.tsx
│   │   │   └── StreakIndicator.tsx
│   │   └── encyclopedia/
│   │       ├── EntryCard.tsx
│   │       └── CategoryFilter.tsx
│   │
│   ├── stores/                 # Zustand state management
│   │   ├── userStore.ts
│   │   ├── quizStore.ts
│   │   ├── encyclopediaStore.ts
│   │   ├── categoryStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── services/               # Business logic
│   │   ├── storage/
│   │   │   ├── StorageService.ts      # Unified storage API
│   │   │   └── AsyncStorageImpl.ts    # AsyncStorage implementation
│   │   ├── quiz/
│   │   │   ├── QuizEngine.ts          # Quiz logic (shuffle, scoring)
│   │   │   ├── QuestionSelector.ts    # Random question selection
│   │   │   └── StreakManager.ts       # Streak calculation
│   │   ├── quizmaster/
│   │   │   └── CommentGenerator.ts    # Sarcastic comment selection
│   │   ├── purchase/
│   │   │   └── IAPService.ts          # In-app purchase logic
│   │   └── analytics/
│   │       └── AnalyticsService.ts    # Local analytics tracking
│   │
│   ├── models/                 # TypeScript types (from Data Models doc)
│   │   ├── Question.ts
│   │   ├── User.ts
│   │   ├── Session.ts
│   │   └── index.ts
│   │
│   ├── data/                   # Static data
│   │   ├── questions/          # 700 questions as JSON
│   │   │   ├── general.json
│   │   │   ├── skurriles.json
│   │   │   └── ...
│   │   ├── achievements.json   # Achievement definitions
│   │   ├── categories.json     # Category metadata
│   │   └── quizmasterComments.json
│   │
│   ├── theme/                  # Design system
│   │   ├── colors.ts           # Teal, Off-White, Coral
│   │   ├── shadows.ts          # 2.5D shadow definitions
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── animations.ts       # Touch press animations
│   │
│   ├── utils/                  # Helper functions
│   │   ├── dateHelpers.ts
│   │   ├── numberFormatters.ts
│   │   ├── shuffle.ts          # Fisher-Yates shuffle
│   │   └── uuid.ts             # UUID generation
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useQuizSession.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useUserProfile.ts
│   │   └── useIAP.ts
│   │
│   └── constants/
│       ├── gameConstants.ts    # From Data Models
│       └── config.ts           # App configuration
│
├── assets/                     # Images, fonts, sounds
│   ├── images/
│   ├── fonts/
│   └── sounds/                 # Future: UI sounds
│
└── __tests__/                  # Unit tests (Jest)
    ├── services/
    ├── utils/
    └── stores/
```

---

## 📁 Project Structure - Web (React)

```
quiz-app-web/
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite for fast builds
│
├── public/
│   ├── index.html
│   └── assets/                 # Static assets
│
├── src/
│   ├── App.tsx
│   ├── main.tsx                # Entry point
│   │
│   ├── routes/                 # React Router 6
│   │   ├── AppRoutes.tsx
│   │   └── PrivateRoute.tsx
│   │
│   ├── pages/                  # Page components
│   │   ├── PlayPage.tsx
│   │   ├── QuizSessionPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   ├── EncyclopediaPage.tsx
│   │   └── ProfilePage.tsx
│   │
│   ├── components/             # Same structure as mobile
│   ├── stores/                 # Zustand (same as mobile)
│   │
│   ├── services/
│   │   ├── storage/
│   │   │   └── LocalStorageImpl.ts    # LocalStorage implementation
│   │   ├── quiz/               # Shared logic (import from mobile)
│   │   └── purchase/
│   │       └── WebPurchaseService.ts  # Stripe/PayPal integration
│   │
│   ├── models/                 # Shared types (symlink or package)
│   ├── data/                   # Same question JSON files
│   ├── theme/                  # Shared design system
│   └── utils/                  # Shared utilities
│
└── __tests__/
```

---

## 🔌 Shared Code Strategy

### Option A: Monorepo (Recommended for small team)

```
quiz-app/
├── packages/
│   ├── shared/              # Shared TypeScript package
│   │   ├── models/
│   │   ├── utils/
│   │   ├── gameLogic/
│   │   └── data/
│   ├── mobile/              # React Native Expo app
│   └── web/                 # React Vite app
└── package.json             # Workspace root
```

**Tools:** npm workspaces or yarn workspaces

**Benefits:**
- ✅ Single repo to manage
- ✅ Easy to share code changes
- ✅ Consistent versions across platforms

### Option B: Separate Repos + npm Package

- `quiz-app-mobile` (repo)
- `quiz-app-web` (repo)
- `@quiz/shared` (private npm package)

**Benefits:**
- ✅ Cleaner separation
- ✅ Independent deployment
- ❌ More overhead for small team

---

## 🎨 Styling Approach

### Mobile: StyleSheet API + Theme Object

React Native's built-in styling:
- No external libraries needed
- 2.5D shadows using `elevation` (Android) + `shadowProps` (iOS)
- Animated API for press effects

**Example:**
```typescript
// theme/shadows.ts
export const shadows = {
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Android
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
};
```

### Web: Tailwind CSS

**Recommendation:** Tailwind CSS
- ✅ Fast development
- ✅ Design system tokens in tailwind.config
- ✅ Responsive design built-in
- ✅ No runtime overhead

2.5D shadows as custom utilities:
```css
.shadow-2d-button {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.shadow-2d-card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}
```

---

## 🗄️ Data Flow Architecture

### App Startup Flow

1. **Load App**
2. **Check AsyncStorage/LocalStorage**
3. **If first launch:**
   - Create initial UserProfile
   - Set GENERAL category as unlocked
   - Load question bank from JSON
   - Show optional onboarding (can skip for MVP)
4. **If returning user:**
   - Load UserProfile
   - Load category access
   - Load encyclopedia entries
   - Continue to main app
5. **Main App Ready**

---

### Quiz Session Flow (Data Layer)

1. **User taps "Start Quiz"** (category selected)
2. **QuestionSelector.getRandomQuestions(category, 12)**
   - Fetch from bundled JSON
   - Filter out recently asked (optional optimization)
   - Shuffle and return 12 questions
3. **Create QuizSession object**
   - sessionId = uuid()
   - questions = [] (will populate as user answers)
   - score = 0
   - startedAt = now()
4. **FOR EACH QUESTION (1-12):**
   - Show question + 4 answers
   - User selects answer
   - Check if correct
   - Generate Quizmaster comment
   - **If correct:**
     - Add 10 points
     - Update streak
     - Create EncyclopediaEntry
   - **If incorrect:**
     - Reset streak (if simple mode)
   - Save SessionQuestion to session.questions[]
   - Update UI
5. **After 12th question:**
   - Calculate final score
   - Check for level-up (500 points)
   - Check for achievements
   - Save completed QuizSession to storage
   - Update UserProfile stats
   - Show results screen

---

### Storage Write Strategy

**APPROACH:** Write-through (immediate persistence)
- Every answer = immediate write to storage
- Prevents data loss if app crashes
- Acceptable for local storage (fast enough)

**WHAT TO PERSIST:**
- After each answer: Update active session in memory
- After session complete: Write full session + update profile
- Debounce writes if performance issue (unlikely)

**STORAGE KEYS:**
- `@quiz_user_profile` (single object)
- `@quiz_sessions` (array, append new session)
- `@quiz_encyclopedia` (array, append new entries)
- `@quiz_category_access` (array, update on purchase)

---

## 🛒 In-App Purchase Flow

### Mobile IAP (expo-in-app-purchases)

```typescript
// services/purchase/IAPService.ts
import * as InAppPurchases from 'expo-in-app-purchases';

class IAPService {
  async initialize() {
    await InAppPurchases.connectAsync();
    // Load available products
    const products = await InAppPurchases.getProductsAsync([
      'quiz_category_skurriles',
      'quiz_category_wissenschaft',
      // ... all SKUs
      'quiz_all_categories_bundle',
    ]);
    return products;
  }

  async purchaseCategory(sku: string) {
    try {
      await InAppPurchases.purchaseItemAsync(sku);
      // On success: Unlock category locally
      // Update categoryStore
      // Persist to AsyncStorage
    } catch (error) {
      // Handle cancellation or error
    }
  }

  async restorePurchases() {
    const history = await InAppPurchases.getPurchaseHistoryAsync();
    // Re-unlock all purchased categories
    // Important for reinstalls or new device
  }
}
```

### Web Purchase (Stripe or PayPal)

**Phase 2:** Requires backend for payment processing  
**For MVP:** Could use local unlock codes or skip web IAP

---

## 🧪 Testing Strategy

### Unit Tests (Jest)
- QuizEngine logic
- Scoring calculations
- Streak management
- Question shuffling
- Storage service
- Zustand stores

### Integration Tests
- Quiz session flow (start to finish)
- Encyclopedia auto-population
- Level-up logic
- Purchase flow (mocked IAP)

### E2E Tests
- **Mobile:** Detox
- **Web:** Playwright

Test scenarios:
- Complete quiz session
- Category unlock flow
- Navigation between screens

### Manual QA Checklist
- [ ] First launch experience
- [ ] Complete 12-question session
- [ ] Correct/incorrect answer feedback
- [ ] Encyclopedia entry appears
- [ ] Level-up animation
- [ ] IAP flow (category unlock)
- [ ] IAP restore purchases
- [ ] Offline functionality
- [ ] App backgrounding (save state)

---

## 📱 Build & Deployment

### Mobile (Expo)

**DEVELOPMENT:**
```bash
expo start
# Use Expo Go app for testing (iOS/Android)
# Hot reload enabled
```

**STAGING:**
```bash
eas build --profile preview
# TestFlight (iOS) / Internal Testing (Android)
```

**PRODUCTION:**
```bash
eas build --profile production
eas submit  # Auto-submit to stores
```

**OTA UPDATES:**
```bash
eas update
# Push JS changes without app store review
# Great for bug fixes, content updates
# Cannot update native code (IAP, etc.)
```

---

### Web (Vite + React)

**DEVELOPMENT:**
```bash
npm run dev
# Fast HMR
```

**PRODUCTION BUILD:**
```bash
npm run build
# Outputs to /dist
```

**HOSTING OPTIONS:**
- **Vercel** (recommended: free, auto-deploy from git)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

---

## 🔐 Security Considerations

### Local-First Security

✅ **NO BACKEND** = No server vulnerabilities for MVP  
✅ **NO AUTH** = No password leaks

⚠️ **CONSIDERATIONS:**
- IAP receipt validation (handled by expo-in-app-purchases)
- Local data can be modified (acceptable for MVP)
- Future: Backend verification for purchases

### Data Privacy
- All data stored locally on device
- No analytics sent (for MVP)
- No PII collected
- GDPR/CCPA compliant by default (no tracking)

---

## 🚀 Performance Optimization

### Mobile Performance

1. FlatList for long lists (encyclopedia, categories)
2. React.memo for answer buttons (prevent re-renders)
3. Animated API with `useNativeDriver: true`
4. Image optimization (use expo-image)
5. Code splitting (React.lazy for screens)
6. **Question loading strategy:**
   - Load all questions on app startup (one-time cost)
   - Keep in memory (only ~1MB for 700 questions)
   - No network = instant gameplay
7. **Storage optimization:**
   - Batch writes when possible
   - Debounce frequent updates
   - Clear old sessions (keep last 50?)

### Web Performance

1. Code splitting (React Router lazy loading)
2. Image optimization (WebP format)
3. IndexedDB for large data (encyclopedia)
4. Service Worker for offline capability (Phase 2)
5. Lighthouse score target: **90+**

---

## 📊 Analytics & Monitoring (Phase 2)

**For MVP:** Local analytics only
- Track in-memory stats (no external service)
- Question difficulty analytics
- Category popularity
- User progression funnel

**Phase 2:** Add external analytics
- Firebase Analytics / Mixpanel
- Crash reporting (Sentry)
- Performance monitoring

---

## 🎯 Tech Stack Summary

### Mobile
- **Framework:** React Native
- **Platform:** Expo SDK 51+
- **Language:** TypeScript
- **State Management:** Zustand
- **Navigation:** React Navigation 6
- **Storage:** @react-native-async-storage/async-storage
- **IAP:** expo-in-app-purchases
- **Testing:** Jest + Detox
- **CI/CD:** Expo EAS

### Web
- **Framework:** React
- **Bundler:** Vite
- **Language:** TypeScript
- **State Management:** Zustand
- **Routing:** React Router 6
- **Styling:** Tailwind CSS
- **Storage:** LocalStorage + IndexedDB
- **Testing:** Jest + Playwright
- **Hosting:** Vercel

### Shared
- **Models:** Shared TypeScript types
- **Utils:** Shared utility functions
- **Game Logic:** Shared quiz engine
- **Data:** Shared question JSON files

---

## ✅ MVP Implementation Checklist

### PHASE 0: Setup (Week 1)
- [ ] Create Expo project (mobile)
- [ ] Create Vite project (web)
- [ ] Setup monorepo structure
- [ ] Install dependencies
- [ ] Configure TypeScript
- [ ] Setup ESLint + Prettier

### PHASE 1: Core Infrastructure (Week 2)
- [ ] Implement StorageService (mobile + web)
- [ ] Setup Zustand stores
- [ ] Create theme system (colors, shadows)
- [ ] Setup navigation (mobile: tabs, web: routes)
- [ ] Load question JSON on startup

### PHASE 2: Quiz Core (Week 3-4)
- [ ] Question selection logic
- [ ] Quiz session screen (UI)
- [ ] Answer selection + validation
- [ ] Quizmaster comment system
- [ ] Scoring + streak logic
- [ ] Session complete screen

### PHASE 3: Features (Week 5-6)
- [ ] Encyclopedia screen + auto-population
- [ ] Profile screen (stats display)
- [ ] Categories screen
- [ ] Category unlock flow
- [ ] IAP integration (mobile)

### PHASE 4: Polish (Week 7)
- [ ] Animations (press effects, transitions)
- [ ] Sound effects (optional)
- [ ] Error handling
- [ ] Loading states
- [ ] Achievement system

### PHASE 5: Testing & Launch (Week 8)
- [ ] Unit tests (critical paths)
- [ ] Manual QA checklist
- [ ] TestFlight beta (iOS)
- [ ] Internal testing (Android)
- [ ] Final polish
- [ ] Submit to app stores
- [ ] Deploy web app

---

## 🚦 Development Workflow

### Day-to-Day Workflow

1. **Designer creates Figma components**
2. **Dev implements in mobile first**
   - Build React Native component
   - Match Figma exactly (colors, shadows, spacing)
   - Test on iOS + Android simulators
3. **Port to web**
   - Adapt component for web (DOM)
   - Use Tailwind classes
   - Test in browser
4. **Shared logic extracted**
   - Move business logic to /shared
   - Import in both platforms
5. **Iterate based on testing**

### Tools
- **Expo Go:** Quick testing on real device
- **React DevTools:** Debug component tree
- **Zustand DevTools:** Inspect state
- **Figma Dev Mode:** Extract exact values