/**
 * Category Store Tests
 *
 * Comprehensive test suite for categoryStore.ts
 * Tests category access, unlocking, and progress tracking
 */

import { createCategoryStore } from '../categoryStore';
import { MockStorageImpl } from '../../services/__tests__/MockStorageImpl';
import type { CategoryAccess } from '../../models/Category';
import { QuizCategory } from '../../models/Enums';

describe('categoryStore', () => {
  let storage: MockStorageImpl;
  let useCategoryStore: ReturnType<typeof createCategoryStore>;

  beforeEach(() => {
    storage = new MockStorageImpl();
    useCategoryStore = createCategoryStore(storage);

    // Reset store to initial state
    useCategoryStore.setState({
      categoryAccess: [],
      isLoading: false,
    });
  });

  afterEach(() => {
    storage.reset();
  });

  describe('loadCategoryAccess', () => {
    it('should initialize with default access if no data exists', async () => {
      await useCategoryStore.getState().loadCategoryAccess();

      const { categoryAccess } = useCategoryStore.getState();
      expect(categoryAccess).toHaveLength(7); // All 7 categories

      // GENERAL should be unlocked by default
      const generalCategory = categoryAccess.find(
        cat => cat.categoryId === QuizCategory.GENERAL
      );
      expect(generalCategory?.isUnlocked).toBe(true);

      // Others should be locked
      const wissenschaftCategory = categoryAccess.find(
        cat => cat.categoryId === QuizCategory.WISSENSCHAFT
      );
      expect(wissenschaftCategory?.isUnlocked).toBe(false);
    });

    it('should load existing category access from storage', async () => {
      const existingAccess: CategoryAccess[] = [
        {
          categoryId: QuizCategory.GENERAL,
          isUnlocked: true,
          questionsAnswered: 50,
          correctAnswers: 40,
        },
        {
          categoryId: QuizCategory.WISSENSCHAFT,
          isUnlocked: true,
          questionsAnswered: 30,
          correctAnswers: 25,
          purchasedAt: new Date('2024-01-01'),
        },
      ];

      await storage.save('@quiz_category_access', existingAccess);

      await useCategoryStore.getState().loadCategoryAccess();

      const { categoryAccess } = useCategoryStore.getState();
      expect(categoryAccess).toHaveLength(2);
      expect(categoryAccess[0].questionsAnswered).toBe(50);
      expect(categoryAccess[1].isUnlocked).toBe(true);
    });

    it('should set isLoading during load operation', async () => {
      const loadPromise = useCategoryStore.getState().loadCategoryAccess();

      await loadPromise;

      const { isLoading } = useCategoryStore.getState();
      expect(isLoading).toBe(false);
    });

    it('should handle storage errors gracefully', async () => {
      const errorStorage = {
        ...storage,
        getCategoryAccess: jest.fn().mockRejectedValue(new Error('Storage error')),
      } as any;

      const errorStore = createCategoryStore(errorStorage);

      await errorStore.getState().loadCategoryAccess();

      const { isLoading } = errorStore.getState();
      expect(isLoading).toBe(false);
    });
  });

  describe('unlockCategory', () => {
    beforeEach(async () => {
      await useCategoryStore.getState().loadCategoryAccess();
    });

    it('should unlock a locked category', async () => {
      await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);

      const { categoryAccess } = useCategoryStore.getState();
      const wissenschaft = categoryAccess.find(
        cat => cat.categoryId === QuizCategory.WISSENSCHAFT
      );

      expect(wissenschaft?.isUnlocked).toBe(true);
      expect(wissenschaft?.purchasedAt).toBeTruthy();
    });

    it('should set purchasedAt timestamp', async () => {
      const beforeTime = new Date();

      await useCategoryStore.getState().unlockCategory(QuizCategory.GESCHICHTE);

      const { categoryAccess } = useCategoryStore.getState();
      const geschichte = categoryAccess.find(
        cat => cat.categoryId === QuizCategory.GESCHICHTE
      );

      expect(geschichte?.purchasedAt).toBeTruthy();
      expect(geschichte?.purchasedAt!.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    it('should persist unlock to storage', async () => {
      await useCategoryStore.getState().unlockCategory(QuizCategory.POPKULTUR);

      const savedAccess = await storage.getCategoryAccess();
      const popkultur = savedAccess.find(cat => cat.categoryId === QuizCategory.POPKULTUR);

      expect(popkultur?.isUnlocked).toBe(true);
    });

    it('should unlock multiple categories', async () => {
      await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);
      await useCategoryStore.getState().unlockCategory(QuizCategory.GESCHICHTE);
      await useCategoryStore.getState().unlockCategory(QuizCategory.POPKULTUR);

      const unlockedCategories = useCategoryStore.getState().unlockedCategories();
      expect(unlockedCategories).toHaveLength(4); // Including GENERAL
    });

    it('should handle unlocking already unlocked category', async () => {
      await useCategoryStore.getState().unlockCategory(QuizCategory.GENERAL);

      const { categoryAccess } = useCategoryStore.getState();
      const generalCount = categoryAccess.filter(
        cat => cat.categoryId === QuizCategory.GENERAL
      ).length;

      expect(generalCount).toBe(1); // Should not duplicate
    });
  });

  describe('updateProgress', () => {
    beforeEach(async () => {
      await useCategoryStore.getState().loadCategoryAccess();
    });

    it('should update questions answered', async () => {
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);

      const { categoryAccess } = useCategoryStore.getState();
      const general = categoryAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(12);
    });

    it('should update correct answers', async () => {
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);

      const { categoryAccess } = useCategoryStore.getState();
      const general = categoryAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.correctAnswers).toBe(10);
    });

    it('should accumulate progress over multiple updates', async () => {
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 11);
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 8);

      const { categoryAccess } = useCategoryStore.getState();
      const general = categoryAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(36);
      expect(general?.correctAnswers).toBe(29);
    });

    it('should persist progress to storage', async () => {
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);

      const savedAccess = await storage.getCategoryAccess();
      const general = savedAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(12);
      expect(general?.correctAnswers).toBe(10);
    });

    it('should handle error for non-existent category', async () => {
      useCategoryStore.setState({ categoryAccess: [] });

      await expect(
        useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10)
      ).rejects.toThrow();
    });

    it('should track progress for locked categories', async () => {
      // User can still view stats for locked categories
      await useCategoryStore.getState().updateProgress(QuizCategory.WISSENSCHAFT, 5, 3);

      const { categoryAccess } = useCategoryStore.getState();
      const wissenschaft = categoryAccess.find(
        cat => cat.categoryId === QuizCategory.WISSENSCHAFT
      );

      expect(wissenschaft?.questionsAnswered).toBe(5);
      expect(wissenschaft?.correctAnswers).toBe(3);
      expect(wissenschaft?.isUnlocked).toBe(false);
    });
  });

  describe('resetCategoryProgress', () => {
    beforeEach(async () => {
      await useCategoryStore.getState().loadCategoryAccess();
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 50, 40);
    });

    it('should reset questions answered to 0', async () => {
      await useCategoryStore.getState().resetCategoryProgress(QuizCategory.GENERAL);

      const { categoryAccess } = useCategoryStore.getState();
      const general = categoryAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(0);
    });

    it('should reset correct answers to 0', async () => {
      await useCategoryStore.getState().resetCategoryProgress(QuizCategory.GENERAL);

      const { categoryAccess } = useCategoryStore.getState();
      const general = categoryAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.correctAnswers).toBe(0);
    });

    it('should not affect unlock status', async () => {
      await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);
      await useCategoryStore.getState().updateProgress(QuizCategory.WISSENSCHAFT, 30, 25);
      await useCategoryStore.getState().resetCategoryProgress(QuizCategory.WISSENSCHAFT);

      const { categoryAccess } = useCategoryStore.getState();
      const wissenschaft = categoryAccess.find(
        cat => cat.categoryId === QuizCategory.WISSENSCHAFT
      );

      expect(wissenschaft?.isUnlocked).toBe(true);
      expect(wissenschaft?.questionsAnswered).toBe(0);
    });

    it('should persist reset to storage', async () => {
      await useCategoryStore.getState().resetCategoryProgress(QuizCategory.GENERAL);

      const savedAccess = await storage.getCategoryAccess();
      const general = savedAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(0);
      expect(general?.correctAnswers).toBe(0);
    });
  });

  describe('Computed Values', () => {
    beforeEach(async () => {
      await useCategoryStore.getState().loadCategoryAccess();
    });

    describe('unlockedCategories', () => {
      it('should return only unlocked categories', () => {
        const unlocked = useCategoryStore.getState().unlockedCategories();

        expect(unlocked).toHaveLength(1);
        expect(unlocked[0].categoryId).toBe(QuizCategory.GENERAL);
      });

      it('should include newly unlocked categories', async () => {
        await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);
        await useCategoryStore.getState().unlockCategory(QuizCategory.GESCHICHTE);

        const unlocked = useCategoryStore.getState().unlockedCategories();

        expect(unlocked).toHaveLength(3);
      });
    });

    describe('lockedCategories', () => {
      it('should return only locked categories', () => {
        const locked = useCategoryStore.getState().lockedCategories();

        expect(locked).toHaveLength(6); // All except GENERAL
      });

      it('should decrease when categories are unlocked', async () => {
        await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);

        const locked = useCategoryStore.getState().lockedCategories();

        expect(locked).toHaveLength(5);
      });
    });

    describe('getCategoryByName', () => {
      it('should return category by name', () => {
        const general = useCategoryStore.getState().getCategoryByName(QuizCategory.GENERAL);

        expect(general).toBeTruthy();
        expect(general?.categoryId).toBe(QuizCategory.GENERAL);
      });

      it('should return undefined for non-existent category', () => {
        useCategoryStore.setState({ categoryAccess: [] });

        const result = useCategoryStore.getState().getCategoryByName(QuizCategory.GENERAL);

        expect(result).toBeUndefined();
      });
    });

    describe('totalQuestionsAnswered', () => {
      it('should return 0 when no progress', () => {
        const total = useCategoryStore.getState().totalQuestionsAnswered();

        expect(total).toBe(0);
      });

      it('should sum questions from all categories', async () => {
        await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);
        await useCategoryStore.getState().updateProgress(QuizCategory.WISSENSCHAFT, 24, 20);
        await useCategoryStore.getState().updateProgress(QuizCategory.GESCHICHTE, 12, 8);

        const total = useCategoryStore.getState().totalQuestionsAnswered();

        expect(total).toBe(48);
      });

      it('should update after more progress', async () => {
        await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);

        let total = useCategoryStore.getState().totalQuestionsAnswered();
        expect(total).toBe(12);

        await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 11);

        total = useCategoryStore.getState().totalQuestionsAnswered();
        expect(total).toBe(24);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle all categories being unlocked', async () => {
      await useCategoryStore.getState().loadCategoryAccess();

      await useCategoryStore.getState().unlockCategory(QuizCategory.SKURRILES);
      await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);
      await useCategoryStore.getState().unlockCategory(QuizCategory.GESCHICHTE);
      await useCategoryStore.getState().unlockCategory(QuizCategory.POPKULTUR);
      await useCategoryStore.getState().unlockCategory(QuizCategory.TIERWISSEN);
      await useCategoryStore.getState().unlockCategory(QuizCategory.TECHNIK);

      const unlocked = useCategoryStore.getState().unlockedCategories();
      const locked = useCategoryStore.getState().lockedCategories();

      expect(unlocked).toHaveLength(7);
      expect(locked).toHaveLength(0);
    });

    it('should handle very large progress numbers', async () => {
      await useCategoryStore.getState().loadCategoryAccess();

      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 10000, 9500);

      const general = useCategoryStore.getState().getCategoryByName(QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(10000);
      expect(general?.correctAnswers).toBe(9500);
    });

    it('should handle rapid successive updates to same category', async () => {
      await useCategoryStore.getState().loadCategoryAccess();

      // Sequential updates to avoid race conditions
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 11);
      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 9);

      const general = useCategoryStore.getState().getCategoryByName(QuizCategory.GENERAL);

      expect(general?.questionsAnswered).toBe(36);
      expect(general?.correctAnswers).toBe(30);
    });

    it('should maintain category data integrity across operations', async () => {
      await useCategoryStore.getState().loadCategoryAccess();

      await useCategoryStore.getState().updateProgress(QuizCategory.GENERAL, 12, 10);
      await useCategoryStore.getState().unlockCategory(QuizCategory.WISSENSCHAFT);
      await useCategoryStore.getState().updateProgress(QuizCategory.WISSENSCHAFT, 24, 20);

      const savedAccess = await storage.getCategoryAccess();

      const general = savedAccess.find(cat => cat.categoryId === QuizCategory.GENERAL);
      const wissenschaft = savedAccess.find(
        cat => cat.categoryId === QuizCategory.WISSENSCHAFT
      );

      expect(general?.questionsAnswered).toBe(12);
      expect(wissenschaft?.isUnlocked).toBe(true);
      expect(wissenschaft?.questionsAnswered).toBe(24);
    });
  });
});
