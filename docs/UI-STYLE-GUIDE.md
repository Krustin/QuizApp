# UI Style Guide - Quiz App
## 2.5D Duolingo-Inspired Design System

> **Reference:** Concept/Absurd Quiz App Concept/src/
> This guide documents the design patterns, component styles, and UI conventions extracted from the concept implementation.

---

## 🎨 Color System

### Primary Colors
```css
--primary: #169C8F       /* Teal - Main brand color */
--primary-dark: #0e7c71  /* Darker teal for shadows */
--accent: #FF6A5C        /* Coral - Call-to-action, warnings */
--accent-dark: #e5534a   /* Darker coral for shadows */
```

### Semantic Colors
```css
--success: #2DC071       /* Green - Correct answers */
--success-dark: #25a063  /* Darker green for shadows */
--destructive: #FF4D4F   /* Red - Incorrect answers */
--destructive-dark: #e53e3e /* Darker red for shadows */
--neutral: #6EC8BE       /* Light teal - Neutral states */
```

### Background & Surface
```css
--background: #F6F7F9    /* Off-white page background */
--card: #ffffff          /* White cards */
--secondary: #E9EDF3     /* Light gray for secondary surfaces */
--muted: #E9EDF3         /* Muted backgrounds */
```

### Text Colors
```css
--foreground: #0B1F24    /* Dark text */
--muted-foreground: #6B7280 /* Secondary text */
```

### Borders & Overlays
```css
--border: rgba(11, 31, 36, 0.1) /* Subtle borders */
--border-solid: #d1d5db  /* Gray-300 for visible borders */
```

---

## 🎭 Typography

### Font Scale
- **Heading 1:** 3xl (1.875rem / 30px) - Page titles
- **Heading 2:** xl (1.25rem / 20px) - Section titles
- **Heading 3:** lg (1.125rem / 18px) - Card titles
- **Body:** base (1rem / 16px) - Default text
- **Small:** sm (0.875rem / 14px) - Secondary info

### Font Weights
- **Bold:** 700 - Primary headings, button text
- **Medium:** 500 - Subheadings, labels
- **Normal:** 400 - Body text

### Line Heights
- All text: `line-height: 1.5`

---

## 🎯 Component Classes (2.5D Style)

### Button Variants

#### Primary Button (`.game-button-primary`)
```css
/* Teal background, white text */
background: #169C8F;
color: white;
border: 2px solid transparent;
border-radius: 1rem (16px);
box-shadow: 0 4px 0 #0e7c71, 0 6px 12px rgba(22, 156, 143, 0.3);
transform: translateY(-2px);

/* Active state */
:active {
  transform: translateY(1px);
  box-shadow: 0 2px 0 #0e7c71, 0 3px 6px rgba(22, 156, 143, 0.3);
}
```

**Usage:** Main CTAs like "Start Quiz", "Continue"

#### Secondary Button (`.game-button-secondary`)
```css
/* White background, dark text */
background: white;
color: #0B1F24;
border: 2px solid #d1d5db;
border-radius: 1rem;
box-shadow: 0 4px 0 #d1d5db, 0 6px 12px rgba(0, 0, 0, 0.1);
transform: translateY(-2px);

:active {
  transform: translateY(1px);
  box-shadow: 0 2px 0 #d1d5db, 0 3px 6px rgba(0, 0, 0, 0.1);
}
```

**Usage:** Secondary actions like "Browse Categories", "Random Quiz"

#### Accent Button (`.game-button-accent`)
```css
/* Coral background, white text */
background: #FF6A5C;
color: white;
border: 2px solid transparent;
border-radius: 1rem;
box-shadow: 0 4px 0 #e5534a, 0 6px 12px rgba(255, 106, 92, 0.3);
transform: translateY(-2px);

:active {
  transform: translateY(1px);
  box-shadow: 0 2px 0 #e5534a, 0 3px 6px rgba(255, 106, 92, 0.3);
}
```

**Usage:** Paywall, IAP, urgent actions

---

### Cards

#### Standard Card (`.game-card`)
```css
background: white;
border: 2px solid #d1d5db;
border-radius: 1rem;
box-shadow: 0 6px 0 #d1d5db, 0 8px 16px rgba(0, 0, 0, 0.1);
transform: translateY(-2px);
padding: 1.5rem (24px);

:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #d1d5db, 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

**Usage:** Information cards, tips, notices

#### Stat Card (`.game-stat-card`)
```css
background: white;
border: 2px solid #d1d5db;
border-radius: 1rem;
box-shadow: 0 4px 0 #d1d5db, 0 6px 12px rgba(0, 0, 0, 0.08);
transform: translateY(-1px);
padding: 1rem (16px);
```

**Usage:** Streak counter, level display, stats

#### Category Card (`.game-category-card`)
```css
background: white;
border: 2px solid #d1d5db;
border-radius: 1rem;
box-shadow: 0 6px 0 #d1d5db, 0 8px 16px rgba(0, 0, 0, 0.08);
transform: translateY(-2px);
padding: 1.5rem;
transition: all 0.2s cubic-bezier(0.68, -0.6, 0.32, 1.6);

:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 0 #d1d5db, 0 12px 20px rgba(0, 0, 0, 0.12);
}

:active {
  transform: translateY(1px);
  box-shadow: 0 3px 0 #d1d5db, 0 4px 8px rgba(0, 0, 0, 0.08);
}
```

**Usage:** Category selection cards

---

### Quiz Answer Options (`.game-quiz-option`)

#### Default State
```css
background: white;
border: 2px solid #d1d5db;
border-radius: 1rem;
box-shadow: 0 4px 0 #d1d5db, 0 6px 12px rgba(0, 0, 0, 0.08);
transform: translateY(-1px);
padding: 1rem;
cursor: pointer;

:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #d1d5db, 0 8px 16px rgba(0, 0, 0, 0.12);
}

:active {
  transform: translateY(1px);
  box-shadow: 0 2px 0 #d1d5db, 0 3px 6px rgba(0, 0, 0, 0.08);
}
```

#### Correct Answer (`.game-quiz-option.correct`)
```css
background: rgba(45, 192, 113, 0.1); /* success/10 */
border: 2px solid #2DC071;
box-shadow: 0 4px 0 #25a063, 0 6px 12px rgba(45, 192, 113, 0.2);
```

**Icon:** ✓ (checkmark) - green

#### Incorrect Answer (`.game-quiz-option.incorrect`)
```css
background: rgba(255, 77, 79, 0.1); /* destructive/10 */
border: 2px solid #FF4D4F;
box-shadow: 0 4px 0 #e53e3e, 0 6px 12px rgba(255, 77, 79, 0.2);
```

**Icon:** ✗ (X mark) - red

---

## 🎬 Animations

### Floating Element
```css
.floating-element {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
  }
}
```

**Usage:** Decorative emojis, icons in headers

### Page Transitions (Framer Motion)
```tsx
// Entry animation
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

### Button Press
```css
transition: all 0.15s cubic-bezier(0.68, -0.6, 0.32, 1.6);
```

**Easing:** Elastic bounce effect (`cubic-bezier(0.68, -0.6, 0.32, 1.6)`)

---

## 📱 Layout Patterns

### Screen Structure
```tsx
<div className="min-h-screen bg-background pb-24">
  {/* Header */}
  <div className="bg-primary text-primary-foreground p-6">
    <h1>Page Title</h1>
  </div>

  {/* Content */}
  <div className="p-4 space-y-6">
    {/* Cards, buttons, content */}
  </div>
</div>
```

**Note:** `pb-24` (96px) padding-bottom for navigation bar clearance

---

## 🎮 Component Patterns

### Home Screen Structure
```tsx
1. Header (primary bg)
   - Title: "Versagens-Simulator"
   - Random motivational message
   - Floating emoji decoration

2. Stats Grid (2 columns)
   - Streak card (Flame icon)
   - Level card (Emoji)

3. Action Buttons (vertical stack)
   - Continue Last (if exists) - Primary
   - Random Quiz - Secondary
   - Browse Categories - Secondary

4. Daily Challenge card (optional)

5. Tips/Info card

6. Footer notice
```

### Quiz Screen Structure
```tsx
1. Header (primary bg)
   - Question counter (X / 12)
   - Progress bar

2. Quizmaster Speech Bubble (animated)
   - Shows after answer selection
   - Sarcastic comment

3. Question Card
   - Large, prominent
   - Slide-in animation

4. Answer Options (4 buttons)
   - Vertical stack, space-y-3
   - State changes: default → selected → revealed

5. Next Button (appears after answer)
   - Fade-in animation (delay: 0.5s)
   - "Weiter" or "Quiz beenden"
```

### Results Screen Structure
```tsx
1. Header (primary bg)
   - "Quiz beendet"

2. Main Result Card
   - Grade (A-F) - large, colored
   - Score (X / 12)
   - Percentage
   - Points badge (+XX Punkte)

3. Quizmaster Comment Card
   - Emoji avatar
   - Sarcastic result message

4. Stats Grid (3 columns)
   - Correct count (Target icon)
   - Points earned (Trophy icon)
   - Entries learned (BookOpen icon)

5. Encyclopedia Notice (if entries > 0)
   - Info card with BookOpen icon
   - "X neue Einträge"

6. Action Buttons
   - Play Again (primary, full width)
   - Encyclopedia + Home (2 columns, outline)
```

---

## 🎨 Icon Usage

### Recommended Icons (lucide-react)
- **Play:** Play button
- **Shuffle:** Random quiz
- **Flame:** Streak counter
- **Trophy:** Points, achievements
- **Target:** Accuracy, correct answers
- **BookOpen:** Encyclopedia, learned items
- **Lock:** Locked categories
- **CheckCircle:** Unlocked, correct
- **RotateCcw:** Play again
- **Home:** Home screen

### Emoji Icons
Use emojis for personality:
- 🤡 Decorative header
- 🎭 Level indicator
- 😈 Quizmaster avatar
- 🧠 Tips/intelligence
- 🚫 No ads
- 💸 Purchase/IAP
- 🎯 Start action

