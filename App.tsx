import ThemePaperProvider from '@/providers/ThemePaperProvider';
import TabNavigator from '@/routes/TabNavigator';
import { theme } from '@/theme';
import { ThemeProvider, useThemeContext } from '@/theme/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <ThemePaperProvider>
          <View style={styles.container}>
            <TabNavigator />

            <StatusBar style='auto' />
          </View>
        </ThemePaperProvider>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
