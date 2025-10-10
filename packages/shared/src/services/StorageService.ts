/**
 * StorageService Interface
 *
 * Provides a unified storage abstraction for platform-specific implementations.
 * - Mobile: AsyncStorage (@react-native-async-storage/async-storage)
 * - Web: LocalStorage (browser localStorage API)
 *
 * All methods are async to ensure consistent API across platforms.
 */

export interface StorageService {
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
}
