import { PlayScreen } from '../screens/PlayScreen';
import { QuizCategory } from '@quiz/shared';

/**
 * PlayPage - Container for PlayScreen
 * Provides store data and last category tracking
 */
export default function PlayPage() {
  // TODO: Connect to category store when available
  // For now, provide default unlocked category (GENERAL)
  const unlockedCategories: QuizCategory[] = [QuizCategory.GENERAL];

  // TODO: Track last played category in localStorage or store
  const lastCategory = undefined;

  return (
    <PlayScreen
      unlockedCategories={unlockedCategories}
      lastCategory={lastCategory}
    />
  );
}
