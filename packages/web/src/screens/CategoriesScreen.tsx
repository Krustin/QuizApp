/**
 * Categories Screen - Web
 * Displays all quiz categories with unlock/select functionality
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components/ui/CategoryCard';
import { Card } from '../components/ui/Card';
import { QuizCategory } from '@quiz/shared';
import { createCategoryStore } from '@quiz/shared/stores/categoryStore';
import { storageService } from '@quiz/shared/services/StorageService';

// Category metadata mapping
const CATEGORY_METADATA = {
  [QuizCategory.GENERAL]: {
    title: 'Nutzloses Grundwissen',
    description: 'Verrückte Fakten, die dich klüger machen als deine Freunde',
    icon: '🤔',
    questionsCount: 75,
    price: undefined,
  },
  [QuizCategory.SKURRILES]: {
    title: 'Skurriles Wissen',
    description: 'Absurde Fakten für intellektuelle Verwirrung',
    icon: '🎪',
    questionsCount: 60,
    price: '2,99 €',
  },
  [QuizCategory.WISSENSCHAFT]: {
    title: 'Pseudo-Wissenschaft',
    description: 'Wenn Physik auf deine Küche trifft',
    icon: '🔬',
    questionsCount: 60,
    price: '2,99 €',
  },
  [QuizCategory.GESCHICHTE]: {
    title: 'Alte Kamellen',
    description: 'Vergangenheit für Möchtegern-Historiker',
    icon: '⚰️',
    questionsCount: 85,
    price: '2,99 €',
  },
  [QuizCategory.POPKULTUR]: {
    title: 'Belangloser Trash',
    description: 'Von viral bis maximal peinlich',
    icon: '🎭',
    questionsCount: 90,
    price: '2,99 €',
  },
  [QuizCategory.TIERWISSEN]: {
    title: 'Tierische Eigenarten',
    description: 'Fauna mit fragwürdigen Eigenschaften',
    icon: '🦜',
    questionsCount: 70,
    price: '2,99 €',
  },
  [QuizCategory.TECHNIK]: {
    title: 'Digitaler Wahnsinn',
    description: 'Wenn Maschinen rebellieren',
    icon: '🤖',
    questionsCount: 65,
    price: '2,99 €',
  },
};

// Initialize store
const useCategoryStore = createCategoryStore(storageService);

export const CategoriesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { categoryAccess, isLoading, loadCategoryAccess, unlockCategory } = useCategoryStore();

  useEffect(() => {
    loadCategoryAccess();
  }, [loadCategoryAccess]);

  const handleCategorySelect = (category: QuizCategory) => {
    // Navigate to play screen with selected category
    navigate('/play', { state: { category } });
  };

  const handleUnlock = async (category: QuizCategory) => {
    // TODO: Show paywall/IAP flow
    // For now, just unlock directly
    try {
      await unlockCategory(category);
      // In real app, this would trigger IAP purchase flow
      console.log(`Unlock requested for category: ${category}`);
    } catch (error) {
      console.error('Failed to unlock category:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Lade Kategorien...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-6xl opacity-10 floating-element">📚</div>
        <h1 className="text-3xl font-bold">Wissenslücken-Katalog</h1>
        <p className="text-base opacity-90 mt-2">Wähle deine bevorzugte Art der Demütigung</p>
      </div>

      {/* Categories Grid */}
      <div className="p-4 space-y-5">
        {Object.values(QuizCategory).map((categoryEnum) => {
          const metadata = CATEGORY_METADATA[categoryEnum];
          const access = categoryAccess.find((a) => a.categoryId === categoryEnum);
          const isLocked = !access?.isUnlocked;

          return (
            <CategoryCard
              key={categoryEnum}
              title={metadata.title}
              description={metadata.description}
              questionsCount={metadata.questionsCount}
              isLocked={isLocked}
              price={metadata.price}
              icon={metadata.icon}
              onSelect={() => handleCategorySelect(categoryEnum)}
              onUnlock={() => handleUnlock(categoryEnum)}
            />
          );
        })}
      </div>

      {/* No Ads Notice */}
      <div className="mx-4 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              🚫 Keine nervigen Ads • 💸 Nur ehrliche Abzocke • 🔒 Einmaliger Kauf
            </p>
            <button className="text-sm text-primary hover:underline font-medium">
              Käufe wiederherstellen (falls du schon mal bezahlt hast)
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
