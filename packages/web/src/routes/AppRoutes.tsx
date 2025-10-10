import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PlayPage from '../pages/PlayPage';
import CategoriesPage from '../pages/CategoriesPage';
import EncyclopediaPage from '../pages/EncyclopediaPage';
import ProfilePage from '../pages/ProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PlayPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/encyclopedia" element={<EncyclopediaPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
