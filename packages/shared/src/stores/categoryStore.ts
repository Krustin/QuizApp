import { create } from 'zustand';
import type { CategoryAccess } from '../models';
import { QuizCategory } from '../models';
import type { StorageService } from '../services/StorageService';

/**
 * Category Store State Interface
 * Manages category access, unlocking, and progress tracking
 */
export interface CategoryStoreState {
  // State
  categoryAccess: CategoryAccess[];
  isLoading: boolean;

  // Actions
  /**
   * Loads category access records from storage
   * Initializes with GENERAL unlocked if no data exists
   */
  loadCategoryAccess: () => Promise<void>;

  /**
   * Unlocks a category for the user
   * Sets isUnlocked to true and purchasedAt to current date
   *
   * @param category - The category to unlock
   */
  unlockCategory: (category: QuizCategory) => Promise<void>;

  /**
   * Updates progress statistics for a category
   * Increments questions answered and correct answers
   *
   * @param category - The category to update
   * @param questionsAnswered - Number of questions answered to add
   * @param correctAnswers - Number of correct answers to add
   */
  updateProgress: (
    category: QuizCategory,
    questionsAnswered: number,
    correctAnswers: number
  ) => Promise<void>;

  /**
   * Resets progress for a specific category
   * Sets questionsAnswered and correctAnswers back to 0
   *
   * @param category - The category to reset
   */
  resetCategoryProgress: (category: QuizCategory) => Promise<void>;

  // Computed values
  /**
   * Gets all unlocked categories
   */
  unlockedCategories: () => CategoryAccess[];

  /**
   * Gets all locked categories
   */
  lockedCategories: () => CategoryAccess[];

  /**
   * Gets a specific category access record by category name
   *
   * @param category - The category to find
   */
  getCategoryByName: (category: QuizCategory) => CategoryAccess | undefined;

  /**
   * Gets total number of questions answered across all categories
   */
  totalQuestionsAnswered: () => number;
}

/**
 * Initial category access state - UPDATED (Phase 3)
 * New surreal categories are unlocked by default for testing
 * Legacy categories remain locked until IAP
 */
const INITIAL_CATEGORY_ACCESS: CategoryAccess[] = [
  // New surreal categories (unlocked by default for testing)
  {
    categoryId: QuizCategory.SKURRILES_SURREAL,
    isUnlocked: true, // Phase 3: Unlocked by default
    purchasedAt: new Date(),
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.WISSENSCHAFT_SURREAL,
    isUnlocked: true, // Phase 3: Unlocked by default
    purchasedAt: new Date(),
    questionsAnswered: 0,
    correctAnswers: 0,
  },

  // Legacy categories (for backward compatibility)
  {
    categoryId: QuizCategory.GENERAL,
    isUnlocked: true,
    purchasedAt: new Date(),
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.SKURRILES,
    isUnlocked: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.WISSENSCHAFT,
    isUnlocked: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.GESCHICHTE,
    isUnlocked: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.POPKULTUR,
    isUnlocked: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.TIERWISSEN,
    isUnlocked: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  },
  {
    categoryId: QuizCategory.TECHNIK,
    isUnlocked: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  },
];

/**
 * Creates the category store with the provided storage service
 *
 * @param storageService - The storage service instance for persistence
 * @returns Zustand store hook for category state management
 *
 * @example
 * ```typescript
 * const useCategoryStore = createCategoryStore(storageService);
 *
 * function MyComponent() {
 *   const { categoryAccess, loadCategoryAccess, unlockCategory } = useCategoryStore();
 *
 *   useEffect(() => {
 *     loadCategoryAccess();
 *   }, []);
 *
 *   const handleUnlock = async () => {
 *     await unlockCategory(QuizCategory.WISSENSCHAFT);
 *   };
 *
 *   return <button onClick={handleUnlock}>Unlock Science</button>;
 * }
 * ```
 */
