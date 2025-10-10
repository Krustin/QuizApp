import { QuizCategory } from './Enums';
import type { Achievement } from './Achievement';

/**
 * UserProfile interface
 * Represents a user's profile and complete statistics
 *
 * Stored locally using StorageService with key: @quiz_user_profile
 * All stats are tracked cumulatively over the user's lifetime
 *
 * Leveling formula: Level = floor(totalPoints / 500) + 1
 * - Every 500 points earned = 1 level up
 * - Level 1 = 0-499 points, Level 2 = 500-999 points, etc.
 *
 * @property userId - Unique identifier for the user
 * @property username - Display name chosen by user
 * @property totalPoints - Cumulative points earned (10 points per correct answer)
 * @property currentLevel - Current level calculated from totalPoints
 * @property currentStreak - Current streak of consecutive correct answers
 * @property longestStreak - Best streak ever achieved
 * @property unlockedCategories - Array of categories user has access to (GENERAL always included)
 * @property achievements - Array of unlocked achievements
 * @property sessionsPlayed - Total number of quiz sessions completed
 * @property questionsAnswered - Total number of questions answered (correct + incorrect)
 * @property correctAnswers - Total number of questions answered correctly
 * @property createdAt - Date when user profile was created
 * @property lastPlayedAt - Date of most recent quiz session
 */
export interface UserProfile {
  userId: string;
  username: string;
  totalPoints: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  unlockedCategories: QuizCategory[];
  achievements: Achievement[];
  sessionsPlayed: number;
  questionsAnswered: number;
  correctAnswers: number;
  createdAt: Date;
  lastPlayedAt: Date;
}
