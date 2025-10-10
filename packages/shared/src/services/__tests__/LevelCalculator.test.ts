/**
 * LevelCalculator Service Tests
 *
 * Comprehensive test suite for LevelCalculator service.
 * Tests level calculation, progression tracking, and point thresholds.
 */

import { LevelCalculator } from '../LevelCalculator';

describe('LevelCalculator', () => {
  let levelCalculator: LevelCalculator;

  beforeEach(() => {
    levelCalculator = new LevelCalculator();
  });

  describe('calculateLevel', () => {
    it('should return level 1 for 0-499 points', () => {
      expect(levelCalculator.calculateLevel(0)).toBe(1);
      expect(levelCalculator.calculateLevel(250)).toBe(1);
      expect(levelCalculator.calculateLevel(499)).toBe(1);
    });

    it('should return level 2 for 500-999 points', () => {
      expect(levelCalculator.calculateLevel(500)).toBe(2);
      expect(levelCalculator.calculateLevel(750)).toBe(2);
      expect(levelCalculator.calculateLevel(999)).toBe(2);
    });

    it('should return level 3 for 1000-1499 points', () => {
      expect(levelCalculator.calculateLevel(1000)).toBe(3);
      expect(levelCalculator.calculateLevel(1250)).toBe(3);
      expect(levelCalculator.calculateLevel(1499)).toBe(3);
    });

    it('should handle large point values', () => {
      expect(levelCalculator.calculateLevel(10000)).toBe(21);
      expect(levelCalculator.calculateLevel(25000)).toBe(51);
      expect(levelCalculator.calculateLevel(50000)).toBe(101);
    });

    it('should return minimum level 1 for negative points', () => {
      expect(levelCalculator.calculateLevel(-100)).toBe(1);
      expect(levelCalculator.calculateLevel(-500)).toBe(1);
      expect(levelCalculator.calculateLevel(-1)).toBe(1);
    });

    it('should follow formula floor(points / 500) + 1', () => {
      const testCases = [
        { points: 0, expectedLevel: 1 },
        { points: 499, expectedLevel: 1 },
        { points: 500, expectedLevel: 2 },
        { points: 999, expectedLevel: 2 },
        { points: 1000, expectedLevel: 3 },
        { points: 1500, expectedLevel: 4 },
        { points: 2000, expectedLevel: 5 },
        { points: 4500, expectedLevel: 10 },
      ];

      testCases.forEach(({ points, expectedLevel }) => {
        expect(levelCalculator.calculateLevel(points)).toBe(expectedLevel);
      });
    });

    it('should handle exact level thresholds', () => {
      expect(levelCalculator.calculateLevel(0)).toBe(1);
      expect(levelCalculator.calculateLevel(500)).toBe(2);
      expect(levelCalculator.calculateLevel(1000)).toBe(3);
      expect(levelCalculator.calculateLevel(1500)).toBe(4);
      expect(levelCalculator.calculateLevel(2000)).toBe(5);
    });

    it('should handle points just below thresholds', () => {
      expect(levelCalculator.calculateLevel(499)).toBe(1);
      expect(levelCalculator.calculateLevel(999)).toBe(2);
      expect(levelCalculator.calculateLevel(1499)).toBe(3);
      expect(levelCalculator.calculateLevel(1999)).toBe(4);
    });
  });

  describe('pointsToNextLevel', () => {
    it('should calculate points needed correctly from level 1', () => {
      expect(levelCalculator.pointsToNextLevel(1, 0)).toBe(500);
      expect(levelCalculator.pointsToNextLevel(1, 250)).toBe(250);
      expect(levelCalculator.pointsToNextLevel(1, 499)).toBe(1);
    });

    it('should calculate points needed correctly from level 2', () => {
      expect(levelCalculator.pointsToNextLevel(2, 500)).toBe(500);
      expect(levelCalculator.pointsToNextLevel(2, 750)).toBe(250);
      expect(levelCalculator.pointsToNextLevel(2, 999)).toBe(1);
    });

    it('should return 0 if at level threshold', () => {
      // At exact threshold means ready for next level
      expect(levelCalculator.pointsToNextLevel(2, 1000)).toBe(0);
      expect(levelCalculator.pointsToNextLevel(3, 1500)).toBe(0);
    });

    it('should handle negative current points', () => {
      expect(levelCalculator.pointsToNextLevel(1, -100)).toBe(500);
    });

    it('should handle level 1 with various point values', () => {
      expect(levelCalculator.pointsToNextLevel(1, 0)).toBe(500);
      expect(levelCalculator.pointsToNextLevel(1, 100)).toBe(400);
      expect(levelCalculator.pointsToNextLevel(1, 250)).toBe(250);
      expect(levelCalculator.pointsToNextLevel(1, 450)).toBe(50);
    });

    it('should work for high levels', () => {
      expect(levelCalculator.pointsToNextLevel(10, 4500)).toBe(500);
      expect(levelCalculator.pointsToNextLevel(10, 4750)).toBe(250);
      expect(levelCalculator.pointsToNextLevel(20, 9500)).toBe(500);
    });

    it('should handle edge case of level below 1', () => {
      expect(levelCalculator.pointsToNextLevel(0, 0)).toBe(500);
      expect(levelCalculator.pointsToNextLevel(-1, 0)).toBe(500);
    });

    it('should calculate correctly when points exceed current level', () => {
      // If you have 1000 points but pass level 2, it should still calculate correctly
      expect(levelCalculator.pointsToNextLevel(2, 1000)).toBe(0);
    });
  });

  describe('progressToNextLevel', () => {
    it('should return 0 at level start', () => {
      expect(levelCalculator.progressToNextLevel(1, 0)).toBe(0);
      expect(levelCalculator.progressToNextLevel(2, 500)).toBe(0);
      expect(levelCalculator.progressToNextLevel(3, 1000)).toBe(0);
    });

    it('should return ~50 at level midpoint', () => {
      expect(levelCalculator.progressToNextLevel(1, 250)).toBe(50);
      expect(levelCalculator.progressToNextLevel(2, 750)).toBe(50);
      expect(levelCalculator.progressToNextLevel(3, 1250)).toBe(50);
    });

    it('should return ~100 near level end', () => {
      // Just before next level threshold
      expect(levelCalculator.progressToNextLevel(1, 499)).toBeCloseTo(99.8, 1);
      expect(levelCalculator.progressToNextLevel(2, 999)).toBeCloseTo(99.8, 1);
    });

    it('should return 100 at level threshold', () => {
      expect(levelCalculator.progressToNextLevel(1, 500)).toBe(100);
      expect(levelCalculator.progressToNextLevel(2, 1000)).toBe(100);
    });

    it('should return percentage between 0-100', () => {
      const testCases = [
        { level: 1, points: 0 },
        { level: 1, points: 100 },
        { level: 1, points: 250 },
        { level: 1, points: 400 },
        { level: 1, points: 499 },
        { level: 2, points: 500 },
        { level: 2, points: 750 },
        { level: 3, points: 1250 },
      ];

      testCases.forEach(({ level, points }) => {
        const progress = levelCalculator.progressToNextLevel(level, points);
        expect(progress).toBeGreaterThanOrEqual(0);
        expect(progress).toBeLessThanOrEqual(100);
      });
    });

    it('should handle negative points', () => {
      expect(levelCalculator.progressToNextLevel(1, -100)).toBe(0);
    });

    it('should handle negative level', () => {
      expect(levelCalculator.progressToNextLevel(-1, 100)).toBeGreaterThanOrEqual(0);
      expect(levelCalculator.progressToNextLevel(-1, 100)).toBeLessThanOrEqual(100);
    });

    it('should calculate progress correctly for various scenarios', () => {
      // Level 1: 0-499 points
      expect(levelCalculator.progressToNextLevel(1, 0)).toBe(0);
      expect(levelCalculator.progressToNextLevel(1, 125)).toBe(25);
      expect(levelCalculator.progressToNextLevel(1, 250)).toBe(50);
      expect(levelCalculator.progressToNextLevel(1, 375)).toBe(75);

      // Level 2: 500-999 points
      expect(levelCalculator.progressToNextLevel(2, 500)).toBe(0);
      expect(levelCalculator.progressToNextLevel(2, 625)).toBe(25);
      expect(levelCalculator.progressToNextLevel(2, 750)).toBe(50);
      expect(levelCalculator.progressToNextLevel(2, 875)).toBe(75);
    });

    it('should return 0 if points are less than current level start', () => {
      // Edge case: if somehow points don't match the level
      expect(levelCalculator.progressToNextLevel(2, 100)).toBe(0);
      expect(levelCalculator.progressToNextLevel(3, 400)).toBe(0);
    });

    it('should cap at 100 if points exceed next level', () => {
      expect(levelCalculator.progressToNextLevel(1, 600)).toBe(100);
      expect(levelCalculator.progressToNextLevel(2, 1100)).toBe(100);
    });
  });

  describe('didLevelUp', () => {
    it('should return true when crossing threshold from level 1 to 2', () => {
      expect(levelCalculator.didLevelUp(499, 500)).toBe(true);
      expect(levelCalculator.didLevelUp(400, 600)).toBe(true);
      expect(levelCalculator.didLevelUp(0, 500)).toBe(true);
    });

    it('should return false when staying in level 1', () => {
      expect(levelCalculator.didLevelUp(100, 200)).toBe(false);
      expect(levelCalculator.didLevelUp(0, 499)).toBe(false);
      expect(levelCalculator.didLevelUp(250, 450)).toBe(false);
    });

    it('should return true when crossing from level 2 to 3', () => {
      expect(levelCalculator.didLevelUp(500, 1000)).toBe(true);
      expect(levelCalculator.didLevelUp(999, 1000)).toBe(true);
      expect(levelCalculator.didLevelUp(750, 1250)).toBe(true);
    });

    it('should return false when staying in level 2', () => {
      expect(levelCalculator.didLevelUp(500, 999)).toBe(false);
      expect(levelCalculator.didLevelUp(600, 800)).toBe(false);
    });

    it('should handle multiple level jumps', () => {
      expect(levelCalculator.didLevelUp(0, 1000)).toBe(true); // Jump from 1 to 3
      expect(levelCalculator.didLevelUp(100, 1500)).toBe(true); // Jump from 1 to 4
      expect(levelCalculator.didLevelUp(500, 2500)).toBe(true); // Jump from 2 to 6
    });

    it('should return false when points decrease', () => {
      expect(levelCalculator.didLevelUp(1000, 500)).toBe(false);
      expect(levelCalculator.didLevelUp(500, 0)).toBe(false);
    });

    it('should return false when points stay the same', () => {
      expect(levelCalculator.didLevelUp(500, 500)).toBe(false);
      expect(levelCalculator.didLevelUp(1000, 1000)).toBe(false);
    });

    it('should handle negative old points', () => {
      expect(levelCalculator.didLevelUp(-100, 500)).toBe(true);
      expect(levelCalculator.didLevelUp(-100, 100)).toBe(false);
    });

    it('should handle negative new points', () => {
      expect(levelCalculator.didLevelUp(100, -100)).toBe(false);
    });

    it('should work for high levels', () => {
      expect(levelCalculator.didLevelUp(4999, 5000)).toBe(true); // Level 10 to 11
      expect(levelCalculator.didLevelUp(9999, 10000)).toBe(true); // Level 20 to 21
    });
  });

  describe('getPointsForLevel', () => {
    it('should return 0 for level 1', () => {
      expect(levelCalculator.getPointsForLevel(1)).toBe(0);
    });

    it('should return 500 for level 2', () => {
      expect(levelCalculator.getPointsForLevel(2)).toBe(500);
    });

    it('should return 1000 for level 3', () => {
      expect(levelCalculator.getPointsForLevel(3)).toBe(1000);
    });

    it('should return 1500 for level 4', () => {
      expect(levelCalculator.getPointsForLevel(4)).toBe(1500);
    });

    it('should follow formula (level - 1) * 500', () => {
      expect(levelCalculator.getPointsForLevel(5)).toBe(2000);
      expect(levelCalculator.getPointsForLevel(10)).toBe(4500);
      expect(levelCalculator.getPointsForLevel(20)).toBe(9500);
      expect(levelCalculator.getPointsForLevel(50)).toBe(24500);
    });

    it('should handle level 0 or below', () => {
      expect(levelCalculator.getPointsForLevel(0)).toBe(0);
      expect(levelCalculator.getPointsForLevel(-1)).toBe(0);
      expect(levelCalculator.getPointsForLevel(-10)).toBe(0);
    });

    it('should work for high levels', () => {
      expect(levelCalculator.getPointsForLevel(100)).toBe(49500);
      expect(levelCalculator.getPointsForLevel(1000)).toBe(499500);
    });

    it('should match calculateLevel inverse relationship', () => {
      // If getPointsForLevel(N) returns X, then calculateLevel(X) should return N
      const levels = [1, 2, 3, 4, 5, 10, 20, 50];

      levels.forEach(level => {
        const points = levelCalculator.getPointsForLevel(level);
        const calculatedLevel = levelCalculator.calculateLevel(points);
        expect(calculatedLevel).toBe(level);
      });
    });
  });

  describe('integration scenarios', () => {
    it('should track progression through multiple levels', () => {
      let points = 0;

      // Start at level 1
      expect(levelCalculator.calculateLevel(points)).toBe(1);
      expect(levelCalculator.progressToNextLevel(1, points)).toBe(0);

      // Earn 250 points (50% through level 1)
      points = 250;
      expect(levelCalculator.calculateLevel(points)).toBe(1);
      expect(levelCalculator.progressToNextLevel(1, points)).toBe(50);
      expect(levelCalculator.pointsToNextLevel(1, points)).toBe(250);

      // Level up to 2
      points = 500;
      expect(levelCalculator.didLevelUp(250, points)).toBe(true);
      expect(levelCalculator.calculateLevel(points)).toBe(2);
      expect(levelCalculator.progressToNextLevel(2, points)).toBe(0);

      // Progress through level 2
      points = 750;
      expect(levelCalculator.calculateLevel(points)).toBe(2);
      expect(levelCalculator.progressToNextLevel(2, points)).toBe(50);

      // Level up to 3
      points = 1000;
      expect(levelCalculator.didLevelUp(750, points)).toBe(true);
      expect(levelCalculator.calculateLevel(points)).toBe(3);
    });

    it('should handle quiz session point additions', () => {
      let totalPoints = 450; // Near end of level 1

      expect(levelCalculator.calculateLevel(totalPoints)).toBe(1);
      expect(levelCalculator.pointsToNextLevel(1, totalPoints)).toBe(50);

      // Complete quiz with 8/12 correct = 80 points
      const oldPoints = totalPoints;
      totalPoints += 80; // Now 530

      expect(levelCalculator.didLevelUp(oldPoints, totalPoints)).toBe(true);
      expect(levelCalculator.calculateLevel(totalPoints)).toBe(2);
      expect(levelCalculator.progressToNextLevel(2, totalPoints)).toBe(6);
    });

    it('should verify level thresholds are consistent', () => {
      for (let level = 1; level <= 20; level++) {
        const minPoints = levelCalculator.getPointsForLevel(level);
        const maxPoints = levelCalculator.getPointsForLevel(level + 1) - 1;

        // Check minimum points give correct level
        expect(levelCalculator.calculateLevel(minPoints)).toBe(level);

        // Check maximum points give correct level
        if (level > 1) {
          expect(levelCalculator.calculateLevel(maxPoints)).toBe(level);
        }

        // Check progress at start is 0
        expect(levelCalculator.progressToNextLevel(level, minPoints)).toBe(0);

        // Check points needed at start equals POINTS_PER_LEVEL (500)
        expect(levelCalculator.pointsToNextLevel(level, minPoints)).toBe(500);
      }
    });

    it('should handle complete user journey', () => {
      const sessions = [
        { correct: 8, points: 80 },
        { correct: 10, points: 100 },
        { correct: 7, points: 70 },
        { correct: 12, points: 120 },
        { correct: 9, points: 90 },
      ];

      let totalPoints = 0;
      let currentLevel = 1;

      sessions.forEach((session, index) => {
        const oldPoints = totalPoints;
        totalPoints += session.points;

        const newLevel = levelCalculator.calculateLevel(totalPoints);
        const leveledUp = levelCalculator.didLevelUp(oldPoints, totalPoints);

        if (leveledUp) {
          currentLevel = newLevel;
        }

        const progress = levelCalculator.progressToNextLevel(currentLevel, totalPoints);
        const pointsNeeded = levelCalculator.pointsToNextLevel(currentLevel, totalPoints);

        // All values should be valid
        expect(newLevel).toBeGreaterThanOrEqual(1);
        expect(progress).toBeGreaterThanOrEqual(0);
        expect(progress).toBeLessThanOrEqual(100);
        expect(pointsNeeded).toBeGreaterThanOrEqual(0);
      });

      // Final check: 460 total points should be level 1, near the end
      expect(totalPoints).toBe(460);
      expect(levelCalculator.calculateLevel(totalPoints)).toBe(1);
      expect(levelCalculator.progressToNextLevel(1, totalPoints)).toBe(92);
      expect(levelCalculator.pointsToNextLevel(1, totalPoints)).toBe(40);
    });
  });
});
