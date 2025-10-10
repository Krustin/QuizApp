/**
 * StorageService Tests
 *
 * Comprehensive test suite for the StorageService implementation.
 * Tests all methods including generic storage operations, user profiles,
 * sessions, encyclopedia, category access, and achievements.
 */

import { MockStorageImpl } from './MockStorageImpl';
import {
  createMockUserProfile,
  createMockQuizSession,
  createMockEncyclopediaEntry,
  createMockCategoryAccess,
  createMockAchievement,
  createAllCategoryAccess,
  createMockAchievementsList,
  createCorruptedJson,
} from '../../__tests__/testUtils';
import { QuizCategory, AchievementType } from '../../models/Enums';
import { STORAGE_KEYS } from '../../constants/storageKeys';

describe('StorageService', () => {
  let storage: MockStorageImpl;

  beforeEach(() => {
    storage = new MockStorageImpl();
  });

  afterEach(() => {
    storage.reset();
  });

  // ========================================
  // Generic Storage Methods Tests
  // ========================================

  describe('Generic Storage Operations', () => {
    describe('save and load', () => {
      it('should save and load string data', async () => {
        await storage.save('test-key', 'test-value');
        const result = await storage.load<string>('test-key');
        expect(result).toBe('test-value');
      });

      it('should save and load number data', async () => {
        await storage.save('test-number', 42);
        const result = await storage.load<number>('test-number');
        expect(result).toBe(42);
      });

      it('should save and load object data', async () => {
        const testObject = { name: 'test', value: 123 };
        await storage.save('test-object', testObject);
        const result = await storage.load<typeof testObject>('test-object');
        expect(result).toEqual(testObject);
      });

      it('should save and load array data', async () => {
        const testArray = [1, 2, 3, 4, 5];
        await storage.save('test-array', testArray);
        const result = await storage.load<typeof testArray>('test-array');
        expect(result).toEqual(testArray);
      });

      it('should return null for non-existent key', async () => {
        const result = await storage.load('non-existent-key');
        expect(result).toBeNull();
      });

      it('should overwrite existing data', async () => {
        await storage.save('test-key', 'initial-value');
        await storage.save('test-key', 'updated-value');
        const result = await storage.load<string>('test-key');
        expect(result).toBe('updated-value');
      });
    });

    describe('delete', () => {
      it('should delete existing key', async () => {
        await storage.save('test-key', 'test-value');
        await storage.delete('test-key');
        const result = await storage.load('test-key');
        expect(result).toBeNull();
      });

      it('should not throw error when deleting non-existent key', async () => {
        await expect(storage.delete('non-existent-key')).resolves.not.toThrow();
      });
    });

    describe('clear', () => {
      it('should clear all storage', async () => {
        await storage.save('key1', 'value1');
        await storage.save('key2', 'value2');
        await storage.save('key3', 'value3');

        await storage.clear();

        const result1 = await storage.load('key1');
        const result2 = await storage.load('key2');
        const result3 = await storage.load('key3');

        expect(result1).toBeNull();
        expect(result2).toBeNull();
        expect(result3).toBeNull();
      });

      it('should work on empty storage', async () => {
        await expect(storage.clear()).resolves.not.toThrow();
      });
    });

    describe('getAllKeys', () => {
      it('should return empty array when storage is empty', async () => {
        const keys = await storage.getAllKeys();
        expect(keys).toEqual([]);
      });

      it('should return all keys', async () => {
        await storage.save('key1', 'value1');
        await storage.save('key2', 'value2');
        await storage.save('key3', 'value3');

        const keys = await storage.getAllKeys();
        expect(keys).toHaveLength(3);
        expect(keys).toContain('key1');
        expect(keys).toContain('key2');
        expect(keys).toContain('key3');
      });
    });
  });

  // ========================================
  // User Profile Tests
  // ========================================

  describe('User Profile', () => {
    describe('getUserProfile', () => {
      it('should return null if no profile exists', async () => {
        const profile = await storage.getUserProfile();
        expect(profile).toBeNull();
      });

      it('should return existing profile', async () => {
        const mockProfile = createMockUserProfile();
        await storage.saveUserProfile(mockProfile);

        const profile = await storage.getUserProfile();
        expect(profile).not.toBeNull();
        expect(profile?.userId).toBe(mockProfile.userId);
        expect(profile?.username).toBe(mockProfile.username);
        expect(profile?.totalPoints).toBe(mockProfile.totalPoints);
      });

      it('should preserve all profile fields', async () => {
        const mockProfile = createMockUserProfile({
          totalPoints: 1500,
          currentLevel: 4,
          currentStreak: 10,
          longestStreak: 15,
          sessionsPlayed: 20,
          questionsAnswered: 240,
          correctAnswers: 180,
        });
        await storage.saveUserProfile(mockProfile);

        const profile = await storage.getUserProfile();
        expect(profile?.totalPoints).toBe(1500);
        expect(profile?.currentLevel).toBe(4);
        expect(profile?.currentStreak).toBe(10);
        expect(profile?.longestStreak).toBe(15);
        expect(profile?.sessionsPlayed).toBe(20);
        expect(profile?.questionsAnswered).toBe(240);
        expect(profile?.correctAnswers).toBe(180);
      });
    });

    describe('saveUserProfile', () => {
      it('should save user profile correctly', async () => {
        const mockProfile = createMockUserProfile();
        await storage.saveUserProfile(mockProfile);

        const profile = await storage.getUserProfile();
        expect(profile?.userId).toBe(mockProfile.userId);
        expect(profile?.username).toBe(mockProfile.username);
        expect(profile?.totalPoints).toBe(mockProfile.totalPoints);
        expect(profile?.currentLevel).toBe(mockProfile.currentLevel);
      });

      it('should update existing profile', async () => {
        const initialProfile = createMockUserProfile({ totalPoints: 100 });
        await storage.saveUserProfile(initialProfile);

        const updatedProfile = createMockUserProfile({ totalPoints: 200 });
        await storage.saveUserProfile(updatedProfile);

        const profile = await storage.getUserProfile();
        expect(profile?.totalPoints).toBe(200);
      });

      it('should handle profile with multiple unlocked categories', async () => {
        const mockProfile = createMockUserProfile({
          unlockedCategories: [
            QuizCategory.GENERAL,
            QuizCategory.WISSENSCHAFT,
            QuizCategory.GESCHICHTE,
          ],
        });
        await storage.saveUserProfile(mockProfile);

        const profile = await storage.getUserProfile();
        expect(profile?.unlockedCategories).toHaveLength(3);
        expect(profile?.unlockedCategories).toContain(QuizCategory.GENERAL);
        expect(profile?.unlockedCategories).toContain(QuizCategory.WISSENSCHAFT);
        expect(profile?.unlockedCategories).toContain(QuizCategory.GESCHICHTE);
      });

      it('should handle profile with achievements', async () => {
        const achievements = createMockAchievementsList();
        achievements[0].unlockedAt = new Date();

        const mockProfile = createMockUserProfile({ achievements });
        await storage.saveUserProfile(mockProfile);

        const profile = await storage.getUserProfile();
        expect(profile?.achievements).toHaveLength(3);
        expect(profile?.achievements[0].unlockedAt).toBeDefined();
      });
    });
  });

  // ========================================
  // Session Tests
  // ========================================

  describe('Sessions', () => {
    describe('getAllSessions', () => {
      it('should return empty array if no sessions exist', async () => {
        const sessions = await storage.getAllSessions();
        expect(sessions).toEqual([]);
      });

      it('should return all saved sessions', async () => {
        const session1 = createMockQuizSession();
        const session2 = createMockQuizSession();
        await storage.saveSession(session1);
        await storage.saveSession(session2);

        const sessions = await storage.getAllSessions();
        expect(sessions).toHaveLength(2);
      });

      it('should return sessions sorted by most recent first', async () => {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const session1 = createMockQuizSession({ startedAt: lastWeek });
        const session2 = createMockQuizSession({ startedAt: now });
        const session3 = createMockQuizSession({ startedAt: yesterday });

        await storage.saveSession(session1);
        await storage.saveSession(session2);
        await storage.saveSession(session3);

        const sessions = await storage.getAllSessions();
        // Dates are serialized as strings in JSON, so we compare timestamps
        expect(new Date(sessions[0].startedAt).getTime()).toBe(now.getTime());
        expect(new Date(sessions[1].startedAt).getTime()).toBe(yesterday.getTime());
        expect(new Date(sessions[2].startedAt).getTime()).toBe(lastWeek.getTime());
      });
    });

    describe('saveSession', () => {
      it('should save quiz session correctly', async () => {
        const mockSession = createMockQuizSession();
        await storage.saveSession(mockSession);

        const sessions = await storage.getAllSessions();
        expect(sessions).toHaveLength(1);
        expect(sessions[0].sessionId).toBe(mockSession.sessionId);
      });

      it('should update existing session', async () => {
        const mockSession = createMockQuizSession({ score: 8 });
        await storage.saveSession(mockSession);

        const updatedSession = { ...mockSession, score: 10 };
        await storage.saveSession(updatedSession);

        const sessions = await storage.getAllSessions();
        expect(sessions).toHaveLength(1);
        expect(sessions[0].score).toBe(10);
      });

      it('should preserve all session fields', async () => {
        const mockSession = createMockQuizSession({
          categoryId: QuizCategory.WISSENSCHAFT,
          score: 12,
          pointsEarned: 120,
          streakAtStart: 5,
          streakAtEnd: 17,
        });
        await storage.saveSession(mockSession);

        const session = await storage.getSessionById(mockSession.sessionId);
        expect(session?.categoryId).toBe(QuizCategory.WISSENSCHAFT);
        expect(session?.score).toBe(12);
        expect(session?.pointsEarned).toBe(120);
        expect(session?.streakAtStart).toBe(5);
        expect(session?.streakAtEnd).toBe(17);
      });

      it('should preserve session questions', async () => {
        const mockSession = createMockQuizSession();
        await storage.saveSession(mockSession);

        const session = await storage.getSessionById(mockSession.sessionId);
        expect(session?.questions).toHaveLength(12);
        expect(session?.questions[0].questionId).toBeDefined();
        expect(session?.questions[0].userAnswer).toBeDefined();
        expect(session?.questions[0].isCorrect).toBeDefined();
      });
    });

    describe('getSessionById', () => {
      it('should return null if session does not exist', async () => {
        const session = await storage.getSessionById('non-existent-id');
        expect(session).toBeNull();
      });

      it('should return correct session by ID', async () => {
        const session1 = createMockQuizSession();
        const session2 = createMockQuizSession();
        await storage.saveSession(session1);
        await storage.saveSession(session2);

        const foundSession = await storage.getSessionById(session1.sessionId);
        expect(foundSession?.sessionId).toBe(session1.sessionId);
      });
    });
  });

  // ========================================
  // Encyclopedia Tests
  // ========================================

  describe('Encyclopedia', () => {
    describe('getEncyclopedia', () => {
      it('should return empty array initially', async () => {
        const entries = await storage.getEncyclopedia();
        expect(entries).toEqual([]);
      });

      it('should return all encyclopedia entries', async () => {
        const entry1 = createMockEncyclopediaEntry();
        const entry2 = createMockEncyclopediaEntry();
        await storage.addEncyclopediaEntry(entry1);
        await storage.addEncyclopediaEntry(entry2);

        const entries = await storage.getEncyclopedia();
        expect(entries).toHaveLength(2);
      });
    });

    describe('addEncyclopediaEntry', () => {
      it('should add encyclopedia entry', async () => {
        const mockEntry = createMockEncyclopediaEntry();
        await storage.addEncyclopediaEntry(mockEntry);

        const entries = await storage.getEncyclopedia();
        expect(entries).toHaveLength(1);
        expect(entries[0].entryId).toBe(mockEntry.entryId);
      });

      it('should not duplicate entries with same entryId', async () => {
        const mockEntry = createMockEncyclopediaEntry({ entryId: 'test-entry-123' });
        await storage.addEncyclopediaEntry(mockEntry);
        await storage.addEncyclopediaEntry(mockEntry);

        const entries = await storage.getEncyclopedia();
        expect(entries).toHaveLength(1);
      });

      it('should not duplicate entries with same questionId', async () => {
        const entry1 = createMockEncyclopediaEntry({
          entryId: 'entry-1',
          questionId: 'question-123',
        });
        const entry2 = createMockEncyclopediaEntry({
          entryId: 'entry-2',
          questionId: 'question-123', // Same question ID
        });

        await storage.addEncyclopediaEntry(entry1);
        await storage.addEncyclopediaEntry(entry2);

        const entries = await storage.getEncyclopedia();
        expect(entries).toHaveLength(1);
      });

      it('should preserve all entry fields', async () => {
        const mockEntry = createMockEncyclopediaEntry({
          questionText: 'Test question?',
          correctAnswer: 'Test answer',
          tldr: 'Test explanation',
          funFact: 'Test fun fact',
          category: QuizCategory.GESCHICHTE,
        });
        await storage.addEncyclopediaEntry(mockEntry);

        const entry = await storage.getEncyclopediaEntry(mockEntry.entryId);
        expect(entry?.questionText).toBe('Test question?');
        expect(entry?.correctAnswer).toBe('Test answer');
        expect(entry?.tldr).toBe('Test explanation');
        expect(entry?.funFact).toBe('Test fun fact');
        expect(entry?.category).toBe(QuizCategory.GESCHICHTE);
      });
    });

    describe('getEncyclopediaEntry', () => {
      it('should return null if entry does not exist', async () => {
        const entry = await storage.getEncyclopediaEntry('non-existent-id');
        expect(entry).toBeNull();
      });

      it('should return correct entry by ID', async () => {
        const entry1 = createMockEncyclopediaEntry();
        const entry2 = createMockEncyclopediaEntry();
        await storage.addEncyclopediaEntry(entry1);
        await storage.addEncyclopediaEntry(entry2);

        const foundEntry = await storage.getEncyclopediaEntry(entry1.entryId);
        expect(foundEntry?.entryId).toBe(entry1.entryId);
      });
    });
  });

  // ========================================
  // Category Access Tests
  // ========================================

  describe('Category Access', () => {
    describe('getCategoryAccess', () => {
      it('should initialize with GENERAL unlocked', async () => {
        const access = await storage.getCategoryAccess();

        expect(access).toBeDefined();
        expect(access.length).toBe(Object.values(QuizCategory).length);

        const generalAccess = access.find((a) => a.categoryId === QuizCategory.GENERAL);
        expect(generalAccess?.isUnlocked).toBe(true);
      });

      it('should initialize with all other categories locked', async () => {
        const access = await storage.getCategoryAccess();

        const lockedCategories = access.filter(
          (a) => a.categoryId !== QuizCategory.GENERAL
        );

        lockedCategories.forEach((category) => {
          expect(category.isUnlocked).toBe(false);
        });
      });

      it('should return existing category access', async () => {
        // First call initializes
        await storage.getCategoryAccess();

        // Update a category
        await storage.updateCategoryAccess(QuizCategory.WISSENSCHAFT, {
          isUnlocked: true,
          questionsAnswered: 10,
        });

        // Get again
        const access = await storage.getCategoryAccess();
        const wissenschaftAccess = access.find(
          (a) => a.categoryId === QuizCategory.WISSENSCHAFT
        );

        expect(wissenschaftAccess?.isUnlocked).toBe(true);
        expect(wissenschaftAccess?.questionsAnswered).toBe(10);
      });

      it('should initialize all category stats to zero', async () => {
        const access = await storage.getCategoryAccess();

        access.forEach((category) => {
          expect(category.questionsAnswered).toBe(0);
          expect(category.correctAnswers).toBe(0);
        });
      });
    });

    describe('updateCategoryAccess', () => {
      it('should update category access', async () => {
        await storage.getCategoryAccess(); // Initialize

        await storage.updateCategoryAccess(QuizCategory.GESCHICHTE, {
          isUnlocked: true,
        });

        const access = await storage.getCategoryAccess();
        const geschichteAccess = access.find(
          (a) => a.categoryId === QuizCategory.GESCHICHTE
        );

        expect(geschichteAccess?.isUnlocked).toBe(true);
      });

      it('should update category stats', async () => {
        await storage.getCategoryAccess(); // Initialize

        await storage.updateCategoryAccess(QuizCategory.GENERAL, {
          questionsAnswered: 50,
          correctAnswers: 40,
        });

        const access = await storage.getCategoryAccess();
        const generalAccess = access.find((a) => a.categoryId === QuizCategory.GENERAL);

        expect(generalAccess?.questionsAnswered).toBe(50);
        expect(generalAccess?.correctAnswers).toBe(40);
      });

      it('should preserve existing fields when updating', async () => {
        await storage.getCategoryAccess(); // Initialize

        // First update
        await storage.updateCategoryAccess(QuizCategory.POPKULTUR, {
          isUnlocked: true,
          purchasedAt: new Date(),
        });

        // Second update - only stats
        await storage.updateCategoryAccess(QuizCategory.POPKULTUR, {
          questionsAnswered: 20,
        });

        const access = await storage.getCategoryAccess();
        const popkulturAccess = access.find((a) => a.categoryId === QuizCategory.POPKULTUR);

        expect(popkulturAccess?.isUnlocked).toBe(true);
        expect(popkulturAccess?.purchasedAt).toBeDefined();
        expect(popkulturAccess?.questionsAnswered).toBe(20);
      });

      it('should handle unlocking with purchase date', async () => {
        await storage.getCategoryAccess(); // Initialize

        const purchaseDate = new Date();
        await storage.updateCategoryAccess(QuizCategory.TIERWISSEN, {
          isUnlocked: true,
          purchasedAt: purchaseDate,
        });

        const access = await storage.getCategoryAccess();
        const tierwissenAccess = access.find(
          (a) => a.categoryId === QuizCategory.TIERWISSEN
        );

        expect(tierwissenAccess?.isUnlocked).toBe(true);
        expect(tierwissenAccess?.purchasedAt).toBeDefined();
        // Compare timestamps since dates are serialized
        expect(new Date(tierwissenAccess?.purchasedAt!).getTime()).toBe(purchaseDate.getTime());
      });
    });
  });

  // ========================================
  // Achievement Tests
  // ========================================

  describe('Achievements', () => {
    describe('getAchievements', () => {
      it('should return empty array initially', async () => {
        const achievements = await storage.getAchievements();
        expect(achievements).toEqual([]);
      });

      it('should return all achievements', async () => {
        const achievements = createMockAchievementsList();
        await storage.save(STORAGE_KEYS.ACHIEVEMENTS, achievements);

        const result = await storage.getAchievements();
        expect(result).toHaveLength(3);
      });
    });

    describe('unlockAchievement', () => {
      beforeEach(async () => {
        const achievements = createMockAchievementsList();
        await storage.save(STORAGE_KEYS.ACHIEVEMENTS, achievements);
      });

      it('should unlock achievement', async () => {
        await storage.unlockAchievement(AchievementType.FIRST_QUIZ);

        const achievements = await storage.getAchievements();
        const unlockedAchievement = achievements.find(
          (a) => a.achievementId === AchievementType.FIRST_QUIZ
        );

        expect(unlockedAchievement?.unlockedAt).toBeDefined();
        // After JSON serialization, dates become strings
        expect(new Date(unlockedAchievement?.unlockedAt!)).toBeInstanceOf(Date);
      });

      it('should not re-unlock already unlocked achievement', async () => {
        const firstUnlockTime = new Date('2024-01-01');

        // Manually set unlock time
        const achievements = await storage.getAchievements();
        achievements[0].unlockedAt = firstUnlockTime;
        await storage.save(STORAGE_KEYS.ACHIEVEMENTS, achievements);

        // Try to unlock again
        await storage.unlockAchievement(AchievementType.FIRST_QUIZ);

        const result = await storage.getAchievements();
        const achievement = result.find((a) => a.achievementId === AchievementType.FIRST_QUIZ);

        // Compare timestamps since dates are serialized
        expect(new Date(achievement?.unlockedAt!).getTime()).toBe(firstUnlockTime.getTime());
      });

      it('should only unlock specified achievement', async () => {
        await storage.unlockAchievement(AchievementType.STREAK_5);

        const achievements = await storage.getAchievements();
        const unlockedAchievement = achievements.find(
          (a) => a.achievementId === AchievementType.STREAK_5
        );
        const otherAchievement = achievements.find(
          (a) => a.achievementId === AchievementType.LEVEL_10
        );

        expect(unlockedAchievement?.unlockedAt).toBeDefined();
        expect(otherAchievement?.unlockedAt).toBeUndefined();
      });

      it('should not throw error for non-existent achievement', async () => {
        await expect(storage.unlockAchievement('non-existent-achievement')).resolves.not.toThrow();
      });
    });
  });

  // ========================================
  // Edge Cases and Error Handling
  // ========================================

  describe('Edge Cases', () => {
    describe('corrupt data handling', () => {
      it('should handle corrupt data gracefully', async () => {
        storage.setRawData('test-key', createCorruptedJson());

        const result = await storage.load('test-key');
        expect(result).toBeNull();
      });

      it('should handle corrupt user profile', async () => {
        storage.setRawData(STORAGE_KEYS.USER_PROFILE, 'invalid json');

        const profile = await storage.getUserProfile();
        expect(profile).toBeNull();
      });

      it('should handle corrupt sessions array', async () => {
        storage.setRawData(STORAGE_KEYS.SESSIONS, '{invalid');

        const sessions = await storage.getAllSessions();
        expect(sessions).toEqual([]);
      });

      it('should handle corrupt encyclopedia data', async () => {
        storage.setRawData(STORAGE_KEYS.ENCYCLOPEDIA, 'not valid json');

        const entries = await storage.getEncyclopedia();
        expect(entries).toEqual([]);
      });
    });

    describe('empty storage', () => {
      it('should handle empty storage for profile', async () => {
        const profile = await storage.getUserProfile();
        expect(profile).toBeNull();
      });

      it('should handle empty storage for sessions', async () => {
        const sessions = await storage.getAllSessions();
        expect(sessions).toEqual([]);
      });

      it('should handle empty storage for encyclopedia', async () => {
        const entries = await storage.getEncyclopedia();
        expect(entries).toEqual([]);
      });

      it('should handle empty storage for achievements', async () => {
        const achievements = await storage.getAchievements();
        expect(achievements).toEqual([]);
      });

      it('should initialize category access on first access', async () => {
        const access = await storage.getCategoryAccess();
        expect(access).toBeDefined();
        expect(access.length).toBeGreaterThan(0);
      });
    });

    describe('data consistency', () => {
      it('should maintain data types after save/load cycle', async () => {
        const profile = createMockUserProfile({
          totalPoints: 1000,
          currentLevel: 3,
        });

        await storage.saveUserProfile(profile);
        const loaded = await storage.getUserProfile();

        expect(typeof loaded?.totalPoints).toBe('number');
        expect(typeof loaded?.currentLevel).toBe('number');
        expect(typeof loaded?.username).toBe('string');
      });

      it('should handle dates correctly', async () => {
        const now = new Date();
        const profile = createMockUserProfile({
          createdAt: now,
          lastPlayedAt: now,
        });

        await storage.saveUserProfile(profile);
        const loaded = await storage.getUserProfile();

        // Dates are serialized as strings in JSON
        expect(loaded?.createdAt).toBeDefined();
        expect(loaded?.lastPlayedAt).toBeDefined();
      });

      it('should handle boolean values correctly', async () => {
        await storage.getCategoryAccess(); // Initialize

        await storage.updateCategoryAccess(QuizCategory.TECHNIK, {
          isUnlocked: true,
        });

        const access = await storage.getCategoryAccess();
        const technikAccess = access.find((a) => a.categoryId === QuizCategory.TECHNIK);

        expect(typeof technikAccess?.isUnlocked).toBe('boolean');
        expect(technikAccess?.isUnlocked).toBe(true);
      });

      it('should handle arrays correctly', async () => {
        const session1 = createMockQuizSession();
        const session2 = createMockQuizSession();
        const session3 = createMockQuizSession();

        await storage.saveSession(session1);
        await storage.saveSession(session2);
        await storage.saveSession(session3);

        const sessions = await storage.getAllSessions();
        expect(Array.isArray(sessions)).toBe(true);
        expect(sessions).toHaveLength(3);
      });
    });

    describe('concurrent operations', () => {
      it('should handle multiple saves to different keys', async () => {
        const profile = createMockUserProfile();
        const session = createMockQuizSession();

        await Promise.all([storage.saveUserProfile(profile), storage.saveSession(session)]);

        const loadedProfile = await storage.getUserProfile();
        const loadedSessions = await storage.getAllSessions();

        expect(loadedProfile).toBeDefined();
        expect(loadedSessions).toHaveLength(1);
      });

      it('should handle multiple reads', async () => {
        const profile = createMockUserProfile();
        await storage.saveUserProfile(profile);

        const [result1, result2, result3] = await Promise.all([
          storage.getUserProfile(),
          storage.getUserProfile(),
          storage.getUserProfile(),
        ]);

        expect(result1).toEqual(result2);
        expect(result2).toEqual(result3);
      });
    });

    describe('large data handling', () => {
      it('should handle many sessions', async () => {
        const sessions = Array.from({ length: 100 }, () => createMockQuizSession());

        for (const session of sessions) {
          await storage.saveSession(session);
        }

        const allSessions = await storage.getAllSessions();
        expect(allSessions).toHaveLength(100);
      });

      it('should handle many encyclopedia entries', async () => {
        const entries = Array.from({ length: 200 }, (_, i) =>
          createMockEncyclopediaEntry({ entryId: `entry-${i}` })
        );

        for (const entry of entries) {
          await storage.addEncyclopediaEntry(entry);
        }

        const allEntries = await storage.getEncyclopedia();
        expect(allEntries).toHaveLength(200);
      });
    });
  });
});
