import { PinkDarkTheme, PinkLightTheme } from '@/constants/colors';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
export const theme: { light: ThemeProp; dark: ThemeProp } = {
  light: {
    ...MD3LightTheme,
    ...LightTheme,
    dark: false,
    colors: {
      ...MD3LightTheme.colors,
      ...PinkLightTheme.colors,
    },
  },
  dark: {
    ...MD3DarkTheme,
    ...DarkTheme,
    dark: true,
    colors: {
      ...MD3DarkTheme.colors,
      ...PinkDarkTheme.colors,
    },
  },
};
