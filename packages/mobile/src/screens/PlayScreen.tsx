/**
 * PlayScreen - Main quiz hub/home screen
 * Implements the sarcastic, 2.5D Duolingo-inspired design
 * Reference: Concept/Absurd Quiz App Concept/src/components/Home.tsx
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Button, Card, StatCard } from '../components/ui';
import { colors, spacing, typography, borderRadius } from '@quiz/shared/theme';
import { useUserStore } from '@quiz/shared/stores';
import { QuizCategory } from '@quiz/shared/models';

interface PlayScreenProps {
  navigation: any; // React Navigation navigation prop
}

const motivationalMessages = [
  "Bereit für das nächste intellektuelle Fiasko?",
  "Zeig mir, dass dein Gehirn mehr als Deko ist.",
  "Heute wieder Glück statt Wissen versuchen?",
  "Zeit, deine Bildungslücken zu katalogisieren.",
  "Mutmaßlich bereit für weitere Demütigungen?",
  "Lass uns deine Unwissensgrenze neu definieren."
];

export default function PlayScreen({ navigation }: PlayScreenProps) {
  const { userProfile } = useUserStore();

  // Random motivational message (changes on each render)
  const randomMessage = useMemo(() => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  }, []);

  // Get last played category from userProfile
  const lastCategory = userProfile?.unlockedCategories?.[userProfile.unlockedCategories.length - 1];

  // Floating emoji animation
  const floatAnim = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    // Floating animation for emoji
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  // Navigation handlers
  const handleStartQuiz = (category: QuizCategory) => {
    navigation.navigate('QuizSession', { category });
  };

  const handleRandomQuiz = () => {
    // Select random from unlocked categories
    const unlockedCategories = userProfile?.unlockedCategories || [QuizCategory.GENERAL];
    const random = unlockedCategories[Math.floor(Math.random() * unlockedCategories.length)];
    navigation.navigate('QuizSession', { category: random });
  };

  const handleBrowseCategories = () => {
    navigation.navigate('Categories');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Animated.Text
            style={[
              styles.floatingEmoji,
              {
                transform: [{ translateY: floatAnim }],
              },
            ]}
          >
            🤡
          </Animated.Text>
          <Text style={styles.title}>Versagens-Simulator</Text>
          <Text style={styles.subtitle}>{randomMessage}</Text>
        </View>

        <View style={styles.content}>
          {/* Stats Grid (2 columns) */}
          <View style={styles.statsGrid}>
            <View style={styles.statCardWrapper}>
              <StatCard
                icon={<Text style={styles.statIcon}>🔥</Text>}
                value={userProfile?.currentStreak || 0}
                label="Glückssträhne"
              />
            </View>
            <View style={styles.statCardWrapper}>
              <StatCard
                icon={<Text style={styles.statIcon}>🎭</Text>}
                value={`Level ${userProfile?.currentLevel || 1}`}
                label="Versager-Grad"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            {lastCategory && (
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onPress={() => handleStartQuiz(lastCategory)}
                style={styles.continueButton}
              >
                <View style={styles.continueButtonContent}>
                  <Text style={styles.continueButtonTitle}>Weitermachen</Text>
                  <Text style={styles.continueButtonSubtitle}>
                    Letzte Schmach: {lastCategory}
                  </Text>
                </View>
              </Button>
            )}

            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onPress={handleRandomQuiz}
              style={styles.actionButton}
            >
              Zufallsdemütigung
            </Button>

            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onPress={handleBrowseCategories}
              style={styles.actionButton}
            >
              Wissenslücken durchstöbern
            </Button>
          </View>

          {/* Tips Card */}
          <Card style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Text style={styles.tipsEmoji}>🧠</Text>
              <Text style={styles.tipsTitle}>Pseudo-Intelligenz-Tipp</Text>
            </View>
            <Text style={styles.tipsText}>
              Jede zufällig richtige Antwort wird in deinem Angeber-Lexikon gespeichert.
              Damit kannst du bei Partys so tun, als wärst du schlau!
            </Text>
          </Card>

          {/* Footer Notice */}
          <View style={styles.footerNotice}>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeText}>🚫 Keine nervige Werbung</Text>
              <Text style={styles.noticeSeparator}>•</Text>
              <Text style={styles.noticeText}>💸 Nur ehrliche Abzocke</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  scrollContent: {
    paddingBottom: 96, // Space for navigation bar
  },
  header: {
    backgroundColor: colors.primary.main,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  floatingEmoji: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 64,
    opacity: 0.1,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.foreground,
    marginBottom: 8,
    lineHeight: typography.lineHeight.tight * typography.fontSize['3xl'],
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.primary.foreground,
    opacity: 0.9,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  content: {
    padding: spacing[4], // 16px
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[4], // 16px
    marginBottom: spacing[6], // 24px
  },
  statCardWrapper: {
    flex: 1,
  },
  statIcon: {
    fontSize: 32,
  },
  actions: {
    gap: spacing[4], // 16px
    marginBottom: spacing[6], // 24px
  },
  continueButton: {
    paddingVertical: 24,
  },
  continueButtonContent: {
    alignItems: 'flex-start',
    width: '100%',
  },
  continueButtonTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.foreground,
    marginBottom: 4,
  },
  continueButtonSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.foreground,
    opacity: 0.8,
  },
  actionButton: {
    paddingVertical: 20,
  },
  tipsCard: {
    backgroundColor: colors.background.muted,
    marginBottom: spacing[6], // 24px
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3], // 12px
    marginBottom: spacing[3], // 12px
  },
  tipsEmoji: {
    fontSize: 24,
  },
  tipsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.lg,
  },
  tipsText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  footerNotice: {
    alignItems: 'center',
    paddingVertical: spacing[6], // 24px
  },
  noticeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3], // 12px
    backgroundColor: colors.background.muted,
    paddingHorizontal: spacing[4], // 16px
    paddingVertical: spacing[2], // 8px
    borderRadius: borderRadius.full,
  },
  noticeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  noticeSeparator: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});
