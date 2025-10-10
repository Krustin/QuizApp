/**
 * Question Selection Helpers
 * Functions for selecting and shuffling questions based on various criteria
 */

import type { Question } from '../../models/Question';
import { questionBank } from './questions';

/**
 * Get questions for a specific category with difficulty distribution
 * @param category - Category name (e.g., "Skurriles Wissen")
 * @param limit - Number of questions to return (default: 12)
 * @param excludeIds - Array of question IDs to exclude
 * @returns Array of shuffled questions with proper difficulty mix
 */
export function getQuestionsByCategory(
  category: string,
  limit: number = 12,
  excludeIds: string[] = []
): Question[] {
  const categoryQuestions = questionBank.filter(q =>
    q.category === category && !excludeIds.includes(q.id)
  );

  // Mix verschiedener Schwierigkeitsgrade
  const easy = categoryQuestions.filter(q => q.difficulty === "easy");
  const medium = categoryQuestions.filter(q => q.difficulty === "medium");
  const hard = categoryQuestions.filter(q => q.difficulty === "hard");

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
 * @param difficulty - "easy", "medium", or "hard"
 * @param limit - Number of questions to return
 * @returns Array of questions matching the difficulty
 */
export function getQuestionsByDifficulty(
  difficulty: "easy" | "medium" | "hard",
  limit: number = 12
): Question[] {
  const filtered = questionBank.filter(q => q.difficulty === difficulty);
  return shuffleArray(filtered).slice(0, limit);
}

/**
 * Get questions by tags
 * @param tags - Array of tags to filter by
 * @param limit - Number of questions to return
 * @returns Array of questions matching at least one tag
 */
export function getQuestionsByTags(
  tags: string[],
  limit: number = 12
): Question[] {
  const filtered = questionBank.filter(q =>
    q.tags.some(tag => tags.includes(tag))
  );
  return shuffleArray(filtered).slice(0, limit);
}

/**
 * Get all available categories
 * @returns Array of unique category names
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(questionBank.map(q => q.category)));
}

/**
 * Get count of questions per category
 * @returns Object mapping category names to question counts
 */
export function getCategoryStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  questionBank.forEach(q => {
    stats[q.category] = (stats[q.category] || 0) + 1;
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
