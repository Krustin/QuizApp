/**
 * QuestionSelector Service
 *
 * Handles question selection for quiz sessions.
 * Uses the new question bank with smart category-based selection.
 *
 * Key features:
 * - Smart question selection with difficulty distribution (50% easy, 30% medium, 20% hard)
 * - Exclude recently asked questions
 * - Options pre-shuffled in question bank
 * - Proper fallback handling for limited question pools
 */

import { Question, QuizCategory } from '../models';
import { getQuestionsByCategory, shuffleQuestionOptions } from '../data/questions';

/**
 * Service for selecting and shuffling quiz questions
 */
export class QuestionSelector {
  /**
   * Get random questions from a category with smart difficulty distribution
   *
   * Uses the new question bank helper with automatic difficulty mixing:
   * - 50% easy questions
   * - 30% medium questions
   * - 20% hard questions
   *
   * @param category - The quiz category to select questions from
   * @param count - Number of questions to select (default 12)
   * @param excludeIds - Optional array of question IDs to exclude (recently asked)
   * @returns Array of randomly selected questions with shuffled options
   * @throws Error if no questions are available for the category
   *
   * @example
   * ```typescript
   * // Get 12 random general questions
   * const questions = questionSelector.getRandomQuestions(QuizCategory.GENERAL);
   *
   * // Get 5 questions, excluding recently asked ones
   * const questions = questionSelector.getRandomQuestions(
   *   QuizCategory.GENERAL,
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
    // Map QuizCategory enum to category name string
    const categoryName = this.getCategoryName(category);

    // Use the new smart selection from question bank
    const selectedQuestions = getQuestionsByCategory(
      categoryName,
      count,
      excludeIds || []
    );

    // Throw error if no questions available
    if (selectedQuestions.length === 0) {
      throw new Error(
        `No questions available for category: ${category}${
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
   * Map QuizCategory enum to category name string
   * @private
   */
  private getCategoryName(category: QuizCategory): string {
    // For now, we'll use the category enum value directly
    // In the future, this could map to localized category names
    const categoryMap: Record<QuizCategory, string> = {
      [QuizCategory.GENERAL]: 'Skurriles Wissen', // Temporarily using Skurriles for demo
      [QuizCategory.HISTORY]: 'Geschichte',
      [QuizCategory.SCIENCE]: 'Wissenschaft & Alltag',
      [QuizCategory.GEOGRAPHY]: 'Allgemeinwissen',
      [QuizCategory.POP_CULTURE]: 'Popkultur',
      [QuizCategory.SPORTS]: 'Tiere',
      [QuizCategory.TECHNOLOGY]: 'Technik',
    };
    return categoryMap[category] || 'Skurriles Wissen';
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
