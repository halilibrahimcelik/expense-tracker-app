import MainExpenseProvider from '@/providers/MainExpenseProvider';
import ThemePaperProvider from '@/providers/ThemePaperProvider';
import TabNavigator from '@/routes/TabNavigator';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <MainExpenseProvider>
          <ThemePaperProvider>
            <View style={styles.container}>
              <TabNavigator />
            </View>
          </ThemePaperProvider>
        </MainExpenseProvider>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
