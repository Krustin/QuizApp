/**
 * ID Generation Utility
 *
 * Provides simple unique ID generation for client-side only apps.
 * This is a lightweight alternative to UUID libraries like 'uuid' or 'nanoid'.
 */

/**
 * Generates a simple unique ID based on timestamp and random number.
 * Format: {timestamp}-{randomString}
 *
 * @returns A unique string ID
 * @example
 * generateSimpleId() // "1696789123456-x7k2p9q"
 */
export function generateSimpleId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
