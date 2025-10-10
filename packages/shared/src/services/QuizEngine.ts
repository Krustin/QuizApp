/**
 * QuizEngine Service
 *
 * Core quiz engine for session management and answer validation.
 * Handles the complete lifecycle of a quiz session from initialization
 * to completion, including answer validation and scoring.
 */

import { Question, QuizSession, SessionQuestion, QuizCategory } from '../models';
import { generateSimpleId } from '../utils/idGenerator';

/**
 * Core quiz engine for session management and answer validation
 */
export class QuizEngine {
  /**
   * Initialize a new quiz session
   *
   * Creates a new QuizSession object with all initial values set.
   * The session starts with zero score and an empty answers array.
   *
   * @param userId - User ID for the session
   * @param category - Quiz category being played
   * @param questions - Array of questions (pre-selected, should be 12)
   * @param currentStreak - User's current streak at session start
   * @returns New QuizSession object with initial state
   *
   * @example
   * const session = quizEngine.initializeSession(
   *   'user-123',
   *   QuizCategory.GENERAL,
   *   selectedQuestions,
   *   5
   * );
   */
  initializeSession(
    userId: string,
    category: QuizCategory,
    questions: Question[],
    currentStreak: number
  ): QuizSession {
    return {
      sessionId: generateSimpleId(),
      userId,
      categoryId: category,
      questions: [],
      score: 0,
      pointsEarned: 0,
      startedAt: new Date(),
      completedAt: undefined,
      streakAtStart: currentStreak,
      streakAtEnd: currentStreak,
    };
  }

  /**
   * Validate if selected answer is correct
   *
   * Checks if the selected answer index matches the correct answer index.
   * New format uses index-based validation (0-3 for A-D options).
   *
   * @param question - The question being answered
   * @param selectedAnswerIndex - The index of the answer selected by user (0-3)
   * @returns True if answer is correct, false otherwise
   *
   * @example
   * const isCorrect = quizEngine.validateAnswer(question, 2); // User selected option C
   */
  validateAnswer(question: Question, selectedAnswerIndex: number): boolean {
    // Handle edge cases
    if (
      selectedAnswerIndex < 0 ||
      selectedAnswerIndex >= question.options.length ||
      question.correctAnswer < 0 ||
      question.correctAnswer >= question.options.length
    ) {
      return false;
    }

    // Simple index comparison
    return selectedAnswerIndex === question.correctAnswer;
  }

  /**
   * Record an answer and update session
   *
   * Creates a SessionQuestion record and updates the session with
   * the new answer, score, and points. Returns a new session object
   * (immutable update).
   *
   * @param session - Current quiz session
   * @param question - The question answered
   * @param selectedAnswerIndex - The index of the answer selected (0-3)
   * @param timeSpent - Time spent in milliseconds
   * @param isCorrect - Whether answer was correct
   * @returns Updated session with new answer recorded
   *
   * @example
   * const updatedSession = quizEngine.recordAnswer(
   *   currentSession,
   *   question,
   *   2, // User selected option C
   *   5000,
   *   true
   * );
   */
  recordAnswer(
    session: QuizSession,
    question: Question,
    selectedAnswerIndex: number,
    timeSpent: number,
    isCorrect: boolean
  ): QuizSession {
    // Create SessionQuestion object
    const sessionQuestion: SessionQuestion = {
      questionId: question.id,
      userAnswer: question.options[selectedAnswerIndex] || '', // Store the actual answer text
      isCorrect,
      timeToAnswer: timeSpent,
      pointsEarned: isCorrect ? 10 : 0,
    };

    // Calculate updated values
    const newCorrectCount = session.score + (isCorrect ? 1 : 0);
    const newPointsEarned = session.pointsEarned + (isCorrect ? 10 : 0);

    // Return new session object (immutable)
    return {
      ...session,
      questions: [...session.questions, sessionQuestion],
      score: newCorrectCount,
      pointsEarned: newPointsEarned,
    };
  }

  /**
   * Calculate points for current session
   *
   * Points are awarded at a rate of 10 points per correct answer.
   *
   * @param correctCount - Number of correct answers
   * @returns Total points (correctCount * 10)
   *
   * @example
   * const points = quizEngine.calculatePoints(8); // Returns 80
   */
  calculatePoints(correctCount: number): number {
    // Handle edge cases
    if (correctCount < 0) {
      return 0;
    }

    return correctCount * 10;
  }

  /**
   * Complete the session
   *
   * Marks the session as completed by setting the completedAt timestamp.
   * Returns a new session object (immutable).
   *
   * @param session - Current session
   * @returns Session with completedAt timestamp
   *
   * @example
   * const completedSession = quizEngine.completeSession(currentSession);
   */
  completeSession(session: QuizSession): QuizSession {
    return {
      ...session,
      completedAt: new Date(),
    };
  }
}

/**
 * Singleton instance of QuizEngine
 * Use this exported instance throughout the app for consistency
 *
 * @example
 * import { quizEngine } from '@quiz-app/shared/services';
 * const session = quizEngine.initializeSession(...);
 */
export const quizEngine = new QuizEngine();
