/**
 * Storage Service Export for Mobile
 * Exports the AsyncStorageImpl as the default storage service for mobile
 */

import AsyncStorageImpl from './storage/AsyncStorageImpl';

export const storageService = new AsyncStorageImpl();
