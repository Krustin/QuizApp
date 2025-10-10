import { QuizCategory, DifficultyLevel } from './Enums';

/**
 * Question interface
 * Represents a single quiz question with all its metadata
 *
 * Each question has exactly 4 answer options
 * Questions are stored as TypeScript files in packages/shared/data/questions/
 *
 * @property id - Unique identifier for the question (e.g., "skw_001", "wa_003")
 * @property question - The actual question text shown to user (in German)
 * @property options - Array of exactly 4 answer options (shuffled for display)
 * @property correctAnswer - Index of correct answer in options array (0-3)
 * @property explanation - Detailed explanation shown in encyclopedia
 * @property funFact - Optional additional interesting fact
 * @property category - Which quiz category this question belongs to (string format for now)
 * @property difficulty - Question difficulty level: "easy", "medium", or "hard"
 * @property tags - Array of topic tags for filtering (e.g., ["tiere", "biologie"])
 */
export interface Question {
  id: string;
  question: string;
  options: string[]; // Exactly 4 options
  correctAnswer: number; // Index 0-3
  explanation: string;
  funFact?: string;
  category: string; // Category name (will map to QuizCategory enum)
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

/**
 * Legacy Question interface for backward compatibility
 * @deprecated Use Question interface instead
 */
export interface LegacyQuestion {
  id: string;
  category: QuizCategory;
  difficulty: DifficultyLevel;
  questionText: string;
  correctAnswer: string;
  wrongAnswers: string[];
  tldr: string;
  funFact?: string;
  source?: string;
}
