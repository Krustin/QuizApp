# Runtime Testing Checklist - Phase 2 Integration

**Version**: 1.0
**Created**: 2025-10-10
**Purpose**: Verify Phase 2 navigation and UI integration works end-to-end

---

## 🎯 Testing Objectives

This checklist ensures:
1. ✅ Both platforms launch without errors
2. ✅ All navigation routes work correctly
3. ✅ Store initialization and data persistence function
4. ✅ UI components render as expected
5. ✅ Complete quiz flow is functional

---

## 🌐 Web App Testing

### Prerequisites
```bash
cd /Users/j.loose/Documents/GitHub/QuizApp/packages/web
npm run dev
# Should open at http://localhost:5173
```

### Test 1: Initial Load
- [ ] **Web server starts** without errors
- [ ] **App loads** in browser (no white screen)
- [ ] **No console errors** (F12 → Console tab)
- [ ] **Navigation bar visible** with 4 links

**Expected State:**
- URL: `http://localhost:5173/`
- Screen: PlayScreen with "Versagens-Simulator" header
- Navigation: Home, Categories, Encyclopedia, Profile links visible

### Test 2: Navigation Bar
- [ ] **Click "Kategorien"** → Navigates to `/categories`
- [ ] **Click "Lexikon"** → Navigates to `/encyclopedia`
- [ ] **Click "Profil"** → Navigates to `/profile`
- [ ] **Click "Spielen"** → Returns to `/`
- [ ] **Browser back button** works correctly
- [ ] **Browser forward button** works correctly

**Expected:**
- URL updates on each navigation
- Screen content changes appropriately
- No console errors during navigation

### Test 3: PlayScreen
- [ ] **Header displays** "Versagens-Simulator"
- [ ] **Motivational message** shows (random German sarcasm)
- [ ] **Stats cards visible** (Level, Streak, Accuracy, Questions)
- [ ] **Default stats show** (Level 1, 0 Streak, etc.)
- [ ] **Action buttons render** ("Blamage starten", "Kategorie wählen")

**Check LocalStorage:**
```javascript
// In browser console (F12)
localStorage.getItem('user_profile')
// Should show user profile JSON or null (first time)
```

### Test 4: CategoriesScreen
Navigate to `/categories`:
- [ ] **7 category cards** displayed
- [ ] **"Allgemeinwissen" is unlocked** (no lock icon)
- [ ] **6 other categories locked** (lock icon visible)
- [ ] **Unlock buttons show prices** (€2,99)
- [ ] **Click unlock button** shows alert/modal (IAP placeholder)

**Expected Categories:**
1. ✅ Allgemeinwissen (unlocked)
2. 🔒 Skurriles für Ahnungslose (€2,99)
3. 🔒 Wissenschaft für Zweifler (€2,99)
4. 🔒 Geschichte für Vergessliche (€2,99)
5. 🔒 Popkultur für Ahnungslose (€2,99)
6. 🔒 Tierwissen für Stadtmenschen (€2,99)
7. 🔒 Technik für Analoge (€2,99)

### Test 5: EncyclopediaScreen
Navigate to `/encyclopedia`:
- [ ] **Empty state shows** (no entries yet)
- [ ] **Search bar renders** correctly
- [ ] **Category filter buttons** visible
- [ ] **Message explains** how to unlock entries (answer correctly)

**Expected:**
- Empty state with helpful message
- Search input functional
- Filter buttons: All, General, Science, etc.

### Test 6: ProfileScreen
Navigate to `/profile`:
- [ ] **User level displays** (Level 1 for new user)
- [ ] **Stats grid renders** with default values
- [ ] **Achievement badges show** (all locked initially)
- [ ] **Settings toggles render** (Sound, Vibration)
- [ ] **Click sound toggle** → State changes
- [ ] **Reload page** → Settings persist (localStorage)

**Check Settings Persistence:**
1. Toggle sound ON
2. Refresh page (F5)
3. Sound should still be ON

### Test 7: Quiz Flow (Critical Path)

#### Step 1: Start Quiz
- [ ] Navigate to `/` (PlayScreen)
- [ ] Click **"Blamage starten"** button
- [ ] Should navigate to `/quiz` with category state
- [ ] Quiz session initializes

