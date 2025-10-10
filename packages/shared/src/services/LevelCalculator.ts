/**
 * LevelCalculator Service
 *
 * Service for calculating user levels and progression based on total points.
 * Uses a simple formula where each level requires 500 points.
 *
 * Level progression:
 * - Level 1: 0-499 points
 * - Level 2: 500-999 points
 * - Level 3: 1000-1499 points
 * - Level N: (N-1)*500 to N*500-1 points
 */

/**
 * Service for calculating user levels and progression
 */
export class LevelCalculator {
  /**
   * Points required per level
   */
  private readonly POINTS_PER_LEVEL = 500;

  /**
   * Calculate user level based on total points
   *
   * Formula: level = floor(totalPoints / 500) + 1
   * Minimum level is always 1.
   *
   * @param totalPoints - User's total points
   * @returns Current level (minimum 1)
   *
   * @example
   * levelCalculator.calculateLevel(0);    // Returns 1
   * levelCalculator.calculateLevel(499);  // Returns 1
   * levelCalculator.calculateLevel(500);  // Returns 2
   * levelCalculator.calculateLevel(1250); // Returns 3
   */
  calculateLevel(totalPoints: number): number {
    // Handle edge cases
    if (totalPoints < 0) {
      return 1;
    }

    return Math.floor(totalPoints / this.POINTS_PER_LEVEL) + 1;
  }

  /**
   * Calculate points needed for next level
   *
   * Determines how many more points are needed to reach the next level.
   *
   * @param currentLevel - Current level
   * @param totalPoints - Current total points
   * @returns Points needed to reach next level (0 if at or above threshold)
   *
   * @example
   * levelCalculator.pointsToNextLevel(1, 250);  // Returns 250 (500 - 250)
   * levelCalculator.pointsToNextLevel(2, 800);  // Returns 200 (1000 - 800)
   * levelCalculator.pointsToNextLevel(3, 1500); // Returns 0 (already at level 3)
   */
  pointsToNextLevel(currentLevel: number, totalPoints: number): number {
    // Handle edge cases
    if (currentLevel < 1) {
      currentLevel = 1;
    }
    if (totalPoints < 0) {
      totalPoints = 0;
    }

    const nextLevelThreshold = currentLevel * this.POINTS_PER_LEVEL;
    const pointsNeeded = nextLevelThreshold - totalPoints;

    return Math.max(0, pointsNeeded);
  }

  /**
   * Calculate progress percentage to next level
   *
   * Returns a percentage (0-100) indicating progress within the current level.
   *
   * @param currentLevel - Current level
   * @param totalPoints - Current total points
   * @returns Progress percentage (0-100)
   *
   * @example
   * levelCalculator.progressToNextLevel(1, 0);    // Returns 0
   * levelCalculator.progressToNextLevel(1, 250);  // Returns 50
   * levelCalculator.progressToNextLevel(1, 499);  // Returns 99.8
   * levelCalculator.progressToNextLevel(2, 500);  // Returns 0
   * levelCalculator.progressToNextLevel(2, 750);  // Returns 50
   */
  progressToNextLevel(currentLevel: number, totalPoints: number): number {
    // Handle edge cases
    if (currentLevel < 1) {
      currentLevel = 1;
    }
    if (totalPoints < 0) {
      totalPoints = 0;
    }

    // Calculate the current level's range
    const currentLevelStartPoints = (currentLevel - 1) * this.POINTS_PER_LEVEL;
    const nextLevelStartPoints = currentLevel * this.POINTS_PER_LEVEL;

    // If totalPoints is less than current level start, user is actually in a lower level
    if (totalPoints < currentLevelStartPoints) {
      return 0;
    }

    // If totalPoints is at or above next level, return 100
    if (totalPoints >= nextLevelStartPoints) {
      return 100;
    }

    // Calculate progress within the current level
    const pointsInCurrentLevel = totalPoints - currentLevelStartPoints;
    const totalPointsInLevel = this.POINTS_PER_LEVEL;
    const progress = (pointsInCurrentLevel / totalPointsInLevel) * 100;

    // Ensure result is between 0 and 100
    return Math.min(100, Math.max(0, progress));
  }

  /**
   * Check if user leveled up
   *
   * Compares the level before and after a points change to determine
   * if the user has advanced to a new level.
   *
   * @param previousPoints - Points before session
   * @param newPoints - Points after session
   * @returns True if level increased, false otherwise
   *
   * @example
   * levelCalculator.didLevelUp(400, 600);  // Returns true (1 -> 2)
   * levelCalculator.didLevelUp(400, 450);  // Returns false (both level 1)
   * levelCalculator.didLevelUp(500, 1000); // Returns true (2 -> 3)
   */
  didLevelUp(previousPoints: number, newPoints: number): boolean {
    const previousLevel = this.calculateLevel(previousPoints);
    const newLevel = this.calculateLevel(newPoints);

    return newLevel > previousLevel;
  }

  /**
   * Get total points required for a level
   *
   * Returns the minimum number of points needed to reach a specific level.
   *
   * @param level - Target level
   * @returns Total points needed to reach level
   *
   * @example
   * levelCalculator.getPointsForLevel(1);  // Returns 0
   * levelCalculator.getPointsForLevel(2);  // Returns 500
   * levelCalculator.getPointsForLevel(5);  // Returns 2000
   * levelCalculator.getPointsForLevel(10); // Returns 4500
   */
  getPointsForLevel(level: number): number {
    // Handle edge cases
    if (level < 1) {
      return 0;
    }

    // Level 1 requires 0 points
    // Level 2 requires 500 points
    // Level N requires (N-1) * 500 points
    return (level - 1) * this.POINTS_PER_LEVEL;
  }
}

/**
 * Singleton instance of LevelCalculator
 * Use this exported instance throughout the app for consistency
 *
 * @example
 * import { levelCalculator } from '@quiz-app/shared/services';
 * const level = levelCalculator.calculateLevel(1250); // Returns 3
 */
export const levelCalculator = new LevelCalculator();
