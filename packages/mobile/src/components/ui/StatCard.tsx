/**
 * Stat display card (streak, level, etc.)
 * Implements design from UI-STYLE-GUIDE.md
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { colors, typography } from '@quiz/shared/theme';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <Card style={styles.container} elevation={1}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginBottom: 12,
  },
  value: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.tight * typography.fontSize['2xl'],
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: 4,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
});
