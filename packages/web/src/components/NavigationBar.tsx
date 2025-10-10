import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavigationBar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Spielen', icon: '🎯' },
    { path: '/categories', label: 'Kategorien', icon: '📚' },
    { path: '/encyclopedia', label: 'Lexikon', icon: '📖' },
    { path: '/profile', label: 'Profil', icon: '👤' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.link,
                color: isActive ? '#169C8F' : '#9CA3AF',
                borderBottom: isActive ? '2px solid #169C8F' : '2px solid transparent',
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    paddingBottom: '0.5rem',
    transition: 'color 0.2s',
  },
  icon: {
    fontSize: '1.25rem',
  },
};
