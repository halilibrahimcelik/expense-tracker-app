import MainExpenseProvider from '@/providers/MainExpenseProvider';
import ThemePaperProvider from '@/providers/ThemePaperProvider';
import NavigationContainerWrapper from '@/routes/NavigationContainerWrapper';
import TabNavigator from '@/routes/TabNavigator';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManagaExpenses from '@/screens/ManagaExpenses';
import { RootStackParamList, STACK_NAMES } from '@/types';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <>
      <ThemeProvider>
        <MainExpenseProvider>
          <ThemePaperProvider>
            <View style={styles.container}>
              <NavigationContainerWrapper>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen
                    name={STACK_NAMES.LastExpenses}
                    component={TabNavigator}
                  />
                  <Stack.Screen
                    options={{
                      headerTitle: 'Manage Expenses',
                      presentation: 'modal',
                    }}
                    name={STACK_NAMES.ManageExpenses}
                    component={ManagaExpenses}
                  />
                </Stack.Navigator>
              </NavigationContainerWrapper>
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
