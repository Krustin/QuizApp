/**
 * Shadow utilities for 2.5D design
 * Cross-platform: React Native + Web
 */

import { colors } from './colors';

// Shadow levels (0-4)
export type ShadowLevel = 0 | 1 | 2 | 3 | 4;

/**
 * Shadow style for a given level
 * Compatible with React Native's shadow properties
 */
export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

/**
 * Get shadow style for React Native
 * @param level - Shadow intensity level (0-4)
 * @param color - Shadow color (defaults to border.main)
 * @returns React Native shadow style object
 */
export const getShadowStyle = (
  level: ShadowLevel,
  color: string = colors.border.main
): ShadowStyle => {
  const shadows: Record<ShadowLevel, ShadowStyle> = {
    0: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    1: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    2: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    3: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
    4: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 8,
    },
  };

  return shadows[level];
};

/**
 * 2.5D button shadow (bottom shadow)
 * For use with transform: translateY
 * @param color - Shadow color
 * @param pressed - Whether button is in pressed state
 * @returns React Native shadow style object
 */
export const get2DShadow = (
  color: string,
  pressed: boolean = false
): ShadowStyle => {
  if (pressed) {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    };
  }

  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  };
};

/**
 * Web CSS box-shadow strings for 2.5D effect
 * Use these for web implementations with CSS-in-JS or inline styles
 */
export const webShadows = {
  card: `0 6px 0 ${colors.border.main}, 0 8px 16px rgba(0, 0, 0, 0.1)`,
  cardPressed: `0 2px 0 ${colors.border.main}, 0 4px 8px rgba(0, 0, 0, 0.1)`,

  buttonPrimary: `0 4px 0 ${colors.primary.dark}, 0 6px 12px rgba(22, 156, 143, 0.3)`,
  buttonPrimaryPressed: `0 2px 0 ${colors.primary.dark}, 0 3px 6px rgba(22, 156, 143, 0.3)`,

  buttonSecondary: `0 4px 0 ${colors.border.main}, 0 6px 12px rgba(0, 0, 0, 0.1)`,
  buttonSecondaryPressed: `0 2px 0 ${colors.border.main}, 0 3px 6px rgba(0, 0, 0, 0.1)`,

  buttonAccent: `0 4px 0 ${colors.accent.dark}, 0 6px 12px rgba(255, 106, 92, 0.3)`,
  buttonAccentPressed: `0 2px 0 ${colors.accent.dark}, 0 3px 6px rgba(255, 106, 92, 0.3)`,

  stat: `0 4px 0 ${colors.border.main}, 0 6px 12px rgba(0, 0, 0, 0.08)`,

  quizOption: `0 4px 0 ${colors.border.main}, 0 6px 12px rgba(0, 0, 0, 0.08)`,
  quizOptionHover: `0 6px 0 ${colors.border.main}, 0 8px 16px rgba(0, 0, 0, 0.12)`,
  quizOptionPressed: `0 2px 0 ${colors.border.main}, 0 3px 6px rgba(0, 0, 0, 0.08)`,

  quizOptionCorrect: `0 4px 0 ${colors.success.dark}, 0 6px 12px rgba(45, 192, 113, 0.2)`,
  quizOptionIncorrect: `0 4px 0 ${colors.destructive.dark}, 0 6px 12px rgba(255, 77, 79, 0.2)`,
} as const;

export type WebShadows = typeof webShadows;
