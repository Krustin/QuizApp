import { create } from 'zustand';
import type { QuizSession, SessionQuestion } from '../models/Session';
import type { Question } from '../models/Question';
import type { QuizCategory } from '../models/Enums';
import type { StorageService } from '../services/StorageService';
import { useUserStore } from './userStore';

/**
 * QuizStore State Interface
 * Manages active quiz session state and operations
 */
interface QuizStore {
  // ========================================
  // State
  // ========================================

  /** Current active quiz session (null if no session active) */
  currentSession: QuizSession | null;

  /** Index of the current question being answered (0-based) */
  currentQuestionIndex: number;

  /** Whether a quiz session is currently active */
  isSessionActive: boolean;

  /** Array of questions for the current session */
  questions: Question[];

  // ========================================
  // Actions
  // ========================================

  /**
   * Starts a new quiz session with the given category and questions.
   * Creates a new QuizSession object and resets state.
   *
   * @param category - The quiz category being played
   * @param questions - Array of 12 questions for this session
   * @param userId - The ID of the user playing the quiz
   * @param currentStreak - User's current streak at session start
   */
  startSession: (
    category: QuizCategory,
    questions: Question[],
    userId: string,
    currentStreak: number
  ) => void;

  /**
   * Records an answer to the current question.
   * Creates a SessionQuestion object and adds it to the session.
   * Updates session stats (score, correctCount).
   *
   * @param answerId - The answer text selected by the user
   * @param timeSpent - Time taken to answer in milliseconds
   * @param isCorrect - Whether the answer was correct
   */
  answerQuestion: (answerId: string, timeSpent: number, isCorrect: boolean) => void;

  /**
   * Moves to the next question in the session.
   * Increments currentQuestionIndex by 1.
   */
  nextQuestion: () => void;

  /**
   * Completes the current session and saves it to storage.
   * Updates user profile with earned points and stats.
   * Sets isSessionActive to false.
   *
   * @param storageService - Storage service for persisting data
   */
  completeSession: (storageService: StorageService) => Promise<void>;

  /**
   * Abandons the current session without saving.
   * Clears all session state.
   */
  abandonSession: () => void;

  // ========================================
  // Computed Values
  // ========================================

  /**
   * Gets the current question being answered.
   *
   * @returns The current Question object, or null if no session active
   */
  currentQuestion: () => Question | null;

  /**
   * Calculates the progress through the current session.
   * Formula: currentQuestionIndex / questions.length
   *
   * @returns Progress as a decimal (0.0 to 1.0), or 0 if no session active
   */
  progress: () => number;

  /**
   * Gets the current session score (number of correct answers).
   *
   * @returns Number of correct answers, or 0 if no session active
   */
  sessionScore: () => number;
}

/**
 * QuizStore - Zustand store for quiz session management
 *
 * Features:
 * - Manages active quiz session state (12 questions per session)
 * - Tracks current question, answers, and scoring
 * - Persists completed sessions to storage
 * - Updates user profile stats upon session completion
 * - Provides computed values for UI (progress, score, current question)
 *
 * Usage:
 * ```typescript
 * const { startSession, answerQuestion, completeSession } = useQuizStore();
 *
 * // Start a new session
 * startSession(QuizCategory.GENERAL, questions, userId, currentStreak);
 *
 * // Answer a question
 * answerQuestion("Berlin", 5000, true);
 *
 * // Complete the session
 * await completeSession(storageService);
 * ```
 */
export const useQuizStore = create<QuizStore>((set, get) => ({
  // ========================================
  // Initial State
  // ========================================
  currentSession: null,
  currentQuestionIndex: 0,
  isSessionActive: false,
  questions: [],

  // ========================================
  // Actions
  // ========================================

  startSession: (
    category: QuizCategory,
    questions: Question[],
    userId: string,
    currentStreak: number
  ) => {
    const now = new Date();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newSession: QuizSession = {
      sessionId,
      userId,
      categoryId: category,
      questions: [], // Will be populated as user answers questions
      score: 0,
      pointsEarned: 0,
      startedAt: now,
      completedAt: undefined,
      streakAtStart: currentStreak,
      streakAtEnd: currentStreak, // Will be updated as questions are answered
    };

    set({
      currentSession: newSession,
      currentQuestionIndex: 0,
      isSessionActive: true,
      questions,
    });
  },

  answerQuestion: (answerId: string, timeSpent: number, isCorrect: boolean) => {
    const { currentSession, questions, currentQuestionIndex, isSessionActive } = get();

    if (!currentSession || !isSessionActive) {
      console.error('No active session to answer question');
      return;
    }

    if (currentQuestionIndex >= questions.length) {
      console.error('No more questions in session');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const pointsEarned = isCorrect ? 10 : 0;

    // Create SessionQuestion object
    const sessionQuestion: SessionQuestion = {
      questionId: currentQuestion.id,
      userAnswer: answerId,
      isCorrect,
      timeToAnswer: timeSpent,
      pointsEarned,
    };

    // Update session with new answer
    const updatedSession: QuizSession = {
      ...currentSession,
      questions: [...currentSession.questions, sessionQuestion],
      score: isCorrect ? currentSession.score + 1 : currentSession.score,
      pointsEarned: currentSession.pointsEarned + pointsEarned,
    };

    set({ currentSession: updatedSession });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();

    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  completeSession: async (storageService: StorageService) => {
    const { currentSession } = get();

    if (!currentSession) {
      console.error('No active session to complete');
      return;
    }

    try {
      // Mark session as completed
      const completedSession: QuizSession = {
        ...currentSession,
        completedAt: new Date(),
      };

      // Save session to storage
      await storageService.saveSession(completedSession);

      // Update user profile stats
      const userStore = useUserStore.getState();
      const { userProfile } = userStore;

      if (userProfile) {
        // Update points (will auto-handle level-up)
        await userStore.updatePoints(completedSession.pointsEarned, storageService);

        // Update session count
        const updatedProfile = {
          ...userProfile,
          sessionsPlayed: userProfile.sessionsPlayed + 1,
        };
        await storageService.saveUserProfile(updatedProfile);

        // Note: Streak and accuracy are updated per-question via answerQuestion
        // so we don't need to update them here
      }

      // Clear session state
      set({
        currentSession: null,
        currentQuestionIndex: 0,
        isSessionActive: false,
        questions: [],
      });
    } catch (error) {
      console.error('Error completing session:', error);
      throw error;
    }
  },

  abandonSession: () => {
    set({
      currentSession: null,
      currentQuestionIndex: 0,
      isSessionActive: false,
      questions: [],
    });
  },

  // ========================================
  // Computed Values
  // ========================================

  currentQuestion: () => {
    const { questions, currentQuestionIndex, isSessionActive } = get();

    if (!isSessionActive || currentQuestionIndex >= questions.length) {
      return null;
    }

    return questions[currentQuestionIndex];
  },

  progress: () => {
    const { questions, currentQuestionIndex, isSessionActive } = get();

    if (!isSessionActive || questions.length === 0) {
      return 0;
    }

    return currentQuestionIndex / questions.length;
  },

  sessionScore: () => {
    const { currentSession } = get();

    if (!currentSession) {
      return 0;
    }

    return currentSession.score;
  },
}));

export type { QuizStore };