---

## 📐 Spacing Scale

```css
/* Tailwind spacing */
space-y-3: 0.75rem (12px) - Answer options
space-y-4: 1rem (16px) - Action buttons
space-y-6: 1.5rem (24px) - Section spacing

p-4: 1rem (16px) - Content padding
p-6: 1.5rem (24px) - Card padding, header

gap-3: 0.75rem (12px) - Icon + text
gap-4: 1rem (16px) - Grid gaps

mb-2, mb-3, mb-4, mb-6 - Bottom margins
```

---

## 🌈 Gradient Usage

### Result Card Background
```css
background: linear-gradient(to bottom right,
  rgba(22, 156, 143, 0.05), /* primary/5 */
  rgba(255, 106, 92, 0.05)   /* accent/5 */
);
```

### Quizmaster Comment Card
```css
background: rgba(255, 106, 92, 0.1); /* accent/10 */
border-color: rgba(255, 106, 92, 0.2); /* accent/20 */
```

---

## 🎯 State Feedback

### Button States
1. **Default:** Elevated, clean shadow
2. **Hover:** Slightly more elevated (hover not used on mobile)
3. **Active/Pressed:** Pushed down (translateY(1-2px))
4. **Disabled:** Opacity 50%, no shadow

### Answer Option States
1. **Default:** White bg, gray border
2. **Selected (before reveal):** Teal border highlight
3. **Correct (revealed):** Green bg/border, checkmark
4. **Incorrect (revealed):** Red bg/border, X mark
5. **Correct but not selected:** Green border, checkmark, white bg

---

## 📝 Text Content Tone

### Sarcastic Motivational Messages
```typescript
const messages = [
  "Bereit für das nächste intellektuelle Fiasko?",
  "Zeig mir, dass dein Gehirn mehr als Deko ist.",
  "Heute wieder Glück statt Wissen versuchen?",
  "Zeit, deine Bildungslücken zu katalogisieren.",
];
```

### Button Labels
- **Start:** "Blamage starten" 🎯
- **Continue:** "Weitermachen"
- **Random:** "Zufallsdemütigung"
- **Browse:** "Wissenslücken durchstöbern"
- **Play Again:** "Nochmal versuchen"
- **Unlock:** "Abzocke akzeptieren" 💸

### Result Messages (by score)
- **90%+:** "Unfassbar. Du hast tatsächlich eine funktionierende Gehirnzelle."
- **70-89%:** "Nicht schlecht. Aber auch ein blindes Huhn findet mal ein Korn."
- **50-69%:** "Mittelmäßig. Wie dein gesamtes Leben vermutlich."
- **30-49%:** "Autsch. Das war schmerzhafter als meine Witze."
- **<30%:** "Beeindruckend schlecht. Hast du versucht, falsch zu antworten?"

---

## 🔧 Implementation Notes

### React Native Considerations
1. **No hover states** - Mobile-first, use active states
2. **Shadow properties** - Use `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
3. **Transform** - Use `transform: [{ translateY }]`
4. **Border radius** - Max 16px for consistency
5. **Touchable components** - Use `TouchableOpacity` or `Pressable`

### Web Considerations
1. **Use CSS box-shadow** for 2.5D effect
2. **Framer Motion** for page transitions
3. **Tailwind classes** match concept exactly
4. **Responsive** - Mobile-first, single column

### Shared Package
- Color tokens in theme constants
- Shadow utilities for cross-platform
- Typography scale shared
- Icon mapping for web/mobile parity

---

## 📚 Component File References

### Key Files to Study
```
Concept/Absurd Quiz App Concept/src/
├── components/
│   ├── Home.tsx           - Home screen layout
│   ├── Quiz.tsx           - Quiz session flow
│   ├── QuizResults.tsx    - Results screen
│   ├── QuizCard.tsx       - Answer option component
│   ├── CategoryCard.tsx   - Category selection card
│   └── Quizmaster.tsx     - Speech bubble component
└── styles/
    └── globals.css        - 2.5D component classes
```

---

## 🎨 Design Principles

1. **Playful but Functional** - Sarcasm + great UX
2. **2.5D Depth** - Shadows create tactile feel
3. **Bold Colors** - High contrast, accessible
4. **Generous Spacing** - Touch-friendly targets (min 44px)
5. **Immediate Feedback** - Active states on press
6. **Smooth Animations** - Elastic easing, 150-300ms
7. **Emoji Personality** - Use sparingly, never replace icons
8. **No Dark Mode** (yet) - Light theme optimized first

---

## ✅ Accessibility

- **Minimum touch target:** 44x44px
- **Color contrast:** WCAG AA compliant
- **Font size:** Minimum 14px (0.875rem)
- **Focus indicators:** Ring offset on inputs
- **Screen reader:** Proper labels on interactive elements
- **Motion:** Respect `prefers-reduced-motion`

---

_Last Updated: 2025-10-10_
_Reference Implementation: Concept/Absurd Quiz App Concept_
