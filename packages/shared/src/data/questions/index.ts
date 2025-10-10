/**
 * Questions Data Module
 * Centralized export for all question-related functionality
 */

export { questionBank, CATEGORY_NAMES } from './questions';
export {
  getQuestionsByCategory,
  getRandomQuestions,
  getQuestionsByDifficulty,
  getQuestionsByTags,
  getAllCategories,
  getCategoryStats,
  shuffleQuestionOptions,
  getQuestionById,
  getTotalQuestionCount
} from './helpers';

// Re-export legacy loader for backward compatibility
export * from './questionLoader';