**If redirected back to home:**
- Issue: Category state not passed correctly
- Check: Navigation state in PlayScreen

#### Step 2: Quiz Session Screen
- [ ] **URL is** `/quiz`
- [ ] **Progress bar shows** "Frage 1/12"
- [ ] **Question displays** with German text
- [ ] **4 answer options** labeled A, B, C, D
- [ ] **Options are clickable** (cursor changes)

#### Step 3: Answer Question
- [ ] Click an answer option
- [ ] **Option highlights** (selected state)
- [ ] **Feedback shows** (correct = green, incorrect = red)
- [ ] **Quizmaster bubble** appears with sarcastic comment
- [ ] **"Weiter" button** appears
- [ ] **Progress updates** to "Frage 2/12"

#### Step 4: Complete Session
- [ ] Answer all 12 questions
- [ ] After question 12 → Navigate to `/results`
- [ ] **Results screen shows** with grade (A-F)

#### Step 5: Results Screen
- [ ] **Grade card displays** (A, B, C, D, or F)
- [ ] **Score shows** (e.g., "10/12")
- [ ] **Percentage calculated** correctly
- [ ] **Sarcastic message** based on performance
- [ ] **Stats grid shows** (Correct, Incorrect, Accuracy)
- [ ] **Encyclopedia notice** appears
- [ ] **Action buttons render** (Home, Play Again, Encyclopedia)

**Score to Grade Mapping:**
- 90-100% → A
- 70-89% → B
- 50-69% → C
- 30-49% → D
- 0-29% → F

#### Step 6: Navigate from Results
- [ ] Click **"Zur Startseite"** → Returns to `/`
- [ ] Click **"Nochmal Blamieren"** → Starts new quiz
- [ ] Click **"Zum Lexikon"** → Goes to `/encyclopedia`

### Test 8: Data Persistence
- [ ] Complete a quiz session
- [ ] Check profile → Stats should update (questions answered, etc.)
- [ ] **Close browser completely**
- [ ] **Reopen** `http://localhost:5173/`
- [ ] Profile stats should persist
- [ ] Settings should persist

**Verify in DevTools:**
```javascript
// Check stored data
localStorage.getItem('user_profile')
localStorage.getItem('app_settings')
localStorage.getItem('quiz_sessions')
```

### Test 9: Responsive Design
Test at different viewport sizes:

#### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] No horizontal scroll
- [ ] Navigation bar spans full width
- [ ] Content centered appropriately

#### Tablet (768px)
- [ ] Layout adjusts
- [ ] Cards stack vertically if needed
- [ ] Touch targets large enough

#### Mobile (375px)
- [ ] Single column layout
- [ ] Navigation collapses or stacks
- [ ] Buttons full width
- [ ] Text readable

**Chrome DevTools:** F12 → Toggle device toolbar (Cmd+Shift+M)

### Test 10: Error Scenarios

#### Direct URL Access
- [ ] Navigate to `/quiz` directly (without state)
  - **Expected:** Redirect to `/`
- [ ] Navigate to `/results` directly (without state)
  - **Expected:** Redirect to `/`

#### Invalid Data
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Reload page
- [ ] **Expected:** New user profile created automatically

#### Network Offline
- [ ] Go offline (DevTools → Network → Offline)
- [ ] Navigate between pages
- [ ] **Expected:** App still works (local-first)

---

## 📱 Mobile App Testing

### Prerequisites
```bash
cd /Users/j.loose/Documents/GitHub/QuizApp/packages/mobile
npm start
# Scan QR code with Expo Go app
```

### Test 1: Initial Launch
- [ ] **Expo server starts** without errors
- [ ] **QR code displays** in terminal
- [ ] **Scan with Expo Go** on phone
- [ ] **App loads** (no crash)
- [ ] **Splash screen** shows briefly

**Expected:**
- App opens to PlayScreen
- Tab bar visible at bottom

