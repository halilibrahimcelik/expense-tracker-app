import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useThemeContext } from '@/theme/ThemeProvider';
import { theme as defaultTheme } from '@/theme';

type Props = {
  children: React.ReactNode;
};

const NavigationContainerWrapper = (props: Props) => {
  const themeContext = useThemeContext();

  const systemColorScheme = useColorScheme() || 'light';
  const colorScheme = themeContext?.isDarkMode ? 'dark' : systemColorScheme;
  return (
    // @ts-ignore

    <NavigationContainer theme={defaultTheme[colorScheme]}>
      {props.children}
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;
