import React, { useEffect } from 'react';
import { RootStackParamList, STACK_NAMES } from '@/types';
import { useAuthContext } from '@/providers/AuthProvider';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ManagaExpenses from './ManagaExpenses';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};
const AuthStack = createNativeStackNavigator<RootStackParamList>();

const ProtectedScreen = (props: Props) => {
  const { isAuth, setUserCredentials } = useAuthContext();
  useEffect(() => {
    const getUserUid = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          setUserCredentials({
            isAuth: true,
            token: userId,
            user: null,
            userId,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserUid();
  }, [setUserCredentials]);
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}
    >
      {isAuth ? (
        <AuthStack.Screen
          name={STACK_NAMES.ExpenseForm}
          component={ManagaExpenses}
        />
      ) : (
        <>
          <AuthStack.Screen
            name={STACK_NAMES.SignIn}
            component={SignInScreen}
          />
          <AuthStack.Screen
            name={STACK_NAMES.SignUp}
            component={SignUpScreen}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default ProtectedScreen;
