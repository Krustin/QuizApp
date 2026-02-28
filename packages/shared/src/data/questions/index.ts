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

// Phase 5: Legacy loader temporarily disabled (not compatible with new format)
// export * from './questionLoader';
