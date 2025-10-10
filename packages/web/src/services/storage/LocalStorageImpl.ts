/**
 * LocalStorageImpl - Web Storage Implementation
 *
 * Implements StorageService interface using browser's localStorage API.
 * Provides persistent, synchronous (wrapped in async) storage for web platform.
 *
 * Key features:
 * - Automatic JSON serialization/deserialization
 * - Comprehensive error handling
 * - Type-safe operations
 * - 5MB storage limit (browser dependent)
 * - Synchronous API wrapped in Promises for interface consistency
 */

import type { StorageService } from '@quiz/shared/services/StorageService';

class LocalStorageImpl implements StorageService {
  /**
   * Checks if localStorage is available in the current environment.
   * Useful for SSR scenarios or when localStorage is disabled.
   *
   * @returns true if localStorage is available
   */
  private isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Saves data to localStorage.
   * Data is automatically serialized to JSON string.
   *
   * @param key - The storage key
   * @param data - The data to store
   * @throws Error if localStorage is unavailable or if operation fails
   */
  async save<T>(key: string, data: T): Promise<void> {
    try {
      if (!this.isAvailable()) {
        throw new Error('localStorage is not available');
      }

      const jsonValue = JSON.stringify(data);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`[LocalStorageImpl] Error saving data for key "${key}":`, error);

      // Check for quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        throw new Error('localStorage quota exceeded. Consider clearing old data.');
      }

      throw new Error(`Failed to save data to localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Loads data from localStorage.
   * Automatically parses JSON string back to object.
   *
   * @param key - The storage key
   * @returns The stored data or null if not found
   * @throws Error if localStorage is unavailable or deserialization fails
   */
  async load<T>(key: string): Promise<T | null> {
    try {
      if (!this.isAvailable()) {
        throw new Error('localStorage is not available');
      }

      const jsonValue = localStorage.getItem(key);

      if (jsonValue === null) {
        return null;
      }

      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`[LocalStorageImpl] Error loading data for key "${key}":`, error);
      throw new Error(`Failed to load data from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Deletes a single item from localStorage.
   *
   * @param key - The storage key to delete
   * @throws Error if localStorage is unavailable or operation fails
   */
  async delete(key: string): Promise<void> {
    try {
      if (!this.isAvailable()) {
        throw new Error('localStorage is not available');
      }

      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[LocalStorageImpl] Error deleting key "${key}":`, error);
      throw new Error(`Failed to delete key from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Clears all data from localStorage.
   * WARNING: This removes ALL stored data in localStorage, not just quiz-related data.
   * This may affect other applications on the same domain.
   *
   * @throws Error if localStorage is unavailable or operation fails
   */
  async clear(): Promise<void> {
    try {
      if (!this.isAvailable()) {
        throw new Error('localStorage is not available');
      }

      localStorage.clear();
    } catch (error) {
      console.error('[LocalStorageImpl] Error clearing localStorage:', error);
      throw new Error(`Failed to clear localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Returns all storage keys currently in localStorage.
   * Useful for debugging and selective data operations.
   *
   * @returns Array of all storage keys
   * @throws Error if localStorage is unavailable or operation fails
   */
  async getAllKeys(): Promise<string[]> {
    try {
      if (!this.isAvailable()) {
        throw new Error('localStorage is not available');
      }

      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
          keys.push(key);
        }
      }

      return keys;
    } catch (error) {
      console.error('[LocalStorageImpl] Error getting all keys:', error);
      throw new Error(`Failed to get all keys from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export default new LocalStorageImpl();
