# Quiz App - Quick Start Guide

**Version**: 2.0
**Last Updated**: 2025-10-10
**Status**: Ready for Development Testing

---

## 🚀 Getting Started

This guide will help you run the Quiz App on both web and mobile platforms.

---

## Prerequisites

### Required Software
- **Node.js**: v18 or later
- **npm**: v9 or later (comes with Node.js)
- **Git**: For version control

### Mobile Development (Optional)
- **Expo Go App**: Install on your iOS/Android device
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Recommended Tools
- **VS Code**: With TypeScript/React extensions
- **Chrome DevTools**: For web debugging
- **React Developer Tools**: Browser extension

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd QuizApp
```

### 2. Install Dependencies
```bash
# Install all workspace dependencies
npm install
```

This will install dependencies for:
- Root workspace
- `packages/shared` (core logic)
- `packages/web` (React web app)
- `packages/mobile` (React Native mobile app)

### 3. Build Shared Package
The shared package must be built before running web or mobile:

```bash
cd packages/shared
npm run build
cd ../..
```

**Note**: Run this command whenever you modify files in `packages/shared/src/`.

---

## 🌐 Running the Web App

### Start Development Server
```bash
cd packages/web
npm run dev
```

### Access the App
- **Local**: http://localhost:5173/
- **Network**: Use `--host` flag to access from other devices

### Web Development Features
- ⚡ **Hot Module Replacement**: Changes reflect instantly
- 🎨 **Tailwind CSS**: Utility-first styling
- 🔍 **React DevTools**: Component inspection
- 📱 **Responsive**: Works on desktop, tablet, mobile browsers

### Web Build Commands
```bash
# Development server (with HMR)
npm run dev

# Type check
npm run build  # Runs tsc -b && vite build

# Preview production build
npm run preview
```

### Web Routes
- `/` - Play Screen (home)
- `/categories` - All quiz categories
- `/encyclopedia` - Encyclopedia of answered questions
- `/profile` - User profile and stats
- `/quiz` - Quiz session (requires navigation state)
- `/results` - Quiz results (requires navigation state)

---

## 📱 Running the Mobile App

### Start Expo Development Server
```bash
cd packages/mobile
npm start
```

### Choose Your Platform

#### Option 1: Expo Go (Easiest)
1. Install Expo Go on your phone
2. Scan the QR code from terminal
3. App loads on your device

#### Option 2: iOS Simulator (Mac only)
```bash
npm run ios
```
**Requirements**: Xcode with iOS Simulator installed

#### Option 3: Android Emulator
```bash
npm run android
```
**Requirements**: Android Studio with emulator configured

### Mobile Development Features
- 🔥 **Fast Refresh**: Instant updates on save
- 📱 **Native Components**: React Native UI
- 🎯 **Hot Reloading**: Preserves state
- 🔧 **Dev Menu**: Shake device or press Cmd+D (iOS) / Cmd+M (Android)

### Mobile Build Commands
```bash
# Start development server
npm start

