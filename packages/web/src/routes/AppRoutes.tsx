import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PlayPage from '../pages/PlayPage';
import CategoriesPage from '../pages/CategoriesPage';
import EncyclopediaPage from '../pages/EncyclopediaPage';
import ProfilePage from '../pages/ProfilePage';
import QuizPage from '../pages/QuizPage';
import ResultsPage from '../pages/ResultsPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PlayPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/encyclopedia" element={<EncyclopediaPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
