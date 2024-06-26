import { createContext, useContext, useMemo, useState } from 'react';
import { MD2Theme, MD3Theme, useTheme } from 'react-native-paper';
interface InitialState {
  isDarkMode: boolean;
  toggleTheme: () => void;
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

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
    }),
    [isDarkMode]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
