import { theme } from '@/theme';
import { useThemeContext } from '@/theme/ThemeProvider';
import React from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};

const ThemePaperProvider = (props: Props) => {
  const themeContext = useThemeContext();
  const systemColorScheme = useColorScheme() || 'light';
  const colorScheme = themeContext?.isDarkMode ? 'dark' : systemColorScheme;
  return (
    <PaperProvider theme={theme[colorScheme]}>{props.children}</PaperProvider>
  );
};
export default ThemePaperProvider;
