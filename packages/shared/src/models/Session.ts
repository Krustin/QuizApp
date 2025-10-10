export interface QuizSession {
  id: string;
  userId: string;
  questions: string[];
  currentQuestionIndex: number;
  score: number;
  startedAt: Date;
  endedAt?: Date;
  answers: Record<string, number>;
  isCompleted: boolean;
}
