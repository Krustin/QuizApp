/**
 * Quiz Store Tests
 *
 * Comprehensive test suite for quizStore.ts
 * Tests session management, answer tracking, and scoring
 */

import { useQuizStore } from '../quizStore';
import { useUserStore } from '../userStore';
import { MockStorageImpl } from '../../services/__tests__/MockStorageImpl';
import type { Question } from '../../models/Question';
import { QuizCategory, DifficultyLevel } from '../../models/Enums';

describe('quizStore', () => {
  let storage: MockStorageImpl;

  const mockQuestions: Question[] = [
    {
      id: 'q1',
      question: 'What is 2+2?',
      options: ['4', '3', '5', '6'],
      correctAnswer: 0,
      explanation: 'Basic arithmetic',
      category: 'Allgemeinwissen',
      difficulty: 'easy',
      tags: ['math'],
    },
    {
      id: 'q2',
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 0,
      explanation: 'Geography fact',
      category: 'Allgemeinwissen',
      difficulty: 'medium',
      tags: ['geography'],
    },
    {
      id: 'q3',
      question: 'Who wrote Hamlet?',
      options: ['Shakespeare', 'Goethe', 'Dickens', 'Hemingway'],
      correctAnswer: 0,
      explanation: 'Literature fact',
      category: 'Allgemeinwissen',
      difficulty: 'hard',
      tags: ['literature'],
    },
  ];

  beforeEach(() => {
    storage = new MockStorageImpl();

    // Reset quiz store
    useQuizStore.setState({
      currentSession: null,
      currentQuestionIndex: 0,
      isSessionActive: false,
      questions: [],
    });

    // Reset user store
    useUserStore.setState({
      userProfile: null,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    storage.reset();
  });

  describe('startSession', () => {
    it('should start a new session with correct initial state', () => {
      const { startSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);

      const state = useQuizStore.getState();
      expect(state.currentSession).toBeTruthy();
      expect(state.currentSession?.categoryId).toBe(QuizCategory.GENERAL);
      expect(state.currentSession?.userId).toBe('user123');
      expect(state.currentSession?.questions).toEqual([]);
      expect(state.currentSession?.score).toBe(0);
      expect(state.currentSession?.pointsEarned).toBe(0);
      expect(state.currentSession?.streakAtStart).toBe(0);
      expect(state.isSessionActive).toBe(true);
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.questions).toEqual(mockQuestions);
    });

    it('should generate unique session ID', () => {
      const { startSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
      const session1Id = useQuizStore.getState().currentSession?.sessionId;

      // Start another session
      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
      const session2Id = useQuizStore.getState().currentSession?.sessionId;

      expect(session1Id).not.toBe(session2Id);
    });

    it('should set startedAt timestamp', () => {
      const beforeTime = new Date();
      const { startSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 5);

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.startedAt.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    it('should track initial streak', () => {
      const { startSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 10);

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.streakAtStart).toBe(10);
      expect(currentSession?.streakAtEnd).toBe(10);
    });
  });

  describe('answerQuestion', () => {
    beforeEach(() => {
      const { startSession } = useQuizStore.getState();
      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
    });

    it('should record a correct answer', () => {
      const { answerQuestion } = useQuizStore.getState();

      answerQuestion('4', 3000, true);

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.questions.length).toBe(1);
      expect(currentSession?.questions[0].questionId).toBe('q1');
      expect(currentSession?.questions[0].userAnswer).toBe('4');
      expect(currentSession?.questions[0].isCorrect).toBe(true);
      expect(currentSession?.questions[0].timeToAnswer).toBe(3000);
      expect(currentSession?.questions[0].pointsEarned).toBe(10);
    });

    it('should record a wrong answer', () => {
      const { answerQuestion } = useQuizStore.getState();

      answerQuestion('3', 2000, false);

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.questions[0].isCorrect).toBe(false);
      expect(currentSession?.questions[0].pointsEarned).toBe(0);
    });

    it('should update score for correct answers', () => {
      const { answerQuestion } = useQuizStore.getState();

      answerQuestion('4', 3000, true);
      answerQuestion('Paris', 4000, true);
      answerQuestion('Wrong', 2000, false);

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.score).toBe(2);
    });

    it('should accumulate points earned', () => {
      const { answerQuestion } = useQuizStore.getState();

      answerQuestion('4', 3000, true); // +10
      answerQuestion('Paris', 4000, true); // +10
      answerQuestion('Wrong', 2000, false); // +0

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.pointsEarned).toBe(20);
    });

    it('should handle multiple answers in sequence', () => {
      const { answerQuestion, nextQuestion } = useQuizStore.getState();

      answerQuestion('4', 3000, true);
      nextQuestion();
      answerQuestion('Paris', 4000, true);
      nextQuestion();
      answerQuestion('Shakespeare', 5000, true);

      const { currentSession } = useQuizStore.getState();
      expect(currentSession?.questions.length).toBe(3);
      expect(currentSession?.score).toBe(3);
      expect(currentSession?.pointsEarned).toBe(30);
    });
  });

  describe('nextQuestion', () => {
    beforeEach(() => {
      const { startSession } = useQuizStore.getState();
      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
    });

    it('should increment question index', () => {
      const { nextQuestion } = useQuizStore.getState();

      nextQuestion();

      const { currentQuestionIndex } = useQuizStore.getState();
      expect(currentQuestionIndex).toBe(1);
    });

    it('should not exceed question array length', () => {
      const { nextQuestion } = useQuizStore.getState();

      nextQuestion();
      nextQuestion();
      nextQuestion();
      nextQuestion(); // Attempt to go beyond array

      const { currentQuestionIndex } = useQuizStore.getState();
      expect(currentQuestionIndex).toBe(2); // Should stay at last index
    });

    it('should allow navigating through all questions', () => {
      const { nextQuestion, answerQuestion } = useQuizStore.getState();

      answerQuestion('4', 3000, true);
      nextQuestion();

      expect(useQuizStore.getState().currentQuestionIndex).toBe(1);

      answerQuestion('Paris', 4000, true);
      nextQuestion();

      expect(useQuizStore.getState().currentQuestionIndex).toBe(2);
    });
  });

  describe('completeSession', () => {
    beforeEach(async () => {
      // Initialize user store
      await useUserStore.getState().loadUserProfile(storage);
    });

    it('should save completed session to storage', async () => {
      const { startSession, answerQuestion, completeSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
      answerQuestion('4', 3000, true);

      await completeSession(storage);

      const sessions = await storage.getAllSessions();
      expect(sessions.length).toBe(1);
      expect(sessions[0].categoryId).toBe(QuizCategory.GENERAL);
      expect(sessions[0].score).toBe(1);
      expect(sessions[0].pointsEarned).toBe(10);
      expect(sessions[0].completedAt).toBeTruthy();
    });

    it('should update user profile points', async () => {
      const { startSession, answerQuestion, completeSession } = useQuizStore.getState();

      // Ensure userStore profile is loaded
      const userProfile = useUserStore.getState().userProfile;
      expect(userProfile).toBeTruthy();

      const userId = userProfile!.userId;
      const initialPoints = userProfile!.totalPoints;

      startSession(QuizCategory.GENERAL, mockQuestions, userId, 0);
      answerQuestion('4', 3000, true);
      answerQuestion('Paris', 4000, true);

      await completeSession(storage);

      // Points should be updated in the userStore state
      const updatedUserProfile = useUserStore.getState().userProfile;
      expect(updatedUserProfile?.totalPoints).toBe(initialPoints + 20);
    });

    it('should increment sessions played', async () => {
      const { startSession, answerQuestion, completeSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
      answerQuestion('4', 3000, true);

      await completeSession(storage);

      const userProfile = await storage.getUserProfile();
      expect(userProfile?.sessionsPlayed).toBe(1);
    });

    it('should clear session state after completion', async () => {
      const { startSession, answerQuestion, completeSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
      answerQuestion('4', 3000, true);

      await completeSession(storage);

      const state = useQuizStore.getState();
      expect(state.currentSession).toBeNull();
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.isSessionActive).toBe(false);
      expect(state.questions).toEqual([]);
    });

    it('should set completedAt timestamp', async () => {
      const { startSession, answerQuestion, completeSession } = useQuizStore.getState();

      const userId = useUserStore.getState().userProfile?.userId || 'user123';

      startSession(QuizCategory.GENERAL, mockQuestions, userId, 0);
      answerQuestion('4', 3000, true);

      const beforeTime = new Date();
      await completeSession(storage);

      const sessions = await storage.getAllSessions();
      expect(sessions[0].completedAt).toBeTruthy();

      // Handle Date deserialization
      const completedAt = typeof sessions[0].completedAt === 'string'
        ? new Date(sessions[0].completedAt)
        : sessions[0].completedAt;

      expect(completedAt!.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    it('should handle error if no active session', async () => {
      const { completeSession } = useQuizStore.getState();

      // Should not throw
      await expect(completeSession(storage)).resolves.not.toThrow();
    });
  });

  describe('abandonSession', () => {
    beforeEach(() => {
      const { startSession } = useQuizStore.getState();
      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
    });

    it('should clear all session state', () => {
      const { abandonSession } = useQuizStore.getState();

      abandonSession();

      const state = useQuizStore.getState();
      expect(state.currentSession).toBeNull();
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.isSessionActive).toBe(false);
      expect(state.questions).toEqual([]);
    });

    it('should not save session to storage', async () => {
      const { answerQuestion, abandonSession } = useQuizStore.getState();

      answerQuestion('4', 3000, true);
      abandonSession();

      const sessions = await storage.getAllSessions();
      expect(sessions.length).toBe(0);
    });
  });

  describe('Computed Values', () => {
    describe('currentQuestion', () => {
      it('should return null when no session active', () => {
        const { currentQuestion } = useQuizStore.getState();

        expect(currentQuestion()).toBeNull();
      });

      it('should return first question at start', () => {
        const { startSession, currentQuestion } = useQuizStore.getState();

        startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);

        expect(currentQuestion()).toEqual(mockQuestions[0]);
      });

      it('should return correct question after navigation', () => {
        const { startSession, nextQuestion, currentQuestion } = useQuizStore.getState();

        startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
        nextQuestion();

        expect(currentQuestion()).toEqual(mockQuestions[1]);
      });

      it('should return last question when at end', () => {
        const { startSession, nextQuestion, currentQuestion } = useQuizStore.getState();

        startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
        nextQuestion(); // index 1
        nextQuestion(); // index 2
        nextQuestion(); // try to go beyond, stays at 2

        // nextQuestion stops at questions.length - 1, so we're still at index 2
        const current = currentQuestion();
        expect(current).toEqual(mockQuestions[2]);
      });
    });

    describe('progress', () => {
      it('should return 0 when no session active', () => {
        const { progress } = useQuizStore.getState();

        expect(progress()).toBe(0);
      });

      it('should return 0 at start of session', () => {
        const { startSession, progress } = useQuizStore.getState();

        startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);

        expect(progress()).toBe(0);
      });

      it('should calculate progress correctly', () => {
        const { startSession, nextQuestion, progress } = useQuizStore.getState();

        startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);

        nextQuestion();
        expect(progress()).toBeCloseTo(0.333, 2);

        nextQuestion();
        expect(progress()).toBeCloseTo(0.666, 2);
      });
    });

    describe('sessionScore', () => {
      it('should return 0 when no session active', () => {
        const { sessionScore } = useQuizStore.getState();

        expect(sessionScore()).toBe(0);
      });

      it('should return current score', () => {
        const { startSession, answerQuestion, sessionScore } = useQuizStore.getState();

        startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);

        answerQuestion('4', 3000, true);
        expect(sessionScore()).toBe(1);

        answerQuestion('Paris', 4000, true);
        expect(sessionScore()).toBe(2);

        answerQuestion('Wrong', 2000, false);
        expect(sessionScore()).toBe(2);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty questions array', () => {
      const { startSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, [], 'user123', 0);

      const state = useQuizStore.getState();
      expect(state.isSessionActive).toBe(true);
      expect(state.questions).toEqual([]);
    });

    it('should handle rapid session starts', () => {
      const { startSession } = useQuizStore.getState();

      startSession(QuizCategory.GENERAL, mockQuestions, 'user123', 0);
      const session1Id = useQuizStore.getState().currentSession?.sessionId;

      startSession(QuizCategory.WISSENSCHAFT, mockQuestions, 'user123', 0);
      const session2Id = useQuizStore.getState().currentSession?.sessionId;

      expect(session1Id).not.toBe(session2Id);
      expect(useQuizStore.getState().currentSession?.categoryId).toBe(
        QuizCategory.WISSENSCHAFT
      );
    });

    it('should handle answering without active session', () => {
      const { answerQuestion } = useQuizStore.getState();

      // Should not throw
      expect(() => answerQuestion('4', 3000, true)).not.toThrow();
    });
  });
});
