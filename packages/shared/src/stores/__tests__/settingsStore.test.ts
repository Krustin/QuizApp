/**
 * Settings Store Tests
 *
 * Comprehensive test suite for settingsStore.ts
 * Tests all actions, persistence, and edge cases
 */

import { useSettingsStore, setStorageService, Settings } from '../settingsStore';
import { MockStorageImpl } from '../../services/__tests__/MockStorageImpl';
import { STORAGE_KEYS } from '../../constants/storageKeys';

describe('settingsStore', () => {
  let storage: MockStorageImpl;

  beforeEach(() => {
    // Create fresh mock storage
    storage = new MockStorageImpl();
    setStorageService(storage);

    // Reset zustand store to initial state
    useSettingsStore.setState({
      soundEnabled: true,
      vibrationEnabled: true,
      theme: 'light',
      language: 'de',
      difficultySetting: 'mixed',
      questionsPerSession: 12,
    });
  });

  afterEach(() => {
    storage.reset();
  });

  describe('Default State', () => {
    it('should have correct default settings', () => {
      const state = useSettingsStore.getState();

      expect(state.soundEnabled).toBe(true);
      expect(state.vibrationEnabled).toBe(true);
      expect(state.theme).toBe('light');
      expect(state.language).toBe('de');
      expect(state.difficultySetting).toBe('mixed');
      expect(state.questionsPerSession).toBe(12);
    });
  });

  describe('toggleSound', () => {
    it('should toggle sound from true to false', async () => {
      const { toggleSound } = useSettingsStore.getState();

      toggleSound();

      const state = useSettingsStore.getState();
      expect(state.soundEnabled).toBe(false);
    });

    it('should toggle sound from false to true', async () => {
      useSettingsStore.setState({ soundEnabled: false });

      const { toggleSound } = useSettingsStore.getState();
      toggleSound();

      const state = useSettingsStore.getState();
      expect(state.soundEnabled).toBe(true);
    });

    it('should persist sound setting to storage', async () => {
      const { toggleSound } = useSettingsStore.getState();

      toggleSound();

      // Give time for async persistence
      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings).toBeTruthy();
      expect(savedSettings?.soundEnabled).toBe(false);
    });
  });

  describe('toggleVibration', () => {
    it('should toggle vibration from true to false', () => {
      const { toggleVibration } = useSettingsStore.getState();

      toggleVibration();

      const state = useSettingsStore.getState();
      expect(state.vibrationEnabled).toBe(false);
    });

    it('should toggle vibration from false to true', () => {
      useSettingsStore.setState({ vibrationEnabled: false });

      const { toggleVibration } = useSettingsStore.getState();
      toggleVibration();

      const state = useSettingsStore.getState();
      expect(state.vibrationEnabled).toBe(true);
    });

    it('should persist vibration setting to storage', async () => {
      const { toggleVibration } = useSettingsStore.getState();

      toggleVibration();

      // Give time for async persistence
      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings?.vibrationEnabled).toBe(false);
    });
  });

  describe('setTheme', () => {
    it('should change theme to dark', () => {
      const { setTheme } = useSettingsStore.getState();

      setTheme('dark');

      const state = useSettingsStore.getState();
      expect(state.theme).toBe('dark');
    });

    it('should change theme to light', () => {
      useSettingsStore.setState({ theme: 'dark' });

      const { setTheme } = useSettingsStore.getState();
      setTheme('light');

      const state = useSettingsStore.getState();
      expect(state.theme).toBe('light');
    });

    it('should persist theme to storage', async () => {
      const { setTheme } = useSettingsStore.getState();

      setTheme('dark');

      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings?.theme).toBe('dark');
    });
  });

  describe('setLanguage', () => {
    it('should change language to English', () => {
      const { setLanguage } = useSettingsStore.getState();

      setLanguage('en');

      const state = useSettingsStore.getState();
      expect(state.language).toBe('en');
    });

    it('should change language to German', () => {
      useSettingsStore.setState({ language: 'en' });

      const { setLanguage } = useSettingsStore.getState();
      setLanguage('de');

      const state = useSettingsStore.getState();
      expect(state.language).toBe('de');
    });

    it('should persist language to storage', async () => {
      const { setLanguage } = useSettingsStore.getState();

      setLanguage('en');

      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings?.language).toBe('en');
    });
  });

  describe('setDifficulty', () => {
    it('should change difficulty to easy', () => {
      const { setDifficulty } = useSettingsStore.getState();

      setDifficulty('easy');

      const state = useSettingsStore.getState();
      expect(state.difficultySetting).toBe('easy');
    });

    it('should change difficulty to medium', () => {
      const { setDifficulty } = useSettingsStore.getState();

      setDifficulty('medium');

      const state = useSettingsStore.getState();
      expect(state.difficultySetting).toBe('medium');
    });

    it('should change difficulty to hard', () => {
      const { setDifficulty } = useSettingsStore.getState();

      setDifficulty('hard');

      const state = useSettingsStore.getState();
      expect(state.difficultySetting).toBe('hard');
    });

    it('should change difficulty to mixed', () => {
      useSettingsStore.setState({ difficultySetting: 'easy' });

      const { setDifficulty } = useSettingsStore.getState();
      setDifficulty('mixed');

      const state = useSettingsStore.getState();
      expect(state.difficultySetting).toBe('mixed');
    });

    it('should persist difficulty to storage', async () => {
      const { setDifficulty } = useSettingsStore.getState();

      setDifficulty('hard');

      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings?.difficultySetting).toBe('hard');
    });
  });

  describe('setQuestionsPerSession', () => {
    it('should change questions per session to 6', () => {
      const { setQuestionsPerSession } = useSettingsStore.getState();

      setQuestionsPerSession(6);

      const state = useSettingsStore.getState();
      expect(state.questionsPerSession).toBe(6);
    });

    it('should change questions per session to 24', () => {
      const { setQuestionsPerSession } = useSettingsStore.getState();

      setQuestionsPerSession(24);

      const state = useSettingsStore.getState();
      expect(state.questionsPerSession).toBe(24);
    });

    it('should persist questions per session to storage', async () => {
      const { setQuestionsPerSession } = useSettingsStore.getState();

      setQuestionsPerSession(18);

      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings?.questionsPerSession).toBe(18);
    });
  });

  describe('loadSettings', () => {
    it('should load settings from storage', async () => {
      const savedSettings: Settings = {
        soundEnabled: false,
        vibrationEnabled: false,
        theme: 'dark',
        language: 'en',
        difficultySetting: 'hard',
        questionsPerSession: 24,
      };

      await storage.save(STORAGE_KEYS.SETTINGS, savedSettings);

      const { loadSettings } = useSettingsStore.getState();
      await loadSettings();

      const state = useSettingsStore.getState();
      expect(state.soundEnabled).toBe(false);
      expect(state.vibrationEnabled).toBe(false);
      expect(state.theme).toBe('dark');
      expect(state.language).toBe('en');
      expect(state.difficultySetting).toBe('hard');
      expect(state.questionsPerSession).toBe(24);
    });

    it('should keep default settings if storage is empty', async () => {
      const { loadSettings } = useSettingsStore.getState();
      await loadSettings();

      const state = useSettingsStore.getState();
      expect(state.soundEnabled).toBe(true);
      expect(state.vibrationEnabled).toBe(true);
      expect(state.theme).toBe('light');
      expect(state.language).toBe('de');
      expect(state.difficultySetting).toBe('mixed');
      expect(state.questionsPerSession).toBe(12);
    });

    it('should handle storage errors gracefully', async () => {
      // Mock a storage error by setting invalid data
      storage.setRawData(STORAGE_KEYS.SETTINGS, 'invalid json');

      const { loadSettings } = useSettingsStore.getState();
      await loadSettings();

      // Should keep current state on error
      const state = useSettingsStore.getState();
      expect(state).toBeTruthy();
    });
  });

  describe('resetSettings', () => {
    it('should reset all settings to defaults', async () => {
      // Set non-default values
      useSettingsStore.setState({
        soundEnabled: false,
        vibrationEnabled: false,
        theme: 'dark',
        language: 'en',
        difficultySetting: 'hard',
        questionsPerSession: 24,
      });

      const { resetSettings } = useSettingsStore.getState();
      await resetSettings();

      const state = useSettingsStore.getState();
      expect(state.soundEnabled).toBe(true);
      expect(state.vibrationEnabled).toBe(true);
      expect(state.theme).toBe('light');
      expect(state.language).toBe('de');
      expect(state.difficultySetting).toBe('mixed');
      expect(state.questionsPerSession).toBe(12);
    });

    it('should persist reset settings to storage', async () => {
      // Set non-default values
      useSettingsStore.setState({
        soundEnabled: false,
        vibrationEnabled: false,
        theme: 'dark',
        language: 'en',
        difficultySetting: 'hard',
        questionsPerSession: 24,
      });

      const { resetSettings } = useSettingsStore.getState();
      await resetSettings();

      await new Promise(resolve => setTimeout(resolve, 10));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings?.soundEnabled).toBe(true);
      expect(savedSettings?.vibrationEnabled).toBe(true);
      expect(savedSettings?.theme).toBe('light');
      expect(savedSettings?.language).toBe('de');
      expect(savedSettings?.difficultySetting).toBe('mixed');
      expect(savedSettings?.questionsPerSession).toBe(12);
    });
  });

  describe('Persistence', () => {
    it('should persist all settings changes', async () => {
      const { toggleSound, setTheme, setLanguage, setDifficulty, setQuestionsPerSession } =
        useSettingsStore.getState();

      toggleSound();
      setTheme('dark');
      setLanguage('en');
      setDifficulty('easy');
      setQuestionsPerSession(18);

      await new Promise(resolve => setTimeout(resolve, 50));

      const savedSettings = await storage.load<Settings>(STORAGE_KEYS.SETTINGS);
      expect(savedSettings).toEqual({
        soundEnabled: false,
        vibrationEnabled: true,
        theme: 'dark',
        language: 'en',
        difficultySetting: 'easy',
        questionsPerSession: 18,
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing storage service gracefully', async () => {
      setStorageService(null);

      const { loadSettings } = useSettingsStore.getState();
      await loadSettings();

      // Should not throw error
      expect(useSettingsStore.getState()).toBeTruthy();
    });

    it('should handle rapid successive changes', async () => {
      const { toggleSound } = useSettingsStore.getState();

      toggleSound();
      toggleSound();
      toggleSound();
      toggleSound();

      const state = useSettingsStore.getState();
      expect(state.soundEnabled).toBe(true); // Should be back to original after 4 toggles
    });
  });
});
