/**
 * Question Loader Utility
 *
 * Loads quiz questions from JSON files based on category
 * Currently only GENERAL category has sample questions
 *
 * Usage:
 * import { loadQuestionsByCategory, getAllQuestions } from '@quiz-app/shared/data/questions/questionLoader';
 */

import { Question, QuizCategory, LegacyQuestion } from '../../models';
import generalSample from './general-sample.json';

/**
 * @deprecated Use getQuestionsByCategory from './helpers' instead
 * Legacy question loader - kept for backward compatibility only
 */
export const loadQuestionsByCategory = (category: QuizCategory): LegacyQuestion[] => {
  // For now, only GENERAL has questions
  if (category === QuizCategory.GENERAL) {
    return generalSample as LegacyQuestion[];
  }
  return [];
};

/**
 * @deprecated Use questionBank from './questions' instead
 * Load all available questions across all categories
 */
export const getAllQuestions = (): LegacyQuestion[] => {
  return generalSample as LegacyQuestion[];
};

/**
 * @deprecated Use getRandomQuestions from './helpers' instead
 */
export const getRandomQuestions = (category: QuizCategory, count: number): LegacyQuestion[] => {
  const questions = loadQuestionsByCategory(category);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
};

/**
 * @deprecated Use getQuestionsByDifficulty from './helpers' instead
 */
export const getQuestionsByDifficulty = (
  category: QuizCategory,
  difficulty: string
): LegacyQuestion[] => {
  const questions = loadQuestionsByCategory(category);
  return questions.filter(q => q.difficulty === difficulty);
};
