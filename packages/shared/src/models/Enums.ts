/**
 * Quiz category enumeration - UPDATED (Phase 1 Migration)
 * Defines quiz categories with their full IDs
 * Categories now use descriptive IDs instead of short codes
 */
export enum QuizCategory {
  // New surreal categories (with full descriptive IDs)
  SKURRILES_SURREAL = 'SKURRILES_FUER_AHNUNGSLOSE_SURREAL',
  WISSENSCHAFT_SURREAL = 'WISSENSCHAFT_FUER_SCHULABBRECHER_SURREAL',

  // Legacy short-form categories (kept for backward compatibility)
  GENERAL = 'GENERAL',
  SKURRILES = 'SKURRILES',
  WISSENSCHAFT = 'WISSENSCHAFT',
  GESCHICHTE = 'GESCHICHTE',
  POPKULTUR = 'POPKULTUR',
  TIERWISSEN = 'TIERWISSEN',
  TECHNIK = 'TECHNIK',
}

/**
 * Category display names mapping
 * Maps category IDs to user-friendly German display names
 */
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  // New surreal categories
  'SKURRILES_FUER_AHNUNGSLOSE_SURREAL': 'Skurriles Wissen',
  'WISSENSCHAFT_FUER_SCHULABBRECHER_SURREAL': 'Wissenschaft & Alltag',

  // Legacy categories
  'GENERAL': 'Allgemeinwissen',
  'SKURRILES': 'Skurriles Wissen',
  'WISSENSCHAFT': 'Wissenschaft & Alltag',
  'GESCHICHTE': 'Geschichte',
  'POPKULTUR': 'Popkultur',
  'TIERWISSEN': 'Tiere',
  'TECHNIK': 'Technik',
};

/**
 * Get display name for a category ID
 */
export function getCategoryDisplayName(categoryId: string): string {
  return CATEGORY_DISPLAY_NAMES[categoryId] || categoryId;
}

/**
 * Question difficulty levels
 */
export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

/**
 * Achievement type enumeration
 * Used to categorize different types of achievements
 */
export enum AchievementType {
  FIRST_QUIZ = 'FIRST_QUIZ',
  STREAK_5 = 'STREAK_5',
  STREAK_10 = 'STREAK_10',
  STREAK_20 = 'STREAK_20',
  LEVEL_5 = 'LEVEL_5',
  LEVEL_10 = 'LEVEL_10',
  LEVEL_25 = 'LEVEL_25',
  ALL_CATEGORIES = 'ALL_CATEGORIES',
  QUESTIONS_100 = 'QUESTIONS_100',
  QUESTIONS_500 = 'QUESTIONS_500',
}
