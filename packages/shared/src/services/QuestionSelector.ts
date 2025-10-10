/**
 * QuestionSelector Service
 *
 * Handles question selection and answer shuffling for quiz sessions.
 * Uses Fisher-Yates shuffle algorithm for true random distribution.
 *
 * Key features:
 * - Random question selection from categories
 * - Exclude recently asked questions
 * - Answer shuffling with correctness tracking
 * - Proper fallback handling for limited question pools
 */

import { Question, QuizCategory } from '../models';
import { loadQuestionsByCategory } from '../data/questions/questionLoader';

/**
 * Service for selecting and shuffling quiz questions
 */
export class QuestionSelector {
  /**
   * Get random questions from a category using Fisher-Yates shuffle
   *
   * Ensures true randomness by using the Fisher-Yates algorithm instead of
   * the unreliable Math.random() sort approach. Handles edge cases like
   * insufficient questions and excluded question IDs.
   *
   * @param category - The quiz category to select questions from
   * @param count - Number of questions to select (default 12)
   * @param excludeIds - Optional array of question IDs to exclude (recently asked)
   * @returns Array of randomly selected questions
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
    // 1. Load all questions for category using questionLoader
    let availableQuestions = loadQuestionsByCategory(category);

    // 2. Filter out excludeIds if provided
    if (excludeIds && excludeIds.length > 0) {
      availableQuestions = availableQuestions.filter(
        (question) => !excludeIds.includes(question.id)
      );
    }

    // 6. Throw error if no questions available
    if (availableQuestions.length === 0) {
      throw new Error(
        `No questions available for category: ${category}${
          excludeIds && excludeIds.length > 0
            ? ' (after excluding recently asked questions)'
            : ''
        }`
      );
    }

    // 3. If available questions < count, use all available
    const questionsToSelect = Math.min(count, availableQuestions.length);

    // 4. Apply Fisher-Yates shuffle algorithm
    // Create a copy to avoid mutating the original array
    const shuffled = [...availableQuestions];
    this.shuffle(shuffled);

    // 5. Return first 'count' questions
    return shuffled.slice(0, questionsToSelect);
  }

  /**
   * Fisher-Yates shuffle algorithm
   *
   * Provides unbiased shuffling by iterating from the end of the array
   * and swapping each element with a random element before it (or itself).
   * This ensures each permutation is equally likely.
   *
   * Time complexity: O(n)
   * Space complexity: O(1) - mutates in place
   *
   * @param array - Array to shuffle (mutates in place)
   * @returns The shuffled array (same reference as input)
   *
   * @private
   */
  private shuffle<T>(array: T[]): T[] {
    // for i from n−1 down to 1:
    for (let i = array.length - 1; i > 0; i--) {
      // j ← random integer such that 0 ≤ j ≤ i
      const j = Math.floor(Math.random() * (i + 1));

      // exchange a[j] and a[i]
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  /**
   * Shuffle answer options for a question (1 correct + 3 wrong)
   *
   * Takes a question's correct answer and wrong answers, combines them,
   * shuffles them randomly, and returns an array with correctness flags.
   * This ensures the correct answer doesn't always appear in the same position.
   *
   * @param question - Question with correctAnswer and wrongAnswers
   * @returns Array of 4 shuffled answers with isCorrect flag
   * @throws Error if question doesn't have exactly 3 wrong answers
   *
   * @example
   * ```typescript
   * const shuffledAnswers = questionSelector.shuffleAnswers(question);
   * // Returns: [
   * //   { text: "Paris", isCorrect: true },
   * //   { text: "London", isCorrect: false },
   * //   { text: "Berlin", isCorrect: false },
   * //   { text: "Madrid", isCorrect: false }
   * // ]
   * ```
   */
  shuffleAnswers(question: Question): Array<{ text: string; isCorrect: boolean }> {
    // Validate that we have exactly 3 wrong answers
    if (!question.wrongAnswers || question.wrongAnswers.length !== 3) {
      throw new Error(
        `Question ${question.id} must have exactly 3 wrong answers, got ${
          question.wrongAnswers?.length ?? 0
        }`
      );
    }

    // 1. Create array with correct answer + 3 wrong answers
    const answers = [
      { text: question.correctAnswer, isCorrect: true },
      ...question.wrongAnswers.map((text) => ({ text, isCorrect: false })),
    ];

    // 2. Shuffle using Fisher-Yates
    this.shuffle(answers);

    // 3. Return with isCorrect flag
    return answers;
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
