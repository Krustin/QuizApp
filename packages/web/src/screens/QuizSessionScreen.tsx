/**
 * QuizSessionScreen - Interactive quiz session for web
 * Handles quiz flow: questions → answers → feedback → next
 * Reference: Concept/Absurd Quiz App Concept/src/components/Quiz.tsx
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui';
import { QuizOption } from '../components/ui/QuizOption';
import type { QuizCategory } from '@quiz/shared';

// Import stores and services from shared source
// TODO: Update when properly exported from @quiz/shared
import { useQuizStore } from '../../../shared/src/stores/quizStore';
import { questionSelector } from '../../../shared/src/services/QuestionSelector';
import { getSarcasticComment } from '../../../shared/src/data/sarcasticComments';

interface LocationState {
  category: QuizCategory;
}

export const QuizSessionScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = (location.state as LocationState) || { category: 'GENERAL' };

  const {
    startSession,
    answerQuestion,
    nextQuestion,
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
          navigate('/play');
          return;
        }

        // Start the quiz session
        startSession(category, selectedQuestions, 'user-id', 0); // TODO: Get real userId and streak
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing quiz session:', error);
        navigate('/play');
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
      navigate('/results');
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
    <div className="min-h-screen bg-background pb-20">
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
              isCorrect={index === question.correctAnswer}
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
