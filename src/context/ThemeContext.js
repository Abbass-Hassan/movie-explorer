import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import { DARK_COLORS, LIGHT_COLORS } from '../constants/colors';
import { getData, saveData } from '../utils/storage';

const THEME_STORAGE_KEY = 'theme_preference';

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  colors: DARK_COLORS,
  toggleTheme: () => {},
  isReady: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const storedTheme = await getData(THEME_STORAGE_KEY);
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setTheme(storedTheme);
        } else {
          const systemPreference = Appearance.getColorScheme?.();
          setTheme(systemPreference === 'light' ? 'light' : 'dark');
        }
      } catch (error) {
        setTheme('dark');
      } finally {
        setIsReady(true);
      }
    };

    initializeTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      saveData(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }, []);

  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      colors,
      toggleTheme,
      isReady,
    }),
    [theme, colors, toggleTheme, isReady],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


