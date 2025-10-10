/**
 * Color system for Quiz App
 * Based on 2.5D Duolingo-inspired design
 * Reference: docs/UI-STYLE-GUIDE.md
 */

export const colors = {
  // Primary (Teal)
  primary: {
    main: '#169C8F',
    dark: '#0e7c71',
    light: '#4DB5A9',
    foreground: '#ffffff',
  },

  // Accent (Coral)
  accent: {
    main: '#FF6A5C',
    dark: '#e5534a',
    light: '#FF9B90',
    foreground: '#ffffff',
  },

  // Semantic Colors
  success: {
    main: '#2DC071',
    dark: '#25a063',
    light: '#58D68D',
    foreground: '#ffffff',
  },

  destructive: {
    main: '#FF4D4F',
    dark: '#e53e3e',
    light: '#FF7875',
    foreground: '#ffffff',
  },

  neutral: {
    main: '#6EC8BE',
    foreground: '#ffffff',
  },

  // Backgrounds
  background: {
    main: '#F6F7F9',
    card: '#ffffff',
    secondary: '#E9EDF3',
    muted: '#E9EDF3',
  },

  // Text
  text: {
    primary: '#0B1F24',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    onPrimary: '#ffffff',
    onAccent: '#ffffff',
  },

  // Borders
  border: {
    light: 'rgba(11, 31, 36, 0.1)',
    main: '#d1d5db',  // gray-300
    dark: '#9ca3af',  // gray-400
  },
} as const;

export type Colors = typeof colors;

/**
 * Helper function to get color with opacity
 * @param color - Hex color string
 * @param opacity - Opacity value between 0 and 1
 * @returns RGBA color string
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};
