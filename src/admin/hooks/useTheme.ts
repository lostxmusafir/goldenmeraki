import { useEffect, useState } from 'react';
import { ADMIN_STORAGE_KEYS } from '../constants/admin.constants';

export type ThemeMode = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.THEME_MODE);
    return (saved as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.THEME_MODE, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
