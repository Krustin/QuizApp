/**
 * Typography scale and weights
 * Based on Tailwind's default scale with custom adjustments
 */

export const typography = {
  fontSize: {
    xs: 12,    // 0.75rem
    sm: 14,    // 0.875rem
    base: 16,  // 1rem
    lg: 18,    // 1.125rem
    xl: 20,    // 1.25rem
    '2xl': 24, // 1.5rem
    '3xl': 30, // 1.875rem
    '4xl': 36, // 2.25rem
  },

  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export type Typography = typeof typography;
