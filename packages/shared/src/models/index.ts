/**
 * Models Index
 * Central export point for all data models used in the Quiz App
 *
 * Import models in your code like:
 * import { Question, UserProfile, QuizSession } from '@quiz-app/shared/models';
 */

// Enums - exported first as other models depend on them
export * from './Enums';

// Core data models
export * from './Question';
export * from './User';
export * from './Session';
export * from './Encyclopedia';
export * from './Achievement';
export * from './Category';

// Helper functions (Phase 1 Migration)
export {
  getDifficultyLabel,
  getDifficultyFromString,
  getStringFromDifficulty,
  convertLegacyQuestion,
  convertToLegacyQuestion,
  validateQuestion,
} from './Question';

export {
  getCategoryDisplayName,
  CATEGORY_DISPLAY_NAMES,
} from './Enums';
