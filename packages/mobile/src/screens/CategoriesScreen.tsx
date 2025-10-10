/**
 * Categories Screen - Mobile
 * Displays all quiz categories with unlock/select functionality
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { CategoryCard } from '../components/ui/CategoryCard';
import { Card } from '../components/ui/Card';
import { colors, typography, spacing } from '@quiz/shared/theme';
import { QuizCategory } from '@quiz/shared/models';
import { createCategoryStore } from '@quiz/shared/stores/categoryStore';
import { storageService } from '@quiz/shared/services/StorageService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Categories: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Categories'>;

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

export default function CategoriesScreen({ navigation }: Props) {
  const { categoryAccess, isLoading, loadCategoryAccess, unlockCategory } = useCategoryStore();

  useEffect(() => {
    loadCategoryAccess();
  }, [loadCategoryAccess]);

  const handleCategorySelect = (category: QuizCategory) => {
    // Navigate to QuizSession/Play screen with selected category
    navigation.navigate('Play' as never, { category } as never);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Lade Kategorien...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📚</Text>
        <Text style={styles.headerTitle}>Wissenslücken-Katalog</Text>
        <Text style={styles.headerSubtitle}>
          Wähle deine bevorzugte Art der Demütigung
        </Text>
      </View>

      {/* Categories List */}
      <View style={styles.categoriesList}>
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
      </View>

      {/* No Ads Notice */}
      <Card style={styles.noticeCard}>
        <View style={styles.noticeContent}>
          <Text style={styles.noticeText}>
            🚫 Keine nervigen Ads • 💸 Nur ehrliche Abzocke • 🔒 Einmaliger Kauf
          </Text>
          <Text style={styles.restoreLink}>
            Käufe wiederherstellen (falls du schon mal bezahlt hast)
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  content: {
    paddingBottom: spacing[6],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.main,
  },
  loadingText: {
    marginTop: spacing[4],
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  header: {
    backgroundColor: colors.primary.main,
    padding: spacing[6],
    position: 'relative',
    overflow: 'hidden',
  },
  headerEmoji: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 60,
    opacity: 0.1,
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.foreground,
    marginBottom: spacing[2],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.primary.foreground,
    opacity: 0.9,
  },
  categoriesList: {
    padding: spacing[4],
  },
  noticeCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  noticeContent: {
    alignItems: 'center',
  },
  noticeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  restoreLink: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.main,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
});