### Test 2: Tab Navigation
- [ ] **Tap "Spielen" tab** (🎯) → PlayScreen
- [ ] **Tap "Kategorien" tab** (📚) → CategoriesScreen
- [ ] **Tap "Lexikon" tab** (📖) → EncyclopediaScreen
- [ ] **Tap "Profil" tab** (👤) → ProfileScreen
- [ ] **Active tab highlighted** (teal color)
- [ ] **Tab bar persists** on all screens

**Expected Behavior:**
- Smooth transitions
- No flickering
- Tab icons/labels visible

### Test 3: PlayScreen
- [ ] **Header displays** "Versagens-Simulator" in teal
- [ ] **Random motivational message** shows
- [ ] **Stats grid** (4 cards: Level, Streak, Accuracy, Questions)
- [ ] **Action buttons** render with proper styling
- [ ] **Tips card** at bottom shows game tips
- [ ] **Scrollable** if content overflows

**Check Styling:**
- Teal header background
- White text on teal
- 2.5D shadow effects on buttons
- Proper spacing between elements

### Test 4: CategoriesScreen
- [ ] **7 category cards** displayed
- [ ] **Allgemeinwissen unlocked** (no lock)
- [ ] **6 categories locked** (lock icon)
- [ ] **Tap locked category** → Shows unlock modal/alert
- [ ] **Tap unlocked category** → Navigates to quiz

**Visual Check:**
- Cards have rounded corners
- Shadows create depth
- Lock icon clearly visible
- Price badges visible

### Test 5: EncyclopediaScreen
- [ ] **Search bar** at top
- [ ] **Category filter chips** below search
- [ ] **Empty state** shows (if no entries)
- [ ] **Search is tappable** (keyboard opens)
- [ ] **Filter chips scrollable** horizontally

### Test 6: ProfileScreen
- [ ] **Level progress card** at top
- [ ] **Stats grid** (6 cards)
- [ ] **Achievement badges** (6 visible, initially locked)
- [ ] **Settings toggles** at bottom
- [ ] **Tap sound toggle** → Visual feedback
- [ ] **Screen scrollable** (all content visible)

**Settings Test:**
1. Toggle sound ON
2. Close app completely (swipe away)
3. Reopen app
4. Settings should persist

### Test 7: Quiz Flow (Critical Path)

#### Step 1: Start Quiz
- [ ] Tap **"Blamage starten"** on PlayScreen
- [ ] **Screen transitions** to QuizSessionScreen
- [ ] **Tab bar disappears** (full screen)
- [ ] **Back button** in header (if applicable)

#### Step 2: Quiz Session Screen
- [ ] **Progress bar** at top shows "1/12"
- [ ] **Question text** displays clearly
- [ ] **4 answer buttons** (A, B, C, D)
- [ ] **Buttons have shadow** (2.5D effect)
- [ ] **All text readable** on device

#### Step 3: Answer Question
- [ ] Tap an answer
- [ ] **Button press animation** (bounces down)
- [ ] **Immediate visual feedback** (green/red)
- [ ] **Quizmaster bubble** slides in from top
- [ ] **Haptic feedback** (if vibration enabled)
- [ ] **"Weiter" button** appears

#### Step 4: Complete Session
- [ ] Answer all 12 questions
- [ ] Progress shows "12/12"
- [ ] **Automatic navigation** to ResultsScreen
- [ ] **Smooth transition**

#### Step 5: Results Screen
- [ ] **Large grade letter** (A-F) displayed
- [ ] **Score** (e.g., "10/12") below grade
- [ ] **Sarcastic comment** from Quizmaster
- [ ] **Stats cards** (3-column grid)
- [ ] **Encyclopedia notice** card
- [ ] **3 action buttons** at bottom
- [ ] **All scrollable** if needed

#### Step 6: Navigate from Results
- [ ] Tap **"Zur Startseite"** → Returns to PlayScreen
- [ ] Tab bar reappears
- [ ] Tap **"Nochmal Blamieren"** → Starts new quiz
- [ ] Tap **"Zum Lexikon"** → EncyclopediaScreen opens

### Test 8: Data Persistence
- [ ] Complete a quiz
- [ ] Go to Profile tab
- [ ] **Stats updated** (questions answered count)
- [ ] **Force close app** (swipe away from app switcher)
- [ ] **Reopen app**
- [ ] Profile stats still there (persisted)

