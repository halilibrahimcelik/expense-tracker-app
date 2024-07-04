import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import {
  IconButton,
  Switch,
  Text,
  Tooltip,
  useTheme,
} from 'react-native-paper';
import { useThemeContext } from '@/theme/ThemeProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};
const DarkModeToggle = (props: Props) => {
  const themeContext = useThemeContext();
  const storeData = async (isDarkMode: boolean | undefined) => {
    try {
      await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.log(error);
    }
  };
  const handleThemeToggle = async () => {
    themeContext?.toggleTheme();
    storeData(!themeContext?.isDarkMode);
  };

  const theme = useTheme();
  return (
    <View className='flex flex-row gap-2 items-center'>
      <Tooltip
        title={`${themeContext?.isDarkMode ? 'Light Mode' : 'Dark Mode'}`}
      >
        <View className='flex flex-row'>
          <IconButton
            size={24}
            onPress={handleThemeToggle}
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
