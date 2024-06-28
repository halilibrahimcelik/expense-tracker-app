import ThemePaperProvider from '@/providers/ThemePaperProvider';
import TabNavigator from '@/routes/TabNavigator';
import { theme } from '@/theme';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <ThemePaperProvider>
          <View style={styles.container}>
            <TabNavigator />
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
