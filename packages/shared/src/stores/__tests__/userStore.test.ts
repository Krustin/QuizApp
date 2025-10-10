/**
 * User Store Tests
 *
 * Comprehensive test suite for userStore.ts
 * Tests profile management, points, levels, streaks, and achievements
 */

import { useUserStore } from '../userStore';
import { MockStorageImpl } from '../../services/__tests__/MockStorageImpl';
import type { UserProfile } from '../../models/User';
import { QuizCategory } from '../../models/Enums';

describe('userStore', () => {
  let storage: MockStorageImpl;

  beforeEach(() => {
    storage = new MockStorageImpl();

    // Reset zustand store to initial state
    useUserStore.setState({
      userProfile: null,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    storage.reset();
  });

  describe('loadUserProfile', () => {
    it('should create initial profile if none exists', async () => {
      await useUserStore.getState().loadUserProfile(storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile).toBeTruthy();
      expect(userProfile?.username).toBe('QuizMaster');
      expect(userProfile?.totalPoints).toBe(0);
      expect(userProfile?.currentLevel).toBe(1);
      expect(userProfile?.currentStreak).toBe(0);
      expect(userProfile?.longestStreak).toBe(0);
      expect(userProfile?.unlockedCategories).toEqual([QuizCategory.GENERAL]);
      expect(userProfile?.achievements).toEqual([]);
      expect(userProfile?.sessionsPlayed).toBe(0);
      expect(userProfile?.questionsAnswered).toBe(0);
      expect(userProfile?.correctAnswers).toBe(0);
    });

    it('should load existing profile from storage', async () => {
      const existingProfile: UserProfile = {
        userId: 'test_123',
        username: 'TestUser',
        totalPoints: 500,
        currentLevel: 2,
        currentStreak: 5,
        longestStreak: 10,
        unlockedCategories: [QuizCategory.GENERAL, QuizCategory.WISSENSCHAFT],
        achievements: [],
        sessionsPlayed: 10,
        questionsAnswered: 120,
        correctAnswers: 100,
        createdAt: new Date('2024-01-01'),
        lastPlayedAt: new Date('2024-01-15'),
      };

      await storage.saveUserProfile(existingProfile);

      await useUserStore.getState().loadUserProfile(storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.userId).toBe('test_123');
      expect(userProfile?.username).toBe('TestUser');
      expect(userProfile?.totalPoints).toBe(500);
      expect(userProfile?.currentLevel).toBe(2);
      expect(userProfile?.currentStreak).toBe(5);
      expect(userProfile?.longestStreak).toBe(10);
    });

    it('should set isLoading during load operation', async () => {
      const loadPromise = useUserStore.getState().loadUserProfile(storage);

      const { isLoading } = useUserStore.getState();
      expect(isLoading).toBe(true);

      await loadPromise;

      const state = useUserStore.getState();
      expect(state.isLoading).toBe(false);
    });

    it('should handle errors and set error state', async () => {
      // Create a mock that throws an error
      const errorStorage = {
        ...storage,
        getUserProfile: jest.fn().mockRejectedValue(new Error('Storage error')),
      } as any;

      await useUserStore.getState().loadUserProfile(errorStorage);

      const { error } = useUserStore.getState();
      expect(error).toBe('Storage error');
    });
  });

  describe('updatePoints', () => {
    beforeEach(async () => {
      await useUserStore.getState().loadUserProfile(storage);
    });

    it('should add points to user profile', async () => {
      await useUserStore.getState().updatePoints(10, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.totalPoints).toBe(10);
    });

    it('should accumulate points over multiple updates', async () => {
      await useUserStore.getState().updatePoints(10, storage);
      await useUserStore.getState().updatePoints(20, storage);
      await useUserStore.getState().updatePoints(30, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.totalPoints).toBe(60);
    });

    it('should trigger level-up when threshold reached', async () => {
      await useUserStore.getState().updatePoints(500, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.currentLevel).toBe(2);
      expect(userProfile?.totalPoints).toBe(500);
    });

    it('should calculate correct level for different point amounts', async () => {
      // Level 1: 0-499 points
      await useUserStore.getState().updatePoints(499, storage);
      expect(useUserStore.getState().userProfile?.currentLevel).toBe(1);

      // Level 2: 500-999 points
      await useUserStore.getState().updatePoints(1, storage);
      expect(useUserStore.getState().userProfile?.currentLevel).toBe(2);

      // Level 3: 1000-1499 points
      await useUserStore.getState().updatePoints(500, storage);
      expect(useUserStore.getState().userProfile?.currentLevel).toBe(3);

      // Level 6: 2500-2999 points
      await useUserStore.getState().updatePoints(1500, storage);
      expect(useUserStore.getState().userProfile?.currentLevel).toBe(6);
    });

    it('should persist updated profile to storage', async () => {
      await useUserStore.getState().updatePoints(100, storage);

      const savedProfile = await storage.getUserProfile();
      expect(savedProfile?.totalPoints).toBe(100);
    });

    it('should update lastPlayedAt timestamp', async () => {
      const beforeTime = new Date();
      await useUserStore.getState().updatePoints(10, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.lastPlayedAt.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    it('should handle error if no profile loaded', async () => {
      useUserStore.setState({ userProfile: null });

      await useUserStore.getState().updatePoints(10, storage);

      const { error } = useUserStore.getState();
      expect(error).toBe('No user profile loaded');
    });
  });

  describe('updateStreak', () => {
    beforeEach(async () => {
      await useUserStore.getState().loadUserProfile(storage);
    });

    it('should increment streak on correct answer', async () => {
      await useUserStore.getState().updateStreak(true, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.currentStreak).toBe(1);
    });

    it('should accumulate streak over multiple correct answers', async () => {
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.currentStreak).toBe(3);
    });

    it('should reset streak to 0 on wrong answer', async () => {
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(false, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.currentStreak).toBe(0);
    });

    it('should update longestStreak when current streak exceeds it', async () => {
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.longestStreak).toBe(3);
    });

    it('should not decrease longestStreak when current streak resets', async () => {
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateStreak(false, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.currentStreak).toBe(0);
      expect(userProfile?.longestStreak).toBe(3);
    });
  });

  describe('updateAccuracy', () => {
    beforeEach(async () => {
      await useUserStore.getState().loadUserProfile(storage);
    });

    it('should increment questionsAnswered on any answer', async () => {
      await useUserStore.getState().updateAccuracy(true, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.questionsAnswered).toBe(1);
    });

    it('should increment correctAnswers on correct answer', async () => {
      await useUserStore.getState().updateAccuracy(true, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.correctAnswers).toBe(1);
    });

    it('should not increment correctAnswers on wrong answer', async () => {
      await useUserStore.getState().updateAccuracy(false, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.questionsAnswered).toBe(1);
      expect(userProfile?.correctAnswers).toBe(0);
    });

    it('should track accuracy over multiple answers', async () => {
      await useUserStore.getState().updateAccuracy(true, storage);
      await useUserStore.getState().updateAccuracy(true, storage);
      await useUserStore.getState().updateAccuracy(false, storage);
      await useUserStore.getState().updateAccuracy(true, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.questionsAnswered).toBe(4);
      expect(userProfile?.correctAnswers).toBe(3);
    });
  });

  describe('unlockCategory', () => {
    beforeEach(async () => {
      await useUserStore.getState().loadUserProfile(storage);
    });

    it('should unlock a new category', async () => {
      await useUserStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.unlockedCategories).toContain(QuizCategory.WISSENSCHAFT);
    });

    it('should not duplicate categories', async () => {
      await useUserStore.getState().unlockCategory(QuizCategory.GENERAL, storage);

      const { userProfile } = useUserStore.getState();
      const generalCount = userProfile?.unlockedCategories.filter(
        c => c === QuizCategory.GENERAL
      ).length;
      expect(generalCount).toBe(1);
    });

    it('should unlock multiple categories', async () => {
      await useUserStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT, storage);
      await useUserStore.getState().unlockCategory(QuizCategory.GESCHICHTE, storage);
      await useUserStore.getState().unlockCategory(QuizCategory.POPKULTUR, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.unlockedCategories).toContain(QuizCategory.WISSENSCHAFT);
      expect(userProfile?.unlockedCategories).toContain(QuizCategory.GESCHICHTE);
      expect(userProfile?.unlockedCategories).toContain(QuizCategory.POPKULTUR);
      expect(userProfile?.unlockedCategories.length).toBe(4); // Including GENERAL
    });
  });

  describe('resetProfile', () => {
    it('should reset profile to default state', async () => {
      // First create and modify a profile
      await useUserStore.getState().loadUserProfile(storage);
      await useUserStore.getState().updatePoints(1000, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT, storage);

      // Then reset
      await useUserStore.getState().resetProfile(storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.totalPoints).toBe(0);
      expect(userProfile?.currentLevel).toBe(1);
      expect(userProfile?.currentStreak).toBe(0);
      expect(userProfile?.longestStreak).toBe(0);
      expect(userProfile?.unlockedCategories).toEqual([QuizCategory.GENERAL]);
      expect(userProfile?.sessionsPlayed).toBe(0);
      expect(userProfile?.questionsAnswered).toBe(0);
      expect(userProfile?.correctAnswers).toBe(0);
    });

    it('should persist reset profile to storage', async () => {
      await useUserStore.getState().loadUserProfile(storage);
      await useUserStore.getState().updatePoints(500, storage);
      await useUserStore.getState().resetProfile(storage);

      const savedProfile = await storage.getUserProfile();
      expect(savedProfile?.totalPoints).toBe(0);
      expect(savedProfile?.currentLevel).toBe(1);
    });
  });

  describe('Computed Values', () => {
    beforeEach(async () => {
      await useUserStore.getState().loadUserProfile(storage);
    });

    describe('pointsToNextLevel', () => {
      it('should calculate points needed for level 2', () => {
        const pointsNeeded = useUserStore.getState().pointsToNextLevel();
        expect(pointsNeeded).toBe(500); // Need 500 points for level 2
      });

      it('should calculate points needed after earning some points', async () => {
        await useUserStore.getState().updatePoints(200, storage);

        const pointsNeeded = useUserStore.getState().pointsToNextLevel();
        expect(pointsNeeded).toBe(300); // Need 300 more for level 2
      });

      it('should calculate points needed for next level after leveling up', async () => {
        await useUserStore.getState().updatePoints(600, storage); // Level 2

        const pointsNeeded = useUserStore.getState().pointsToNextLevel();
        expect(pointsNeeded).toBe(400); // Need 1000 total for level 3, have 600
      });

      it('should return 0 if no profile loaded', () => {
        useUserStore.setState({ userProfile: null });

        const pointsNeeded = useUserStore.getState().pointsToNextLevel();
        expect(pointsNeeded).toBe(0);
      });
    });

    describe('accuracyRate', () => {
      it('should return 0 when no questions answered', () => {
        const accuracy = useUserStore.getState().accuracyRate();
        expect(accuracy).toBe(0);
      });

      it('should calculate 100% accuracy', async () => {
        await useUserStore.getState().updateAccuracy(true, storage);
        await useUserStore.getState().updateAccuracy(true, storage);
        await useUserStore.getState().updateAccuracy(true, storage);

        const accuracy = useUserStore.getState().accuracyRate();
        expect(accuracy).toBe(1.0);
      });

      it('should calculate 50% accuracy', async () => {
        await useUserStore.getState().updateAccuracy(true, storage);
        await useUserStore.getState().updateAccuracy(false, storage);

        const accuracy = useUserStore.getState().accuracyRate();
        expect(accuracy).toBe(0.5);
      });

      it('should calculate 75% accuracy', async () => {
        await useUserStore.getState().updateAccuracy(true, storage);
        await useUserStore.getState().updateAccuracy(true, storage);
        await useUserStore.getState().updateAccuracy(true, storage);
        await useUserStore.getState().updateAccuracy(false, storage);

        const accuracy = useUserStore.getState().accuracyRate();
        expect(accuracy).toBe(0.75);
      });

      it('should return 0 if no profile loaded', () => {
        useUserStore.setState({ userProfile: null });

        const accuracy = useUserStore.getState().accuracyRate();
        expect(accuracy).toBe(0);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large point amounts', async () => {
      await useUserStore.getState().loadUserProfile(storage);
      await useUserStore.getState().updatePoints(1000000, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.totalPoints).toBe(1000000);
      expect(userProfile?.currentLevel).toBe(2001); // floor(1000000 / 500) + 1
    });

    it('should handle rapid successive updates', async () => {
      await useUserStore.getState().loadUserProfile(storage);

      // Sequential updates to avoid race conditions
      await useUserStore.getState().updatePoints(10, storage);
      await useUserStore.getState().updatePoints(20, storage);
      await useUserStore.getState().updatePoints(30, storage);

      const { userProfile } = useUserStore.getState();
      expect(userProfile?.totalPoints).toBe(60);
    });

    it('should persist all changes to storage', async () => {
      await useUserStore.getState().loadUserProfile(storage);
      await useUserStore.getState().updatePoints(250, storage);
      await useUserStore.getState().updateStreak(true, storage);
      await useUserStore.getState().updateAccuracy(true, storage);

      const savedProfile = await storage.getUserProfile();
      expect(savedProfile?.totalPoints).toBe(250);
      expect(savedProfile?.currentStreak).toBe(1);
      expect(savedProfile?.questionsAnswered).toBe(1);
    });
  });
});
