import React from 'react';
import { RootStackParamList, STACK_NAMES } from '@/types';
import { useAuthContext } from '@/providers/AuthProvider';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ManagaExpenses from './ManagaExpenses';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type Props = {};
const AuthStack = createNativeStackNavigator<RootStackParamList>();

const ProtectedScreen = (props: Props) => {
  const { isAuth } = useAuthContext();
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