/**
 * Encyclopedia Screen - Mobile
 * Displays unlocked encyclopedia entries with search and filter
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../components/ui/Card';
import { colors, typography, spacing, borderRadius } from '@quiz/shared/theme';
import { QuizCategory } from '@quiz/shared/models';
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

export default function EncyclopediaScreen() {
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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>📖</Text>
          <Text style={styles.headerTitle}>Angeber-Lexikon</Text>
          <Text style={styles.headerSubtitle}>
            Deine Sammlung zufälligen Halbwissens
          </Text>
        </View>

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📚</Text>
          <Text style={styles.emptyTitle}>Beeindruckend leer!</Text>
          <Text style={styles.emptyMessage}>
            Wie ein Gehirn nach einem Netflix-Marathon.
          </Text>
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyCardText}>
              Sobald du mal durch pures Glück eine Frage richtig beantwortest,
              erscheinen hier deine "gesammelten Weisheiten" zum Angeben auf Partys!
            </Text>
          </Card>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Lade Enzyklopädie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🤓</Text>
        <Text style={styles.headerTitle}>Angeber-Lexikon</Text>
        <Text style={styles.headerSubtitle}>
          {entries.length} Zufallstreffer für deine Pseudo-Intelligenz
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Durchsuche dein Halbwissen..."
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter Tabs */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['ALL', ...Object.values(QuizCategory)]}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterTabs}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedCategory === item && styles.filterTabActive,
            ]}
            onPress={() => setSelectedCategory(item as QuizCategory | 'ALL')}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedCategory === item && styles.filterTabTextActive,
              ]}
            >
              {CATEGORY_LABELS[item as QuizCategory | 'ALL']}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Entries List */}
      {filtered.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsEmoji}>🕳️</Text>
          <Text style={styles.noResultsText}>
            Nichts gefunden. Dein Unwissen ist grenzenlos!
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.entryId}
          contentContainerStyle={styles.entriesList}
          renderItem={({ item }) => (
            <Card style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryEmoji}>🧠</Text>
                <View style={styles.entryContent}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {CATEGORY_LABELS[item.category]}
                    </Text>
                  </View>
                  <Text style={styles.entryQuestion}>{item.questionText}</Text>
                  <View style={styles.answerBox}>
                    <Text style={styles.answerText}>✅ {item.correctAnswer}</Text>
                  </View>
                  <Text style={styles.entryExplanation}>{item.tldr}</Text>
                  {item.funFact && (
                    <View style={styles.funFactBox}>
                      <Text style={styles.funFactText}>
                        💡 <Text style={styles.funFactLabel}>Besserwisser-Bonus:</Text>{' '}
                        {item.funFact}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing[4],
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border.main,
    paddingHorizontal: spacing[4],
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing[2],
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing[3],
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  filterTabs: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[2],
    gap: spacing[3],
  },
  filterTab: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border.main,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    marginRight: spacing[3],
  },
  filterTabActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterTabText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  filterTabTextActive: {
    color: colors.primary.foreground,
  },
  entriesList: {
    padding: spacing[4],
    paddingBottom: spacing[6],
  },
  entryCard: {
    marginBottom: spacing[4],
  },
  entryHeader: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  entryEmoji: {
    fontSize: 32,
  },
  entryContent: {
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    alignSelf: 'flex-start',
    marginBottom: spacing[3],
  },
  categoryBadgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  entryQuestion: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  answerBox: {
    backgroundColor: 'rgba(45, 192, 113, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(45, 192, 113, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  answerText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.success.main,
  },
  entryExplanation: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing[4],
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  funFactBox: {
    backgroundColor: 'rgba(255, 106, 92, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 106, 92, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing[4],
  },
  funFactText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  funFactLabel: {
    fontWeight: typography.fontWeight.bold,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  noResultsEmoji: {
    fontSize: 60,
    marginBottom: spacing[4],
  },
  noResultsText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: spacing[6],
  },
  emptyTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  emptyMessage: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing[6],
    textAlign: 'center',
  },
  emptyCard: {
    maxWidth: 400,
  },
  emptyCardText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
});
