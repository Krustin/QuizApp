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

  // NOTE: shuffleAnswers() method removed - now using shuffleQuestionOptions() from helpers
  // Questions in new format already have options array with shuffling handled separately
});

