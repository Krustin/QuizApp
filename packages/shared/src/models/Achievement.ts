import { AchievementType } from './Enums';

/**
 * Achievement interface
 * Represents a user achievement or milestone
 *
 * Achievements are unlocked when users reach specific milestones
 * such as completing first quiz, reaching level 10, etc.
 *
 * @property achievementId - Unique identifier (typically an AchievementType value)
 * @property title - Display title of the achievement (in German)
 * @property description - Description of what the achievement is for (in German)
 * @property icon - Icon identifier or emoji to represent the achievement
 * @property unlockedAt - Date when achievement was unlocked (undefined if not yet unlocked)
 */
export interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}
