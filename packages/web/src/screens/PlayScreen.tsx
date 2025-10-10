/**
 * PlayScreen - Main quiz hub for web
 * Matches UI-STYLE-GUIDE.md design with 2.5D Duolingo-inspired aesthetic
 */

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Shuffle, Flame } from 'lucide-react';
import { DailyChallenge } from '../components/DailyChallenge';
import { QuizCategory } from '@quiz/shared';

// Note: Import stores directly from shared/src since they're not exported from main index
// This assumes the web package has access to shared source files
// TODO: Update when stores are properly exported from @quiz/shared
import { useUserStore } from '../../../shared/src/stores/userStore';

/**
 * Motivational messages shown in header (randomly selected)
 */
const motivationalMessages = [
  "Bereit für das nächste intellektuelle Fiasko?",
  "Zeig mir, dass dein Gehirn mehr als Deko ist.",
  "Heute wieder Glück statt Wissen versuchen?",
  "Zeit, deine Bildungslücken zu katalogisieren.",
  "Mutmaßlich bereit für weitere Demütigungen?",
  "Lass uns deine Unwissensgrenze neu definieren."
];

interface PlayScreenProps {
  /** Array of unlocked category IDs */
  unlockedCategories?: QuizCategory[];
  /** Last category played (for "Continue" button) */
  lastCategory?: string;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({
  unlockedCategories = [],
  lastCategory,
}) => {
  const navigate = useNavigate();
  const { userProfile } = useUserStore();

  // Random motivational message (memoized to prevent re-renders)
  const randomMessage = useMemo(
    () => motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)],
    []
  );

  // Extract stats from user profile (with safe defaults)
  const currentStreak = userProfile?.currentStreak ?? 0;
  const level = userProfile?.currentLevel ?? 1;

  /**
   * Start quiz with specific category
   */
  const handleStartQuiz = (category: QuizCategory) => {
    navigate('/quiz', { state: { category } });
  };

  /**
   * Start quiz with random unlocked category
   */
  const handleRandomQuiz = () => {
    if (unlockedCategories.length === 0) {
      console.warn('No unlocked categories available');
      return;
    }
    const randomCategory = unlockedCategories[Math.floor(Math.random() * unlockedCategories.length)];
    navigate('/quiz', { state: { category: randomCategory } });
  };

  /**
   * Start daily challenge (5 questions)
   */
  const handleDailyChallenge = () => {
    // Use GENERAL category for daily challenge, mark as daily
    navigate('/quiz', { state: { category: QuizCategory.GENERAL, isDailyChallenge: true } });
  };

  /**
   * Navigate to categories browser
   */
  const handleBrowseCategories = () => {
    navigate('/categories');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-6xl opacity-10 floating-element">
          🤡
        </div>
        <h1 className="text-3xl font-bold mb-2">Versagens-Simulator</h1>
        <p className="text-base opacity-90">{randomMessage}</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards - 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          <div className="game-stat-card text-center">
            <Flame className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-2xl font-bold">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Glückssträhne</p>
          </div>
          <div className="game-stat-card text-center">
            <div className="w-8 h-8 mx-auto flex items-center justify-center mb-3">
              <span className="text-2xl">🎭</span>
            </div>
            <p className="text-2xl font-bold">Level {level}</p>
            <p className="text-sm text-muted-foreground">Versager-Grad</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          {/* Continue Last Category (if exists) */}
          {lastCategory && (
            <button
              onClick={() => handleStartQuiz(lastCategory as QuizCategory)}
              className="w-full py-6 px-6 game-button-primary flex items-center justify-center"
            >
              <Play className="w-6 h-6 mr-3" />
              <div className="flex-1 text-left">
                <div className="text-lg font-bold">Weitermachen</div>
                <div className="text-sm opacity-80">Letzte Schmach: {lastCategory}</div>
              </div>
            </button>
          )}

          {/* Random Quiz */}
          <button
            onClick={handleRandomQuiz}
            className="w-full py-5 px-6 game-button-secondary flex items-center justify-center"
          >
            <Shuffle className="w-6 h-6 mr-3" />
            <span className="text-lg font-bold">Zufallsdemütigung</span>
          </button>

          {/* Browse Categories */}
          <button
            onClick={handleBrowseCategories}
            className="w-full py-5 px-6 game-button-secondary flex items-center justify-center"
          >
            <span className="text-lg font-bold">Wissenslücken durchstöbern</span>
          </button>
        </div>

        {/* Daily Challenge */}
        <DailyChallenge onStartChallenge={handleDailyChallenge} />

        {/* Tips Card */}
        <div className="game-card">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            Pseudo-Intelligenz-Tipp
          </h3>
          <p className="text-muted-foreground">
            Jede zufällig richtige Antwort wird in deinem Angeber-Lexikon gespeichert.
          </p>
        </div>

        {/* No Ads Notice */}
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <span>🚫 Keine nervige Werbung</span>
            <span>•</span>
            <span>💸 Nur ehrliche Abzocke</span>
          </div>
        </div>
      </div>
    </div>
  );
};