export const createCategoryStore = (storageService: StorageService) => {
  return create<CategoryStoreState>((set, get) => ({
    // Initial state
    categoryAccess: [],
    isLoading: false,

    // Actions
    loadCategoryAccess: async () => {
      set({ isLoading: true });
      try {
        let categoryAccess = await storageService.getCategoryAccess();

        // If no data exists, initialize with default access (GENERAL unlocked)
        if (!categoryAccess || categoryAccess.length === 0) {
          categoryAccess = INITIAL_CATEGORY_ACCESS;

          // Save initial state to storage
          for (const category of categoryAccess) {
            await storageService.updateCategoryAccess(category.categoryId, {
              isUnlocked: category.isUnlocked,
              purchasedAt: category.purchasedAt,
              questionsAnswered: category.questionsAnswered,
              correctAnswers: category.correctAnswers,
            });
          }
        }

        set({ categoryAccess, isLoading: false });
      } catch (error) {
        console.error('Failed to load category access:', error);
        set({ isLoading: false });
        // Keep existing data on error
      }
    },

    unlockCategory: async (category: QuizCategory) => {
      try {
        const purchasedAt = new Date();

        // Update in storage
        await storageService.updateCategoryAccess(category, {
          isUnlocked: true,
          purchasedAt,
        });

        // Update local state
        set((state) => ({
          categoryAccess: state.categoryAccess.map((cat) =>
            cat.categoryId === category
              ? { ...cat, isUnlocked: true, purchasedAt }
              : cat
          ),
        }));
      } catch (error) {
        console.error(`Failed to unlock category ${category}:`, error);
        throw error;
      }
    },

    updateProgress: async (
      category: QuizCategory,
      questionsAnswered: number,
      correctAnswers: number
    ) => {
      try {
        const currentCategory = get().categoryAccess.find(
          (cat) => cat.categoryId === category
        );

        if (!currentCategory) {
          throw new Error(`Category ${category} not found`);
        }

        const updatedQuestionsAnswered =
          currentCategory.questionsAnswered + questionsAnswered;
        const updatedCorrectAnswers =
          currentCategory.correctAnswers + correctAnswers;

        // Update in storage
        await storageService.updateCategoryAccess(category, {
          questionsAnswered: updatedQuestionsAnswered,
          correctAnswers: updatedCorrectAnswers,
        });

        // Update local state
        set((state) => ({
          categoryAccess: state.categoryAccess.map((cat) =>
            cat.categoryId === category
              ? {
                  ...cat,
                  questionsAnswered: updatedQuestionsAnswered,
                  correctAnswers: updatedCorrectAnswers,
                }
              : cat
          ),
        }));
      } catch (error) {
        console.error(`Failed to update progress for ${category}:`, error);
        throw error;
      }
    },

    resetCategoryProgress: async (category: QuizCategory) => {
      try {
        // Update in storage
        await storageService.updateCategoryAccess(category, {
          questionsAnswered: 0,
          correctAnswers: 0,
        });

        // Update local state
        set((state) => ({
          categoryAccess: state.categoryAccess.map((cat) =>
            cat.categoryId === category
              ? { ...cat, questionsAnswered: 0, correctAnswers: 0 }
              : cat
          ),
        }));
      } catch (error) {
        console.error(`Failed to reset progress for ${category}:`, error);
        throw error;
      }
    },

    // Computed values
    unlockedCategories: () => {
      return get().categoryAccess.filter((cat) => cat.isUnlocked);
    },

    lockedCategories: () => {
      return get().categoryAccess.filter((cat) => !cat.isUnlocked);
    },

    getCategoryByName: (category: QuizCategory) => {
      return get().categoryAccess.find((cat) => cat.categoryId === category);
    },

    totalQuestionsAnswered: () => {
      return get().categoryAccess.reduce(
        (total, cat) => total + cat.questionsAnswered,
        0
      );
    },
  }));
};

export type CategoryStore = ReturnType<typeof createCategoryStore>;
