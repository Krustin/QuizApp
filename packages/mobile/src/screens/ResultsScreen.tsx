/**
 * Results Screen - Mobile
 * Shows quiz results with grade, score, stats, and action buttons
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { colors, typography, spacing, borderRadius } from '@quiz/shared/theme';
import { Question } from '@quiz/shared/models';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Results: {
    score: number;
    totalQuestions: number;
    correctAnswers: Question[];
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score, totalQuestions, correctAnswers } = route.params;
  const percentage = Math.round((score / totalQuestions) * 100);
  const points = score * 10;

  // Animation values
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animate result card
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const getResultMessage = (): string => {
    if (percentage >= 90) return 'Unfassbar. Du hast tatsächlich eine funktionierende Gehirnzelle.';
    if (percentage >= 70) return 'Nicht schlecht. Aber auch ein blindes Huhn findet mal ein Korn.';
    if (percentage >= 50) return 'Mittelmäßig. Wie dein gesamtes Leben vermutlich.';
    if (percentage >= 30) return 'Autsch. Das war schmerzhafter als meine Witze.';
    return 'Beeindruckend schlecht. Hast du versucht, falsch zu antworten?';
  };

  const getGrade = (): { grade: string; color: string } => {
    if (percentage >= 90) return { grade: 'A+', color: colors.success.main };
    if (percentage >= 80) return { grade: 'A', color: colors.success.main };
    if (percentage >= 70) return { grade: 'B', color: colors.neutral.main };
    if (percentage >= 60) return { grade: 'C', color: colors.accent.main };
    if (percentage >= 50) return { grade: 'D', color: colors.destructive.main };
    return { grade: 'F', color: colors.destructive.main };
  };

  const resultGrade = getGrade();

  const handlePlayAgain = () => {
    // Navigate back to play screen or home
    navigation.navigate('Play' as never);
  };

  const handleGoHome = () => {
    navigation.navigate('Home' as never);
  };

  const handleViewEncyclopedia = () => {
    navigation.navigate('Encyclopedia' as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz beendet</Text>
        <Text style={styles.headerSubtitle}>Zeit für die harte Wahrheit</Text>
      </View>

      {/* Main Result Card */}
      <Animated.View
        style={[
          styles.resultCardContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Card style={styles.resultCard}>
          <Text style={[styles.grade, { color: resultGrade.color }]}>
            {resultGrade.grade}
          </Text>
          <Text style={styles.score}>
            {score} / {totalQuestions}
          </Text>
          <Text style={styles.percentage}>{percentage}% richtig</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>+{points} Punkte</Text>
          </View>
        </Card>
      </Animated.View>

      {/* Quizmaster Comment */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Card style={styles.commentCard}>
          <View style={styles.commentContent}>
            <Text style={styles.avatar}>😈</Text>
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentLabel}>Quizmaster sagt:</Text>
              <Text style={styles.commentMessage}>{getResultMessage()}</Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          icon={<Text style={styles.statIcon}>🎯</Text>}
          value={score}
          label="Richtig"
        />
        <StatCard
          icon={<Text style={styles.statIcon}>🏆</Text>}
          value={points}
          label="Punkte"
        />
        <StatCard
          icon={<Text style={styles.statIcon}>📖</Text>}
          value={correctAnswers.length}
          label="Gelernt"
        />
      </View>

      {/* Encyclopedia Notice */}
      {correctAnswers.length > 0 && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Card style={styles.noticeCard}>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeIcon}>📖</Text>
              <View style={styles.noticeTextContainer}>
                <Text style={styles.noticeTitle}>
                  {correctAnswers.length} neue{correctAnswers.length === 1 ? 'r' : ''} Eintrag
                  {correctAnswers.length === 1 ? '' : 'e'} in deiner Enzyklopädie!
                </Text>
                <Text style={styles.noticeSubtitle}>
                  Erklärungen und Fun Facts findest du dort.
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handlePlayAgain}
          style={styles.primaryButton}
        >
          🔄 Nochmal versuchen
        </Button>

        <View style={styles.secondaryButtons}>
          <Button
            variant="secondary"
            size="md"
            onPress={handleViewEncyclopedia}
            style={styles.secondaryButton}
          >
            📖 Enzyklopädie
          </Button>

          <Button
            variant="secondary"
            size="md"
            onPress={handleGoHome}
            style={styles.secondaryButton}
          >
            🏠 Startseite
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  content: {
    paddingBottom: spacing[6],
  },
  header: {
    backgroundColor: colors.primary.main,
    padding: spacing[6],
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.foreground,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.foreground,
    opacity: 0.9,
  },
  resultCardContainer: {
    margin: spacing[4],
    marginBottom: spacing[3],
  },
  resultCard: {
    alignItems: 'center',
    padding: spacing[6],
  },
  grade: {
    fontSize: 60,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[2],
  },
  score: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  percentage: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing[4],
  },
  pointsBadge: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  pointsText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  commentCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    backgroundColor: 'rgba(255, 106, 92, 0.1)',
    borderColor: 'rgba(255, 106, 92, 0.2)',
  },
  commentContent: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  avatar: {
    fontSize: 24,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  commentMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    gap: spacing[3],
  },
  statIcon: {
    fontSize: 24,
  },
  noticeCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    backgroundColor: colors.background.muted,
  },
  noticeContent: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  noticeIcon: {
    fontSize: 20,
  },
  noticeTextContainer: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  noticeSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  actions: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  primaryButton: {
    marginBottom: spacing[2],
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  secondaryButton: {
    flex: 1,
  },
});
