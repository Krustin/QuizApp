import { QuizCategory } from './Enums';

/**
 * CategoryAccess interface
 * Represents a user's access status and statistics for a specific quiz category
 *
 * Stored locally using StorageService with key: @quiz_category_access
 * GENERAL category is unlocked by default for all users
 * Other categories require in-app purchase (€2.99 each, or €9.99 bundle)
 *
 * @property categoryId - Which category this access record is for
 * @property isUnlocked - Whether the user has access to this category
 * @property purchasedAt - Timestamp when category was purchased (undefined if free or not purchased)
 * @property questionsAnswered - Total number of questions answered in this category
 * @property correctAnswers - Total number of questions answered correctly in this category
 */
export interface CategoryAccess {
  categoryId: QuizCategory;
  isUnlocked: boolean;
  purchasedAt?: Date;
  questionsAnswered: number;
  correctAnswers: number;
}
