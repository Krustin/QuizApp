import { StorageService } from '../StorageService';
import type {
  UserProfile,
  QuizSession,
  EncyclopediaEntry,
  CategoryAccess,
  Achievement,
  QuizCategory,
} from '../../models';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { QuizCategory as QuizCategoryEnum } from '../../models/Enums';

/**
 * MockStorageImpl - In-memory storage implementation for testing
 *
 * This mock provides a complete implementation of the StorageService interface
 * using an in-memory Map for storage. It mimics the behavior of real storage
 * implementations (AsyncStorage/localStorage) without requiring external dependencies.
 *
 * Features:
 * - All operations are async (matching real storage)
 * - Data is JSON serialized/deserialized (matching real behavior)
 * - Supports all StorageService methods
 * - Easy to reset between tests
 */
export class MockStorageImpl implements StorageService {
  private storage: Map<string, string> = new Map();

  // ========================================
  // Generic Storage Methods
  // ========================================

  async save<T>(key: string, data: T): Promise<void> {
    this.storage.set(key, JSON.stringify(data));
  }

  async load<T>(key: string): Promise<T | null> {
    const data = this.storage.get(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error parsing data for key ${key}:`, error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  async getAllKeys(): Promise<string[]> {
    return Array.from(this.storage.keys());
  }

  // ========================================
  // User Profile Methods
  // ========================================

  async getUserProfile(): Promise<UserProfile | null> {
    return this.load<UserProfile>(STORAGE_KEYS.USER_PROFILE);
  }

  async saveUserProfile(profile: UserProfile): Promise<void> {
    await this.save(STORAGE_KEYS.USER_PROFILE, profile);
  }

  // ========================================
  // Session Methods
  // ========================================

  async getAllSessions(): Promise<QuizSession[]> {
    const sessions = await this.load<QuizSession[]>(STORAGE_KEYS.SESSIONS);
    return sessions || [];
  }

  async saveSession(session: QuizSession): Promise<void> {
    const sessions = await this.getAllSessions();
    const existingIndex = sessions.findIndex((s) => s.sessionId === session.sessionId);

    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    // Sort by startedAt date, most recent first
    sessions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

    await this.save(STORAGE_KEYS.SESSIONS, sessions);
  }

  async getSessionById(sessionId: string): Promise<QuizSession | null> {
    const sessions = await this.getAllSessions();
    return sessions.find((s) => s.sessionId === sessionId) || null;
  }

  // ========================================
  // Encyclopedia Methods
  // ========================================

  async getEncyclopedia(): Promise<EncyclopediaEntry[]> {
    const entries = await this.load<EncyclopediaEntry[]>(STORAGE_KEYS.ENCYCLOPEDIA);
    return entries || [];
  }

  async addEncyclopediaEntry(entry: EncyclopediaEntry): Promise<void> {
    const entries = await this.getEncyclopedia();

    // Check for duplicate by entryId or questionId
    const isDuplicate = entries.some(
      (e) => e.entryId === entry.entryId || e.questionId === entry.questionId
    );

    if (!isDuplicate) {
      entries.push(entry);
      await this.save(STORAGE_KEYS.ENCYCLOPEDIA, entries);
    }
  }

  async getEncyclopediaEntry(entryId: string): Promise<EncyclopediaEntry | null> {
    const entries = await this.getEncyclopedia();
    return entries.find((e) => e.entryId === entryId) || null;
  }

  // ========================================
  // Category Access Methods
  // ========================================

  async getCategoryAccess(): Promise<CategoryAccess[]> {
    const access = await this.load<CategoryAccess[]>(STORAGE_KEYS.CATEGORY_ACCESS);

    if (!access) {
      // Initialize with default access (GENERAL unlocked)
      const defaultAccess: CategoryAccess[] = Object.values(QuizCategoryEnum).map((category) => ({
        categoryId: category,
        isUnlocked: category === QuizCategoryEnum.GENERAL,
        questionsAnswered: 0,
        correctAnswers: 0,
      }));
      await this.save(STORAGE_KEYS.CATEGORY_ACCESS, defaultAccess);
      return defaultAccess;
    }

    return access;
  }

  async updateCategoryAccess(
    categoryId: QuizCategory,
    updates: Partial<CategoryAccess>
  ): Promise<void> {
    const access = await this.getCategoryAccess();
    const categoryIndex = access.findIndex((a) => a.categoryId === categoryId);

    if (categoryIndex >= 0) {
      access[categoryIndex] = { ...access[categoryIndex], ...updates };
      await this.save(STORAGE_KEYS.CATEGORY_ACCESS, access);
    }
  }

  // ========================================
  // Achievement Methods
  // ========================================

  async getAchievements(): Promise<Achievement[]> {
    const achievements = await this.load<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS);
    return achievements || [];
  }

  async unlockAchievement(achievementId: string): Promise<void> {
    const achievements = await this.getAchievements();
    const achievement = achievements.find((a) => a.achievementId === achievementId);

    if (achievement && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date();
      await this.save(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    }
  }

  // ========================================
  // Test Utility Methods
  // ========================================

  /**
   * Resets the mock storage to empty state.
   * Useful for cleaning up between tests.
   */
  reset(): void {
    this.storage.clear();
  }

  /**
   * Returns the raw storage map for inspection in tests.
   * Useful for debugging.
   */
  getRawStorage(): Map<string, string> {
    return this.storage;
  }

  /**
   * Sets raw data in storage without serialization.
   * Useful for testing error handling with corrupt data.
   */
  setRawData(key: string, value: string): void {
    this.storage.set(key, value);
  }
}
