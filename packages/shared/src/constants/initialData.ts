/**
 * Initial Data Constants
 *
 * Provides default data structures for first-time users.
 * These values are used when initializing a new user profile or
 * when storage is empty.
 *
 * Note: We use a simple timestamp-based ID for the initial user.
 * In a real app, you might use a proper UUID library like 'uuid' or 'nanoid'.
 */

import { QuizCategory } from '../models/Enums';
import type { UserProfile, CategoryAccess } from '../models';

/**
 * Generates a simple unique ID based on timestamp and random number.
 * This is a lightweight alternative to UUID libraries for client-side only apps.
 *
 * @returns A unique string ID
 */
function generateSimpleId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Default user profile for new users.
 * Initialized with GENERAL category unlocked and zero stats.
 *
 * @returns A new UserProfile with default values
 */
export function createInitialUserProfile(): UserProfile {
  const now = new Date();

  return {
    userId: generateSimpleId(),
    username: 'Quiz-Versager',
    totalPoints: 0,
    currentLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    unlockedCategories: [QuizCategory.GENERAL],
    achievements: [],
    sessionsPlayed: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    createdAt: now,
    lastPlayedAt: now,
  };
}

/**
 * Default category access records for new users.
 * GENERAL is unlocked by default, all others are locked.
 *
 * @returns Array of CategoryAccess records for all 7 categories
 */
export function createInitialCategoryAccess(): CategoryAccess[] {
  return [
    {
      categoryId: QuizCategory.GENERAL,
      isUnlocked: true,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    {
      categoryId: QuizCategory.SKURRILES,
      isUnlocked: false,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    {
      categoryId: QuizCategory.WISSENSCHAFT,
      isUnlocked: false,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    {
      categoryId: QuizCategory.GESCHICHTE,
      isUnlocked: false,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    {
      categoryId: QuizCategory.POPKULTUR,
      isUnlocked: false,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    {
      categoryId: QuizCategory.TIERWISSEN,
      isUnlocked: false,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    {
      categoryId: QuizCategory.TECHNIK,
      isUnlocked: false,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
  ];
}
