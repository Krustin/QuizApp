import { create } from 'zustand';
import type { UserProfile } from '../models/User';
import { QuizCategory } from '../models/Enums';
import type { StorageService } from '../services/StorageService';

/**
 * UserStore State Interface
 * Manages user profile data and operations
 */
interface UserStore {
  // ========================================
  // State
  // ========================================

  /** Current user profile (null if not loaded yet) */
  userProfile: UserProfile | null;

  /** Loading state for async operations */
  isLoading: boolean;

  /** Error message from last operation (null if no error) */
  error: string | null;

  // ========================================
  // Actions
  // ========================================

  /**
   * Loads user profile from storage.
   * If no profile exists, creates a new default profile for first-time user.
   * Sets isLoading during the operation.
   */
  loadUserProfile: (storageService: StorageService) => Promise<void>;

  /**
   * Updates user's total points and checks for level-up.
   * Automatically calls levelUp() if user has earned enough points.
   *
   * @param points - Number of points to add (typically 10 per correct answer)
   */
  updatePoints: (points: number, storageService: StorageService) => Promise<void>;

  /**
   * Increments user's level by 1.
   * Called automatically by updatePoints when threshold is reached.
   */
  levelUp: (storageService: StorageService) => Promise<void>;

  /**
   * Updates the user's current and longest streak based on answer correctness.
   *
   * @param correct - Whether the answer was correct (true) or wrong (false)
   */
  updateStreak: (correct: boolean, storageService: StorageService) => Promise<void>;

  /**
   * Updates the user's accuracy statistics (questionsAnswered and correctAnswers).
   *
   * @param correct - Whether the answer was correct (true) or wrong (false)
   */
  updateAccuracy: (correct: boolean, storageService: StorageService) => Promise<void>;

  /**
   * Unlocks a new quiz category for the user.
   * Adds the category to unlockedCategories if not already present.
   *
   * @param category - The category to unlock
   */
  unlockCategory: (category: QuizCategory, storageService: StorageService) => Promise<void>;

  /**
   * Resets the user profile to default state.
   * Creates a new first-time user profile and persists it.
   */
  resetProfile: (storageService: StorageService) => Promise<void>;

  // ========================================
  // Computed Values
  // ========================================

  /**
   * Calculates points needed to reach the next level.
   * Formula: (currentLevel * 500) - totalPoints
   *
   * @returns Number of points needed, or 0 if no profile loaded
   */
  pointsToNextLevel: () => number;

  /**
   * Calculates the user's overall accuracy rate.
   * Formula: correctAnswers / questionsAnswered
   *
   * @returns Accuracy as a decimal (0.0 to 1.0), or 0 if no questions answered
   */
  accuracyRate: () => number;
}

/**
 * Creates a default user profile for first-time users
 */
const createDefaultProfile = (): UserProfile => {
  const now = new Date();
  return {
    userId: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    username: 'QuizMaster',
    totalPoints: 0,
    currentLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    unlockedCategories: [QuizCategory.GENERAL], // GENERAL is unlocked by default
    achievements: [],
    sessionsPlayed: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    createdAt: now,
    lastPlayedAt: now,
  };
};

/**
 * UserStore - Zustand store for user profile management
 *
 * Features:
 * - Loads user profile from storage or creates default for new users
 * - Manages points, levels, streaks, and accuracy tracking
 * - Auto-persists all changes to storage
 * - Provides computed values for UI (pointsToNextLevel, accuracyRate)
 *
 * Usage:
 * ```typescript
 * const { userProfile, loadUserProfile, updatePoints } = useUserStore();
 *
 * // Load profile on app start
 * await loadUserProfile(storageService);
 *
 * // Update points after correct answer
 * await updatePoints(10, storageService);
 * ```
 */
