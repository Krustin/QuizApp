/**
 * QuestionSelector Service - UPDATED (Phase 2)
 *
 * Handles question selection for quiz sessions.
 * Uses the new question bank with category ID-based selection.
 *
 * Key features:
 * - Works with categoryId instead of display names
 * - Supports both 3 and 4 option questions
 * - Smart difficulty distribution (1-5 scale)
 * - Exclude recently asked questions
 * - Proper fallback handling for limited question pools
 */

import type { Question } from '../models';
import { QuizCategory, getCategoryDisplayName } from '../models';
import { getQuestionsByCategory, shuffleQuestionOptions } from '../data/questions';

/**
 * Service for selecting and shuffling quiz questions
 */
export class QuestionSelector {
  /**
   * Get random questions from a category with smart difficulty distribution
   *
   * UPDATED (Phase 2): Now works with categoryId instead of display names
   * Supports both 3 and 4 option questions
   * Handles 1-5 difficulty scale
   *
   * @param category - The quiz category to select questions from (enum value is the categoryId)
   * @param count - Number of questions to select (default 12)
   * @param excludeIds - Optional array of question IDs to exclude (recently asked)
   * @returns Array of randomly selected questions with shuffled options
   * @throws Error if no questions are available for the category
   *
   * @example
   * ```typescript
   * // Get 12 random questions from skurriles category
   * const questions = questionSelector.getRandomQuestions(QuizCategory.SKURRILES_SURREAL);
   *
   * // Get 5 questions, excluding recently asked ones
   * const questions = questionSelector.getRandomQuestions(
   *   QuizCategory.WISSENSCHAFT_SURREAL,
   *   5,
   *   ['q1', 'q2', 'q3']
   * );
   * ```
   */
  getRandomQuestions(
    category: QuizCategory,
    count: number = 12,
    excludeIds?: string[]
  ): Question[] {
    // Phase 2: Use categoryId directly (enum value is the categoryId)
    // For backward compatibility, also try display name lookup
    const categoryId = category; // Enum value IS the categoryId now
    const categoryDisplayName = getCategoryDisplayName(categoryId);

    // Try with categoryId first, then fall back to display name for legacy questions
    let selectedQuestions = getQuestionsByCategory(
      categoryId,
      count,
      excludeIds || []
    );

    // Fallback: try with display name if no questions found with ID
    if (selectedQuestions.length === 0) {
      selectedQuestions = getQuestionsByCategory(
        categoryDisplayName,
        count,
        excludeIds || []
      );
    }

    // Throw error if still no questions available
    if (selectedQuestions.length === 0) {
      throw new Error(
        `No questions available for category: ${categoryDisplayName} (${category})${
          excludeIds && excludeIds.length > 0
            ? ' (after excluding recently asked questions)'
            : ''
        }`
      );
    }

    // Shuffle options for each question to randomize answer positions
    return selectedQuestions.map(q => shuffleQuestionOptions(q));
  }

  /**
   * Get category display name for UI
   * @param category - The quiz category enum
   * @returns User-friendly display name in German
   */
  getCategoryDisplayName(category: QuizCategory): string {
    return getCategoryDisplayName(category);
  }

}

/**
 * Singleton instance of QuestionSelector
 *
 * Import and use this instance throughout your application:
 * ```typescript
 * import { questionSelector } from '@quiz-app/shared/services';
 * const questions = questionSelector.getRandomQuestions(QuizCategory.GENERAL);
 * ```
 */
export const questionSelector = new QuestionSelector();
