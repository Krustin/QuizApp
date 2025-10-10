/**
 * Quiz category enumeration
 * Defines all 7 quiz categories available in the app
 * GENERAL is free and unlocked by default, others require IAP
 */
export enum QuizCategory {
  GENERAL = 'GENERAL',
  SKURRILES = 'SKURRILES',
  WISSENSCHAFT = 'WISSENSCHAFT',
  GESCHICHTE = 'GESCHICHTE',
  POPKULTUR = 'POPKULTUR',
  TIERWISSEN = 'TIERWISSEN',
  TECHNIK = 'TECHNIK',
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
