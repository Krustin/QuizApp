/**
 * Question Loader Utility
 *
 * Loads quiz questions from JSON files based on category
 * Currently only GENERAL category has sample questions
 *
 * Usage:
 * import { loadQuestionsByCategory, getAllQuestions } from '@quiz-app/shared/data/questions/questionLoader';
 */

import generalSample from './general-sample.json';
import { Question, QuizCategory } from '../../models';

/**
 * Load questions for a specific category
 * @param category - The quiz category to load questions for
 * @returns Array of questions for the specified category
 */
export const loadQuestionsByCategory = (category: QuizCategory): Question[] => {
  // For now, only GENERAL has questions
  if (category === QuizCategory.GENERAL) {
    return generalSample as Question[];
  }
  return [];
};

/**
 * Load all available questions across all categories
 * @returns Array of all questions
 */
export const getAllQuestions = (): Question[] => {
  return generalSample as Question[];
};

/**
 * Get a random subset of questions from a category
 * @param category - The quiz category
 * @param count - Number of questions to return
 * @returns Array of randomly selected questions
 */
export const getRandomQuestions = (category: QuizCategory, count: number): Question[] => {
  const questions = loadQuestionsByCategory(category);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
};

/**
 * Get questions filtered by difficulty
 * @param category - The quiz category
 * @param difficulty - The difficulty level to filter by
 * @returns Array of questions matching the difficulty
 */
export const getQuestionsByDifficulty = (
  category: QuizCategory,
  difficulty: string
): Question[] => {
  const questions = loadQuestionsByCategory(category);
  return questions.filter(q => q.difficulty === difficulty);
};
