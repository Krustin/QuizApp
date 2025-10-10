/**
 * Storage Service Export for Web
 * Re-exports the LocalStorageImpl singleton instance
 */

import storageServiceInstance from './storage/LocalStorageImpl';

export const storageService = storageServiceInstance;
