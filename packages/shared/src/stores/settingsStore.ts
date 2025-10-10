/**
 * Settings Store
 *
 * Zustand store for managing user settings and preferences.
 * Automatically persists changes to storage using StorageService.
 *
 * Features:
 * - Sound effects toggle
 * - Vibration feedback toggle
 * - Theme selection (light/dark)
 * - Language selection (de/en)
 * - Difficulty preference
 * - Questions per session customization
 * - Auto-persistence to storage
 */

import { create } from 'zustand';
import { STORAGE_KEYS } from '../constants/storageKeys';

// Types
export type Theme = 'light' | 'dark';
export type Language = 'de' | 'en';
export type DifficultyLevel = 'mixed' | 'easy' | 'medium' | 'hard';

export interface Settings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: Theme;
  language: Language;
  difficultySetting: DifficultyLevel;
  questionsPerSession: number;
}

interface SettingsStore extends Settings {
  // Actions
  toggleSound: () => void;
  toggleVibration: () => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  setQuestionsPerSession: (count: number) => void;
  loadSettings: () => Promise<void>;
  resetSettings: () => Promise<void>;
}

// Default settings
const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  vibrationEnabled: true,
  theme: 'light',
  language: 'de',
  difficultySetting: 'mixed',
  questionsPerSession: 12,
};

// Storage service will be injected via setter
let storageService: any = null;

/**
 * Sets the storage service instance for the settings store.
 * Must be called before using loadSettings or resetSettings.
 */
export const setStorageService = (service: any) => {
  storageService = service;
};

/**
 * Persists current settings to storage
 */
const persistSettings = async (settings: Settings) => {
  if (!storageService) {
    console.warn('StorageService not set. Settings will not be persisted.');
    return;
  }
  try {
    await storageService.save(STORAGE_KEYS.SETTINGS, settings);
  } catch (error) {
    console.error('Failed to persist settings:', error);
  }
};

/**
 * Settings Store Hook
 *
 * Usage:
 * ```typescript
 * const { soundEnabled, toggleSound } = useSettingsStore();
 * ```
 */
export const useSettingsStore = create<SettingsStore>((set, get) => ({
  // Initial state
  ...DEFAULT_SETTINGS,

  // Actions
  toggleSound: () => {
    set((state) => {
      const newState = { soundEnabled: !state.soundEnabled };
      persistSettings({ ...state, ...newState });
      return newState;
    });
  },

  toggleVibration: () => {
    set((state) => {
      const newState = { vibrationEnabled: !state.vibrationEnabled };
      persistSettings({ ...state, ...newState });
      return newState;
    });
  },

  setTheme: (theme: Theme) => {
    set((state) => {
      const newState = { theme };
      persistSettings({ ...state, ...newState });
      return newState;
    });
  },

  setLanguage: (language: Language) => {
    set((state) => {
      const newState = { language };
      persistSettings({ ...state, ...newState });
      return newState;
    });
  },

  setDifficulty: (difficulty: DifficultyLevel) => {
    set((state) => {
      const newState = { difficultySetting: difficulty };
      persistSettings({ ...state, ...newState });
      return newState;
    });
  },

  setQuestionsPerSession: (count: number) => {
    set((state) => {
      const newState = { questionsPerSession: count };
      persistSettings({ ...state, ...newState });
      return newState;
    });
  },

  loadSettings: async () => {
    if (!storageService) {
      console.warn('StorageService not set. Using default settings.');
      return;
    }

    try {
      const savedSettings = await storageService.load(STORAGE_KEYS.SETTINGS) as Settings | null;
      if (savedSettings) {
        set({
          soundEnabled: savedSettings.soundEnabled,
          vibrationEnabled: savedSettings.vibrationEnabled,
          theme: savedSettings.theme,
          language: savedSettings.language,
          difficultySetting: savedSettings.difficultySetting,
          questionsPerSession: savedSettings.questionsPerSession,
        });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  },

  resetSettings: async () => {
    set(DEFAULT_SETTINGS);
    await persistSettings(DEFAULT_SETTINGS);
  },
}));
