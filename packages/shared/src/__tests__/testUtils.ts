/**
 * Test Utilities
 *
 * Helper functions and mock data factories for testing.
 * Provides convenient methods to create test data with sensible defaults.
 */

import type {
  UserProfile,
  QuizSession,
  SessionQuestion,
  EncyclopediaEntry,
  CategoryAccess,
  Achievement,
} from '../models';
import { QuizCategory, AchievementType } from '../models/Enums';

// ========================================
// UserProfile Factory
// ========================================

export function createMockUserProfile(overrides?: Partial<UserProfile>): UserProfile {
  const now = new Date();
  return {
    userId: 'test-user-123',
    username: 'TestUser',
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
    ...overrides,
  };
}

// ========================================
// SessionQuestion Factory
// ========================================

export function createMockSessionQuestion(
  overrides?: Partial<SessionQuestion>
): SessionQuestion {
  return {
    questionId: `question-${Math.random().toString(36).substring(7)}`,
    userAnswer: 'Test Answer',
    isCorrect: true,
    timeToAnswer: 5000,
    pointsEarned: 10,
    ...overrides,
  };
}

// ========================================
// QuizSession Factory
// ========================================

export function createMockQuizSession(overrides?: Partial<QuizSession>): QuizSession {
  const now = new Date();
  const sessionId = `session-${Math.random().toString(36).substring(7)}`;

  // Create 12 default questions
  const questions: SessionQuestion[] = Array.from({ length: 12 }, (_, i) =>
    createMockSessionQuestion({
      questionId: `question-${sessionId}-${i}`,
      isCorrect: i < 8, // 8 correct answers by default
      pointsEarned: i < 8 ? 10 : 0,
    })
  );

  return {
    sessionId,
    userId: 'test-user-123',
    categoryId: QuizCategory.GENERAL,
    questions,
    score: 8,
    pointsEarned: 80,
    startedAt: now,
    completedAt: now,
    streakAtStart: 0,
    streakAtEnd: 8,
    ...overrides,
  };
}

// ========================================
// EncyclopediaEntry Factory
// ========================================

export function createMockEncyclopediaEntry(
  overrides?: Partial<EncyclopediaEntry>
): EncyclopediaEntry {
  const entryId = `entry-${Math.random().toString(36).substring(7)}`;
  const questionId = `question-${Math.random().toString(36).substring(7)}`;

  return {
    entryId,
    questionId,
    questionText: 'What is the capital of France?',
    correctAnswer: 'Paris',
    tldr: 'Paris is the capital and largest city of France.',
    funFact: 'The Eiffel Tower was supposed to be dismantled after 20 years.',
    category: QuizCategory.GENERAL,
    unlockedAt: new Date(),
    ...overrides,
  };
}

// ========================================
// CategoryAccess Factory
// ========================================

export function createMockCategoryAccess(
  overrides?: Partial<CategoryAccess>
): CategoryAccess {
  return {
    categoryId: QuizCategory.GENERAL,
    isUnlocked: true,
    questionsAnswered: 0,
    correctAnswers: 0,
    ...overrides,
  };
}

// ========================================
// Achievement Factory
// ========================================

export function createMockAchievement(overrides?: Partial<Achievement>): Achievement {
  return {
    achievementId: AchievementType.FIRST_QUIZ,
    title: 'Erstes Quiz',
    description: 'Schließe dein erstes Quiz ab',
    icon: '🎯',
    unlockedAt: undefined,
    ...overrides,
  };
}

// ========================================
// Helper Functions
// ========================================

/**
 * Creates a full set of category access records for all categories
 */
export function createAllCategoryAccess(): CategoryAccess[] {
  return Object.values(QuizCategory).map((category) =>
    createMockCategoryAccess({
      categoryId: category,
      isUnlocked: category === QuizCategory.GENERAL,
    })
  );
}

/**
 * Creates a list of achievements (unlocked and locked)
 */
export function createMockAchievementsList(): Achievement[] {
  return [
    createMockAchievement({
      achievementId: AchievementType.FIRST_QUIZ,
      title: 'Erstes Quiz',
      description: 'Schließe dein erstes Quiz ab',
      icon: '🎯',
    }),
    createMockAchievement({
      achievementId: AchievementType.STREAK_5,
      title: 'Streak 5',
      description: 'Erreiche eine Streak von 5',
      icon: '🔥',
    }),
    createMockAchievement({
      achievementId: AchievementType.LEVEL_10,
      title: 'Level 10',
      description: 'Erreiche Level 10',
      icon: '⭐',
    }),
  ];
}

/**
 * Delays execution for testing async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a corrupted JSON string for testing error handling
 */
export function createCorruptedJson(): string {
  return '{"invalid": json syntax}';
}
