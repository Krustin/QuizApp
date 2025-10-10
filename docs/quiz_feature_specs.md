# 🎮 Quiz App - Feature Specifications & User Flows

**Document Version:** 1.0.0  
**Last Updated:** 2025  
**Status:** MVP Scope

---

## 📋 Table of Contents

1. [App Navigation Structure](#app-navigation-structure)
2. [First Launch & Onboarding](#first-launch--onboarding)
3. [Quiz Session Flow](#quiz-session-flow)
4. [Encyclopedia System](#encyclopedia-system)
5. [Category Management](#category-management)
6. [User Profile & Stats](#user-profile--stats)
7. [In-App Purchase Flow](#in-app-purchase-flow)
8. [Scoring & Leveling System](#scoring--leveling-system)
9. [Achievement System](#achievement-system)
10. [Edge Cases & Error States](#edge-cases--error-states)

---

## 🗺️ App Navigation Structure

### Bottom Tab Navigator (4 Tabs)

```
┌─────────────────────────────────────────┐
│                                         │
│           [SCREEN CONTENT]              │
│                                         │
│                                         │
└─────────────────────────────────────────┘
┌─────────┬─────────┬─────────┬─────────┐
│  Spielen│Kategorie│ Lexikon │ Profil  │
│    🎯   │   📚    │   📖    │   👤    │
└─────────┴─────────┴─────────┴─────────┘
```

### Tab Descriptions

| Tab | Label | Icon | Screen | Purpose |
|-----|-------|------|--------|---------|
| 1 | **Spielen** | 🎯 | PlayScreen | Quick start quiz, category selection |
| 2 | **Kategorien** | 📚 | CategoriesScreen | View/unlock all categories |
| 3 | **Lexikon** | 📖 | EncyclopediaScreen | Browse unlocked knowledge |
| 4 | **Profil** | 👤 | ProfileScreen | Stats, level, achievements |

**Navigation Rules:**
- Bottom tabs always visible (no hiding)
- Active tab highlighted in Teal (#169C8F)
- Inactive tabs in gray
- Badge on Lexikon tab showing new entries (optional MVP feature)

---

## 🚀 First Launch & Onboarding

### User Flow: First Time User

```
App Launch
    ↓
Check Local Storage
    ↓
No user profile found
    ↓
┌─────────────────────────────────┐
│   ONBOARDING SCREEN (Optional)  │
│                                 │
│   "Willkommen im               │
│    Versagens-Simulator!"        │
│                                 │
│   [Unwissen demonstrieren]      │
└─────────────────────────────────┘
    ↓
Create Initial User Profile
    ↓
Set GENERAL category as unlocked
    ↓
Load question bank (700 questions)
    ↓
Navigate to PlayScreen
    ↓
Show tutorial hint (optional)
```

### Onboarding Screen (Optional for MVP)

**Screen Elements:**
- Hero image/illustration (design TBD)
- App tagline: "Willkommen im Versagens-Simulator!"
- Brief sarcastic intro (2-3 lines max)
- Single CTA button: "Unwissen demonstrieren"

**Skip Logic:**
- Can be skipped entirely for MVP
- If included: Single screen, no multi-step wizard
- Sets `hasCompletedOnboarding: true` in storage

### Data Initialization

**On First Launch, Create:**
```typescript
UserProfile {
  userId: generateUUID(),
  username: "Unwissender #1234", // Random number suffix
  totalPoints: 0,
  currentLevel: 1,
  currentStreak: 0,
  unlockedCategories: [QuizCategory.GENERAL],
  achievements: [],
  // ... rest with defaults
}

CategoryAccess {
  // GENERAL unlocked
  // All other categories locked
}
```

---

## 🎯 Quiz Session Flow

### High-Level Flow

```
PlayScreen
    ↓
Select Category (GENERAL or unlocked)
    ↓
Tap "Unwissen demonstrieren"
    ↓
QuizSessionScreen loads
    ↓
Show Question 1/12
    ↓
[LOOP FOR 12 QUESTIONS]
    ↓
Show Results Screen
    ↓
Return to PlayScreen
```

---

### PlayScreen (Main Quiz Hub)

**Screen Layout:**
```
┌──────────────────────────────────┐
│  👤 Level 5                      │
│  ⚡ Streak: 3                    │
├──────────────────────────────────┤
│                                  │
│  🎯 SCHNELLSTART                 │
│  ┌────────────────────────────┐ │
│  │  Allgemeinwissen           │ │
│  │  (GENERAL)                 │ │
│  │                            │ │
│  │  [Unwissen demonstrieren]  │ │
│  └────────────────────────────┘ │
│                                  │
│  📚 WISSENSLÜCKEN               │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 🔒   │ │ 🔒   │ │ 🔒   │   │
│  │ Sku- │ │ Wiss-│ │ Gesch│   │
│  │ riles│ │ aft  │ │ ichte│   │
│  └──────┘ └──────┘ └──────┘   │
│                                  │
└──────────────────────────────────┘
```

**Elements:**
1. **Header**
   - User level (top-left)
   - Current streak indicator (top-right)
   
2. **Quick Start Card** (Largest element)
   - Currently selected category (defaults to GENERAL)
   - Category icon/illustration
   - Big CTA button: "Unwissen demonstrieren"
   
3. **Category Grid** (Wissenslücken)
   - 2-column grid of all categories
   - Locked categories show 🔒 overlay + price
   - Unlocked categories tappable to switch Quick Start
   - Tap locked = Show purchase modal

**Interactions:**
- Tap Quick Start button → Start quiz with selected category
- Tap unlocked category card → Switch Quick Start category (no navigation)
- Tap locked category → Show IAP purchase modal
- Pull-to-refresh → Restore IAP purchases (mobile only)

---

### QuizSessionScreen (Active Quiz)

**Screen States:**

#### State 1: Question Display

```
┌──────────────────────────────────┐
│  Frage 3/12              ⚡ 2    │
│  ████████░░░░░░░░ 25%            │
├──────────────────────────────────┤
│                                  │
│  Was ist die Hauptstadt          │
│  von Australien?                 │
│                                  │
│  ┌────────────────────────────┐ │
│  │  A) Sydney                 │ │
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  B) Canberra               │ │
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  C) Melbourne              │ │
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  D) Brisbane               │ │
│  └────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

**Elements:**
- Progress indicator: "Frage X/12"
- Streak counter (top-right, animated on increase)
- Progress bar (visual % complete)
- Question text (large, centered)
- 4 answer buttons (A, B, C, D)

**Button States:**
- Default: Teal background, white text, 2.5D shadow
- Pressed: Scale down 0.95, shadow reduced (touch feedback)
- Disabled: Not applicable (always tappable before answer)

---

#### State 2: Answer Feedback (Correct)

```
┌──────────────────────────────────┐
│  Frage 3/12              ⚡ 3    │
│  ████████░░░░░░░░ 25%            │
├──────────────────────────────────┤
│                                  │
│  Was ist die Hauptstadt          │
│  von Australien?                 │
│                                  │
│  ┌────────────────────────────┐ │
│  │  A) Sydney                 │ │ (gray)
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  B) Canberra          ✓    │ │ (green)
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  C) Melbourne              │ │ (gray)
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  D) Brisbane               │ │ (gray)
│  └────────────────────────────┘ │
│                                  │
│  💬 "Glück gehabt. Wohl        │
│      geraten, oder?"            │
│                                  │
│  [Nächste Blamage] ────────────>│
└──────────────────────────────────┘
```

**Changes After Answer Selected:**
1. **Correct answer** turns green with ✓ checkmark
2. **Wrong answers** turn gray (if wrong one selected, shows with ✗)
3. **Quizmaster comment** appears in speech bubble
4. **Streak counter animates** (+1 with bounce effect)
5. **Continue button** appears: "Nächste Blamage"
6. **Points notification** (optional): "+10 Punkte" floats up

**Timing:**
- Feedback appears immediately on tap
- User must tap "Nächste Blamage" to continue (no auto-advance)
- Min 1 second before button becomes tappable (prevents accidental skip)

---

#### State 3: Answer Feedback (Incorrect)

```
┌──────────────────────────────────┐
│  Frage 3/12              ⚡ 0    │
│  ████████░░░░░░░░ 25%            │
├──────────────────────────────────┤
│                                  │
│  Was ist die Hauptstadt          │
│  von Australien?                 │
│                                  │
│  ┌────────────────────────────┐ │
│  │  A) Sydney            ✗    │ │ (red)
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  B) Canberra          ✓    │ │ (green)
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  C) Melbourne              │ │ (gray)
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  D) Brisbane               │ │ (gray)
│  └────────────────────────────┘ │
│                                  │
│  💬 "Natürlich falsch.         │
│      War ja klar."              │
│                                  │
│  [Nächste Blamage] ────────────>│
└──────────────────────────────────┘
```

**Changes After Wrong Answer:**
1. **User's answer** turns red with ✗
2. **Correct answer** turns green with ✓
3. **Streak resets to 0** (animated)
4. **Quizmaster comment** (more savage)
5. **No encyclopedia entry created**

---

### Quizmaster Comment Logic

**Comment Selection Algorithm:**
```
IF answer is correct:
    IF currentStreak == 1 (first correct):
        → Select from CORRECT_FIRST pool
    ELSE IF currentStreak >= 5:
        → Select from CORRECT_STREAK pool (reluctantly impressed)
    ELSE:
        → Select from CORRECT_BARELY pool (default sarcasm)
ELSE (answer is incorrect):
    IF question.difficulty == EASY:
        → Select from INCORRECT_OBVIOUS pool (extra savage)
    ELSE IF user was close (future feature):
        → Select from INCORRECT_CLOSE pool
    ELSE:
        → Select from INCORRECT_TERRIBLE pool
```

**Comment Variety:**
- Minimum 10 comments per pool
- Rotate to avoid repetition (track last 3 shown)
- Random selection within pool

**Example Comments:**
```
CORRECT_FIRST:
- "Tja, selbst eine kaputte Uhr zeigt zweimal täglich die richtige Zeit..."
- "Glück gehabt. Das war wohl geraten, oder?"
- "Erstaunlich. Sogar du kriegst manchmal was richtig."

INCORRECT_OBVIOUS:
- "Natürlich falsch. War ja klar."
- "Wie vorhersagbar. Wieder daneben."
- "Das war doch offensichtlich. Aber nicht für dich."

CORRECT_STREAK (5+):
- "Okay, okay... vielleicht kannst du doch mehr als nur raten."
- "Drei richtige in Folge? Zufallstreffer sehen anders aus, zugegeben."
```

---

### Quiz Results Screen

**Triggered After:** Question 12/12 answered

```
┌──────────────────────────────────┐
│                                  │
│     🎯 SESSION BEENDET           │
│                                  │
│  ╔══════════════════════════╗   │
│  ║                          ║   │
│  ║      8/12 RICHTIG        ║   │
│  ║                          ║   │
│  ║    +80 PUNKTE            ║   │
│  ║                          ║   │
│  ╚══════════════════════════╝   │
│                                  │
│  📊 DETAILS                      │
│  ─────────────────────────       │
│  Längste Serie: 5 ⚡             │
│  Genauigkeit: 67%                │
│  Dein Level: 5 → 6 🎉           │
│                                  │
│  📖 8 neue Einträge              │
│      im Lexikon!                 │
│                                  │
│  ┌────────────────────────────┐ │
│  │  [Zum Lexikon]             │ │
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  [Erneut versagen]         │ │
│  └────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

**Elements:**
1. **Score Summary** (hero section)
   - X/12 correct (large)
   - Points earned (+X Punkte)
   
2. **Session Stats**
   - Longest streak in session
   - Accuracy percentage
   - Level change (if leveled up)
   
3. **Encyclopedia Notification**
   - "X neue Einträge im Lexikon"
   - Link to encyclopedia tab
   
4. **Action Buttons**
   - "Zum Lexikon" → Navigate to Encyclopedia tab
   - "Erneut versagen" → Start new session (same category)
   - "Zurück" → Return to PlayScreen (back button)

**Level-Up Animation:**
If user leveled up:
- Show confetti/particle effect
- Animate level number change
- Play satisfying sound (optional)
- Show "Level X erreicht!" badge

**Achievement Unlock:**
If achievement earned:
- Show modal/toast notification
- "Neues Achievement: [Name]"
- Brief description
- "Zum Profil" link

---

### Quiz Session Data Persistence

**Save Points:**
1. **After each answer:** Update session in memory (Zustand store)
2. **After question 12:** Save complete session to AsyncStorage/LocalStorage
3. **On app background:** Auto-save current progress (iOS/Android)

**Data Saved:**
```typescript
QuizSession {
  sessionId: string,
  categoryId: QuizCategory,
  questions: SessionQuestion[],  // All 12 with answers
  score: number,                 // X/12
  pointsEarned: number,          // score * 10
  completedAt: Date,
  // ... stats
}
```

---

## 📖 Encyclopedia System

### Encyclopedia Screen

**Screen Layout:**
```
┌──────────────────────────────────┐
│  📖 Angeber-Lexikon              │
│  ┌─────────────────────────────┐│
│  │ 🔍 Suche...                ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ [Alle] [Wissen] [Gesch] ...││
│  └─────────────────────────────┘│
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🌍 Was ist die Hauptstadt  │ │
│  │    von Australien?          │ │
│  │                             │ │
│  │ ✓ Canberra                  │ │
│  │                             │ │
│  │ 📝 Canberra wurde 1913...  │ │
│  │    [Mehr erfahren]          │ │
│  │                             │ │
│  │ 🎲 Fun Fact: Die Stadt...  │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🦘 Welches Tier kann...    │ │
│  │ ...                         │ │
│  └────────────────────────────┘ │
│                                  │
│  [47 Einträge insgesamt]        │
│                                  │
└──────────────────────────────────┘
```

**Elements:**

1. **Search Bar** (top)
   - Real-time filtering of entries
   - Search question text, answer, TL;DR
   
2. **Category Filter Chips**
   - Horizontal scrollable
   - "Alle" (default, shows all)
   - One chip per category (only unlocked categories)
   - Active filter highlighted
   
3. **Entry Cards** (scrollable list)
   - Question text (bold)
   - Correct answer (with ✓)
   - TL;DR explanation (collapsed by default)
   - "Mehr erfahren" expands to show Fun Fact + source
   - Optional: Star icon to mark favorite
   
4. **Footer Stats**
   - Total entries unlocked
   - Breakdown by category (optional)

**Empty State:**
```
┌──────────────────────────────────┐
│                                  │
│        📖                        │
│                                  │
│   Dein Lexikon ist leer!         │
│                                  │
│   Beantworte Fragen richtig      │
│   um Wissen zu sammeln.          │
│                                  │
│   [Quiz starten]                 │
│                                  │
└──────────────────────────────────┘
```

---

### Encyclopedia Entry Detail (Expanded)

**Tap "Mehr erfahren":**
```
┌────────────────────────────┐
│ 🌍 Was ist die Hauptstadt  │
│    von Australien?          │
│                             │
│ ✓ Canberra                  │
│                             │
│ 📝 TL;DR                    │
│ Canberra wurde 1913 als     │
│ geplante Hauptstadt zwischen│
│ Sydney und Melbourne gebaut.│
│                             │
│ 🎲 Fun Fact                 │
│ Die Stadt wurde extra für   │
│ die Regierung entworfen und │
│ ist voller symmetrischer    │
│ Straßen und Parks.          │
│                             │
│ 🔗 Quelle                   │
│ [wikipedia.org/...]         │
│                             │
│ [Weniger anzeigen]          │
└────────────────────────────┘
```

---

### Auto-Population Logic

**When Encyclopedia Entry Created:**

1. User answers question correctly
2. Check if entry already exists (questionId + userId)
3. If NOT exists:
   - Create new EncyclopediaEntry
   - Copy question data (questionText, correctAnswer, tldr, funFact)
   - Set unlockedAt = now()
   - Save to storage
   - Show "+1 Lexikon" notification during quiz

**Entry Uniqueness:**
- One entry per question per user
- If user answers same question again (future session), no duplicate

---

## 📚 Category Management

### Categories Screen

**Screen Layout:**
```
┌──────────────────────────────────┐
│  📚 Wissenslücken                │
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐ │
│  │ ✅ Allgemeinwissen         │ │
│  │    (GENERAL)               │ │
│  │                            │ │
│  │    47/100 Fragen           │ │
│  │    ████████░░░ 47%         │ │
│  │                            │ │
│  │    [Quiz starten]          │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🔒 Skurriles für           │ │
│  │    Ahnungslose             │ │
│  │                            │ │
│  │    100 Fragen               │ │
│  │                            │ │
│  │    💰 2,99 €               │ │
│  │    [Freischalten]          │ │
│  └────────────────────────────┘ │
│                                  │
│  ... [5 more locked categories] │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🎁 ALLE KATEGORIEN         │ │
│  │    Bundle-Angebot!         │ │
│  │                            │ │
│  │    💰 9,99 € (40% Rabatt)  │ │
│  │    [Bundle kaufen]         │ │
│  └────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

**Category Card States:**

#### Unlocked Category
- ✅ Checkmark badge
- Category name
- Progress: "X/100 Fragen beantwortet"
- Progress bar (visual)
- CTA: "Quiz starten" → Navigate to PlayScreen with this category

#### Locked Category
- 🔒 Lock icon overlay
- Category name + sarcastic subtitle
- "100 Fragen" count
- Price badge: "2,99 €"
- CTA: "Freischalten" → Show IAP purchase modal

#### Bundle Card (Special)
- 🎁 Gift icon
- "ALLE KATEGORIEN" headline
- "Bundle-Angebot!"
- Price: "9,99 €"
- Savings badge: "(40% Rabatt)"
- CTA: "Bundle kaufen" → Show bundle IAP modal

---

### Category Details (Tap Unlocked Category)

**Modal/Bottom Sheet:**
```
┌──────────────────────────────────┐
│  📚 Allgemeinwissen              │
│     (GENERAL)                    │
├──────────────────────────────────┤
│                                  │
│  Teste dein "Allgemein"wissen   │
│  – falls vorhanden.              │
│                                  │
│  📊 DEINE STATISTIKEN            │
│  ───────────────────────         │
│  Fragen beantwortet: 47/100     │
│  Richtig: 35                     │
│  Genauigkeit: 74%                │
│  Beste Serie: 8 ⚡               │
│                                  │
│  ┌────────────────────────────┐ │
│  │  [Quiz starten]            │ │
│  └────────────────────────────┘ │
│                                  │
└──────────────────────────────────┘
```

---

## 👤 User Profile & Stats

### Profile Screen

**Screen Layout:**
```
┌──────────────────────────────────┐
│  👤 Scham-Profil                 │
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐ │
│  │         LEVEL 12           │ │
│  │                            │ │
│  │    Unwissender #4857       │ │
│  │                            │ │
│  │  ██████████░░ 450/500 XP   │ │
│  └────────────────────────────┘ │
│                                  │
│  📊 GESAMTSTATISTIKEN            │
│  ───────────────────────         │
│  Gespielte Sessions: 23          │
│  Beantwortete Fragen: 276        │
│  Richtige Antworten: 187         │
│  Genauigkeit: 68%                │
│  Längste Serie: 12 ⚡            │
│                                  │
│  🏆 ACHIEVEMENTS (5/20)          │
│  ───────────────────────         │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 🎯   │ │ ⚡   │ │ 📚   │   │
│  │Serie │ │Erste │ │100   │   │
│  │von 5 │ │Quiz  │ │Fragen│   │
│  └──────┘ └──────┘ └──────┘   │
│                                  │
│  📖 LEXIKON: 187 Einträge        │
│                                  │
│  ⚙️ EINSTELLUNGEN                │
│  ───────────────────────         │
│  [ ] Sound-Effekte               │
│  [ ] Vibrationen                 │
│  [Käufe wiederherstellen]        │
│  [Daten löschen]                 │
│                                  │
└──────────────────────────────────┘
```

**Sections:**

### 1. Profile Header
- **Level Display** (large, prominent)
- **Username** (generated: "Unwissender #XXXX")
- **XP Progress Bar**
  - Shows progress to next level
  - "450/500 XP" format
  - Animates when points added

### 2. Overall Statistics
- Total sessions played
- Total questions answered
- Total correct answers
- Overall accuracy rate
- Longest streak ever

### 3. Achievements
- Grid of achievement badges
- Unlocked achievements: Full color
- Locked achievements: Grayscale silhouette
- Tap to view details

### 4. Encyclopedia Link
- Quick stat: "X Einträge"
- Tap → Navigate to Encyclopedia tab

### 5. Settings
- Toggle: Sound effects (future feature)
- Toggle: Haptic feedback (mobile)
- Button: "Käufe wiederherstellen" (IAP restore)
- Button: "Daten löschen" (with confirmation)

---

### Edit Username (Optional MVP Feature)

**Tap username:**
```
┌──────────────────────────────────┐
│  Benutzername ändern             │
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐ │
│  │ Unwissender #4857          │ │
│  └────────────────────────────┘ │
│                                  │
│  (Max. 20 Zeichen)               │
│                                  │
│  [Abbrechen]  [Speichern]        │
│                                  │
└──────────────────────────────────┘
```

---

## 🛒 In-App Purchase Flow

### Purchase Modal (Single Category)

**Triggered:** Tap "Freischalten" on locked category

```
┌──────────────────────────────────┐
│  🔓 Kategorie freischalten       │
├──────────────────────────────────┤
│                                  │
│  Skurriles für Ahnungslose       │
│                                  │
│  • 100 neue Fragen               │
│  • Weirde Facts & Trivia         │
│  • Sofort verfügbar              │
│                                  │
│  ┌────────────────────────────┐ │
│  │   💰 2,99 €                │ │
│  │   [Jetzt kaufen]           │ │
│  └────────────────────────────┘ │
│                                  │
│  Oder spare mit dem Bundle:      │
│  Alle Kategorien für nur 9,99 €  │
│  [Zum Bundle →]                  │
│                                  │
│  [Abbrechen]                     │
│                                  │
└──────────────────────────────────┘
```

---

### Purchase Modal (Bundle)

```
┌──────────────────────────────────┐
│  🎁 Alle Kategorien freischalten │
├──────────────────────────────────┤
│                                  │
│  BUNDLE-ANGEBOT                  │
│                                  │
│  ✅ Skurriles für Ahnungslose    │
│  ✅ Wissenschaft für...          │
│  ✅ Geschichte für...            │
│  ✅ Popkultur für...             │
│  ✅ Tierwissen für...            │
│  ✅ Technik für...               │
│                                  │
│  = 600 zusätzliche Fragen!       │
│                                  │
│  ┌────────────────────────────┐ │
│  │   💰 9,99 €                │ │
│  │   (Spare 40%)              │ │
│  │   [Bundle kaufen]          │ │
│  └────────────────────────────┘ │
│                                  │
│  [Abbrechen]                     │
│                                  │
└──────────────────────────────────┘
```

---

### Purchase Flow Steps

```
User taps "Jetzt kaufen"
    ↓
Show native IAP dialog (iOS/Android)
    ↓
User confirms purchase (Face ID/Touch ID/Password)
    ↓
Payment processed by App Store/Play Store
    ↓
Receipt validated (expo-in-app-purchases)
    ↓
IF success:
    → Unlock category locally (update CategoryAccess)
    → Save to AsyncStorage
    → Show success toast: "✅ Kategorie freigeschaltet!"
    → Refresh Categories screen
    → Close modal
ELSE:
    → Show error: "Kauf fehlgeschlagen. Bitte versuche es erneut."
    → Log error for debugging
```

---

### Restore Purchases

**Triggered:** Tap "Käufe wiederherstellen" in Profile settings

```
Show loading indicator
    ↓
Call InAppPurchases.getPurchaseHistoryAsync()
    ↓
For each purchased SKU:
    → Unlock corresponding category
    → Update CategoryAccess
    → Save to storage
    ↓
Show success toast:
"✅ X Kategorien wiederhergestellt"
```

**Use Cases:**
- User reinstalls app
- User switches device
- Purchase didn't unlock correctly

---

## 📈 Scoring & Leveling System

### Points System

**Points Earned:**
- ✅ Correct answer: **+10 points**
- ❌ Wrong answer: **0 points**

**No Bonuses (MVP):**
- Future: Time bonuses, difficulty multipliers, streak bonuses

---

### Leveling Algorithm

**Formula:**
```
Level = floor(totalPoints / 500) + 1
```

**Examples:**
- 0-499 points → Level 1
- 500-999 points → Level 2
- 1000-1499 points → Level 3
- etc.

**Points to Next Level:**
```
pointsToNextLevel = (currentLevel * 500) - totalPoints
```

**Max Level (MVP):** Unlimited (no cap)

---

### Level-Up Notification

**Triggered:** When `totalPoints >= (currentLevel * 500)`

**During Quiz:**
- Check after each correct answer
- If level-up triggered:
  - Show "+1 Level!" badge during feedback
  - Animate level counter in header
  - Play satisfying sound/haptic

**On Results Screen:**
- Show level change: "Level 5 → 6 🎉"
- Confetti animation

---

## 🏆 Achievement System

### Achievement Types

**MVP Achievements (10 total):**

| Achievement | Trigger | Icon | Title |
|-------------|---------|------|-------|
| First Quiz | Complete 1 session | 🎯 | "Anfänger-Versager" |
| 10 Sessions | Complete 10 sessions | 📚 | "Chronischer Unwissender" |
| First Streak 5 | Get 5 correct in a row | ⚡ | "Glückssträhne" |
| Streak 10 | Get 10 correct in a row | ⚡⚡ | "Unmöglicher Zufall" |
| Perfect Session | 12/12 correct | 💯 | "Unverschämtes Glück" |
| 100 Questions | Answer 100 questions | 💬 | "Geschwätzig" |
| 100 Correct | Answer 100 correctly | ✅ | "Ausnahmetalent" |
| Level 5 | Reach level 5 | 🎖️ | "Halbwegs Kompetent" |
| Level 10 | Reach level 10 | 🏅 | "Nicht Mehr Peinlich" |
| All Categories | Unlock all categories | 🎁 | "Geldverschwendung" |

---

### Achievement Unlock Flow

```
Check achievements after:
    - Session complete
    - Level-up
    - Category unlock
    ↓
Compare current stats vs achievement triggers
    ↓
IF new achievement earned:
    → Create Achievement object
    → Add to user's achievements array
    → Save to storage
    → Show unlock modal
```

**Unlock Modal:**
```
┌──────────────────────────────────┐
│                                  │
│         🎉 ACHIEVEMENT!          │
│                                  │
│            ⚡⚡                  │
│                                  │
│      Unmöglicher Zufall          │
│                                  │
│   Du hast 10 Fragen in Folge     │
│   richtig beantwortet. Pure      │
│   Glückssache, natürlich.        │
│                                  │
│  [Zum Profil]  [Schließen]       │
│                                  │
└──────────────────────────────────┘
```

---

## ⚠️ Edge Cases & Error States

### No Internet (Mobile/Web)

**Behavior:**
- ✅ App works fully offline (local-first)
- ❌ IAP purchases fail (show error)

**IAP Error Message:**
```
"Kaufe nicht möglich. Bitte prüfe deine Internetverbindung."
```

---

### Storage Full

**Rare edge case (local storage limit reached)**

**Error Message:**
```
"Speicher voll. Bitte lösche alte Daten in den Einstellungen."
```

**Recovery:**
- Offer to delete old sessions (keep last 50)
- Clear cache

---

### App Crashes During Quiz

**On Restart:**
- Check for incomplete session in storage
- Offer to resume: "Du hast eine laufende Session. Fortsetzen?"
- If declined, discard session

---

### Corrupted Data

**Rare: User edits local storage manually**

**Detection:**
- Validate data structure on app load
- If invalid:
  - Reset to defaults (with confirmation)
  - Log error for debugging

---

### Purchase Not Unlocking

**User reports purchase didn't unlock category**

**Resolution Flow:**
1. Tap "Käufe wiederherstellen" in Profile
2. If still not working:
   - Show support contact info
   - Log receipt ID for manual verification

---

### Empty Category (Bug)

**If category has < 12 questions (data error)**

**Fallback:**
- Show error: "Kategorie vorübergehend nicht verfügbar"
- Prevent quiz start
- Log error

---

### Rapid Tapping (Double-Click Prevention)

**Prevent accidental double-answer:**
- Disable answer buttons after first tap
- Re-enable only on next question

---

## 🎨 UI States Summary

### Loading States

**Initial App Load:**
- Splash screen (Expo default)
- "Lade Fragen..." (1-2 seconds)

**Quiz Start:**
- "Fragen werden ausgewählt..." (instant, cosmetic delay)

**IAP Loading:**
- Native spinner during purchase
- "Verarbeite Kauf..." (blocking modal)

---

### Empty States

| Screen | Empty State Message | Action |
|--------|---------------------|--------|
| Encyclopedia | "Dein Lexikon ist leer! Beantworte Fragen richtig." | [Quiz starten] |
| Profile Achievements | "Noch keine Achievements. Spiele Quiz um welche zu verdienen!" | [Quiz starten] |
| No Unlocked Categories | "Du hast noch keine Kategorien. Spiele GENERAL Quiz!" | - |

---

### Error States

**Generic Error:**
```
┌──────────────────────────────────┐
│          ⚠️ Fehler               │
│                                  │
│  Es ist ein Fehler aufgetreten.  │
│                                  │
│  [Erneut versuchen]  [Abbrechen] │
└──────────────────────────────────┘
```

**Network Error (IAP):**
```
"Keine Internetverbindung. Käufe sind offline nicht möglich."
```

---

## ✅ Feature Completeness Checklist

### Core Features (MVP)
- [ ] Bottom tab navigation (4 tabs)
- [ ] First launch initialization
- [ ] Quiz session (12 questions)
- [ ] Answer feedback (correct/incorrect)
- [ ] Quizmaster sarcastic comments
- [ ] Scoring system (+10 per correct)
- [ ] Streak tracking
- [ ] Encyclopedia auto-population
- [ ] Category unlock via IAP
- [ ] Bundle purchase option
- [ ] User profile & stats
- [ ] Level-up system (500 points per level)
- [ ] Achievement system (10 achievements)
- [ ] Results screen
- [ ] Offline functionality

### Optional (Nice-to-Have)
- [ ] Onboarding screen
- [ ] Username editing
- [ ] Achievement detail modals
- [ ] Category detail stats
- [ ] Encyclopedia search
- [ ] Encyclopedia favorites
- [ ] Sound effects
- [ ] Haptic feedback
- [ ] Pull-to-refresh (restore purchases)

---

**END OF FEATURE SPECIFICATIONS**