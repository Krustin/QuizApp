/**
 * Services Index
 * Central export point for all services used in the Quiz App
 *
 * Import services in your code like:
 * import { quizEngine, levelCalculator, questionSelector, streakManager } from '@quiz-app/shared/services';
 */

// Quiz Engine - Core quiz logic
export { QuizEngine, quizEngine } from './QuizEngine';

// Level Calculator - User progression
export { LevelCalculator, levelCalculator } from './LevelCalculator';

// Question Selector - Question selection and shuffling
export { QuestionSelector, questionSelector } from './QuestionSelector';

// Streak Manager - Answer streak tracking
export { StreakManager, streakManager } from './StreakManager';

// Storage Service - Data persistence interface
export type { StorageService } from './StorageService';
