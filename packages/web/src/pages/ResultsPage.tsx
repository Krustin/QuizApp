import { useLocation, Navigate } from 'react-router-dom';
import { ResultsScreen } from '../screens/ResultsScreen';
import { QuizCategory } from '@quiz/shared';

interface ResultsState {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  category: QuizCategory;
}

/**
 * ResultsPage - Container for ResultsScreen
 * Retrieves quiz results from navigation state
 */
export default function ResultsPage() {
  const location = useLocation();
  const state = location.state as ResultsState | undefined;

  // Redirect to home if no results are provided
  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <ResultsScreen
      score={state.score}
      totalQuestions={state.totalQuestions}
      correctAnswers={state.correctAnswers}
      incorrectAnswers={state.incorrectAnswers}
      category={state.category}
    />
  );
}
