import { createContext, useMemo, useState } from 'react';
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
  toggleTheme: () => void;
  theme: MD2Theme | MD3Theme;
}

export const ThemeContext = createContext<InitialState | null>(null);
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
      toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
      theme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
