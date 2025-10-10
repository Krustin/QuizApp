import { QuizCategory } from './Enums';

/**
 * SessionQuestion interface
 * Represents a single question within a quiz session with user's answer and metadata
 *
 * @property questionId - Reference to the Question.id
 * @property userAnswer - The answer text that the user selected
 * @property isCorrect - Whether the user's answer was correct
 * @property timeToAnswer - Time taken to answer in milliseconds
 * @property pointsEarned - Points earned for this question (10 if correct, 0 if wrong)
 */
export interface SessionQuestion {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeToAnswer: number;
  pointsEarned: number;
}

/**
 * QuizSession interface
 * Represents a complete quiz session (12 questions from one category)
 *
 * Sessions are stored locally using StorageService with key: @quiz_sessions
 * Each session consists of exactly 12 randomly selected questions from a category
 *
 * @property sessionId - Unique identifier for this session
 * @property userId - Reference to UserProfile.userId
 * @property categoryId - Which category was played
 * @property questions - Array of 12 SessionQuestion objects with answers and results
 * @property score - Number of correct answers (0-12)
 * @property pointsEarned - Total points earned in this session (score * 10)
 * @property startedAt - Timestamp when session began
 * @property completedAt - Timestamp when session was completed (undefined if in progress)
 * @property streakAtStart - User's streak value at the beginning of this session
 * @property streakAtEnd - User's streak value at the end of this session
 */
export interface QuizSession {
  sessionId: string;
  userId: string;
  categoryId: QuizCategory;
  questions: SessionQuestion[];
  score: number;
  pointsEarned: number;
  startedAt: Date;
  completedAt?: Date;
  streakAtStart: number;
  streakAtEnd: number;
}
