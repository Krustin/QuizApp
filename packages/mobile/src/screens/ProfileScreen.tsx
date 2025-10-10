/**
 * Profile Screen - Mobile
 * Displays user stats, achievements, and settings
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { colors, typography, spacing, borderRadius } from '@quiz/shared/theme';
import { useUserStore } from '@quiz/shared/stores/userStore';
import { useSettingsStore, setStorageService } from '@quiz/shared/stores/settingsStore';
import { storageService } from '@quiz/shared/services/StorageService';

// Initialize settings store with storage service
setStorageService(storageService);

export default function ProfileScreen() {
  const { userProfile, isLoading, loadUserProfile, accuracyRate, pointsToNextLevel } =
    useUserStore();
  const {
    soundEnabled,
    vibrationEnabled,
    toggleSound,
    toggleVibration,
    loadSettings,
  } = useSettingsStore();

  useEffect(() => {
    loadUserProfile(storageService);
    loadSettings();
  }, []);

  if (isLoading || !userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Lade Profil...</Text>
      </View>
    );
  }

  const accuracyPercentage = Math.round(accuracyRate() * 100);
  const nextLevelPoints = (userProfile.currentLevel + 1) * 500;
  const progressToNextLevel =
    ((userProfile.totalPoints - userProfile.currentLevel * 500) /
      (nextLevelPoints - userProfile.currentLevel * 500)) *
    100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🏆</Text>
        <Text style={styles.headerTitle}>Scham-Profil</Text>
        <Text style={styles.headerSubtitle}>
          Level {userProfile.currentLevel} Hobby-Versager
        </Text>
      </View>

      {/* Level Progress Card */}
      <Card style={styles.levelCard}>
        <View style={styles.levelContent}>
          <Text style={styles.levelIcon}>🏆</Text>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>
              Versager-Level {userProfile.currentLevel}
            </Text>
            <Text style={styles.levelSubtitle}>
              {userProfile.totalPoints} / {nextLevelPoints} Mitleids-Punkte
            </Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progressToNextLevel, 100)}%` },
            ]}
          />
        </View>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statRow}>
          <StatCard
            icon={<Text style={styles.statEmoji}>🎯</Text>}
            value={`${accuracyPercentage}%`}
            label="Glücks-Quote"
          />
          <StatCard
            icon={<Text style={styles.statEmoji}>🔥</Text>}
            value={userProfile.currentStreak}
            label="Glückssträhne"
          />
        </View>
        <View style={styles.statRow}>
          <StatCard
            icon={<Text style={styles.statEmoji}>📊</Text>}
            value={userProfile.totalPoints}
            label="Punkte"
          />
          <StatCard
            icon={<Text style={styles.statEmoji}>🎮</Text>}
            value={userProfile.sessionsPlayed}
            label="Sessions"
          />
        </View>
      </View>

      {/* Stats Details */}
      <Card style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>📈 Detaillierte Statistiken</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fragen beantwortet</Text>
          <Text style={styles.detailValue}>{userProfile.questionsAnswered}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Richtige Antworten</Text>
          <Text style={styles.detailValue}>{userProfile.correctAnswers}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Beste Glückssträhne</Text>
          <Text style={styles.detailValue}>{userProfile.longestStreak}</Text>
        </View>
      </Card>

      {/* Achievements Placeholder */}
      <Card style={styles.achievementsCard}>
        <Text style={styles.achievementsTitle}>🏅 Peinliche Errungenschaften</Text>
        <View style={styles.achievementsGrid}>
          {[
            { icon: '🎯', name: 'Zufallstreffer', unlocked: userProfile.correctAnswers >= 1 },
            { icon: '🔥', name: 'Glückssträhne', unlocked: userProfile.longestStreak >= 5 },
            {
              icon: '🏹',
              name: 'Pseudo-Experte',
              unlocked: accuracyPercentage >= 80,
            },
            {
              icon: '🧠',
              name: 'Ratemonster',
              unlocked: userProfile.questionsAnswered >= 50,
            },
            { icon: '⭐', name: 'Veteran', unlocked: userProfile.currentLevel >= 5 },
            {
              icon: '💎',
              name: 'Reiner Zufall',
              unlocked: accuracyPercentage === 100 && userProfile.questionsAnswered >= 10,
            },
          ].map((achievement, index) => (
            <View
              key={index}
              style={[
                styles.achievementBadge,
                achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked,
              ]}
            >
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              {achievement.unlocked && (
                <View style={styles.achievementCheck}>
                  <Text style={styles.achievementCheckText}>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Card>

      {/* Settings */}
      <Card style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>⚙️ Einstellungen</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>🔊 Sound</Text>
            <Text style={styles.settingDescription}>Soundeffekte aktivieren</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: colors.border.main, true: colors.primary.main }}
            thumbColor={colors.background.card}
          />
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>📳 Vibration</Text>
            <Text style={styles.settingDescription}>Haptisches Feedback</Text>
          </View>
          <Switch
            value={vibrationEnabled}
            onValueChange={toggleVibration}
            trackColor={{ false: colors.border.main, true: colors.primary.main }}
            thumbColor={colors.background.card}
          />
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
  levelCard: {
    margin: spacing[4],
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    marginBottom: spacing[4],
  },
  levelIcon: {
    fontSize: 32,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  levelSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
  },
  statsGrid: {
    paddingHorizontal: spacing[4],
    gap: spacing[4],
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  statEmoji: {
    fontSize: 32,
  },
  detailsCard: {
    margin: spacing[4],
  },
  detailsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  detailLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  detailValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  achievementsCard: {
    margin: spacing[4],
  },
  achievementsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  achievementBadge: {
    width: '47%',
    padding: spacing[4],
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
  },
  achievementUnlocked: {
    backgroundColor: 'rgba(22, 156, 143, 0.1)',
    borderColor: 'rgba(22, 156, 143, 0.3)',
  },
  achievementLocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderColor: colors.border.main,
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  achievementName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  achievementCheck: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementCheckText: {
    color: 'white',
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
  },
  settingsCard: {
    margin: spacing[4],
  },
  settingsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  settingDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});
