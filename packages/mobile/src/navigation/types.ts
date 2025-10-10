import { QuizCategory } from '@quiz/shared';

export type RootStackParamList = {
  MainTabs: undefined;
  QuizSession: {
    category: QuizCategory;
  };
  Results: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    category: QuizCategory;
  };
};

export type MainTabParamList = {
  Play: undefined;
  Categories: undefined;
  Encyclopedia: undefined;
  Profile: undefined;
};
