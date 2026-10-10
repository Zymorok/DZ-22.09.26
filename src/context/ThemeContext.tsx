import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import type { ThemeColors, ThemeMode } from '@/types';

const lightColors: ThemeColors = {
  background: '#F1F5F9',
  surface: '#FFFFFF',
  surfaceAlt: '#F8FAFC',
  text: '#0F172A',
  muted: '#64748B',
  border: '#CBD5E1',
  primary: '#4F46E5',
  success: '#16A34A',
  danger: '#DC2626',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceAlt: '#334155',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#475569',
  primary: '#818CF8',
  success: '#4ADE80',
  danger: '#F87171',
};

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    AsyncStorage.getItem('@todo_theme_mode')
      .then((savedMode) => {
        if (savedMode === 'light' || savedMode === 'dark') {
          setMode(savedMode);
        }
      })
      .catch((error) => console.error('Не вдалося завантажити тему:', error));
  }, []);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const newMode = currentMode === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('@todo_theme_mode', newMode).catch((error) =>
        console.error('Не вдалося зберегти тему:', error),
      );
      return newMode;
    });
  };

  const isDark = mode === 'dark';

  return (
    <ThemeContext.Provider
      value={{ mode, isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme має використовуватися всередині ThemeProvider');
  }

  return context;
}
