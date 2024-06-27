import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  IconButton,
  Switch,
  Text,
  Tooltip,
  useTheme,
} from 'react-native-paper';
import { useThemeContext } from '@/theme/ThemeProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';

type Props = {};

const DarkModeToggle = (props: Props) => {
  const themeContext = useThemeContext();
  const theme = useTheme();
  return (
    <View className='flex flex-row gap-2 items-center'>
      <Tooltip
        title={`${themeContext?.isDarkMode ? 'Light Mode' : 'Dark Mode'}`}
      >
        <View className='flex flex-row'>
          <IconButton
            size={24}
            onPress={() => themeContext?.toggleTheme()}
            icon={() => (
              <MaterialIcons
                name={themeContext?.isDarkMode ? 'dark-mode' : 'light-mode'}
                size={24}
                color={theme.colors.primary}
              />
            )}
            className='min-w-max max-w-[40px]'
            mode='contained-tonal'
          />
        </View>
      </Tooltip>
    </View>
  );
};

export default DarkModeToggle;

const styles = StyleSheet.create({});
