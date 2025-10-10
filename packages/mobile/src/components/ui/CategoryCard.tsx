/**
 * Category selection card for mobile
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Button } from './Button';
import { colors, typography, spacing, borderRadius } from '@quiz/shared/theme';
import { QuizCategory } from '@quiz/shared/models/Enums';

interface CategoryCardProps {
  title: string;
  description: string;
  questionsCount: number;
  isLocked: boolean;
  price?: string;
  icon: string; // Emoji
  onSelect: () => void;
  onUnlock?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  questionsCount,
  isLocked,
  price,
  icon,
  onSelect,
  onUnlock,
}) => {
  const cardStyle = isLocked
    ? { ...styles.container, ...styles.locked }
    : styles.container;

  return (
    <Card style={cardStyle}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {!isLocked && (
              <View style={styles.unlockedBadge}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
            {isLocked && (
              <View style={styles.lockedBadge}>
                <Text style={styles.lock}>🔒</Text>
              </View>
            )}
          </View>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{questionsCount} Demütigungen</Text>
          </View>
        </View>
      </View>

      {isLocked ? (
        <View style={styles.footer}>
          {price && <Text style={styles.price}>{price}</Text>}
          <Button
            variant="accent"
            fullWidth
            onPress={onUnlock || (() => {})}
            size="md"
          >
            💸 Abzocke akzeptieren
          </Button>
        </View>
      ) : (
        <Button
          variant="primary"
          fullWidth
          onPress={onSelect}
          size="md"
        >
          🎯 Blamage starten
        </Button>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  locked: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    gap: spacing[4],
    marginBottom: spacing[4],
  },
  icon: {
    fontSize: 40,
  },
  headerContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[2],
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  unlockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
  },
  lock: {
    fontSize: 14,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing[3],
  },
  badge: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  footer: {
    gap: spacing[3],
  },
  price: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.accent.main,
  },
});