### Test 9: Gestures & Interactions

#### Touch Targets
- [ ] All buttons easy to tap (minimum 44pt)
- [ ] Tab bar icons large enough
- [ ] Toggle switches tappable

#### Scrolling
- [ ] PlayScreen scrolls smoothly
- [ ] ProfileScreen scrolls smoothly
- [ ] CategoriesScreen scrolls smoothly
- [ ] No stuck scrolls

#### Animations
- [ ] Button press animations smooth
- [ ] Screen transitions smooth (no jank)
- [ ] Tab transitions smooth

### Test 10: Device-Specific

#### iOS (if testing on iPhone)
- [ ] Safe areas respected (notch/home indicator)
- [ ] Status bar color appropriate
- [ ] Keyboard pushes content up (not covering)
- [ ] Swipe back gesture works

#### Android (if testing on Android)
- [ ] Hardware back button works
- [ ] Safe areas respected
- [ ] Keyboard behavior correct
- [ ] Material design feel

---

## 🐛 Common Issues & Solutions

### Web Issues

**Issue: White screen on load**
- Check console for errors
- Verify shared package built: `cd packages/shared && npm run build`
- Clear browser cache: Ctrl+Shift+Delete

**Issue: Navigation doesn't work**
- Check React Router setup in AppRoutes.tsx
- Verify all screens exported correctly
- Check browser console for errors

**Issue: Data not persisting**
- Check localStorage in DevTools
- Verify StorageService initialized in App.tsx
- Check for localStorage quota errors

**Issue: Quiz redirects back to home**
- Category state not being passed
- Check PlayScreen navigate() call includes state
- Verify QuizPage reads location.state

### Mobile Issues

**Issue: "Unable to resolve module"**
- Run: `cd packages/shared && npm run build`
- Clear Expo cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

**Issue: App crashes on launch**
- Check Expo logs in terminal
- Look for undefined imports
- Verify all dependencies installed

**Issue: Tab navigation not working**
- Check BottomTabNavigator.tsx setup
- Verify screen imports are correct
- Check React Navigation dependencies

**Issue: Styles look wrong**
- Theme not imported correctly
- Check StyleSheet definitions
- Verify colors imported from @quiz/shared/theme

---

## ✅ Success Criteria

### Minimum Viable Test (Must Pass)
- [x] App launches without crashes
- [ ] All navigation routes accessible
- [ ] Can complete one full quiz (12 questions)
- [ ] Results screen displays correctly
- [ ] Data persists after app restart

### Full Integration Test (Should Pass)
- [ ] All screens render correctly
- [ ] All navigation paths work
- [ ] Quiz flow complete end-to-end
- [ ] Store data persists correctly
- [ ] No console/log errors during usage
- [ ] Responsive design works at all sizes (web)
- [ ] Touch gestures smooth (mobile)

### Polish Test (Nice to Have)
- [ ] Animations smooth
- [ ] No visual glitches
- [ ] Consistent styling across screens
- [ ] Proper loading states
- [ ] Error handling graceful

---

## 📊 Test Results Template

### Test Session: [Date]
**Tester:** [Your Name]
**Platform:** [ ] Web / [ ] Mobile (iOS/Android)
**Device:** [Browser/Device Model]

#### Summary
- Tests Passed: ____ / ____
- Critical Issues: ____
- Minor Issues: ____
- Notes: ___________

#### Critical Issues Found
1. [Issue description]
   - Steps to reproduce:
   - Expected behavior:
   - Actual behavior:

#### Screenshots/Evidence
- [Attach screenshots of issues]

---

## 🚀 Next Steps After Testing

### If All Tests Pass ✅
1. Create test report summary
2. Move to Phase 3 (more questions, IAP, animations)
3. Consider end-to-end automated testing

### If Tests Fail ❌
1. Document all issues found
2. Prioritize: Critical → High → Medium → Low
3. Fix critical issues first
4. Re-test after fixes
5. Iterate until passing

### Performance Testing (Future)
- Load time measurements
- Memory usage profiling
- Bundle size analysis
- Lighthouse scores (web)

---

_Last Updated: 2025-10-10_
_Next Review: After Phase 3 completion_
