/**
 * StreakManager Service
 *
 * Manages quiz answer streaks and calculates streak-related metrics.
 * Handles streak updates, milestone detection, and performance levels.
 *
 * Streak rules:
 * - Correct answers increment the streak
 * - Incorrect answers reset the streak to 0
 * - Longest streak is tracked across all quiz sessions
 * - Milestones occur at multiples of 5 (5, 10, 15, 20, etc.)
 */

/**
 * Service for managing quiz answer streaks
 */
export class StreakManager {
  /**
   * Update streak based on answer correctness
   *
   * Calculates the new streak values after answering a question.
   * If the answer is correct, increments the current streak and updates
   * the longest streak if necessary. If incorrect, resets current streak
   * while preserving the longest streak record.
   *
   * @param currentStreak - Current streak count
   * @param longestStreak - Longest streak achieved
   * @param isCorrect - Whether the answer was correct
   * @returns Updated { currentStreak, longestStreak }
   *
   * @example
   * ```typescript
   * // Correct answer during active streak
   * const result = streakManager.updateStreak(4, 10, true);
   * // Returns: { currentStreak: 5, longestStreak: 10 }
   *
   * // Correct answer that sets new record
   * const result = streakManager.updateStreak(10, 10, true);
   * // Returns: { currentStreak: 11, longestStreak: 11 }
   *
   * // Incorrect answer breaks streak
   * const result = streakManager.updateStreak(5, 10, false);
   * // Returns: { currentStreak: 0, longestStreak: 10 }
   * ```
   */
  updateStreak(
    currentStreak: number,
    longestStreak: number,
    isCorrect: boolean
  ): { currentStreak: number; longestStreak: number } {
    // Handle edge case: ensure non-negative values
    const sanitizedCurrentStreak = Math.max(0, currentStreak);
    const sanitizedLongestStreak = Math.max(0, longestStreak);

    if (isCorrect) {
      // If correct:
      // - Increment currentStreak
      const newCurrentStreak = sanitizedCurrentStreak + 1;

      // - Update longestStreak if currentStreak > longestStreak
      const newLongestStreak = Math.max(newCurrentStreak, sanitizedLongestStreak);

      return {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
      };
    } else {
      // If incorrect:
      // - Reset currentStreak to 0
      // - Keep longestStreak unchanged
      return {
        currentStreak: 0,
        longestStreak: sanitizedLongestStreak,
      };
    }
  }

  /**
   * Check if streak milestone reached (5, 10, 15, etc.)
   *
   * Milestones are celebrated at every multiple of 5. This can be used
   * to trigger special UI effects, unlock achievements, or show
   * congratulatory messages to the user.
   *
   * @param streak - Current streak value
   * @returns True if streak is a multiple of 5
   *
   * @example
   * ```typescript
   * streakManager.isMilestone(5);  // true
   * streakManager.isMilestone(10); // true
   * streakManager.isMilestone(7);  // false
   * streakManager.isMilestone(0);  // false
   * ```
   */
  isMilestone(streak: number): boolean {
    // Return true if streak is multiple of 5 and > 0
    return streak > 0 && streak % 5 === 0;
  }

  /**
   * Get streak performance level
   *
   * Categorizes the current streak into performance levels for UI display
   * and user feedback. Higher levels indicate better performance and can
   * be used to adjust visual feedback, Quizmaster tone, or rewards.
   *
   * Performance tiers:
   * - none: No active streak (0)
   * - good: Starting out (1-2)
   * - great: Building momentum (3-4)
   * - amazing: Strong performance (5-9)
   * - legendary: Elite status (10+)
   *
   * @param streak - Current streak value
   * @returns Performance level string
   *
   * @example
   * ```typescript
   * streakManager.getStreakLevel(0);  // 'none'
   * streakManager.getStreakLevel(2);  // 'good'
   * streakManager.getStreakLevel(4);  // 'great'
   * streakManager.getStreakLevel(7);  // 'amazing'
   * streakManager.getStreakLevel(15); // 'legendary'
   * ```
   */
  getStreakLevel(streak: number): 'none' | 'good' | 'great' | 'amazing' | 'legendary' {
    // Handle edge case: negative values are treated as 0
    const sanitizedStreak = Math.max(0, streak);

    // 0: 'none'
    if (sanitizedStreak === 0) {
      return 'none';
    }

    // 1-2: 'good'
    if (sanitizedStreak <= 2) {
      return 'good';
    }

    // 3-4: 'great'
    if (sanitizedStreak <= 4) {
      return 'great';
    }

    // 5-9: 'amazing'
    if (sanitizedStreak <= 9) {
      return 'amazing';
    }

    // 10+: 'legendary'
    return 'legendary';
  }
}

/**
 * Singleton instance of StreakManager
 *
 * Import and use this instance throughout your application:
 * ```typescript
 * import { streakManager } from '@quiz-app/shared/services';
 * const result = streakManager.updateStreak(5, 10, true);
 * ```
 */
export const streakManager = new StreakManager();
