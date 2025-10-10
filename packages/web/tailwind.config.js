/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#169C8F',
          dark: '#0E7066',
          light: '#4DB5A9',
        },
        accent: {
          main: '#FF6A5C',
          dark: '#E54A3C',
          light: '#FF9B90',
        },
        background: '#F6F7F9',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      boxShadow: {
        '2d-1': '0 2px 4px rgba(0, 0, 0, 0.1)',
        '2d-2': '0 4px 12px rgba(0, 0, 0, 0.15)',
        '2d-3': '0 8px 24px rgba(0, 0, 0, 0.2)',
        '2d-4': '0 16px 48px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
