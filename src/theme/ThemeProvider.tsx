import { createContext, useContext, useMemo, useState } from 'react';
import {
  MD2DarkTheme,
  MD2LightTheme,
  MD2Theme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  useTheme,
} from 'react-native-paper';
interface InitialState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: MD2Theme | MD3Theme;
}

export const ThemeContext = createContext<InitialState | null>(null);
export const useThemeContext = () => {
  if (!ThemeContext) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return useContext(ThemeContext);
};
export const useExampleTheme = () => useTheme<MD2Theme | MD3Theme>();

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeVersion, setThemeVersion] = useState<2 | 3>(3);

  const theme = useMemo(() => {
    if (themeVersion === 2) {
      return isDarkMode ? MD2DarkTheme : MD2LightTheme;
    }

    return isDarkMode ? MD3DarkTheme : MD3LightTheme;
  }, [isDarkMode, themeVersion]);
  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
      theme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
