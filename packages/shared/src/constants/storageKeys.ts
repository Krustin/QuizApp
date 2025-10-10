/**
 * Storage Keys Constants
 *
 * Centralized storage key definitions for the Quiz App.
 * Using a consistent prefix (@quiz_) helps with:
 * - Key collision prevention
 * - Easy identification in storage debugging
 * - Bulk operations (e.g., clearing all quiz data)
 *
 * Convention: All keys use snake_case with @quiz_ prefix
 */

export const STORAGE_KEYS = {
  /**
   * Stores the user's profile data
   * Contains: name, totalPoints, level, streak, etc.
   */
  USER_PROFILE: '@quiz_user_profile',

  /**
   * Stores the history of all quiz sessions
   * Array of QuizSession objects
   */
  SESSIONS: '@quiz_sessions',

  /**
   * Stores unlocked encyclopedia entries
   * Array of EncyclopediaEntry objects
   * Populated when user answers questions correctly
   */
  ENCYCLOPEDIA: '@quiz_encyclopedia',

  /**
   * Stores category unlock/access status
   * CategoryAccess object tracking which categories are available
   */
  CATEGORY_ACCESS: '@quiz_category_access',

  /**
   * Stores earned achievements
   * Array of Achievement objects
   */
  ACHIEVEMENTS: '@quiz_achievements',

  /**
   * Stores user settings and preferences
   * Settings object with sound, theme, language, etc.
   */
  SETTINGS: '@quiz_settings',
} as const;

/**
 * Type helper for storage keys
 * Ensures type safety when using storage keys
 */
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
