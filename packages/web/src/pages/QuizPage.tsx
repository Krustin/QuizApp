import { useLocation, Navigate } from 'react-router-dom';
import { QuizSessionScreen } from '../screens/QuizSessionScreen';
import { QuizCategory } from '@quiz/shared';

/**
 * QuizPage - Container for QuizSessionScreen
 * Retrieves category from navigation state
 */
export default function QuizPage() {
  const location = useLocation();
  const state = location.state as { category?: QuizCategory } | undefined;

  // Redirect to home if no category is provided
  if (!state?.category) {
    return <Navigate to="/" replace />;
  }

  return <QuizSessionScreen />;
}
