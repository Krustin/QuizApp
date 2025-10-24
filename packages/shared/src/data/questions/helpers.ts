/**
 * Question Selection Helpers - UPDATED (Phase 3)
 * Functions for selecting and shuffling questions based on various criteria
 * Supports new question format with categoryId and numeric difficulty (1-5)
 */

import type { Question } from '../../models/Question';
import { questionBank } from './questions';
import { getCategoryDisplayName } from '../../models';

/**
 * Get questions for a specific category with difficulty distribution
 * UPDATED (Phase 3): Now supports both categoryId and display name for backward compatibility
 *
 * @param category - Category ID or display name (e.g., "SKURRILES_FUER_AHNUNGSLOSE_SURREAL" or "Skurriles Wissen")
 * @param limit - Number of questions to return (default: 12)
 * @param excludeIds - Array of question IDs to exclude
 * @returns Array of shuffled questions with proper difficulty mix
 */
export function getQuestionsByCategory(
  category: string,
  limit: number = 12,
  excludeIds: string[] = []
): Question[] {
  // Phase 3: Support both categoryId and display name
  const categoryQuestions = questionBank.filter(q => {
    const matchesId = q.categoryId === category;
    const displayName = getCategoryDisplayName(q.categoryId);
    const matchesDisplayName = displayName === category;
    return (matchesId || matchesDisplayName) && !excludeIds.includes(q.id);
  });

  // Phase 3: Updated difficulty filtering for 1-5 scale
  // Map difficulty ranges: 1-2=easy, 3=medium, 4-5=hard
  const easy = categoryQuestions.filter(q => q.difficulty <= 2);
  const medium = categoryQuestions.filter(q => q.difficulty === 3);
  const hard = categoryQuestions.filter(q => q.difficulty >= 4);

  const selected: Question[] = [];

  // 50% easy, 30% medium, 20% hard
  const easyCount = Math.ceil(limit * 0.5);
  const mediumCount = Math.ceil(limit * 0.3);
  const hardCount = limit - easyCount - mediumCount;

  selected.push(...shuffleArray(easy).slice(0, Math.min(easyCount, easy.length)));
  selected.push(...shuffleArray(medium).slice(0, Math.min(mediumCount, medium.length)));
  selected.push(...shuffleArray(hard).slice(0, Math.min(hardCount, hard.length)));

  // Falls nicht genug Fragen vorhanden, mit verfügbaren auffüllen
  while (selected.length < limit && categoryQuestions.length > selected.length) {
    const remaining = categoryQuestions.filter(q => !selected.some(s => s.id === q.id));
    if (remaining.length === 0) break;
    selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  return shuffleArray(selected).slice(0, limit);
}

/**
 * Get random questions from all categories
 * @param limit - Number of questions to return (default: 12)
 * @param excludeIds - Array of question IDs to exclude
 * @returns Array of shuffled random questions
 */
export function getRandomQuestions(
  limit: number = 12,
  excludeIds: string[] = []
): Question[] {
  const availableQuestions = questionBank.filter(q => !excludeIds.includes(q.id));
  return shuffleArray(availableQuestions).slice(0, limit);
}

/**
 * Get questions by difficulty level
 * UPDATED (Phase 3): Supports both string labels and numeric 1-5 scale
 * @param difficulty - "easy", "medium", "hard" OR 1-5 numeric
 * @param limit - Number of questions to return
 * @returns Array of questions matching the difficulty
 */
export function getQuestionsByDifficulty(
  difficulty: "easy" | "medium" | "hard" | 1 | 2 | 3 | 4 | 5,
  limit: number = 12
): Question[] {
  let filtered: Question[];

  if (typeof difficulty === 'string') {
    // String-based filtering with 1-5 mapping
    if (difficulty === 'easy') {
      filtered = questionBank.filter(q => q.difficulty <= 2);
    } else if (difficulty === 'medium') {
      filtered = questionBank.filter(q => q.difficulty === 3);
    } else { // 'hard'
      filtered = questionBank.filter(q => q.difficulty >= 4);
    }
  } else {
    // Numeric filtering (1-5)
    filtered = questionBank.filter(q => q.difficulty === difficulty);
  }

  return shuffleArray(filtered).slice(0, limit);
}

/**
 * Get questions by tags
 * UPDATED (Phase 3): Handles optional tags field
 * @param tags - Array of tags to filter by
 * @param limit - Number of questions to return
 * @returns Array of questions matching at least one tag
 */
export function getQuestionsByTags(
  tags: string[],
  limit: number = 12
): Question[] {
  const filtered = questionBank.filter(q =>
    q.tags && q.tags.some(tag => tags.includes(tag))
  );
  return shuffleArray(filtered).slice(0, limit);
}

/**
 * Get all available categories
 * UPDATED (Phase 3): Uses categoryId from new format
 * @returns Array of unique category IDs
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(questionBank.map(q => q.categoryId)));
}

/**
 * Get count of questions per category
 * UPDATED (Phase 3): Uses categoryId from new format
 * @returns Object mapping category IDs to question counts
 */
export function getCategoryStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  questionBank.forEach(q => {
    stats[q.categoryId] = (stats[q.categoryId] || 0) + 1;
  });
  return stats;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns New shuffled array (does not mutate original)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle the options array for a question
 * Returns a new question with shuffled options and updated correctAnswer index
 * @param question - Question to shuffle
 * @returns New question with shuffled options
 */
export function shuffleQuestionOptions(question: Question): Question {
  const correctAnswerText = question.options[question.correctAnswer];
  const shuffled = shuffleArray(question.options);
  const newCorrectIndex = shuffled.indexOf(correctAnswerText);

  return {
    ...question,
    options: shuffled,
    correctAnswer: newCorrectIndex
  };
}

/**
 * Get a question by ID
 * @param id - Question ID
 * @returns Question or undefined if not found
 */
export function getQuestionById(id: string): Question | undefined {
  return questionBank.find(q => q.id === id);
}

/**
 * Get total count of questions
 * @returns Total number of questions in the bank
 */
export function getTotalQuestionCount(): number {
  return questionBank.length;
}
