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
}

// Export singleton instance
export default new AsyncStorageImpl();
