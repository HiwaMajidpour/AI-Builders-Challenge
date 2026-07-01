/**
 * contexts/ThemeContext.jsx
 * Provides light / dark theme toggling backed by localStorage.
 * Applies a `data-theme` attribute on <html> so CSS vars respond.
 */
import { createContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../config';
import { storage } from '../utils/storage';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null);

const THEMES = { LIGHT: 'light', DARK: 'dark' };

function getInitialTheme() {
  const stored = storage.get(STORAGE_KEYS.THEME);
  if (stored === THEMES.LIGHT || stored === THEMES.DARK) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));

  const isDark = theme === THEMES.DARK;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
