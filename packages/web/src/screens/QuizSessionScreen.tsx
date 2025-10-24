/**
 * QuizSessionScreen - Interactive quiz session for web
 * Handles quiz flow: questions → answers → feedback → next
 * Reference: Concept/Absurd Quiz App Concept/src/components/Quiz.tsx
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui';
import { QuizOption } from '../components/ui/QuizOption';
import { QuizCategory, SoundEffect, QuizmasterService, DifficultyLevel } from '@quiz/shared';

// Import stores and services from shared source
// TODO: Update when properly exported from @quiz/shared
import { useQuizStore } from '../../../shared/src/stores/quizStore';
import { questionSelector } from '../../../shared/src/services/QuestionSelector';
import { storageService } from '../services/StorageService';
import { webAudioService } from '../services/audio/WebAudioService';

interface LocationState {
  category: QuizCategory;
  isDailyChallenge?: boolean;
}

export const QuizSessionScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, isDailyChallenge = false } = (location.state as LocationState) || {
    category: QuizCategory.GENERAL,
    isDailyChallenge: false
  };

  const {
    startSession,
    answerQuestion,
    nextQuestion,
    currentQuestion,
    currentQuestionIndex,
    questions,
    isSessionActive,
    currentSession,
    completeSession,
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
    const initSession = async () => {
      try {
        console.log('Starting quiz with category:', category, 'isDailyChallenge:', isDailyChallenge);

        // Preload audio
        await webAudioService.preloadSounds();

        // Get questions for this category (5 for daily challenge, 12 for regular quiz)
        const questionCount = isDailyChallenge ? 5 : 12;
        const selectedQuestions = questionSelector.getRandomQuestions(category, questionCount);
        console.log('Got questions:', selectedQuestions.length);

        if (selectedQuestions.length === 0) {
          console.error('No questions available for category:', category);
          alert(`Keine Fragen verfügbar für Kategorie: ${category}`);
          navigate('/');
          return;
        }

        // Start the quiz session
        console.log('Starting quiz session...');
        startSession(category, selectedQuestions, 'user-id', 0); // TODO: Get real userId and streak

        // Play quiz start sound
        await webAudioService.play(SoundEffect.QUIZ_START);

        setIsLoading(false);
        console.log('Quiz session started successfully!');
      } catch (error) {
        console.error('Error initializing quiz session:', error);
        alert(`Fehler beim Starten des Quiz: ${error}`);
        navigate('/');
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
  const handleAnswerSelect = async (answerIndex: number) => {
    if (isRevealed) return;

    const question = currentQuestion();
    if (!question) return;

    setSelectedAnswerIndex(answerIndex);
    setIsRevealed(true);

    const isCorrect = answerIndex === question.correctIndex; // Phase 4: Updated to correctIndex
    const timeSpent = Date.now() - startTime;

    // Play sound effect based on correctness
    await webAudioService.play(
      isCorrect ? SoundEffect.CORRECT_ANSWER : SoundEffect.WRONG_ANSWER
    );

    // Record answer in store (now stores actual text from selected option)
    answerQuestion(question.options[answerIndex], timeSpent, isCorrect);

    // Calculate current streak from session
    const session = currentSession;
    let currentStreak = 0;
    if (session) {
      // Count consecutive correct answers from the end
      for (let i = session.questions.length - 1; i >= 0; i--) {
        if (session.questions[i].isCorrect) {
          currentStreak++;
        } else {
          break;
        }
      }
      // Add current answer if correct
      if (isCorrect) currentStreak++;
    }

    // Calculate score percentage
    const scorePercentage = session
      ? (session.score / session.questions.length) * 100
      : 0;

    // Phase 4: Map numeric difficulty (1-5) to DifficultyLevel enum
    // 1-2 = EASY, 3 = MEDIUM, 4-5 = HARD
    let difficultyLevel: DifficultyLevel;
    if (question.difficulty <= 2) {
      difficultyLevel = DifficultyLevel.EASY;
    } else if (question.difficulty === 3) {
      difficultyLevel = DifficultyLevel.MEDIUM;
    } else {
      difficultyLevel = DifficultyLevel.HARD;
    }

    // Show context-aware quizmaster feedback
    const message = QuizmasterService.getComment({
      isCorrect,
      currentStreak,
      difficulty: difficultyLevel,
      scorePercentage,
    });
    setQuizmasterMessage(message);
    setShowQuizmaster(true);
  };

  // Handle next question or complete quiz
  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      nextQuestion();
      setSelectedAnswerIndex(null);
      setIsRevealed(false);
      setShowQuizmaster(false);
    } else {
      // Quiz complete - get session data before completing
      const session = currentSession;
      if (!session) {
        return;
      }

      // Calculate results
      const correctAnswersData = session.questions
        .filter(q => q.isCorrect)
        .map(q => {
          const fullQuestion = questions.find(qu => qu.id === q.questionId);
          return fullQuestion!;
        });

      // Complete session (saves and updates profile)
      await completeSession(storageService);

      // Play quiz complete sound
      await webAudioService.play(SoundEffect.QUIZ_COMPLETE);

      // Navigate to results with data
      navigate('/results', {
        state: {
          score: session.score,
          totalQuestions: session.questions.length,
          correctAnswers: correctAnswersData,
        },
      });
    }
  };

  // Loading state
  if (isLoading || !isSessionActive || !currentQuestion()) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade absurde Fragen...</p>
        </div>
      </div>
    );
  }

  const question = currentQuestion()!;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header with progress */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">Quiz</h1>
          <span className="text-sm opacity-90">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Quizmaster speech bubble */}
      {showQuizmaster && (
        <div className="p-4 pb-0">
          <div className="bg-accent/10 border-2 border-accent/20 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-3xl">😈</span>
            <p className="flex-1 text-base">{quizmasterMessage}</p>
          </div>
        </div>
      )}

      {/* Question and answers */}
      <div className="p-4">
        {/* Question card */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h2 className="text-lg leading-tight">{question.question}</h2>
        </div>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswerIndex === index}
              isCorrect={index === question.correctIndex} {/* Phase 4: Updated to correctIndex */}
              isRevealed={isRevealed}
              onSelect={() => handleAnswerSelect(index)}
              disabled={isRevealed}
            />
          ))}
        </div>

        {/* Next button (shown after answer) */}
        {isRevealed && (
          <div className="mt-4">
            <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Weiter' : 'Quiz beenden'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
