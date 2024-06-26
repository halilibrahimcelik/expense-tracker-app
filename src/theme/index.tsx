import { DarkTheme, LightTheme } from '@/constants/colors';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const theme = {
  light: {
    ...MD3LightTheme,
    ...LightTheme,
  },
  dark: {
    ...MD3DarkTheme,
    ...DarkTheme,
  },
};
