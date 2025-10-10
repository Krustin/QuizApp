import { Link, useLocation } from 'react-router-dom';
import { Play, Grid3x3, Book, User } from 'lucide-react';

export default function NavigationBar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Versagen', icon: Play },
    { path: '/categories', label: 'Wissenslücken', icon: Grid3x3 },
    { path: '/encyclopedia', label: 'Angeber-Lexikon', icon: Book },
    { path: '/profile', label: 'Scham-Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-gray-200 z-50"
         style={{ boxShadow: '0 -4px 0 #d1d5db, 0 -6px 16px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex px-2 pt-2 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 mx-1 game-nav-item ${
                isActive
                  ? 'active text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs leading-none font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
