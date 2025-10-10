/**
 * AsyncStorageImpl - Mobile Storage Implementation
 *
 * Implements StorageService interface using React Native AsyncStorage.
 * Provides persistent, asynchronous, unencrypted storage for mobile platforms.
 *
 * Key features:
 * - Automatic JSON serialization/deserialization
 * - Comprehensive error handling
 * - Type-safe operations
 * - Works on both iOS and Android
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StorageService } from '@quiz/shared/services/StorageService';
import type {
  UserProfile,
  QuizSession,
  EncyclopediaEntry,
  CategoryAccess,
  Achievement,
  QuizCategory,
} from '@quiz/shared/models';
import { STORAGE_KEYS } from '@quiz/shared/constants/storageKeys';
import {
  createInitialUserProfile,
  createInitialCategoryAccess,
} from '@quiz/shared/constants/initialData';

class AsyncStorageImpl implements StorageService {
  /**
   * Saves data to AsyncStorage.
   * Data is automatically serialized to JSON string.
   *
   * @param key - The storage key
   * @param data - The data to store
   * @throws Error if serialization or storage operation fails
   */
  async save<T>(key: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`[AsyncStorageImpl] Error saving data for key "${key}":`, error);
      throw new Error(`Failed to save data to AsyncStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Loads data from AsyncStorage.
   * Automatically parses JSON string back to object.
   *
   * @param key - The storage key
   * @returns The stored data or null if not found
   * @throws Error if deserialization fails
   */
  async load<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      if (jsonValue === null) {
        return null;
      }

      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`[AsyncStorageImpl] Error loading data for key "${key}":`, error);
      throw new Error(`Failed to load data from AsyncStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Deletes a single item from AsyncStorage.
   *
   * @param key - The storage key to delete
   * @throws Error if deletion fails
   */
  async delete(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[AsyncStorageImpl] Error deleting key "${key}":`, error);
      throw new Error(`Failed to delete key from AsyncStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Clears all data from AsyncStorage.
   * WARNING: This removes ALL stored data, not just quiz-related data.
   *
   * @throws Error if clear operation fails
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('[AsyncStorageImpl] Error clearing AsyncStorage:', error);
      throw new Error(`Failed to clear AsyncStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Returns all storage keys currently in AsyncStorage.
   * Useful for debugging and selective data operations.
   *
   * @returns Array of all storage keys
   * @throws Error if operation fails
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys]; // Convert readonly array to mutable array
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting all keys:', error);
      throw new Error(`Failed to get all keys from AsyncStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ========================================
  // User Profile Methods
  // ========================================

  /**
   * Retrieves the user profile from storage.
   * If no profile exists, creates and saves a new default profile.
   *
   * @returns The user profile (existing or newly created)
   */
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profile = await this.load<UserProfile>(STORAGE_KEYS.USER_PROFILE);

      if (profile === null) {
        // First-time user - create initial profile
        const initialProfile = createInitialUserProfile();
        await this.saveUserProfile(initialProfile);
        return initialProfile;
      }

      return profile;
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting user profile:', error);
      throw new Error(`Failed to get user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Saves the user profile to storage.
   * Overwrites any existing profile data.
   *
   * @param profile - The user profile to save
   */
  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await this.save(STORAGE_KEYS.USER_PROFILE, profile);
    } catch (error) {
      console.error('[AsyncStorageImpl] Error saving user profile:', error);
      throw new Error(`Failed to save user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ========================================
  // Session Methods
  // ========================================

  /**
   * Retrieves all quiz sessions from storage.
   * Returns empty array if no sessions exist.
   *
   * @returns Array of all quiz sessions, ordered by most recent first
   */
  async getAllSessions(): Promise<QuizSession[]> {
    try {
      const sessions = await this.load<QuizSession[]>(STORAGE_KEYS.SESSIONS);
      return sessions || [];
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting all sessions:', error);
      throw new Error(`Failed to get all sessions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Saves a quiz session to storage.
   * If a session with the same ID exists, it will be updated.
   *
   * @param session - The quiz session to save
   */
  async saveSession(session: QuizSession): Promise<void> {
    try {
      const sessions = await this.getAllSessions();

      // Check if session already exists
      const existingIndex = sessions.findIndex(s => s.sessionId === session.sessionId);

      if (existingIndex >= 0) {
        // Update existing session
        sessions[existingIndex] = session;
      } else {
        // Add new session at the beginning (most recent first)
        sessions.unshift(session);
      }

      await this.save(STORAGE_KEYS.SESSIONS, sessions);
    } catch (error) {
      console.error('[AsyncStorageImpl] Error saving session:', error);
      throw new Error(`Failed to save session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Retrieves a specific quiz session by ID.
   *
   * @param sessionId - The ID of the session to retrieve
   * @returns The session or null if not found
   */
  async getSessionById(sessionId: string): Promise<QuizSession | null> {
    try {
      const sessions = await this.getAllSessions();
      const session = sessions.find(s => s.sessionId === sessionId);
      return session || null;
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting session by ID:', error);
      throw new Error(`Failed to get session by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ========================================
  // Encyclopedia Methods
  // ========================================

  /**
   * Retrieves all encyclopedia entries from storage.
   * Returns empty array if no entries exist.
   *
   * @returns Array of all encyclopedia entries
   */
  async getEncyclopedia(): Promise<EncyclopediaEntry[]> {
    try {
      const entries = await this.load<EncyclopediaEntry[]>(STORAGE_KEYS.ENCYCLOPEDIA);
      return entries || [];
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting encyclopedia:', error);
      throw new Error(`Failed to get encyclopedia: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Adds a new encyclopedia entry to storage.
   * If an entry with the same ID or questionId already exists, it will not be added.
   *
   * @param entry - The encyclopedia entry to add
   */
  async addEncyclopediaEntry(entry: EncyclopediaEntry): Promise<void> {
    try {
      const entries = await this.getEncyclopedia();

      // Check if entry already exists (by entryId or questionId)
      const exists = entries.some(
        e => e.entryId === entry.entryId || e.questionId === entry.questionId
      );

      if (!exists) {
        entries.push(entry);
        await this.save(STORAGE_KEYS.ENCYCLOPEDIA, entries);
      }
    } catch (error) {
      console.error('[AsyncStorageImpl] Error adding encyclopedia entry:', error);
      throw new Error(`Failed to add encyclopedia entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Retrieves a specific encyclopedia entry by ID.
   *
   * @param entryId - The ID of the entry to retrieve
   * @returns The entry or null if not found
   */
  async getEncyclopediaEntry(entryId: string): Promise<EncyclopediaEntry | null> {
    try {
      const entries = await this.getEncyclopedia();
      const entry = entries.find(e => e.entryId === entryId);
      return entry || null;
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting encyclopedia entry:', error);
      throw new Error(`Failed to get encyclopedia entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ========================================
  // Category Access Methods
  // ========================================

  /**
   * Retrieves all category access records from storage.
   * If no records exist, initializes with default access (GENERAL unlocked).
   *
   * @returns Array of category access records for all categories
   */
  async getCategoryAccess(): Promise<CategoryAccess[]> {
    try {
      const access = await this.load<CategoryAccess[]>(STORAGE_KEYS.CATEGORY_ACCESS);

      if (access === null) {
        // First-time user - create initial category access
        const initialAccess = createInitialCategoryAccess();
        await this.save(STORAGE_KEYS.CATEGORY_ACCESS, initialAccess);
        return initialAccess;
      }

      return access;
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting category access:', error);
      throw new Error(`Failed to get category access: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Updates category access for a specific category.
   * Can be used to unlock categories, update stats, etc.
   *
   * @param categoryId - The category to update
   * @param updates - Partial updates to apply to the category access record
   */
  async updateCategoryAccess(
    categoryId: QuizCategory,
    updates: Partial<CategoryAccess>
  ): Promise<void> {
    try {
      const accessRecords = await this.getCategoryAccess();

      const index = accessRecords.findIndex(a => a.categoryId === categoryId);

      if (index >= 0) {
        // Update existing record
        accessRecords[index] = { ...accessRecords[index], ...updates };
        await this.save(STORAGE_KEYS.CATEGORY_ACCESS, accessRecords);
      } else {
        // Category doesn't exist in records - this shouldn't happen
        console.warn(`[AsyncStorageImpl] Category ${categoryId} not found in access records`);
      }
    } catch (error) {
      console.error('[AsyncStorageImpl] Error updating category access:', error);
      throw new Error(`Failed to update category access: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ========================================
  // Achievement Methods
  // ========================================

  /**
   * Retrieves all achievements from storage.
   * Returns empty array if no achievements exist.
   *
   * @returns Array of all achievements (unlocked and locked)
   */
  async getAchievements(): Promise<Achievement[]> {
    try {
      const achievements = await this.load<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS);
      return achievements || [];
    } catch (error) {
      console.error('[AsyncStorageImpl] Error getting achievements:', error);
      throw new Error(`Failed to get achievements: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Unlocks a specific achievement by setting its unlockedAt timestamp.
   * If achievement is already unlocked, does nothing.
   *
   * @param achievementId - The ID of the achievement to unlock
   */
  async unlockAchievement(achievementId: string): Promise<void> {
    try {
      const achievements = await this.getAchievements();

      const achievement = achievements.find(a => a.achievementId === achievementId);

      if (achievement && !achievement.unlockedAt) {
        // Achievement exists and is not yet unlocked
        achievement.unlockedAt = new Date();
        await this.save(STORAGE_KEYS.ACHIEVEMENTS, achievements);
      }
    } catch (error) {
      console.error('[AsyncStorageImpl] Error unlocking achievement:', error);
      throw new Error(`Failed to unlock achievement: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export default new AsyncStorageImpl();
