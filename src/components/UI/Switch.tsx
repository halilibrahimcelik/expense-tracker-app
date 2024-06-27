import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Switch, Text } from 'react-native-paper';
import { useThemeContext } from '@/theme/ThemeProvider';

type Props = {};

const DarkModeToggle = (props: Props) => {
  const themeContext = useThemeContext();
  return (
    <View className='flex flex-row gap-2 items-center'>
      <Text variant='labelSmall'>Dark Mode</Text>
      <View>
        <Switch
          value={themeContext?.isDarkMode}
          onValueChange={themeContext?.toggleTheme}
        />
      </View>
    </View>
  );
};

export default DarkModeToggle;

const styles = StyleSheet.create({});
