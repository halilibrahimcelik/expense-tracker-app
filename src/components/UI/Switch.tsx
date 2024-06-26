import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-paper';
import { useThemeContext } from '@/theme/ThemeProvider';

type Props = {};

const DarkModeToggle = (props: Props) => {
  const themeContext = useThemeContext();
  return (
    <View>
      <Switch
        value={themeContext?.isDarkMode}
        onValueChange={themeContext?.toggleTheme}
      />
    </View>
  );
};

export default DarkModeToggle;

const styles = StyleSheet.create({});
