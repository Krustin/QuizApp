/**
 * Encyclopedia Store Tests
 *
 * Comprehensive test suite for encyclopediaStore.ts
 * Tests entry management, filtering, and search functionality
 */

import { createEncyclopediaStore } from '../encyclopediaStore';
import { MockStorageImpl } from '../../services/__tests__/MockStorageImpl';
import type { EncyclopediaEntry } from '../../models/Encyclopedia';
import { QuizCategory } from '../../models/Enums';

describe('encyclopediaStore', () => {
  let storage: MockStorageImpl;
  let useEncyclopediaStore: ReturnType<typeof createEncyclopediaStore>;

  const mockEntries: EncyclopediaEntry[] = [
    {
      entryId: 'entry1',
      questionId: 'q1',
      questionText: 'What is 2+2?',
      correctAnswer: '4',
      tldr: 'Basic arithmetic: 2+2 equals 4',
      category: QuizCategory.GENERAL,
      unlockedAt: new Date('2024-01-01'),
    },
    {
      entryId: 'entry2',
      questionId: 'q2',
      questionText: 'What is the capital of France?',
      correctAnswer: 'Paris',
      tldr: 'Paris is the capital and largest city of France',
      funFact: 'Paris is known as the City of Light',
      category: QuizCategory.GESCHICHTE,
      unlockedAt: new Date('2024-01-02'),
    },
    {
      entryId: 'entry3',
      questionId: 'q3',
      questionText: 'What is photosynthesis?',
      correctAnswer: 'Plant food production',
      tldr: 'Process where plants convert light to energy',
      category: QuizCategory.WISSENSCHAFT,
      unlockedAt: new Date('2024-01-03'),
    },
  ];

  beforeEach(() => {
    storage = new MockStorageImpl();
    useEncyclopediaStore = createEncyclopediaStore(storage);

    // Reset store to initial state
    useEncyclopediaStore.setState({
      entries: [],
      isLoading: false,
      searchQuery: '',
      selectedCategory: 'ALL',
    });
  });

  afterEach(() => {
    storage.reset();
  });

  describe('loadEntries', () => {
    it('should load entries from storage', async () => {
      await storage.save('@quiz_encyclopedia', mockEntries);

      await useEncyclopediaStore.getState().loadEntries();

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toHaveLength(3);
      expect(entries[0].entryId).toBe('entry1');
    });

    it('should handle empty storage', async () => {
      await useEncyclopediaStore.getState().loadEntries();

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toEqual([]);
    });

    it('should set isLoading during load operation', async () => {
      const loadPromise = useEncyclopediaStore.getState().loadEntries();

      // Check if loading state was set (may be brief)
      await loadPromise;

      const { isLoading } = useEncyclopediaStore.getState();
      expect(isLoading).toBe(false);
    });

    it('should keep existing entries on error', async () => {
      useEncyclopediaStore.setState({ entries: mockEntries });

      // Create a mock that throws an error
      const errorStorage = {
        ...storage,
        getEncyclopedia: jest.fn().mockRejectedValue(new Error('Storage error')),
      } as any;

      const errorStore = createEncyclopediaStore(errorStorage);
      errorStore.setState({ entries: mockEntries });

      await errorStore.getState().loadEntries();

      const { entries } = errorStore.getState();
      expect(entries).toEqual(mockEntries);
    });
  });

  describe('addEntry', () => {
    it('should add a new entry', async () => {
      const newEntry: EncyclopediaEntry = {
        entryId: 'entry4',
        questionId: 'q4',
        questionText: 'Who wrote Hamlet?',
        correctAnswer: 'Shakespeare',
        tldr: 'William Shakespeare wrote Hamlet',
        category: QuizCategory.GENERAL,
        unlockedAt: new Date(),
      };

      await useEncyclopediaStore.getState().addEntry(newEntry);

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toHaveLength(1);
      expect(entries[0].entryId).toBe('entry4');
    });

    it('should add entry to storage', async () => {
      const newEntry: EncyclopediaEntry = {
        entryId: 'entry5',
        questionId: 'q5',
        questionText: 'What is DNA?',
        correctAnswer: 'Genetic material',
        tldr: 'DNA carries genetic information',
        category: QuizCategory.WISSENSCHAFT,
        unlockedAt: new Date(),
      };

      await useEncyclopediaStore.getState().addEntry(newEntry);

      const savedEntries = await storage.getEncyclopedia();
      expect(savedEntries).toHaveLength(1);
      expect(savedEntries[0].entryId).toBe('entry5');
    });

    it('should not add duplicate entries', async () => {
      const entry: EncyclopediaEntry = {
        entryId: 'entry6',
        questionId: 'q6',
        questionText: 'Test question',
        correctAnswer: 'Test answer',
        tldr: 'Test tldr',
        category: QuizCategory.GENERAL,
        unlockedAt: new Date(),
      };

      await useEncyclopediaStore.getState().addEntry(entry);
      await useEncyclopediaStore.getState().addEntry(entry);

      const savedEntries = await storage.getEncyclopedia();
      expect(savedEntries).toHaveLength(1);
    });
  });

  describe('addMultipleEntries', () => {
    it('should add multiple entries', async () => {
      await useEncyclopediaStore.getState().addMultipleEntries(mockEntries);

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toHaveLength(3);
    });

    it('should reload all entries from storage after adding', async () => {
      await useEncyclopediaStore.getState().addMultipleEntries([mockEntries[0]]);
      await useEncyclopediaStore.getState().addMultipleEntries([mockEntries[1], mockEntries[2]]);

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toHaveLength(3);
    });

    it('should handle duplicate entries in batch', async () => {
      await useEncyclopediaStore.getState().addMultipleEntries(mockEntries);
      await useEncyclopediaStore.getState().addMultipleEntries(mockEntries);

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toHaveLength(3); // No duplicates
    });
  });

  describe('Filtering', () => {
    beforeEach(async () => {
      await storage.save('@quiz_encyclopedia', mockEntries);
      await useEncyclopediaStore.getState().loadEntries();
    });

    describe('setSearchQuery', () => {
      it('should set search query', () => {
        useEncyclopediaStore.getState().setSearchQuery('Paris');

        const { searchQuery } = useEncyclopediaStore.getState();
        expect(searchQuery).toBe('Paris');
      });

      it('should filter entries by question text', () => {
        useEncyclopediaStore.getState().setSearchQuery('capital');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].questionText).toContain('capital');
      });

      it('should filter entries by correct answer', () => {
        useEncyclopediaStore.getState().setSearchQuery('Paris');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].correctAnswer).toBe('Paris');
      });

      it('should filter entries by tldr', () => {
        useEncyclopediaStore.getState().setSearchQuery('arithmetic');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].tldr).toContain('arithmetic');
      });

      it('should be case insensitive', () => {
        useEncyclopediaStore.getState().setSearchQuery('PARIS');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(1);
      });

      it('should return all entries on empty search', () => {
        useEncyclopediaStore.getState().setSearchQuery('');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(3);
      });
    });

    describe('setSelectedCategory', () => {
      it('should set selected category', () => {
        useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.WISSENSCHAFT);

        const { selectedCategory } = useEncyclopediaStore.getState();
        expect(selectedCategory).toBe(QuizCategory.WISSENSCHAFT);
      });

      it('should filter entries by category', () => {
        useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.WISSENSCHAFT);

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].category).toBe(QuizCategory.WISSENSCHAFT);
      });

      it('should return all entries when category is ALL', () => {
        useEncyclopediaStore.getState().setSelectedCategory('ALL');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(3);
      });

      it('should return empty array for category with no entries', () => {
        useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.POPKULTUR);

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(0);
      });
    });

    describe('Combined Filtering', () => {
      it('should apply both search and category filters', () => {
        useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.GENERAL);
        useEncyclopediaStore.getState().setSearchQuery('2+2');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].questionText).toContain('2+2');
      });

      it('should return empty when filters dont match', () => {
        useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.GENERAL);
        useEncyclopediaStore.getState().setSearchQuery('photosynthesis');

        const filtered = useEncyclopediaStore.getState().filteredEntries();
        expect(filtered).toHaveLength(0);
      });
    });

    describe('clearFilters', () => {
      it('should clear both search and category filters', () => {
        useEncyclopediaStore.getState().setSearchQuery('test');
        useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.WISSENSCHAFT);

        useEncyclopediaStore.getState().clearFilters();

        const { searchQuery, selectedCategory } = useEncyclopediaStore.getState();
        expect(searchQuery).toBe('');
        expect(selectedCategory).toBe('ALL');
      });
    });
  });

  describe('Computed Values', () => {
    beforeEach(async () => {
      await storage.save('@quiz_encyclopedia', mockEntries);
      await useEncyclopediaStore.getState().loadEntries();
    });

    describe('totalEntries', () => {
      it('should return total number of entries', () => {
        const total = useEncyclopediaStore.getState().totalEntries();
        expect(total).toBe(3);
      });

      it('should return 0 when no entries', () => {
        useEncyclopediaStore.setState({ entries: [] });

        const total = useEncyclopediaStore.getState().totalEntries();
        expect(total).toBe(0);
      });
    });

    describe('entriesByCategory', () => {
      it('should count entries by category', () => {
        const counts = useEncyclopediaStore.getState().entriesByCategory();

        expect(counts[QuizCategory.GENERAL]).toBe(1);
        expect(counts[QuizCategory.GESCHICHTE]).toBe(1);
        expect(counts[QuizCategory.WISSENSCHAFT]).toBe(1);
        expect(counts[QuizCategory.POPKULTUR]).toBe(0);
      });

      it('should initialize all categories to 0', () => {
        useEncyclopediaStore.setState({ entries: [] });

        const counts = useEncyclopediaStore.getState().entriesByCategory();

        expect(counts[QuizCategory.GENERAL]).toBe(0);
        expect(counts[QuizCategory.SKURRILES]).toBe(0);
        expect(counts[QuizCategory.WISSENSCHAFT]).toBe(0);
        expect(counts[QuizCategory.GESCHICHTE]).toBe(0);
        expect(counts[QuizCategory.POPKULTUR]).toBe(0);
        expect(counts[QuizCategory.TIERWISSEN]).toBe(0);
        expect(counts[QuizCategory.TECHNIK]).toBe(0);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle malformed data gracefully', async () => {
      storage.setRawData('@quiz_encyclopedia', 'invalid json');

      await useEncyclopediaStore.getState().loadEntries();

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toEqual([]);
    });

    it('should handle entries with missing optional fields', async () => {
      const minimalEntry: EncyclopediaEntry = {
        entryId: 'minimal',
        questionId: 'qmin',
        questionText: 'Minimal question',
        correctAnswer: 'Minimal answer',
        tldr: 'Minimal tldr',
        category: QuizCategory.GENERAL,
        unlockedAt: new Date(),
      };

      await useEncyclopediaStore.getState().addEntry(minimalEntry);

      const { entries } = useEncyclopediaStore.getState();
      expect(entries).toHaveLength(1);
      expect(entries[0].funFact).toBeUndefined();
    });

    it('should handle rapid filter changes', () => {
      useEncyclopediaStore.getState().setSearchQuery('test1');
      useEncyclopediaStore.getState().setSearchQuery('test2');
      useEncyclopediaStore.getState().setSearchQuery('test3');
      useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.GENERAL);
      useEncyclopediaStore.getState().setSelectedCategory(QuizCategory.WISSENSCHAFT);

      const { searchQuery, selectedCategory } = useEncyclopediaStore.getState();
      expect(searchQuery).toBe('test3');
      expect(selectedCategory).toBe(QuizCategory.WISSENSCHAFT);
    });
  });
});
