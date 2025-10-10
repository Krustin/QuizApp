/**
 * QuizSessionScreen - Interactive quiz session
 * Handles quiz flow: questions → answers → feedback → next
 * Reference: Concept/Absurd Quiz App Concept/src/components/Quiz.tsx
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button } from '../components/ui';
import { QuizOption } from '../components/ui/QuizOption';
import { colors, spacing, typography, borderRadius } from '@quiz/shared/theme';
import { useQuizStore } from '@quiz/shared/stores/quizStore';
import { questionSelector } from '@quiz/shared/services/QuestionSelector';
import { getSarcasticComment } from '@quiz/shared/data/sarcasticComments';
import type { QuizCategory } from '@quiz/shared/models';

interface QuizSessionScreenProps {
  route: {
    params: {
      category: QuizCategory;
    };
  };
  navigation: any;
}

export default function QuizSessionScreen({ route, navigation }: QuizSessionScreenProps) {
  const { category } = route.params;
  const {
    startSession,
    answerQuestion,
    nextQuestion,
    completeSession,
    currentQuestion,
    currentQuestionIndex,
    questions,
    isSessionActive,
  } = useQuizStore();

  // Local state for quiz interaction
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [quizmasterMessage, setQuizmasterMessage] = useState('');
  const [showQuizmaster, setShowQuizmaster] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initSession = () => {
      try {
        // Get questions for this category
        const selectedQuestions = questionSelector.getRandomQuestions(category, 12);

        if (selectedQuestions.length === 0) {
          console.error('No questions available for category:', category);
          navigation.goBack();
          return;
        }

        // Start the quiz session
        startSession(category, selectedQuestions, 'user-id', 0); // TODO: Get real userId and streak
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing quiz session:', error);
        navigation.goBack();
      }
    };

    initSession();
  }, [category]);

  // Reset timer when question changes
  useEffect(() => {
    const question = currentQuestion();
    if (question && isSessionActive) {
      setStartTime(Date.now());
    }
  }, [currentQuestionIndex, isSessionActive]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (isRevealed) return;

    const question = currentQuestion();
    if (!question) return;

    setSelectedAnswerIndex(answerIndex);
    setIsRevealed(true);

    const isCorrect = answerIndex === question.correctAnswer;
    const timeSpent = Date.now() - startTime;

    // Record answer in store (now stores actual text from selected option)
    answerQuestion(question.options[answerIndex], timeSpent, isCorrect);

    // Show quizmaster feedback
    const message = getSarcasticComment(isCorrect);
    setQuizmasterMessage(message);
    setShowQuizmaster(true);
  };

  // Handle next question or complete quiz
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      nextQuestion();
      setSelectedAnswerIndex(null);
      setIsRevealed(false);
      setShowQuizmaster(false);
    } else {
      // Quiz complete - navigate to results
      // TODO: Pass storageService when available
      navigation.navigate('Results');
    }
  };

  // Loading state
  if (isLoading || !isSessionActive || !currentQuestion()) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Lade absurde Fragen...</Text>
      </SafeAreaView>
    );
  }

  const question = currentQuestion()!;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with progress */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Quiz</Text>
            <Text style={styles.headerCounter}>
              {currentQuestionIndex + 1} / {questions.length}
            </Text>
          </View>
          {/* Progress bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Quizmaster speech bubble */}
        {showQuizmaster && (
          <View style={styles.quizmasterContainer}>
            <View style={styles.speechBubble}>
              <Text style={styles.quizmasterAvatar}>😈</Text>
              <Text style={styles.quizmasterMessage}>{quizmasterMessage}</Text>
            </View>
          </View>
        )}

        {/* Question card */}
        <View style={styles.content}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          {/* Answer options */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                isSelected={selectedAnswerIndex === index}
                isCorrect={index === question.correctAnswer}
                isRevealed={isRevealed}
                onSelect={() => handleAnswerSelect(index)}
                disabled={isRevealed}
              />
            ))}
          </View>

          {/* Next button (shown after answer) */}
          {isRevealed && (
            <View style={styles.nextButtonContainer}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onPress={handleNext}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Weiter' : 'Quiz beenden'}
              </Button>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing[4],
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  header: {
    backgroundColor: colors.primary.main,
    padding: spacing[4],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.foreground,
  },
  headerCounter: {
    fontSize: typography.fontSize.sm,
    color: colors.primary.foreground,
    opacity: 0.9,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary.foreground,
    borderRadius: borderRadius.full,
  },
  quizmasterContainer: {
    padding: spacing[4],
    paddingBottom: 0,
  },
  speechBubble: {
    backgroundColor: 'rgba(255, 106, 92, 0.1)', // accent/10
    borderWidth: 2,
    borderColor: 'rgba(255, 106, 92, 0.2)', // accent/20
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  quizmasterAvatar: {
    fontSize: 32,
  },
  quizmasterMessage: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  content: {
    padding: spacing[4],
  },
  questionCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[6],
    marginBottom: spacing[6],
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  questionText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.lg,
  },
  optionsContainer: {
    marginBottom: spacing[6],
  },
  nextButtonContainer: {
    marginTop: spacing[4],
  },
});
