import { QuizCategory, DifficultyLevel } from './Enums';

/**
 * Question interface
 * Represents a single quiz question with all its metadata
 *
 * Each question has exactly 4 answers: 1 correct and 3 wrong
 * Questions are stored as JSON files in packages/shared/data/questions/
 *
 * @property id - Unique identifier for the question
 * @property category - Which quiz category this question belongs to
 * @property difficulty - Question difficulty level (affects Quizmaster tone)
 * @property questionText - The actual question text shown to user (in German)
 * @property correctAnswer - The correct answer text
 * @property wrongAnswers - Array of exactly 3 incorrect answer options
 * @property tldr - Encyclopedia explanation (shown after correct answer)
 * @property funFact - Optional additional interesting fact
 * @property source - Optional source URL or reference for the question
 */
export interface Question {
  id: string;
  category: QuizCategory;
  difficulty: DifficultyLevel;
  questionText: string;
  correctAnswer: string;
  wrongAnswers: string[]; // Exactly 3 wrong answers
  tldr: string;
  funFact?: string;
  source?: string;
}
