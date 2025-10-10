/**
 * StorageService Interface
 *
 * Provides a unified storage abstraction for platform-specific implementations.
 * - Mobile: AsyncStorage (@react-native-async-storage/async-storage)
 * - Web: LocalStorage (browser localStorage API)
 *
 * All methods are async to ensure consistent API across platforms.
 */

import type {
  UserProfile,
  QuizSession,
  EncyclopediaEntry,
  CategoryAccess,
  Achievement,
  QuizCategory,
} from '../models';

export interface StorageService {
  // ========================================
  // Generic Storage Methods
  // ========================================

  /**
   * Saves data to storage with the specified key.
   * Data is automatically serialized to JSON.
   *
   * @param key - The storage key
   * @param data - The data to store (will be JSON serialized)
   */
  save<T>(key: string, data: T): Promise<void>;

  /**
   * Loads data from storage by key.
   * Returns null if the key doesn't exist.
   *
   * @param key - The storage key
   * @returns The stored data or null if not found
   */
  load<T>(key: string): Promise<T | null>;

  /**
   * Deletes a single item from storage by key.
   *
   * @param key - The storage key to delete
   */
  delete(key: string): Promise<void>;

  /**
   * Clears all data from storage.
   * Use with caution - this removes everything!
   */
  clear(): Promise<void>;

  /**
   * Returns all storage keys.
   * Useful for debugging and data migration.
   *
   * @returns Array of all storage keys
   */
  getAllKeys(): Promise<string[]>;

  // ========================================
  // User Profile Methods
  // ========================================

  /**
   * Retrieves the user profile from storage.
   * If no profile exists, creates and returns a new default profile.
   *
   * @returns The user profile (existing or newly created)
   */
  getUserProfile(): Promise<UserProfile | null>;

  /**
   * Saves the user profile to storage.
   * Overwrites any existing profile data.
   *
   * @param profile - The user profile to save
   */
  saveUserProfile(profile: UserProfile): Promise<void>;

  // ========================================
  // Session Methods
  // ========================================

  /**
   * Retrieves all quiz sessions from storage.
   * Returns empty array if no sessions exist.
   *
   * @returns Array of all quiz sessions, ordered by most recent first
   */
  getAllSessions(): Promise<QuizSession[]>;

  /**
   * Saves a quiz session to storage.
   * If a session with the same ID exists, it will be updated.
   *
   * @param session - The quiz session to save
   */
  saveSession(session: QuizSession): Promise<void>;

  /**
   * Retrieves a specific quiz session by ID.
   *
   * @param sessionId - The ID of the session to retrieve
   * @returns The session or null if not found
   */
  getSessionById(sessionId: string): Promise<QuizSession | null>;

  // ========================================
  // Encyclopedia Methods
  // ========================================

  /**
   * Retrieves all encyclopedia entries from storage.
   * Returns empty array if no entries exist.
   *
   * @returns Array of all encyclopedia entries
   */
  getEncyclopedia(): Promise<EncyclopediaEntry[]>;

  /**
   * Adds a new encyclopedia entry to storage.
   * If an entry with the same ID or questionId already exists, it will not be added.
   *
   * @param entry - The encyclopedia entry to add
   */
  addEncyclopediaEntry(entry: EncyclopediaEntry): Promise<void>;

  /**
   * Retrieves a specific encyclopedia entry by ID.
   *
   * @param entryId - The ID of the entry to retrieve
   * @returns The entry or null if not found
   */
  getEncyclopediaEntry(entryId: string): Promise<EncyclopediaEntry | null>;

  // ========================================
  // Category Access Methods
  // ========================================

  /**
   * Retrieves all category access records from storage.
   * If no records exist, initializes with default access (GENERAL unlocked).
   *
   * @returns Array of category access records for all categories
   */
  getCategoryAccess(): Promise<CategoryAccess[]>;

  /**
   * Updates category access for a specific category.
   * Can be used to unlock categories, update stats, etc.
   *
   * @param categoryId - The category to update
   * @param updates - Partial updates to apply to the category access record
   */
  updateCategoryAccess(
    categoryId: QuizCategory,
    updates: Partial<CategoryAccess>
  ): Promise<void>;

  // ========================================
  // Achievement Methods
  // ========================================

  /**
   * Retrieves all achievements from storage.
   * Returns empty array if no achievements exist.
   *
   * @returns Array of all achievements (unlocked and locked)
   */
  getAchievements(): Promise<Achievement[]>;

  /**
   * Unlocks a specific achievement by setting its unlockedAt timestamp.
   * If achievement is already unlocked, does nothing.
   *
   * @param achievementId - The ID of the achievement to unlock
   */
  unlockAchievement(achievementId: string): Promise<void>;
}
