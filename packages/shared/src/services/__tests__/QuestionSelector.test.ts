/**
 * QuestionSelector Service Tests
 *
 * Tests for question selection and shuffling functionality
 */

import { QuestionSelector } from '../QuestionSelector';
import { QuizCategory, DifficultyLevel } from '../../models';

describe('QuestionSelector', () => {
  let questionSelector: QuestionSelector;

  beforeEach(() => {
    questionSelector = new QuestionSelector();
  });

  describe('getRandomQuestions', () => {
    it('should return specified number of questions', () => {
      const questions = questionSelector.getRandomQuestions(QuizCategory.GENERAL, 5);
      expect(questions).toHaveLength(5);
    });

    it('should return default 12 questions when count not specified', () => {
      const questions = questionSelector.getRandomQuestions(QuizCategory.GENERAL);
      expect(questions).toHaveLength(12);
    });

    it('should return all available questions if count exceeds available', () => {
      const questions = questionSelector.getRandomQuestions(QuizCategory.GENERAL, 1000);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.length).toBeLessThanOrEqual(1000);
    });

    it('should exclude specified question IDs', () => {
      const allQuestions = questionSelector.getRandomQuestions(QuizCategory.GENERAL, 5);
      const excludeIds = allQuestions.slice(0, 2).map(q => q.id);

      const filteredQuestions = questionSelector.getRandomQuestions(
        QuizCategory.GENERAL,
        3,
        excludeIds
      );

      filteredQuestions.forEach(q => {
        expect(excludeIds).not.toContain(q.id);
      });
    });

    it('should throw error if no questions available', () => {
      expect(() => {
        questionSelector.getRandomQuestions(QuizCategory.WISSENSCHAFT);
      }).toThrow('No questions available');
    });

    it('should return different order on multiple calls (Fisher-Yates)', () => {
      const questions1 = questionSelector.getRandomQuestions(QuizCategory.GENERAL, 10);
      const questions2 = questionSelector.getRandomQuestions(QuizCategory.GENERAL, 10);

      const ids1 = questions1.map(q => q.id).join(',');
      const ids2 = questions2.map(q => q.id).join(',');

      // Very unlikely to be the same order with proper shuffle
      // (though technically possible with small probability)
      expect(ids1).not.toBe(ids2);
    });
  });

  describe('shuffleAnswers', () => {
    it('should return 4 answers with correct flags', () => {
      const question = {
        id: 'test-1',
        category: QuizCategory.GENERAL,
        difficulty: DifficultyLevel.EASY,
        questionText: 'Test question?',
        correctAnswer: 'Correct',
        wrongAnswers: ['Wrong1', 'Wrong2', 'Wrong3'],
        tldr: 'Test explanation',
      };

      const shuffled = questionSelector.shuffleAnswers(question);

      expect(shuffled).toHaveLength(4);
      expect(shuffled.filter(a => a.isCorrect)).toHaveLength(1);
      expect(shuffled.filter(a => !a.isCorrect)).toHaveLength(3);
    });

    it('should include all answer texts', () => {
      const question = {
        id: 'test-1',
        category: QuizCategory.GENERAL,
        difficulty: DifficultyLevel.EASY,
        questionText: 'Test question?',
        correctAnswer: 'Correct',
        wrongAnswers: ['Wrong1', 'Wrong2', 'Wrong3'],
        tldr: 'Test explanation',
      };

      const shuffled = questionSelector.shuffleAnswers(question);
      const answerTexts = shuffled.map(a => a.text);

      expect(answerTexts).toContain('Correct');
      expect(answerTexts).toContain('Wrong1');
      expect(answerTexts).toContain('Wrong2');
      expect(answerTexts).toContain('Wrong3');
    });

    it('should throw error if wrong answers count is not 3', () => {
      const invalidQuestion = {
        id: 'test-1',
        category: QuizCategory.GENERAL,
        difficulty: DifficultyLevel.EASY,
        questionText: 'Test question?',
        correctAnswer: 'Correct',
        wrongAnswers: ['Wrong1', 'Wrong2'], // Only 2 wrong answers
        tldr: 'Test explanation',
      };

      expect(() => {
        questionSelector.shuffleAnswers(invalidQuestion);
      }).toThrow('must have exactly 3 wrong answers');
    });

    it('should shuffle answers in different orders', () => {
      const question = {
        id: 'test-1',
        category: QuizCategory.GENERAL,
        difficulty: DifficultyLevel.EASY,
        questionText: 'Test question?',
        correctAnswer: 'Correct',
        wrongAnswers: ['Wrong1', 'Wrong2', 'Wrong3'],
        tldr: 'Test explanation',
      };

      const orders = new Set();
      for (let i = 0; i < 10; i++) {
        const shuffled = questionSelector.shuffleAnswers(question);
        const order = shuffled.map(a => a.text).join(',');
        orders.add(order);
      }

      // Should have multiple different orders
      expect(orders.size).toBeGreaterThan(1);
    });
  });
});
