# Theme Package

Cross-platform theme constants and utilities for Quiz App (React Native + Web).

## Overview

This package provides a consistent design system based on the 2.5D Duolingo-inspired UI style guide. All values are extracted from `docs/UI-STYLE-GUIDE.md` and designed for cross-platform compatibility.

## Installation

The theme is already included in the `@quiz/shared` package:

```typescript
import { theme, colors, typography, spacing, borderRadius } from '@quiz/shared';
```

## Usage

### Colors

```typescript
import { colors, withOpacity } from '@quiz/shared';

// Use predefined colors
const primaryColor = colors.primary.main; // '#169C8F'
const accentColor = colors.accent.main;   // '#FF6A5C'

// Semantic colors
const successColor = colors.success.main; // '#2DC071'
const errorColor = colors.destructive.main; // '#FF4D4F'

// Background colors
const bgMain = colors.background.main;    // '#F6F7F9'
const bgCard = colors.background.card;    // '#ffffff'

// Text colors
const textPrimary = colors.text.primary;  // '#0B1F24'
const textSecondary = colors.text.secondary; // '#6B7280'

// Helper function for opacity
const semiTransparent = withOpacity(colors.primary.main, 0.5);
// Returns: 'rgba(22, 156, 143, 0.5)'
```

### Typography

```typescript
import { typography } from '@quiz/shared';

// Font sizes (in pixels)
const baseSize = typography.fontSize.base;  // 16
const heading = typography.fontSize['3xl']; // 30

// Font weights
const normal = typography.fontWeight.normal;     // '400'
const bold = typography.fontWeight.bold;         // '700'

// Line heights
const normalHeight = typography.lineHeight.normal; // 1.5

// Example React Native style
const textStyle = {
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  lineHeight: typography.fontSize.base * typography.lineHeight.normal,
};
```

### Spacing & Border Radius

```typescript
import { spacing, borderRadius } from '@quiz/shared';

// Spacing values (in pixels)
const padding = spacing[4];  // 16
const margin = spacing[6];   // 24

// Border radius
const roundedCorner = borderRadius.lg; // 16
const roundedButton = borderRadius.md; // 12

// Example React Native style
const cardStyle = {
  padding: spacing[6],
  borderRadius: borderRadius.lg,
  marginBottom: spacing[4],
};
```

### Shadows (React Native)

```typescript
import { getShadowStyle, get2DShadow, colors } from '@quiz/shared';

// Standard shadow levels (0-4)
const shadow = getShadowStyle(2);
// Returns: { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }

// Custom shadow color
const customShadow = getShadowStyle(3, colors.primary.dark);

// 2.5D button shadow
const buttonShadow = get2DShadow(colors.primary.dark, false);
const pressedShadow = get2DShadow(colors.primary.dark, true);

// Example React Native component
const Button = () => (
  <View style={[styles.button, buttonShadow]}>
    <Text>Press Me</Text>
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.main,
    padding: spacing[4],
    borderRadius: borderRadius.lg,
  },
});
```

### Shadows (Web)

```typescript
import { webShadows } from '@quiz/shared';

// Predefined web shadows
const cardShadow = webShadows.card;
// '0 6px 0 #d1d5db, 0 8px 16px rgba(0, 0, 0, 0.1)'

const buttonShadow = webShadows.buttonPrimary;
const pressedShadow = webShadows.buttonPrimaryPressed;

// Example React component (web)
const Button = () => (
  <button
    style={{
      backgroundColor: colors.primary.main,
      color: colors.primary.foreground,
      padding: `${spacing[3]}px ${spacing[6]}px`,
      borderRadius: `${borderRadius.lg}px`,
      boxShadow: webShadows.buttonPrimary,
    }}
  >
    Press Me
  </button>
);
```

### Complete Theme Object

```typescript
import { theme } from '@quiz/shared';

// Access all theme values
const primaryColor = theme.colors.primary.main;
const baseSize = theme.typography.fontSize.base;
const padding = theme.spacing[4];
const rounded = theme.borderRadius.lg;
```

## Type Safety

All theme values are typed with TypeScript:

```typescript
import type { Theme, Colors, Typography, Spacing } from '@quiz/shared';

// Type-safe theme usage
const useThemeValue = (theme: Theme) => {
  const color: string = theme.colors.primary.main;
  const size: number = theme.typography.fontSize.base;
};
```

## Available Exports

### Constants
- `colors` - Complete color palette
- `typography` - Font sizes, weights, line heights
- `spacing` - Spacing scale (0-24)
- `borderRadius` - Border radius values
- `theme` - Complete theme object
- `webShadows` - CSS box-shadow strings for web

### Utilities
- `withOpacity(color, opacity)` - Convert hex to rgba
- `getShadowStyle(level, color?)` - React Native shadow style
- `get2DShadow(color, pressed?)` - 2.5D button shadow for RN

### Types
- `Theme` - Complete theme type
- `Colors` - Colors type
- `Typography` - Typography type
- `Spacing` - Spacing type
- `BorderRadius` - Border radius type
- `ShadowLevel` - Shadow level (0-4)
- `ShadowStyle` - React Native shadow style
- `WebShadows` - Web shadow strings type

## Cross-Platform Notes

### React Native
- All spacing and size values are in pixels (no units needed)
- Use `getShadowStyle()` or `get2DShadow()` for shadows
- Font weights are strings ('400', '700', etc.)
- No hover states - use active/pressed states

### Web
- Convert pixel values to strings with 'px' suffix when needed
- Use `webShadows` for CSS box-shadow property
- Font weights can be used as-is or converted to numbers
- Supports hover states

## Design Principles

This theme follows the 2.5D Duolingo-inspired design system:

1. **Bold Colors** - High contrast, vibrant palette
2. **2.5D Depth** - Shadows create tactile, elevated feel
3. **Generous Spacing** - Touch-friendly, accessible
4. **Elastic Animations** - Bouncy, playful interactions
5. **Consistent Scale** - Tailwind-based spacing

## Reference

For complete design specifications, see:
- `docs/UI-STYLE-GUIDE.md` - Complete UI style guide
- Color values match the concept implementation exactly
- All measurements use Tailwind's default scale