# Start with platform
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Expo web (alternative to Vite)
```

### Mobile Navigation
**Main Tabs**:
- 🎯 **Play** - Start a quiz
- 📚 **Categories** - Browse all categories
- 📖 **Encyclopedia** - Review past questions
- 👤 **Profile** - Stats and settings

**Modal Screens**:
- Quiz Session (full screen)
- Results Screen (full screen)

---

## 🏗️ Project Structure

```
QuizApp/
├── packages/
│   ├── shared/          # Shared logic (models, stores, services)
│   │   ├── src/
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── services/     # Business logic
│   │   │   ├── stores/       # Zustand state management
│   │   │   ├── theme/        # Shared design tokens
│   │   │   ├── data/         # Questions, comments
│   │   │   └── constants/    # App constants
│   │   └── dist/        # Built files (created by npm run build)
│   │
│   ├── web/             # React web app
│   │   ├── src/
│   │   │   ├── screens/      # Main UI screens
│   │   │   ├── pages/        # Route wrappers
│   │   │   ├── components/   # Reusable components
│   │   │   ├── routes/       # React Router config
│   │   │   └── services/     # LocalStorage implementation
│   │   └── dist/        # Production build
│   │
│   └── mobile/          # React Native mobile app
│       ├── src/
│       │   ├── screens/      # Main UI screens
│       │   ├── components/   # Reusable components
│       │   ├── navigation/   # React Navigation config
│       │   └── services/     # AsyncStorage implementation
│       └── .expo/       # Expo generated files
│
├── docs/                # Documentation
│   ├── QUICK-START.md        # This file
│   ├── INTEGRATION-SUMMARY.md # Technical integration details
│   ├── UI-STYLE-GUIDE.md     # Design system
│   └── PHASE2-SUMMARY.md     # Phase 2 completion report
│
└── node_modules/        # Dependencies (gitignored)
```

---

## 🔧 Common Development Tasks

### Adding a New Question
1. Edit `packages/shared/src/data/questions/questions.ts`
2. Follow the existing question format
3. Rebuild shared package: `cd packages/shared && npm run build`
4. Restart dev servers

### Modifying the Theme
1. Edit files in `packages/shared/src/theme/`
2. Changes apply to both platforms
3. Rebuild shared package
4. Hot reload should pick up changes

### Creating a New Screen
1. **Web**: Add to `packages/web/src/screens/`
2. **Mobile**: Add to `packages/mobile/src/screens/`
3. Add route/navigation configuration
4. Import and use shared components/stores

### Debugging

#### Web Debugging
- **Console**: Open Chrome DevTools (F12)
- **React**: Install React Developer Tools extension
- **Network**: Check Network tab for storage operations
- **Storage**: Application tab → Local Storage

#### Mobile Debugging
- **Console**: Logs appear in terminal
- **React**: Shake device → Debug → Enable Remote JS Debugging
- **Network**: Use React Native Debugger
- **Storage**: Can't inspect directly (use logs)

---

## 🧪 Testing the App

### Manual Testing Checklist

#### Web Testing
1. **Navigation**
   - [ ] Click all navigation bar links
   - [ ] Verify correct page loads
   - [ ] Back/forward buttons work

2. **Quiz Flow**
   - [ ] Select category from Play screen
   - [ ] Answer 12 questions
   - [ ] See sarcastic feedback
   - [ ] View results with correct grade
   - [ ] Navigate back to home

3. **Data Persistence**
   - [ ] Complete a quiz
   - [ ] Refresh page (F5)
   - [ ] Verify profile stats updated
   - [ ] Check localStorage (DevTools)

4. **Responsive Design**
   - [ ] Test on desktop (1920x1080)
   - [ ] Test on tablet (768px)
   - [ ] Test on mobile (375px)

#### Mobile Testing
1. **Navigation**
   - [ ] Tap all 4 bottom tabs
   - [ ] Verify correct screen loads
   - [ ] Tab bar always visible

2. **Quiz Flow**
   - [ ] Select category from Play screen
   - [ ] Answer 12 questions
   - [ ] See sarcastic feedback
   - [ ] View results with correct grade
   - [ ] Navigate back to home

3. **Data Persistence**
   - [ ] Complete a quiz
   - [ ] Close app completely
   - [ ] Reopen app
   - [ ] Verify profile stats persisted

4. **Gestures**
   - [ ] Swipe gestures work
   - [ ] Scroll works smoothly
   - [ ] Tap targets are large enough

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@quiz/shared'"

**Cause**: Shared package not built or not linked properly

**Fix**:
```bash
cd packages/shared
npm run build
cd ../web  # or ../mobile
npm install
```

### Issue: Web build fails with TypeScript errors

**Cause**: Type checking enabled during build

**Fix**: Check specific error messages. Most common:
- Missing imports
- Type mismatches
- Unused variables (warnings only)

### Issue: Expo won't start

**Cause**: Port conflict or cache issues

**Fix**:
```bash
# Clear Expo cache
cd packages/mobile
npx expo start -c

# If port 8081 is in use
lsof -ti:8081 | xargs kill
```

### Issue: Changes not reflecting

**Web**:
```bash
# Hard refresh
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Or restart dev server
Ctrl+C then npm run dev
```

**Mobile**:
```bash
# Shake device → Reload
# Or press 'r' in terminal
```

### Issue: "Module not found" after adding dependency

**Fix**:
```bash
# Reinstall dependencies
npm install