export const useUserStore = create<UserStore>((set, get) => ({
  // ========================================
  // Initial State
  // ========================================
  userProfile: null,
  isLoading: false,
  error: null,

  // ========================================
  // Actions
  // ========================================

  loadUserProfile: async (storageService: StorageService) => {
    set({ isLoading: true, error: null });
    try {
      let profile = await storageService.getUserProfile();

      // If no profile exists, create default for first-time user
      if (!profile) {
        profile = createDefaultProfile();
        await storageService.saveUserProfile(profile);
      }

      set({ userProfile: profile, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load user profile';
      set({ error: errorMessage, isLoading: false });
      console.error('Error loading user profile:', error);
    }
  },

  updatePoints: async (points: number, storageService: StorageService) => {
    const { userProfile } = get();
    if (!userProfile) {
      set({ error: 'No user profile loaded' });
      return;
    }

    try {
      const newTotalPoints = userProfile.totalPoints + points;
      const oldLevel = userProfile.currentLevel;
      const newLevel = Math.floor(newTotalPoints / 500) + 1;

      const updatedProfile: UserProfile = {
        ...userProfile,
        totalPoints: newTotalPoints,
        currentLevel: newLevel,
        lastPlayedAt: new Date(),
      };

      await storageService.saveUserProfile(updatedProfile);
      set({ userProfile: updatedProfile, error: null });

      // Check if level-up occurred
      if (newLevel > oldLevel) {
        // Level-up already applied in the update above
        console.log(`Level up! Now at level ${newLevel}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update points';
      set({ error: errorMessage });
      console.error('Error updating points:', error);
    }
  },

  levelUp: async (storageService: StorageService) => {
    const { userProfile } = get();
    if (!userProfile) {
      set({ error: 'No user profile loaded' });
      return;
    }

    try {
      const updatedProfile: UserProfile = {
        ...userProfile,
        currentLevel: userProfile.currentLevel + 1,
        lastPlayedAt: new Date(),
      };

      await storageService.saveUserProfile(updatedProfile);
      set({ userProfile: updatedProfile, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to level up';
      set({ error: errorMessage });
      console.error('Error leveling up:', error);
    }
  },

  updateStreak: async (correct: boolean, storageService: StorageService) => {
    const { userProfile } = get();
    if (!userProfile) {
      set({ error: 'No user profile loaded' });
      return;
    }

    try {
      let newCurrentStreak: number;
      let newLongestStreak: number;

      if (correct) {
        // Increment streak on correct answer
        newCurrentStreak = userProfile.currentStreak + 1;
        newLongestStreak = Math.max(newCurrentStreak, userProfile.longestStreak);
      } else {
        // Reset streak on wrong answer
        newCurrentStreak = 0;
        newLongestStreak = userProfile.longestStreak;
      }

      const updatedProfile: UserProfile = {
        ...userProfile,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastPlayedAt: new Date(),
      };

      await storageService.saveUserProfile(updatedProfile);
      set({ userProfile: updatedProfile, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update streak';
      set({ error: errorMessage });
      console.error('Error updating streak:', error);
    }
  },

  updateAccuracy: async (correct: boolean, storageService: StorageService) => {
    const { userProfile } = get();
    if (!userProfile) {
      set({ error: 'No user profile loaded' });
      return;
    }

    try {
      const updatedProfile: UserProfile = {
        ...userProfile,
        questionsAnswered: userProfile.questionsAnswered + 1,
        correctAnswers: correct ? userProfile.correctAnswers + 1 : userProfile.correctAnswers,
        lastPlayedAt: new Date(),
      };

      await storageService.saveUserProfile(updatedProfile);
      set({ userProfile: updatedProfile, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update accuracy';
      set({ error: errorMessage });
      console.error('Error updating accuracy:', error);
    }
  },

  unlockCategory: async (category: QuizCategory, storageService: StorageService) => {
    const { userProfile } = get();
    if (!userProfile) {
      set({ error: 'No user profile loaded' });
      return;
    }

    try {
      // Check if category is already unlocked
      if (userProfile.unlockedCategories.includes(category)) {
        return; // Already unlocked, no need to update
      }

      const updatedProfile: UserProfile = {
        ...userProfile,
        unlockedCategories: [...userProfile.unlockedCategories, category],
        lastPlayedAt: new Date(),
      };

      await storageService.saveUserProfile(updatedProfile);
      set({ userProfile: updatedProfile, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unlock category';
      set({ error: errorMessage });
      console.error('Error unlocking category:', error);
    }
  },

  resetProfile: async (storageService: StorageService) => {
    set({ isLoading: true, error: null });
    try {
      const newProfile = createDefaultProfile();
      await storageService.saveUserProfile(newProfile);
      set({ userProfile: newProfile, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset profile';
      set({ error: errorMessage, isLoading: false });
      console.error('Error resetting profile:', error);
    }
  },

  // ========================================
  // Computed Values
  // ========================================

  pointsToNextLevel: () => {
    const { userProfile } = get();
    if (!userProfile) return 0;

    const pointsForNextLevel = userProfile.currentLevel * 500;
    const pointsNeeded = pointsForNextLevel - userProfile.totalPoints;
    return Math.max(0, pointsNeeded);
  },

  accuracyRate: () => {
    const { userProfile } = get();
    if (!userProfile || userProfile.questionsAnswered === 0) return 0;

    return userProfile.correctAnswers / userProfile.questionsAnswered;
  },
}));

export type { UserStore };
