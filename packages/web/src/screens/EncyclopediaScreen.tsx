/**
 * Encyclopedia Screen - Web
 * Displays unlocked encyclopedia entries with search and filter
 */

import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Search } from 'lucide-react';
import { QuizCategory } from '@quiz/shared';
import { createEncyclopediaStore } from '@quiz/shared/stores/encyclopediaStore';
import { storageService } from '@quiz/shared/services/StorageService';

// Initialize store
const useEncyclopediaStore = createEncyclopediaStore(storageService);

const CATEGORY_LABELS: Record<QuizCategory | 'ALL', string> = {
  ALL: '🌟 Alles',
  [QuizCategory.GENERAL]: '🤔 Grundwissen',
  [QuizCategory.SKURRILES]: '🎪 Skurriles',
  [QuizCategory.WISSENSCHAFT]: '🔬 Wissenschaft',
  [QuizCategory.GESCHICHTE]: '⚰️ Geschichte',
  [QuizCategory.POPKULTUR]: '🎭 Popkultur',
  [QuizCategory.TIERWISSEN]: '🦜 Tierwissen',
  [QuizCategory.TECHNIK]: '🤖 Technik',
};

export const EncyclopediaScreen: React.FC = () => {
  const {
    entries,
    isLoading,
    loadEntries,
    filteredEntries,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useEncyclopediaStore();

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const filtered = filteredEntries();

  // Empty state
  if (!isLoading && entries.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-10 floating-element">📖</div>
          <h1 className="text-3xl font-bold">Angeber-Lexikon</h1>
          <p className="text-base opacity-90 mt-2">Deine Sammlung zufälligen Halbwissens</p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
          <div className="text-8xl mb-6 floating-element">📚</div>
          <h2 className="text-2xl font-bold mb-4">Beeindruckend leer!</h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Wie ein Gehirn nach einem Netflix-Marathon.
          </p>
          <Card className="p-6 max-w-md game-card">
            <p className="text-muted-foreground">
              Sobald du mal durch pures Glück eine Frage richtig beantwortest,
              erscheinen hier deine "gesammelten Weisheiten" zum Angeben auf Partys!
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Lade Enzyklopädie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-6xl opacity-10 floating-element">🤓</div>
        <h1 className="text-3xl font-bold">Angeber-Lexikon</h1>
        <p className="text-base opacity-90 mt-2">
          {entries.length} Zufallstreffer für deine Pseudo-Intelligenz
        </p>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Durchsuche dein Halbwissen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 py-3 rounded-2xl border-2 border-gray-200 bg-card text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {['ALL', ...Object.values(QuizCategory)].map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap py-2 px-4 rounded-2xl font-medium transition-all ${
                selectedCategory === category
                  ? 'game-button-primary'
                  : 'game-button-secondary'
              }`}
              onClick={() => setSelectedCategory(category as QuizCategory | 'ALL')}
            >
              {CATEGORY_LABELS[category as QuizCategory | 'ALL']}
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      <div className="px-4 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🕳️</div>
            <p className="text-muted-foreground text-lg">
              Nichts gefunden. Dein Unwissen ist grenzenlos!
            </p>
          </div>
        ) : (
          filtered.map((entry) => (
            <Card key={entry.entryId} className="p-6 game-card">
              <div className="flex items-start gap-4">
                <div className="text-3xl floating-element">🧠</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm px-3 py-1 bg-secondary rounded-lg">
                      {CATEGORY_LABELS[entry.category]}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{entry.questionText}</h3>
                  <div className="bg-success/10 border-2 border-success/20 rounded-xl p-4 mb-3">
                    <p className="text-success font-bold">✅ {entry.correctAnswer}</p>
                  </div>
                  <p className="text-muted-foreground mb-4">{entry.tldr}</p>
                  {entry.funFact && (
                    <div className="bg-accent/10 border-2 border-accent/20 rounded-xl p-4">
                      <p className="text-sm text-accent-foreground">
                        💡 <strong>Besserwisser-Bonus:</strong> {entry.funFact}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
