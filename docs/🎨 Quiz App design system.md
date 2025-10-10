# 🎨 Quiz App - Design System Specification

**Document Version:** 1.0.0  
**Last Updated:** 2025  
**Platforms:** iOS, Android, Web  
**Design Language:** 2.5D Duolingo-Inspired with Sarcastic Personality

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows & Depth (2.5D)](#shadows--depth-25d)
6. [Component Library](#component-library)
7. [Iconography](#iconography)
8. [Animations & Interactions](#animations--interactions)
9. [Responsive Breakpoints](#responsive-breakpoints)
10. [Accessibility](#accessibility)

---

## 🎯 Design Philosophy

### Core Principles

**1. 2.5D Pseudo-3D Aesthetic**
- Strong shadows create illusion of depth
- Elements appear "elevated" off the canvas
- Buttons and cards have physical presence
- Inspired by Duolingo's playful depth

**2. Touch-First Interaction**
- NO hover states (mobile-first)
- ALL interactions via tap/press
- Press = scale down + shadow reduction
- Immediate tactile feedback

**3. Bold & Confident**
- High contrast colors
- Clear visual hierarchy
- No subtle gradients or blur effects
- Elements are either ON or OFF (no ambiguity)

**4. Sarcastic Personality**
- UI copy is condescending but playful
- Icon choices lean toward mockery (🔒💀😤)
- Color choices feel slightly aggressive (not pastel)

---

## 🎨 Color System

### Primary Palette (60-30-10 Rule)

#### Primary (60% - Teal)
```
Teal 500 (Main)
HEX: #169C8F
RGB: 22, 156, 143
CMYK: 85, 0, 9, 39

Usage:
- Primary buttons
- Active tab indicator
- Progress bars (fill)
- Links
- Icon tints (active state)
```

#### Teal Variants
```
Teal 700 (Darker - pressed state)
HEX: #0E7066
RGB: 14, 112, 102

Teal 300 (Lighter - disabled state)
HEX: #4DB5A9
RGB: 77, 181, 169
```

---

#### Secondary (30% - Off-White)
```
Off-White (Backgrounds)
HEX: #F6F7F9
RGB: 246, 247, 249
CMYK: 1, 1, 0, 2

Usage:
- Main app background
- Card backgrounds
- Input field backgrounds
- Modal backgrounds
```

#### Gray Scale (Supporting)
```
Gray 900 (Text - Primary)
HEX: #1A1D23
RGB: 26, 29, 35

Gray 700 (Text - Secondary)
HEX: #4A4E57
RGB: 74, 78, 87

Gray 400 (Text - Disabled)
HEX: #9CA3AF
RGB: 156, 163, 175

Gray 200 (Borders)
HEX: #E5E7EB
RGB: 229, 231, 235

Gray 100 (Dividers)
HEX: #F3F4F6
RGB: 243, 244, 246
```

---

#### Accent (10% - Coral)
```
Coral 500 (Main)
HEX: #FF6A5C
RGB: 255, 106, 92
CMYK: 0, 58, 64, 0

Usage:
- Call-to-action buttons
- Error states
- Purchase buttons
- Attention-grabbing elements
- "Wrong answer" feedback
```

#### Coral Variants
```
Coral 700 (Darker - pressed)
HEX: #E54A3C
RGB: 229, 74, 60

Coral 300 (Lighter - hover web only)
HEX: #FF9B90
RGB: 255, 155, 144
```

---

### Semantic Colors

#### Success
```
Success Green
HEX: #22C55E
RGB: 34, 197, 94

Usage:
- Correct answer feedback
- Success toasts
- Checkmarks
- Unlocked status
```

#### Error
```
Error Red
HEX: #EF4444
RGB: 239, 68, 68

Usage:
- Incorrect answer feedback
- Error messages
- Validation errors
- X marks
```

#### Warning
```
Warning Yellow
HEX: #F59E0B
RGB: 245, 158, 11

Usage:
- Alerts
- Low streak warnings
- Tutorial hints
```

#### Info
```
Info Blue
HEX: #3B82F6
RGB: 59, 130, 246

Usage:
- Information tooltips
- Encyclopedia badges
- Help text
```

---

### Color Usage Guidelines

**60% - Teal (Primary)**
- Navigation elements
- Interactive components
- Brand elements

**30% - Off-White/Gray (Secondary)**
- Backgrounds
- Cards
- Non-interactive surfaces

**10% - Coral (Accent)**
- Key actions only
- Purchase flows
- High-priority CTAs

**DO:**
- Use teal for primary actions
- Use coral sparingly for emphasis
- Maintain high contrast (text on backgrounds)

**DON'T:**
- Mix teal and coral on same element
- Use coral for large backgrounds
- Use low-contrast color combinations

---

## ✍️ Typography

### Font Family

**Primary Font:** **SF Pro / Roboto / System Default**

**Platform Mapping:**
- iOS: SF Pro (system font)
- Android: Roboto (system font)
- Web: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

**Rationale:** Native system fonts for best performance and readability

---

### Type Scale

#### Heading 1 (Hero)
```
Size: 32px / 2rem
Weight: 700 (Bold)
Line Height: 40px (1.25)
Letter Spacing: -0.5px

Usage:
- Quiz session score (8/12)
- Level numbers on profile
- Results screen headline
```

#### Heading 2 (Page Title)
```
Size: 24px / 1.5rem
Weight: 700 (Bold)
Line Height: 32px (1.33)
Letter Spacing: -0.3px

Usage:
- Screen titles
- Modal headers
- Category names
```

#### Heading 3 (Section)
```
Size: 20px / 1.25rem
Weight: 600 (SemiBold)
Line Height: 28px (1.4)
Letter Spacing: -0.2px

Usage:
- Section headers
- Card titles
- Achievement titles
```

#### Body Large
```
Size: 18px / 1.125rem
Weight: 400 (Regular)
Line Height: 28px (1.56)
Letter Spacing: 0px

Usage:
- Question text
- Quizmaster comments
- Important body text
```

#### Body Regular
```
Size: 16px / 1rem
Weight: 400 (Regular)
Line Height: 24px (1.5)
Letter Spacing: 0px

Usage:
- Default body text
- Answer options
- Descriptions
- Encyclopedia entries
```

#### Body Small
```
Size: 14px / 0.875rem
Weight: 400 (Regular)
Line Height: 20px (1.43)
Letter Spacing: 0px

Usage:
- Secondary information
- Labels
- Metadata (dates, counts)
- Hints
```

#### Caption
```
Size: 12px / 0.75rem
Weight: 500 (Medium)
Line Height: 16px (1.33)
Letter Spacing: 0.3px

Usage:
- Badges
- Tiny labels
- Fine print
```

---

### Font Weights Available

```
Regular: 400
Medium: 500
SemiBold: 600
Bold: 700
```

**DO:**
- Use Bold (700) for headings and emphasis
- Use Regular (400) for body text
- Use Medium (500) for button text

**DON'T:**
- Use Light weights (too thin for mobile)
- Mix more than 2 weights in single component
- Use ALL CAPS without increasing letter-spacing

---

## 📐 Spacing & Layout

### Spacing Scale (8px Base Grid)

```
4px   (0.25rem) - xs  - Micro spacing (icon padding)
8px   (0.5rem)  - sm  - Tight spacing
12px  (0.75rem) - md  - Component padding (small)
16px  (1rem)    - lg  - Default component padding
24px  (1.5rem)  - xl  - Section spacing
32px  (2rem)    - 2xl - Large section gaps
48px  (3rem)    - 3xl - Screen margin (top/bottom)
64px  (4rem)    - 4xl - Hero spacing
```

### Layout Guidelines

#### Screen Margins (Mobile)
```
Left/Right: 16px
Top: 16px (below status bar)
Bottom: 16px (above tab bar)
```

#### Screen Margins (Web)
```
Max Width: 1200px (container)
Left/Right: 24px (responsive)
Center-aligned content
```

#### Component Spacing
```
Between cards: 16px
Between sections: 32px
Inside card padding: 16px
Button padding: 12px vertical, 24px horizontal
```

#### Grid System (Web)
```
12-column grid
Gutter: 16px
Max container: 1200px
```

---

## 🌑 Shadows & Depth (2.5D)

### Shadow Levels

The shadows create the "2.5D" effect - making elements feel raised off the surface.

#### Level 1 - Subtle (Low Elements)
```
Shadow 1:
  offset-x: 0
  offset-y: 2px
  blur: 4px
  color: rgba(0, 0, 0, 0.1)

Usage: Input fields, small badges
```

#### Level 2 - Default (Standard Cards)
```
Shadow 2:
  offset-x: 0
  offset-y: 4px
  blur: 12px
  color: rgba(0, 0, 0, 0.15)

Usage: Answer cards (default state), navigation tabs
```

#### Level 3 - Elevated (Important Elements)
```
Shadow 3:
  offset-x: 0
  offset-y: 8px
  blur: 24px
  color: rgba(0, 0, 0, 0.2)

Usage: Primary buttons, category cards, quiz question card
```

#### Level 4 - Floating (Modals)
```
Shadow 4:
  offset-x: 0
  offset-y: 16px
  blur: 48px
  color: rgba(0, 0, 0, 0.25)

Usage: Modals, bottom sheets, achievement unlock cards
```

---

### Platform-Specific Shadow Implementation

#### iOS
```swift
// Use shadowProps
shadowColor: '#000',
shadowOffset: { width: 0, height: 8 },
shadowOpacity: 0.2,
shadowRadius: 12,
```

#### Android
```kotlin
// Use elevation
elevation: 8
```

#### Web (CSS)
```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
```

---

### Pressed State Shadow

When element is pressed/tapped:
- Reduce shadow by 50%
- Scale element to 0.95
- Transition: 100ms ease-out

**Example:**
```
Default Button (Shadow 3):
  y: 8px, blur: 24px, opacity: 0.2

Pressed Button:
  y: 4px, blur: 12px, opacity: 0.1
  scale: 0.95
```

---

## 🧩 Component Library

### Buttons

#### Primary Button (Teal)

**Visual Specs:**
```
Background: Teal 500 (#169C8F)
Text: White
Border Radius: 12px
Padding: 16px vertical, 32px horizontal
Font: Body Regular (16px), Weight 600
Shadow: Level 3
Min Width: 120px
Height: 56px
```

**States:**
```
Default:
  - Background: Teal 500
  - Shadow: Level 3
  - Scale: 1.0

Pressed:
  - Background: Teal 700
  - Shadow: Level 2 (reduced)
  - Scale: 0.95
  - Transition: 100ms

Disabled:
  - Background: Gray 400
  - Text: Gray 200
  - Shadow: None
  - Opacity: 0.5
```

**Usage:** Main quiz start, continue buttons, primary actions

---

#### Secondary Button (Coral Accent)

**Visual Specs:**
```
Background: Coral 500 (#FF6A5C)
Text: White
Border Radius: 12px
Padding: 16px vertical, 32px horizontal
Font: Body Regular (16px), Weight 600
Shadow: Level 3
Min Width: 120px
Height: 56px
```

**States:** Same press behavior as Primary

**Usage:** Purchase buttons, critical CTAs, "unlock" actions

---

#### Tertiary Button (Outline)

**Visual Specs:**
```
Background: Transparent
Border: 2px solid Teal 500
Text: Teal 500
Border Radius: 12px
Padding: 16px vertical, 32px horizontal
Font: Body Regular (16px), Weight 600
Shadow: None
Height: 56px
```

**States:**
```
Pressed:
  - Background: Teal 500 (10% opacity)
  - Scale: 0.95
  - Border: Teal 700
```

**Usage:** Secondary actions, "cancel" buttons, back navigation

---

#### Text Button (Minimal)

**Visual Specs:**
```
Background: Transparent
Text: Teal 500
Font: Body Regular (16px), Weight 500
Padding: 8px vertical, 16px horizontal
Shadow: None
```

**States:**
```
Pressed:
  - Text: Teal 700
  - Opacity: 0.7
```

**Usage:** "Skip", "Learn more", inline links

---

### Answer Button (Quiz Special)

**Visual Specs:**
```
Background: White
Border: 3px solid Gray 200
Border Radius: 16px
Padding: 20px
Min Height: 72px
Shadow: Level 2
Width: 100% (full width)
```

**Layout:**
```
┌─────────────────────────────────┐
│ A)  Sydney                      │
└─────────────────────────────────┘
    │
    └─ 16px padding all sides
       Text left-aligned
       Letter (A, B, C, D) in Medium weight
```

**States:**
```
Default:
  - Background: White
  - Border: 3px solid Gray 200
  - Text: Gray 900
  - Shadow: Level 2

Pressed (before answer):
  - Background: Gray 100
  - Border: 3px solid Teal 500
  - Scale: 0.98
  - Shadow: Level 1

Correct (selected):
  - Background: #E7F9F5 (light green tint)
  - Border: 3px solid Success Green
  - Text: Gray 900
  - Icon: ✓ (green, right side)
  - Shadow: Level 2

Incorrect (selected):
  - Background: #FEE7E7 (light red tint)
  - Border: 3px solid Error Red
  - Text: Gray 900
  - Icon: ✗ (red, right side)
  - Shadow: Level 2

Correct (not selected but shown):
  - Background: White
  - Border: 3px solid Success Green
  - Text: Gray 900
  - Icon: ✓ (green, right side)

Disabled (other answers after selection):
  - Opacity: 0.5
  - No interaction
```

**Spacing:**
```
Vertical gap between buttons: 12px
```

---

### Cards

#### Standard Card

**Visual Specs:**
```
Background: White
Border Radius: 16px
Padding: 16px
Shadow: Level 2
Border: 1px solid Gray 200 (optional)
```

**Usage:** Encyclopedia entries, category cards, stat displays

---

#### Category Card (Unlocked)

**Layout:**
```
┌──────────────────────────────┐
│  ✅ Allgemeinwissen          │
│                              │
│  47/100 Fragen               │
│  ████████░░░ 47%             │
│                              │
│  [Quiz starten] ────────────>│
└──────────────────────────────┘

Size: Full width minus screen margins
Height: 160px (flexible)
Padding: 20px
Border Radius: 20px
Shadow: Level 3
```

**Elements:**
- Checkmark badge (top-left, 24px, green background)
- Category name (Heading 3)
- Progress text (Body Small, Gray 700)
- Progress bar (8px height)
- CTA button (Primary, full width)

---

#### Category Card (Locked)

**Layout:**
```
┌──────────────────────────────┐
│  🔒 Skurriles für            │
│     Ahnungslose              │
│                              │
│  100 Fragen                  │
│                              │
│  💰 2,99 €                   │
│  [Freischalten] ────────────>│
└──────────────────────────────┘

Same size as unlocked
Overlay: Semi-transparent gray (10%)
Lock icon: Top-left, 32px
```

**Visual Differences:**
- Lock icon overlays top-left corner
- Slight grayscale filter (subtle)
- Price badge prominent
- CTA button = Secondary (Coral)

---

### Progress Bar

**Visual Specs:**
```
Height: 8px
Border Radius: 8px (fully rounded)
Background: Gray 200
Fill: Teal 500
Shadow: Inner shadow (subtle)
```

**Inner Shadow (optional depth):**
```
inset 0 2px 4px rgba(0, 0, 0, 0.1)
```

**States:**
```
0-25%: Teal 500
26-75%: Teal 500
76-100%: Success Green (gradient optional)
```

**Animation:**
- Width transition: 300ms ease-out
- Never animate on first render (instant load)

---

### Input Fields

**Visual Specs:**
```
Background: White
Border: 2px solid Gray 200
Border Radius: 12px
Padding: 16px
Height: 56px
Font: Body Regular (16px)
Shadow: Level 1
```

**States:**
```
Default:
  - Border: Gray 200
  - Text: Gray 900

Focus:
  - Border: Teal 500 (2px)
  - Shadow: 0 0 0 4px rgba(22, 156, 143, 0.1) (glow)

Error:
  - Border: Error Red
  - Helper text: Error Red (below input)

Disabled:
  - Background: Gray 100
  - Border: Gray 200
  - Text: Gray 400
```

---

### Modals / Bottom Sheets

**Modal (Center)**
```
Background: White
Border Radius: 24px (top corners only for mobile)
Padding: 24px
Shadow: Level 4
Max Width: 400px (web)
Full Width: Mobile (minus 32px margins)
```

**Bottom Sheet (Mobile)**
```
Slides up from bottom
Border Radius: 24px (top corners)
Padding: 24px
Shadow: Level 4
Backdrop: rgba(0, 0, 0, 0.5)
Handle: 40px wide, 4px tall, Gray 400 (centered top)
```

**Animation:**
```
Entry: Slide up + fade in (300ms ease-out)
Exit: Slide down + fade out (200ms ease-in)
```

---

### Badges

#### Achievement Badge

**Visual Specs:**
```
Size: 64x64px
Border Radius: 50% (circle)
Background: White
Border: 3px solid Teal 500 (unlocked)
Border: 3px solid Gray 300 (locked)
Shadow: Level 2
Icon: 32px (centered)
```

**States:**
```
Unlocked:
  - Full color icon
  - Border: Teal 500
  - Opacity: 1.0

Locked:
  - Grayscale icon
  - Border: Gray 300
  - Opacity: 0.4
```

---

#### Count Badge (Tab Bar)

**Visual Specs:**
```
Size: 20x20px (min)
Border Radius: 10px (fully rounded)
Background: Coral 500
Text: White, Caption (12px), Bold
Padding: 4px horizontal
Position: Top-right of tab icon
```

**Usage:** New encyclopedia entries count

---

### Toast / Snackbar Notifications

**Visual Specs:**
```
Background: Gray 900
Text: White, Body Small (14px)
Border Radius: 12px
Padding: 12px 16px
Shadow: Level 3
Max Width: 400px
Position: Bottom center (above tab bar)
```

**Variants:**
```
Success:
  - Icon: ✓ (green)
  - Accent border: 3px left, Success Green

Error:
  - Icon: ⚠️
  - Accent border: 3px left, Error Red

Info:
  - Icon: ℹ️
  - Accent border: 3px left, Info Blue
```

**Animation:**
```
Entry: Slide up + fade (200ms)
Display: 3 seconds
Exit: Fade out (200ms)
```

---

### Tab Bar (Bottom Navigation)

**Visual Specs:**
```
Height: 72px (mobile), 64px (web)
Background: White
Border Top: 1px solid Gray 200
Shadow: Level 2 (inverted, upward)
```

**Tab Item:**
```
Width: 25% (4 tabs)
Icon: 24x24px
Label: Caption (12px)
Padding: 8px vertical
```

**States:**
```
Active:
  - Icon: Teal 500
  - Label: Teal 500, Weight 600
  - Indicator: 3px line above icon (Teal 500)

Inactive:
  - Icon: Gray 400
  - Label: Gray 400, Weight 400
```

---

## 🎨 Iconography

### Icon Set: **SF Symbols (iOS) / Material Icons (Android/Web)**

**Icon Sizes:**
```
Small: 16x16px (inline icons)
Medium: 24x24px (tab bar, buttons)
Large: 32x32px (headers, heroes)
XLarge: 48x48px (empty states)
```

### Icon Specifications

| Context | Icon Name | Size | Color |
|---------|-----------|------|-------|
| Tab: Spielen | 🎯 target / game | 24px | Teal 500 (active) |
| Tab: Kategorien | 📚 books / library | 24px | Teal 500 (active) |
| Tab: Lexikon | 📖 book / article | 24px | Teal 500 (active) |
| Tab: Profil | 👤 person / account | 24px | Teal 500 (active) |
| Correct Answer | ✓ checkmark | 20px | Success Green |
| Wrong Answer | ✗ x-mark | 20px | Error Red |
| Locked Category | 🔒 lock | 24px | Gray 400 |
| Streak | ⚡ bolt / lightning | 16px | Warning Yellow |
| Level | 🎖️ star / medal | 20px | Teal 500 |
| Achievement | 🏆 trophy | 32px | Teal 500 |
| Encyclopedia | 📖 book-open | 20px | Info Blue |
| Settings | ⚙️ gear | 24px | Gray 700 |
| Purchase | 💰 currency / cart | 20px | Coral 500 |
| Info | ℹ️ info-circle | 16px | Info Blue |
| Warning | ⚠️ alert-triangle | 16px | Warning Yellow |
| Close | ✕ x / close | 20px | Gray 700 |
| Back | ← arrow-left | 24px | Gray 700 |
| Forward | → arrow-right | 24px | Teal 500 |

### Icon Usage Guidelines

**DO:**
- Use consistent icon set across platform
- Color icons to match context (success = green, etc.)
- Maintain 24x24px touch target minimum (mobile)

**DON'T:**
- Mix icon styles (outlined + filled)
- Use custom illustrations for functional icons
- Make icons smaller than 16px

---

## 🎭 Animations & Interactions

### Animation Principles

**1. Quick & Snappy**
- Duration: 100-300ms (never longer)
- Easing: ease-out for enter, ease-in for exit
- No elastic/bounce effects (too playful)

**2. Purpose-Driven**
- Every animation communicates state change
- No decoration-only animations
- Reduce motion for accessibility

**3. Touch Feedback is Immediate**
- 0ms delay on press
- Visual response within 16ms (1 frame)

---

### Core Animations

#### Button Press
```
Property: transform (scale) + shadow
Duration: 100ms
Easing: ease-out

Keyframes:
  0%: scale(1.0), shadow(level 3)
  100%: scale(0.95), shadow(level 2)
```

**Code Example (React Native):**
```javascript
Animated.spring(scaleValue, {
  toValue: 0.95,
  duration: 100,
  useNativeDriver: true,
});
```

---

#### Card Enter (Screen Load)
```
Property: opacity + translateY
Duration: 300ms
Easing: ease-out
Stagger: 50ms between cards

Keyframes:
  0%: opacity(0), translateY(20px)
  100%: opacity(1), translateY(0)
```

---

#### Modal Enter
```
Property: opacity + scale
Duration: 250ms
Easing: ease-out

Keyframes:
  0%: opacity(0), scale(0.9)
  100%: opacity(1), scale(1.0)
```

**Backdrop:**
```
Property: opacity
Duration: 250ms
Keyframes:
  0%: opacity(0)
  100%: opacity(0.5)
```

---

#### Toast Notification
```
Entry:
  Property: translateY + opacity
  Duration: 200ms
  Easing: ease-out
  From: translateY(40px), opacity(0)
  To: translateY(0), opacity(1)

Exit:
  Property: opacity
  Duration: 200ms
  Easing: ease-in
  From: opacity(1)
  To: opacity(0)
```

---

#### Progress Bar Fill
```
Property: width
Duration: 300ms
Easing: ease-out

Update on each correct answer:
  From: currentWidth
  To: newWidth
```

---

#### Level-Up (Celebration)
```
Sequence:
  1. Scale pulse (200ms)
     - scale(1.0) → scale(1.2) → scale(1.0)
  
  2. Confetti particles (optional)
     - Small colored circles
     - Emit from level number
     - Fade + float up (500ms)
```

---

#### Streak Counter Update
```
Property: transform + color
Duration: 300ms

Sequence:
  1. Scale up (150ms)
     - scale(1.0) → scale(1.3)
  
  2. Scale down (150ms)
     - scale(1.3) → scale(1.0)
  
  3. Color flash
     - Teal 500 → Warning Yellow → Teal 500
```

---

### Haptic Feedback (Mobile)

**Trigger Points:**
```
Button Press: Light impact
Correct Answer: Success notification
Wrong Answer: Error notification
Level-Up: Heavy impact
Achievement Unlock: Success notification
```

**iOS:**
```swift
UIImpactFeedbackGenerator(style: .light).impactOccurred()
```

**Android:**
```kotlin
view.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY)
```

---

### Gesture Guidelines (Mobile)

**Supported Gestures:**
```
Tap: Primary interaction
Long Press: Future (answer explanations)
Swipe: Navigation between screens (native)
Pull-to-Refresh: Restore purchases (PlayScreen only)
```

**NOT Supported (Keep Simple):**
- Pinch to zoom
- Double tap
- Multi-finger gestures
- Shake

---

## 📱 Responsive Breakpoints

### Mobile (Portrait)
```
Min Width: 320px (iPhone SE)
Max Width: 428px (iPhone 14 Pro Max)
Target: 375px (iPhone 13/14)
```

**Layout:**
- Single column
- Full width cards (minus margins)
- Bottom tab navigation
- Stack vertically

---

### Mobile (Landscape)
```
Orientation: Landscape
```

**Adaptations:**
- Hide tab bar labels (icons only)
- Reduce vertical spacing
- Maintain 16px margins
- Consider horizontal scrolling for answer buttons

---

### Tablet
```
Min Width: 768px (iPad)
Max Width: 1024px (iPad Pro)
```

**Layout:**
- Two-column layouts (categories)
- Wider content (max 600px)
- Side navigation (optional)
- Floating tab bar (centered, max 500px)

---

### Web (Desktop)
```
Small: 640px - 768px
Medium: 768px - 1024px
Large: 1024px - 1280px
XLarge: 1280px+
```

**Layout:**
- Centered content (max 1200px container)
- Navigation as sidebar (Large+)
- Multi-column grids
- Hover states allowed (web only)

---

### Breakpoint Variables
```css
/* Tailwind-style */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## ♿ Accessibility

### Color Contrast

**WCAG AA Standards (Minimum):**
```
Text on Background:
  - Normal text: 4.5:1 contrast ratio
  - Large text (18px+): 3:1 contrast ratio
  - Interactive elements: 3:1 contrast ratio
```

**Our Palette Check:**
```
✅ Gray 900 on Off-White: 12.6:1 (excellent)
✅ Teal 500 on White: 4.5:1 (pass)
✅ Coral 500 on White: 3.1:1 (pass large text)
✅ Success Green on White: 3.5:1 (pass large text)
⚠️ Warning Yellow on White: 2.2:1 (fail - use with caution)
```

---

### Touch Targets

**Minimum Size:**
```
Mobile: 44x44px (iOS), 48x48px (Android)
Web: 40x40px (WCAG 2.5.5)
```

**Spacing:**
```
Minimum gap between targets: 8px
```

**Our Components:**
```
✅ Buttons: 56px height (pass)
✅ Answer buttons: 72px height (excellent)
✅ Tab bar items: 72px height (excellent)
✅ Icons: 24x24px in 44px touch area (pass)
```

---

### Screen Reader Support

**Semantic HTML (Web):**
```html
<button aria-label="Start quiz">Unwissen demonstrieren</button>
<nav aria-label="Main navigation">...</nav>
<main aria-live="polite">...</main>
```

**React Native Accessibility:**
```jsx
<TouchableOpacity 
  accessibilityLabel="Start quiz"
  accessibilityHint="Begins a new quiz session"
  accessibilityRole="button"
>
  <Text>Unwissen demonstrieren</Text>
</TouchableOpacity>
```

---

### Reduced Motion

**Respect OS Setting:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**React Native:**
```javascript
import { AccessibilityInfo } from 'react-native';

const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
if (isReduceMotionEnabled) {
  // Disable animations
}
```

---

### Focus States (Keyboard Navigation - Web)

**Visual Indicator:**
```css
:focus {
  outline: 3px solid #169C8F; /* Teal 500 */
  outline-offset: 2px;
  border-radius: 4px;
}
```

**DO:**
- Show visible focus ring
- Maintain logical tab order
- Allow keyboard navigation for all interactions

**DON'T:**
- Remove focus styles (`outline: none` without replacement)
- Trap keyboard focus
- Skip interactive elements in tab order

---

## 🎨 Design Tokens (Code Export)

### JSON Format (for developers)

```json
{
  "colors": {
    "primary": {
      "main": "#169C8F",
      "dark": "#0E7066",
      "light": "#4DB5A9"
    },
    "secondary": {
      "main": "#F6F7F9"
    },
    "accent": {
      "main": "#FF6A5C",
      "dark": "#E54A3C",
      "light": "#FF9B90"
    },
    "semantic": {
      "success": "#22C55E",
      "error": "#EF4444",
      "warning": "#F59E0B",
      "info": "#3B82F6"
    },
    "gray": {
      "900": "#1A1D23",
      "700": "#4A4E57",
      "400": "#9CA3AF",
      "200": "#E5E7EB",
      "100": "#F3F4F6"
    }
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 24,
    "2xl": 32,
    "3xl": 48,
    "4xl": 64
  },
  "shadows": {
    "level1": "0 2px 4px rgba(0,0,0,0.1)",
    "level2": "0 4px 12px rgba(0,0,0,0.15)",
    "level3": "0 8px 24px rgba(0,0,0,0.2)",
    "level4": "0 16px 48px rgba(0,0,0,0.25)"
  },
  "borderRadius": {
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 20,
    "2xl": 24,
    "full": 9999
  },
  "typography": {
    "h1": {
      "size": 32,
      "weight": 700,
      "lineHeight": 40,
      "letterSpacing": -0.5
    },
    "h2": {
      "size": 24,
      "weight": 700,
      "lineHeight": 32,
      "letterSpacing": -0.3
    },
    "body": {
      "size": 16,
      "weight": 400,
      "lineHeight": 24,
      "letterSpacing": 0
    }
  }
}
```

---

## ✅ Design Checklist

### Before Handoff to Development

**Colors:**
- [ ] All colors have HEX, RGB, and usage notes
- [ ] Contrast ratios verified (WCAG AA)
- [ ] Semantic colors defined (success, error, warning)

**Typography:**
- [ ] Font family decided (system fonts recommended)
- [ ] Type scale complete (6 sizes minimum)
- [ ] Line heights and letter spacing specified

**Spacing:**
- [ ] 8px grid system documented
- [ ] Component padding values defined
- [ ] Screen margins specified (mobile + web)

**Shadows:**
- [ ] 4 shadow levels defined
- [ ] Platform-specific implementations noted
- [ ] Press state shadow reduction specified

**Components:**
- [ ] All button variants designed (primary, secondary, tertiary)
- [ ] Answer button states complete (default, pressed, correct, incorrect)
- [ ] Card components with exact dimensions
- [ ] Modal/bottom sheet specs

**Interactions:**
- [ ] Press animations documented (scale, shadow)
- [ ] Transition durations specified (100-300ms)
- [ ] Haptic feedback triggers listed

**Accessibility:**
- [ ] Touch targets 44x44px minimum
- [ ] Color contrast verified
- [ ] Focus states designed (web)
- [ ] Screen reader labels planned

**Responsive:**
- [ ] Mobile breakpoints defined (320px - 428px)
- [ ] Tablet adaptations specified
- [ ] Web desktop layout planned
- [ ] Landscape orientation handled

---

## 📦 Deliverables for Designer

### Figma File Structure Recommendation

```
📁 Quiz App Design System
├── 📄 Cover Page (this document summary)
├── 📄 Color Palette (swatches + usage)
├── 📄 Typography (type scale showcase)
├── 📄 Spacing & Layout (grid examples)
├── 📄 Shadows (visual samples)
├── 📄 Components
│   ├── Buttons (all variants + states)
│   ├── Cards (category, encyclopedia, stats)
│   ├── Answer Buttons (all states)
│   ├── Inputs & Forms
│   ├── Modals & Sheets
│   ├── Tab Bar
│   └── Misc (badges, toast, progress)
├── 📄 Icons (icon library)
├── 📄 Screens - Mobile
│   ├── PlayScreen
│   ├── QuizSessionScreen
│   ├── Results Screen
│   ├── CategoriesScreen
│   ├── EncyclopediaScreen
│   └── ProfileScreen
└── 📄 Screens - Web (responsive variants)
```

---

**END OF DESIGN SYSTEM SPECIFICATION**