/**
 * Theme package entry point
 * Exports all theme constants and utilities for Quiz App
 */

export * from './colors';
export * from './shadows';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

/**
 * Complete theme object
 * Use this for accessing all theme values in one place
 */
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

export type Theme = typeof theme;
