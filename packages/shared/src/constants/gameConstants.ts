export const GAME_CONSTANTS = {
  DEFAULT_QUESTIONS_PER_GAME: 10,
  DEFAULT_TIME_LIMIT: 30,
  POINTS_PER_CORRECT_ANSWER: 10,
  TIME_BONUS_MULTIPLIER: 1.5,
  DIFFICULTIES: ['easy', 'medium', 'hard'] as const,
  CATEGORIES: [
    'General Knowledge',
    'Science',
    'History',
    'Geography',
    'Sports',
    'Entertainment',
  ] as const,
};

export const SCORING = {
  CORRECT_ANSWER: 10,
  WRONG_ANSWER: 0,
  TIME_BONUS_MAX: 5,
};

export const TIMEOUTS = {
  QUESTION_DISPLAY: 30000, // 30 seconds
  ANSWER_REVEAL: 3000, // 3 seconds
};
