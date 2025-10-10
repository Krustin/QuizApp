/**
 * QuizEngine Service Tests
 *
 * Comprehensive test suite for QuizEngine service.
 * Tests session initialization, answer validation, scoring, and session completion.
 */

import { QuizEngine } from '../QuizEngine';
import { QuizCategory, DifficultyLevel } from '../../models/Enums';
import type { Question, QuizSession } from '../../models';

// Mock the ID generator to make tests deterministic
jest.mock('../../utils/idGenerator', () => ({
  generateSimpleId: jest.fn(() => 'test-session-id'),
}));

describe('QuizEngine', () => {
  let quizEngine: QuizEngine;

  // Helper to create mock question
  const createMockQuestion = (id: string = 'q1'): Question => ({
    id,
    category: QuizCategory.GENERAL,
    difficulty: DifficultyLevel.EASY,
    questionText: 'What is the capital of Germany?',
    correctAnswer: 'Berlin',
    wrongAnswers: ['Munich', 'Hamburg', 'Cologne'],
    tldr: 'Berlin is the capital of Germany.',
    funFact: 'Berlin is also a city-state.',
    source: 'https://example.com',
  });

  beforeEach(() => {
    quizEngine = new QuizEngine();
    jest.clearAllMocks();
  });

  describe('initializeSession', () => {
    it('should create valid QuizSession', () => {
      const userId = 'user-123';
      const category = QuizCategory.GENERAL;
      const questions = [createMockQuestion()];
      const currentStreak = 5;

      const session = quizEngine.initializeSession(userId, category, questions, currentStreak);

      expect(session).toBeDefined();
      expect(session.sessionId).toBe('test-session-id');
      expect(session.userId).toBe(userId);
      expect(session.categoryId).toBe(category);
      expect(session.streakAtStart).toBe(currentStreak);
      expect(session.streakAtEnd).toBe(currentStreak);
      expect(session.startedAt).toBeInstanceOf(Date);
    });

    it('should set initial score to 0', () => {
      const session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        0
      );

      expect(session.score).toBe(0);
    });

    it('should set answers to empty array', () => {
      const session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        0
      );

      expect(session.questions).toEqual([]);
      expect(Array.isArray(session.questions)).toBe(true);
    });

    it('should set pointsEarned to 0', () => {
      const session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        0
      );

      expect(session.pointsEarned).toBe(0);
    });

    it('should set completedAt to undefined', () => {
      const session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        0
      );

      expect(session.completedAt).toBeUndefined();
    });

    it('should handle different categories', () => {
      const session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.WISSENSCHAFT,
        [createMockQuestion()],
        0
      );

      expect(session.categoryId).toBe(QuizCategory.WISSENSCHAFT);
    });

    it('should preserve current streak in both start and end initially', () => {
      const session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        15
      );

      expect(session.streakAtStart).toBe(15);
      expect(session.streakAtEnd).toBe(15);
    });
  });

  describe('validateAnswer', () => {
    const question = createMockQuestion();

    it('should return true for correct answer', () => {
      const result = quizEngine.validateAnswer(question, 'Berlin');

      expect(result).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      const result = quizEngine.validateAnswer(question, 'Munich');

      expect(result).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(quizEngine.validateAnswer(question, 'BERLIN')).toBe(true);
      expect(quizEngine.validateAnswer(question, 'berlin')).toBe(true);
      expect(quizEngine.validateAnswer(question, 'BeRlIn')).toBe(true);
    });

    it('should trim whitespace', () => {
      expect(quizEngine.validateAnswer(question, '  Berlin  ')).toBe(true);
      expect(quizEngine.validateAnswer(question, '\tBerlin\n')).toBe(true);
      expect(quizEngine.validateAnswer(question, ' Berlin')).toBe(true);
      expect(quizEngine.validateAnswer(question, 'Berlin ')).toBe(true);
    });

    it('should handle empty string as incorrect', () => {
      expect(quizEngine.validateAnswer(question, '')).toBe(false);
    });

    it('should handle whitespace-only string as incorrect', () => {
      expect(quizEngine.validateAnswer(question, '   ')).toBe(false);
    });

    it('should return false for undefined answer', () => {
      expect(quizEngine.validateAnswer(question, undefined as any)).toBe(false);
    });

    it('should return false for null answer', () => {
      expect(quizEngine.validateAnswer(question, null as any)).toBe(false);
    });

    it('should handle question with empty correct answer', () => {
      const invalidQuestion = { ...question, correctAnswer: '' };
      expect(quizEngine.validateAnswer(invalidQuestion, 'Berlin')).toBe(false);
    });
  });

  describe('recordAnswer', () => {
    let session: QuizSession;
    const question = createMockQuestion();

    beforeEach(() => {
      session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        0
      );
    });

    it('should add answer to session', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        5000,
        true
      );

      expect(updatedSession.questions).toHaveLength(1);
      expect(updatedSession.questions[0].questionId).toBe(question.id);
      expect(updatedSession.questions[0].userAnswer).toBe('Berlin');
    });

    it('should increment correctCount if correct', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        5000,
        true
      );

      expect(updatedSession.score).toBe(1);
    });

    it('should add 10 points if correct', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        5000,
        true
      );

      expect(updatedSession.pointsEarned).toBe(10);
      expect(updatedSession.questions[0].pointsEarned).toBe(10);
    });

    it('should not add points if incorrect', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Munich',
        5000,
        false
      );

      expect(updatedSession.pointsEarned).toBe(0);
      expect(updatedSession.questions[0].pointsEarned).toBe(0);
      expect(updatedSession.score).toBe(0);
    });

    it('should be immutable (return new session)', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        5000,
        true
      );

      // Original session should be unchanged
      expect(session.questions).toHaveLength(0);
      expect(session.score).toBe(0);
      expect(session.pointsEarned).toBe(0);

      // Updated session should have changes
      expect(updatedSession.questions).toHaveLength(1);
      expect(updatedSession.score).toBe(1);
      expect(updatedSession.pointsEarned).toBe(10);

      // Should be different objects
      expect(updatedSession).not.toBe(session);
    });

    it('should record time spent', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        7500,
        true
      );

      expect(updatedSession.questions[0].timeToAnswer).toBe(7500);
    });

    it('should record isCorrect flag', () => {
      const correctSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        5000,
        true
      );
      expect(correctSession.questions[0].isCorrect).toBe(true);

      const incorrectSession = quizEngine.recordAnswer(
        session,
        question,
        'Munich',
        5000,
        false
      );
      expect(incorrectSession.questions[0].isCorrect).toBe(false);
    });

    it('should accumulate multiple answers', () => {
      let updatedSession = session;

      // Answer 1 - correct
      updatedSession = quizEngine.recordAnswer(
        updatedSession,
        createMockQuestion('q1'),
        'Berlin',
        5000,
        true
      );

      // Answer 2 - incorrect
      updatedSession = quizEngine.recordAnswer(
        updatedSession,
        createMockQuestion('q2'),
        'Wrong',
        3000,
        false
      );

      // Answer 3 - correct
      updatedSession = quizEngine.recordAnswer(
        updatedSession,
        createMockQuestion('q3'),
        'Correct',
        4000,
        true
      );

      expect(updatedSession.questions).toHaveLength(3);
      expect(updatedSession.score).toBe(2);
      expect(updatedSession.pointsEarned).toBe(20);
    });

    it('should preserve other session properties', () => {
      const updatedSession = quizEngine.recordAnswer(
        session,
        question,
        'Berlin',
        5000,
        true
      );

      expect(updatedSession.sessionId).toBe(session.sessionId);
      expect(updatedSession.userId).toBe(session.userId);
      expect(updatedSession.categoryId).toBe(session.categoryId);
      expect(updatedSession.streakAtStart).toBe(session.streakAtStart);
      expect(updatedSession.streakAtEnd).toBe(session.streakAtEnd);
    });
  });

  describe('calculatePoints', () => {
    it('should calculate points correctly for 0 correct answers', () => {
      const points = quizEngine.calculatePoints(0);
      expect(points).toBe(0);
    });

    it('should calculate points correctly for 5 correct answers', () => {
      const points = quizEngine.calculatePoints(5);
      expect(points).toBe(50);
    });

    it('should calculate points correctly for 12 correct answers', () => {
      const points = quizEngine.calculatePoints(12);
      expect(points).toBe(120);
    });

    it('should handle negative values gracefully', () => {
      const points = quizEngine.calculatePoints(-5);
      expect(points).toBe(0);
    });

    it('should use formula correctCount * 10', () => {
      expect(quizEngine.calculatePoints(1)).toBe(10);
      expect(quizEngine.calculatePoints(3)).toBe(30);
      expect(quizEngine.calculatePoints(7)).toBe(70);
      expect(quizEngine.calculatePoints(10)).toBe(100);
    });
  });

  describe('completeSession', () => {
    let session: QuizSession;

    beforeEach(() => {
      session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [createMockQuestion()],
        0
      );
    });

    it('should set completedAt timestamp', () => {
      const completedSession = quizEngine.completeSession(session);

      expect(completedSession.completedAt).toBeInstanceOf(Date);
      expect(completedSession.completedAt).toBeDefined();
    });

    it('should be immutable', () => {
      const completedSession = quizEngine.completeSession(session);

      // Original should be unchanged
      expect(session.completedAt).toBeUndefined();

      // New session should have timestamp
      expect(completedSession.completedAt).toBeDefined();

      // Should be different objects
      expect(completedSession).not.toBe(session);
    });

    it('should preserve all other session properties', () => {
      // Add some answers first
      let updatedSession = quizEngine.recordAnswer(
        session,
        createMockQuestion('q1'),
        'Berlin',
        5000,
        true
      );

      updatedSession = quizEngine.recordAnswer(
        updatedSession,
        createMockQuestion('q2'),
        'Wrong',
        3000,
        false
      );

      const completedSession = quizEngine.completeSession(updatedSession);

      expect(completedSession.sessionId).toBe(updatedSession.sessionId);
      expect(completedSession.userId).toBe(updatedSession.userId);
      expect(completedSession.categoryId).toBe(updatedSession.categoryId);
      expect(completedSession.questions).toEqual(updatedSession.questions);
      expect(completedSession.score).toBe(updatedSession.score);
      expect(completedSession.pointsEarned).toBe(updatedSession.pointsEarned);
      expect(completedSession.streakAtStart).toBe(updatedSession.streakAtStart);
      expect(completedSession.streakAtEnd).toBe(updatedSession.streakAtEnd);
    });

    it('should set timestamp close to current time', () => {
      const beforeTime = new Date();
      const completedSession = quizEngine.completeSession(session);
      const afterTime = new Date();

      expect(completedSession.completedAt!.getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime()
      );
      expect(completedSession.completedAt!.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });
  });

  describe('integration scenarios', () => {
    it('should handle a complete quiz session flow', () => {
      // 1. Initialize session
      let session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [],
        0
      );

      expect(session.score).toBe(0);
      expect(session.pointsEarned).toBe(0);

      // 2. Answer questions
      const questions = [
        { id: 'q1', answer: 'Answer1', correct: true },
        { id: 'q2', answer: 'Answer2', correct: true },
        { id: 'q3', answer: 'Answer3', correct: false },
        { id: 'q4', answer: 'Answer4', correct: true },
      ];

      questions.forEach(({ id, answer, correct }) => {
        const question = createMockQuestion(id);
        const isCorrect = quizEngine.validateAnswer(question, correct ? question.correctAnswer : 'Wrong');

        session = quizEngine.recordAnswer(session, question, answer, 5000, isCorrect);
      });

      // 3. Verify scores
      expect(session.score).toBe(3);
      expect(session.pointsEarned).toBe(30);
      expect(session.questions).toHaveLength(4);

      // 4. Complete session
      session = quizEngine.completeSession(session);

      expect(session.completedAt).toBeDefined();
    });

    it('should calculate correct points for perfect score', () => {
      let session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [],
        0
      );

      // Answer all 12 questions correctly
      for (let i = 1; i <= 12; i++) {
        const question = createMockQuestion(`q${i}`);
        session = quizEngine.recordAnswer(
          session,
          question,
          question.correctAnswer,
          5000,
          true
        );
      }

      expect(session.score).toBe(12);
      expect(session.pointsEarned).toBe(120);
      expect(quizEngine.calculatePoints(session.score)).toBe(120);
    });

    it('should handle zero score correctly', () => {
      let session = quizEngine.initializeSession(
        'user-123',
        QuizCategory.GENERAL,
        [],
        0
      );

      // Answer all questions incorrectly
      for (let i = 1; i <= 12; i++) {
        const question = createMockQuestion(`q${i}`);
        session = quizEngine.recordAnswer(session, question, 'Wrong', 5000, false);
      }

      expect(session.score).toBe(0);
      expect(session.pointsEarned).toBe(0);
      expect(quizEngine.calculatePoints(session.score)).toBe(0);
    });
  });
});
