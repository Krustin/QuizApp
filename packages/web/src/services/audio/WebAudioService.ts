/**
 * WebAudioService - Web Audio API implementation
 *
 * Uses Web Audio API for sound playback on web platform.
 * Sounds are stored as base64-encoded data URLs for simplicity.
 */

import type { AudioService, SoundEffect } from '@quiz/shared';
import { SoundEffect as SE } from '@quiz/shared';

// Simple beep sounds as base64 data URLs (placeholder - to be replaced with actual sound files)
const SOUND_DATA: Record<SoundEffect, string> = {
  [SE.CORRECT_ANSWER]: generateTone(800, 0.2, 'sine'), // High pleasant tone
  [SE.WRONG_ANSWER]: generateTone(200, 0.3, 'sawtooth'), // Low harsh tone
  [SE.BUTTON_CLICK]: generateTone(400, 0.05, 'sine'), // Quick click
  [SE.LEVEL_UP]: generateTone(1000, 0.5, 'sine'), // Celebration tone
  [SE.ACHIEVEMENT_UNLOCK]: generateTone(1200, 0.4, 'triangle'), // Achievement chime
  [SE.QUIZ_START]: generateTone(600, 0.2, 'sine'), // Start tone
  [SE.QUIZ_COMPLETE]: generateTone(900, 0.3, 'sine'), // Complete tone
};

/**
 * Generate a simple tone as a data URL
 * This is a placeholder - in production, use actual sound files
 */
function generateTone(
  frequency: number,
  duration: number,
  type: OscillatorType
): string {
  return `tone:${frequency}:${duration}:${type}`;
}

export class WebAudioService implements AudioService {
  private enabled: boolean = true;
  private volume: number = 0.5;
  private audioContext: AudioContext | null = null;
  private loadedSounds: Map<SoundEffect, AudioBuffer> = new Map();

  constructor() {
    // Initialize AudioContext on first user interaction to avoid browser restrictions
    if (typeof window !== 'undefined') {
      // Create context on first user interaction
      const initAudio = () => {
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        }
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
      };

      document.addEventListener('click', initAudio, { once: true });
      document.addEventListener('touchstart', initAudio, { once: true });
    }
  }

  async play(effect: SoundEffect): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      // Initialize context if needed
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      // Resume context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // For now, generate simple tones using oscillator
      // In production, load actual audio files
      const soundData = SOUND_DATA[effect];
      if (soundData.startsWith('tone:')) {
        await this.playTone(soundData);
      }
    } catch (error) {
      console.warn('[WebAudioService] Failed to play sound:', error);
    }
  }

  private async playTone(toneData: string): Promise<void> {
    if (!this.audioContext) return;

    const [, freq, dur, type] = toneData.split(':');
    const frequency = parseInt(freq, 10);
    const duration = parseFloat(dur);
    const oscillatorType = type as OscillatorType;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = oscillatorType;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;

    // Store preference in localStorage
    try {
      localStorage.setItem('quiz_audio_enabled', JSON.stringify(enabled));
    } catch (error) {
      console.warn('[WebAudioService] Failed to save audio preference:', error);
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));

    // Store preference in localStorage
    try {
      localStorage.setItem('quiz_audio_volume', JSON.stringify(this.volume));
    } catch (error) {
      console.warn('[WebAudioService] Failed to save volume preference:', error);
    }
  }

  async preloadSounds(): Promise<void> {
    // Load audio preferences from localStorage
    try {
      const savedEnabled = localStorage.getItem('quiz_audio_enabled');
      if (savedEnabled !== null) {
        this.enabled = JSON.parse(savedEnabled);
      }

      const savedVolume = localStorage.getItem('quiz_audio_volume');
      if (savedVolume !== null) {
        this.volume = JSON.parse(savedVolume);
      }
    } catch (error) {
      console.warn('[WebAudioService] Failed to load audio preferences:', error);
    }

    // In production, preload actual audio files here
    console.log('[WebAudioService] Audio preferences loaded');
  }

  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.loadedSounds.clear();
  }
}

// Singleton instance
export const webAudioService = new WebAudioService();
