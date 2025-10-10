/**
 * Spacing scale (matches Tailwind)
 * All values in pixels for cross-platform compatibility
 */

export const spacing = {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
} as const;

export type Spacing = typeof spacing;

/**
 * Border radius values
 * All values in pixels for cross-platform compatibility
 */
export const borderRadius = {
  sm: 8,   // 0.5rem
  md: 12,  // 0.75rem
  lg: 16,  // 1rem
  xl: 20,  // 1.25rem
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;
