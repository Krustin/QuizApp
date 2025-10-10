/**
 * StreakManager Service Tests
 *
 * Tests for streak management, milestone detection, and performance levels
 */

import { StreakManager } from '../StreakManager';

describe('StreakManager', () => {
  let streakManager: StreakManager;

  beforeEach(() => {
    streakManager = new StreakManager();
  });

  describe('updateStreak', () => {
    it('should increment streak on correct answer', () => {
      const result = streakManager.updateStreak(5, 10, true);

      expect(result.currentStreak).toBe(6);
      expect(result.longestStreak).toBe(10);
    });

    it('should update longest streak when current exceeds it', () => {
      const result = streakManager.updateStreak(10, 10, true);

      expect(result.currentStreak).toBe(11);
      expect(result.longestStreak).toBe(11);
    });

    it('should reset current streak on incorrect answer', () => {
      const result = streakManager.updateStreak(5, 10, false);

      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(10);
    });

    it('should preserve longest streak on incorrect answer', () => {
      const result = streakManager.updateStreak(3, 15, false);

      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(15);
    });

    it('should handle starting from zero streak', () => {
      const result = streakManager.updateStreak(0, 0, true);

      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });

    it('should handle negative values gracefully', () => {
      const result = streakManager.updateStreak(-5, -2, true);

      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });

    it('should build streak from zero', () => {
      let result = streakManager.updateStreak(0, 5, true);
      expect(result.currentStreak).toBe(1);

      result = streakManager.updateStreak(result.currentStreak, result.longestStreak, true);
      expect(result.currentStreak).toBe(2);

      result = streakManager.updateStreak(result.currentStreak, result.longestStreak, true);
      expect(result.currentStreak).toBe(3);
    });
  });

  describe('isMilestone', () => {
    it('should return true for multiples of 5', () => {
      expect(streakManager.isMilestone(5)).toBe(true);
      expect(streakManager.isMilestone(10)).toBe(true);
      expect(streakManager.isMilestone(15)).toBe(true);
      expect(streakManager.isMilestone(20)).toBe(true);
      expect(streakManager.isMilestone(50)).toBe(true);
    });

    it('should return false for non-multiples of 5', () => {
      expect(streakManager.isMilestone(1)).toBe(false);
      expect(streakManager.isMilestone(3)).toBe(false);
      expect(streakManager.isMilestone(7)).toBe(false);
      expect(streakManager.isMilestone(13)).toBe(false);
    });

    it('should return false for zero', () => {
      expect(streakManager.isMilestone(0)).toBe(false);
    });

    it('should return false for negative values', () => {
      expect(streakManager.isMilestone(-5)).toBe(false);
      expect(streakManager.isMilestone(-10)).toBe(false);
    });
  });

  describe('getStreakLevel', () => {
    it('should return "none" for zero streak', () => {
      expect(streakManager.getStreakLevel(0)).toBe('none');
    });

    it('should return "good" for 1-2 streak', () => {
      expect(streakManager.getStreakLevel(1)).toBe('good');
      expect(streakManager.getStreakLevel(2)).toBe('good');
    });

    it('should return "great" for 3-4 streak', () => {
      expect(streakManager.getStreakLevel(3)).toBe('great');
      expect(streakManager.getStreakLevel(4)).toBe('great');
    });

    it('should return "amazing" for 5-9 streak', () => {
      expect(streakManager.getStreakLevel(5)).toBe('amazing');
      expect(streakManager.getStreakLevel(6)).toBe('amazing');
      expect(streakManager.getStreakLevel(7)).toBe('amazing');
      expect(streakManager.getStreakLevel(8)).toBe('amazing');
      expect(streakManager.getStreakLevel(9)).toBe('amazing');
    });

    it('should return "legendary" for 10+ streak', () => {
      expect(streakManager.getStreakLevel(10)).toBe('legendary');
      expect(streakManager.getStreakLevel(15)).toBe('legendary');
      expect(streakManager.getStreakLevel(20)).toBe('legendary');
      expect(streakManager.getStreakLevel(100)).toBe('legendary');
    });

    it('should handle negative values as none', () => {
      expect(streakManager.getStreakLevel(-5)).toBe('none');
    });

    it('should return correct levels across all boundaries', () => {
      const levels = [
        { streak: 0, expected: 'none' },
        { streak: 1, expected: 'good' },
        { streak: 2, expected: 'good' },
        { streak: 3, expected: 'great' },
        { streak: 4, expected: 'great' },
        { streak: 5, expected: 'amazing' },
        { streak: 9, expected: 'amazing' },
        { streak: 10, expected: 'legendary' },
      ];

      levels.forEach(({ streak, expected }) => {
        expect(streakManager.getStreakLevel(streak)).toBe(expected);
      });
    });
  });

  describe('integration scenarios', () => {
    it('should track a full quiz session with streaks', () => {
      let currentStreak = 0;
      let longestStreak = 0;

      // Correct answers building streak
      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        true
      ));
      expect(currentStreak).toBe(1);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('good');

      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        true
      ));
      expect(currentStreak).toBe(2);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('good');

      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        true
      ));
      expect(currentStreak).toBe(3);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('great');

      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        true
      ));
      expect(currentStreak).toBe(4);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('great');

      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        true
      ));
      expect(currentStreak).toBe(5);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('amazing');
      expect(streakManager.isMilestone(currentStreak)).toBe(true);

      // Wrong answer breaks streak
      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        false
      ));
      expect(currentStreak).toBe(0);
      expect(longestStreak).toBe(5);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('none');
    });

    it('should maintain longest streak across multiple sessions', () => {
      let longestStreak = 0;

      // Session 1: Build streak to 7
      let currentStreak = 0;
      for (let i = 0; i < 7; i++) {
        ({ currentStreak, longestStreak } = streakManager.updateStreak(
          currentStreak,
          longestStreak,
          true
        ));
      }
      expect(currentStreak).toBe(7);
      expect(longestStreak).toBe(7);

      // Break streak
      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        false
      ));
      expect(currentStreak).toBe(0);
      expect(longestStreak).toBe(7);

      // Session 2: Build to 5 (doesn't exceed longest)
      for (let i = 0; i < 5; i++) {
        ({ currentStreak, longestStreak } = streakManager.updateStreak(
          currentStreak,
          longestStreak,
          true
        ));
      }
      expect(currentStreak).toBe(5);
      expect(longestStreak).toBe(7);

      // Break and rebuild past previous longest
      ({ currentStreak, longestStreak } = streakManager.updateStreak(
        currentStreak,
        longestStreak,
        false
      ));
      for (let i = 0; i < 10; i++) {
        ({ currentStreak, longestStreak } = streakManager.updateStreak(
          currentStreak,
          longestStreak,
          true
        ));
      }
      expect(currentStreak).toBe(10);
      expect(longestStreak).toBe(10);
      expect(streakManager.getStreakLevel(currentStreak)).toBe('legendary');
    });
  });
});
