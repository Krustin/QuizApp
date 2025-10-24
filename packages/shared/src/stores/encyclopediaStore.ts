import { create } from 'zustand';
import type { EncyclopediaEntry } from '../models';
import { QuizCategory } from '../models';
import type { StorageService } from '../services/StorageService';

/**
 * Encyclopedia Store State Interface
 * Manages encyclopedia entries with filtering and search capabilities
 */
export interface EncyclopediaStoreState {
  // State
  entries: EncyclopediaEntry[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: QuizCategory | 'ALL';

  // Actions
  /**
   * Loads all encyclopedia entries from storage
   * Sets isLoading to true during load operation
   */
  loadEntries: () => Promise<void>;

  /**
   * Adds a new encyclopedia entry and persists to storage
   * @param entry - The encyclopedia entry to add
   */
  addEntry: (entry: EncyclopediaEntry) => Promise<void>;

  /**
   * Adds multiple encyclopedia entries and persists to storage
   * @param entries - Array of encyclopedia entries to add
   */
  addMultipleEntries: (entries: EncyclopediaEntry[]) => Promise<void>;

  /**
   * Sets the search query for filtering entries
   * @param query - Search string to filter entries
   */
  setSearchQuery: (query: string) => void;

  /**
   * Sets the selected category for filtering entries
   * @param category - Category to filter by, or 'ALL' for no category filter
   */
  setSelectedCategory: (category: QuizCategory | 'ALL') => void;

  /**
   * Clears all filters (search query and category selection)
   */
  clearFilters: () => void;

  // Computed values
  /**
   * Gets filtered entries based on search query and selected category
   */
  filteredEntries: () => EncyclopediaEntry[];

  /**
   * Gets total number of encyclopedia entries
   */
  totalEntries: () => number;

  /**
   * Gets count of entries per category
   */
  entriesByCategory: () => Record<QuizCategory, number>;
}

/**
 * Creates the encyclopedia store with the provided storage service
 *
 * @param storageService - The storage service instance for persistence
 * @returns Zustand store hook for encyclopedia state management
 *
 * @example
 * ```typescript
 * const useEncyclopediaStore = createEncyclopediaStore(storageService);
 *
 * function MyComponent() {
 *   const { entries, loadEntries, filteredEntries } = useEncyclopediaStore();
 *
 *   useEffect(() => {
 *     loadEntries();
 *   }, []);
 *
 *   return <div>{filteredEntries().length} entries</div>;
 * }
 * ```
 */
export const createEncyclopediaStore = (storageService: StorageService) => {
  return create<EncyclopediaStoreState>((set, get) => ({
    // Initial state
    entries: [],
    isLoading: false,
    searchQuery: '',
    selectedCategory: 'ALL',

    // Actions
    loadEntries: async () => {
      set({ isLoading: true });
      try {
        const entries = await storageService.getEncyclopedia();
        set({ entries, isLoading: false });
      } catch (error) {
        console.error('Failed to load encyclopedia entries:', error);
        set({ isLoading: false });
        // Keep existing entries on error
      }
    },

    addEntry: async (entry: EncyclopediaEntry) => {
      try {
        await storageService.addEncyclopediaEntry(entry);
        set((state) => ({
          entries: [...state.entries, entry],
        }));
      } catch (error) {
        console.error('Failed to add encyclopedia entry:', error);
        throw error;
      }
    },

    addMultipleEntries: async (newEntries: EncyclopediaEntry[]) => {
      try {
        // Add entries one by one to storage
        // StorageService.addEncyclopediaEntry handles duplicates
        for (const entry of newEntries) {
          await storageService.addEncyclopediaEntry(entry);
        }

        // Reload all entries from storage to ensure consistency
        const allEntries = await storageService.getEncyclopedia();
        set({ entries: allEntries });
      } catch (error) {
        console.error('Failed to add multiple encyclopedia entries:', error);
        throw error;
      }
    },

    setSearchQuery: (query: string) => {
      set({ searchQuery: query });
    },

    setSelectedCategory: (category: QuizCategory | 'ALL') => {
      set({ selectedCategory: category });
    },

    clearFilters: () => {
      set({ searchQuery: '', selectedCategory: 'ALL' });
    },

    // Computed values
    filteredEntries: () => {
      const { entries, searchQuery, selectedCategory } = get();

      let filtered = entries;

      // Filter by category
      if (selectedCategory !== 'ALL') {
        filtered = filtered.filter(
          (entry) => entry.category === selectedCategory
        );
      }

      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (entry) =>
            entry.questionText.toLowerCase().includes(query) ||
            entry.correctAnswer.toLowerCase().includes(query) ||
            entry.tldr.toLowerCase().includes(query)
        );
      }

      return filtered;
    },

    totalEntries: () => {
      return get().entries.length;
    },

    entriesByCategory: () => {
      const { entries } = get();
      // Phase 3: Updated to include new surreal categories
      const categoryCount: Record<QuizCategory, number> = {
        // New surreal categories
        [QuizCategory.SKURRILES_SURREAL]: 0,
        [QuizCategory.WISSENSCHAFT_SURREAL]: 0,
        // Legacy categories
        [QuizCategory.GENERAL]: 0,
        [QuizCategory.SKURRILES]: 0,
        [QuizCategory.WISSENSCHAFT]: 0,
        [QuizCategory.GESCHICHTE]: 0,
        [QuizCategory.POPKULTUR]: 0,
        [QuizCategory.TIERWISSEN]: 0,
        [QuizCategory.TECHNIK]: 0,
      };

      entries.forEach((entry) => {
        categoryCount[entry.category] = (categoryCount[entry.category] || 0) + 1;
      });

      return categoryCount;
    },
  }));
};

export type EncyclopediaStore = ReturnType<typeof createEncyclopediaStore>;
