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
          DEFAULT: '#169C8F',
          main: '#169C8F',
          dark: '#0e7c71',
          light: '#4DB5A9',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#FF6A5C',
          main: '#FF6A5C',
          dark: '#e5534a',
          light: '#FF9B90',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#2DC071',
          main: '#2DC071',
          dark: '#25a063',
          light: '#58D68D',
        },
        destructive: {
          DEFAULT: '#FF4D4F',
          main: '#FF4D4F',
          dark: '#e53e3e',
          light: '#FF7875',
        },
        background: {
          DEFAULT: '#F6F7F9',
          main: '#F6F7F9',
          card: '#ffffff',
        },
        card: {
          DEFAULT: '#ffffff',
        },
        border: {
          DEFAULT: 'rgba(11, 31, 36, 0.1)',
          main: '#d1d5db',
        },
        muted: {
          DEFAULT: '#E9EDF3',
          foreground: '#6B7280',
        },
        foreground: '#0B1F24',
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
