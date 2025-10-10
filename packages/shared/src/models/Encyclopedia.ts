import { QuizCategory } from './Enums';

/**
 * EncyclopediaEntry interface
 * Represents a knowledge entry unlocked when user answers a question correctly
 *
 * Encyclopedia entries are automatically created when a user answers a question correctly
 * Stored locally using StorageService with key: @quiz_encyclopedia
 * Each question can only generate one encyclopedia entry (no duplicates)
 *
 * @property entryId - Unique identifier for this encyclopedia entry
 * @property questionId - Reference to the original Question.id
 * @property questionText - The question text (copied from Question for quick display)
 * @property correctAnswer - The correct answer (copied from Question)
 * @property tldr - Explanation/encyclopedia text (copied from Question.tldr)
 * @property funFact - Optional fun fact (copied from Question.funFact)
 * @property category - Which category this entry belongs to
 * @property unlockedAt - Timestamp when this entry was unlocked (when user answered correctly)
 */
export interface EncyclopediaEntry {
  entryId: string;
  questionId: string;
  questionText: string;
  correctAnswer: string;
  tldr: string;
  funFact?: string;
  category: QuizCategory;
  unlockedAt: Date;
}
