/**
 * AudioService Interface
 *
 * Platform-agnostic audio playback service.
 * Web implementation uses Web Audio API.
 * Mobile implementation uses expo-av.
 */

export enum SoundEffect {
  CORRECT_ANSWER = 'correct',
  WRONG_ANSWER = 'wrong',
  BUTTON_CLICK = 'click',
  LEVEL_UP = 'levelup',
  ACHIEVEMENT_UNLOCK = 'achievement',
  QUIZ_START = 'start',
  QUIZ_COMPLETE = 'complete',
}

export interface AudioService {
  /**
   * Play a sound effect
   * @param effect - The sound effect to play
   */
  play(effect: SoundEffect): Promise<void>;

  /**
   * Enable or disable audio
   * @param enabled - Whether audio should be enabled
   */
  setEnabled(enabled: boolean): void;

  /**
   * Check if audio is enabled
   * @returns Whether audio is currently enabled
   */
  isEnabled(): boolean;

  /**
   * Set the volume (0.0 to 1.0)
   * @param volume - Volume level
   */
  setVolume(volume: number): void;

  /**
   * Preload all sound effects
   * Should be called on app initialization
   */
  preloadSounds(): Promise<void>;

  /**
   * Clean up resources
   */
  cleanup(): void;
}
