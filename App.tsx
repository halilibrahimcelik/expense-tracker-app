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
import AuthProvider from '@/providers/AuthProvider';
import ProtectedScreen from '@/screens/ProtectedScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
export const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <>
      <AuthProvider>
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
                      name={STACK_NAMES.Home}
                      component={TabNavigator}
                    />
                    <Stack.Screen
                      name={STACK_NAMES.AuthScreen}
                      component={ProtectedScreen}
                    />
                  </Stack.Navigator>
                </NavigationContainerWrapper>
              </View>
            </ThemePaperProvider>
          </MainExpenseProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