# If still failing, clear cache
rm -rf node_modules package-lock.json
npm install
```

### Issue: iOS Simulator not opening

**Cause**: Xcode not installed or configured

**Fix**:
1. Install Xcode from App Store
2. Run: `sudo xcode-select --switch /Applications/Xcode.app`
3. Open Xcode once to accept license
4. Try again: `npm run ios`

### Issue: Android Emulator not starting

**Cause**: Android Studio not configured

**Fix**:
1. Install Android Studio
2. Open AVD Manager
3. Create a virtual device
4. Start emulator manually first
5. Try again: `npm run android`

---

## 📊 Performance Tips

### Web Optimization
- Use React DevTools Profiler to find slow renders
- Check Network tab for large bundle sizes
- Enable production mode for testing: `npm run build && npm run preview`

### Mobile Optimization
- Enable Performance Monitor in dev menu
- Watch for excessive re-renders
- Test on real device for accurate performance
- Use React Native Debugger for profiling

---

## 🔐 Data Storage

### Web (LocalStorage)
- **Location**: Browser localStorage
- **Capacity**: ~5MB per domain
- **Persistence**: Permanent (until cleared)
- **Access**: Developer Tools → Application → Local Storage

### Mobile (AsyncStorage)
- **Location**: Native storage (iOS/Android)
- **Capacity**: Device dependent (~10MB+)
- **Persistence**: Permanent (until app deleted)
- **Access**: Via code only (can't inspect directly)

### Storage Keys
- `user_profile` - User stats and progress
- `quiz_sessions` - History of completed quizzes
- `category_access` - Unlocked categories
- `encyclopedia_entries` - Unlocked question explanations
- `achievements` - Earned badges
- `app_settings` - Sound, vibration preferences

---

## 🎨 Design System

### Colors
- **Primary**: #169C8F (Teal) - Main actions
- **Accent**: #FF6A5C (Coral) - Secondary actions
- **Success**: #2DC071 (Green) - Correct answers
- **Destructive**: #FF4D4F (Red) - Incorrect answers

### Typography
- **Font**: System default (SF Pro on iOS, Roboto on Android, Inter on web)
- **Scale**: 12, 14, 16, 18, 20, 24, 30, 36 px

### Spacing
- **Base Unit**: 4px
- **Scale**: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px

### Components
All components follow the **2.5D Duolingo-inspired design**:
- Rounded corners (16px)
- Multi-layer shadows
- Elevated feel with transform animations
- Bouncy interactions

See [UI-STYLE-GUIDE.md](./UI-STYLE-GUIDE.md) for complete design documentation.

---

## 📚 Additional Resources

### Documentation
- [INTEGRATION-SUMMARY.md](./INTEGRATION-SUMMARY.md) - Technical integration details
- [UI-STYLE-GUIDE.md](./UI-STYLE-GUIDE.md) - Complete design system
- [PHASE2-SUMMARY.md](./PHASE2-SUMMARY.md) - Phase 2 development summary

### External Links
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

## 🆘 Getting Help

### Quick Checks
1. Is the shared package built? (`packages/shared/dist/` should exist)
2. Are all dependencies installed? (`npm install` in root)
3. Is the dev server running? (Check terminal for errors)
4. Are there TypeScript errors? (Red underlines in VS Code)

### Common Solutions
- **Restart everything**: Ctrl+C all terminals, `npm install`, start again
- **Clear caches**: `rm -rf node_modules .expo .vite` then `npm install`
- **Check logs**: Terminal output usually shows the exact problem

### Still Stuck?
- Check error messages carefully (they usually point to the issue)
- Google the exact error message
- Check if it's a known issue in dependencies' GitHub repos

---

## 🚢 Ready for Production?

This is a **development build**. Before deploying to production:

### Web
1. Run `npm run build` in packages/web
2. Test the preview: `npm run preview`
3. Deploy `dist/` folder to hosting (Vercel, Netlify, etc.)

### Mobile
1. Configure app.json (name, icon, splash screen)
2. Build with EAS: `eas build --platform all`
3. Submit to App Store / Google Play

**Note**: Production deployment is not covered in this quick start. See Expo/React deployment guides for details.

---

## ✅ You're Ready!

If you can:
- ✅ Start web dev server (`npm run dev`)
- ✅ Start mobile dev server (`npm start`)
- ✅ See the app running
- ✅ Navigate between screens
- ✅ Complete a quiz

**Congratulations!** You're ready to develop the Quiz App. 🎉

---

_Last Updated: 2025-10-10_
_For questions or issues, refer to the documentation in `/docs`_
