import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { ErrorState, STACK_NAMES, StackNavigation } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import { useNavigation } from '@react-navigation/native';
import { IS_LOGGED_IN, USER_ID } from '@/constants';
import { useAuthContext } from '@/providers/AuthProvider';

type Props = {};
type UserData = {
  email: string;
  password: string;
};
type ErrorType = {
  email: ErrorState;
  password: ErrorState;
};
const SignInForm = (props: Props) => {
  const theme = useTheme();
  const { setUserCredentials } = useAuthContext();
  const navigation = useNavigation<StackNavigation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorState, setErrorState] = useState<ErrorType>({
    email: {
      isError: false,
      errorMessage: '',
    },
    password: {
      isError: false,
      errorMessage: '',
    },
  });

  useEffect(() => {
    const validatePassword = (text: string) => {
      if (text.trim() === '') {
        setErrorState((prev) => ({
          ...prev,
          password: { isError: true, errorMessage: 'Password is required' },
        }));
      } else if (text.length < 6 && text.trim() !== '') {
        setErrorState((prev) => ({
          ...prev,
          password: {
            isError: true,
            errorMessage: 'Password must be at least 6 characters',
          },
        }));
      } else {
        setErrorState((prev) => ({
          ...prev,
          password: { isError: false, errorMessage: '' },
        }));
      }
    };

    const validateEmail = (text: string) => {
      if (!text.trim()) {
        setErrorState((prev) => ({
          ...prev,
          email: { isError: true, errorMessage: 'Email is required' },
        }));
      } else {
        setErrorState((prev) => ({
          ...prev,
          email: { isError: false, errorMessage: '' },
        }));
      }
    };

    if (isSubmitted) {
      validatePassword(password);
    }
    if (isSubmitted && userData.email) {
      validateEmail(userData.email);
    }
  }, [isSubmitted, password, userData.email]);
  const onSubmit = async () => {
    setIsSubmitted(true);
    if (userData.email === '') {
      setErrorState((prev) => ({
        ...prev,
        email: { isError: true, errorMessage: 'Email is required' },
      }));
    }
    if (userData.password === '') {
      setErrorState((prev) => ({
        ...prev,
        password: { isError: true, errorMessage: 'Password is required' },
      }));
    }
    if (userData.password !== '' && userData.password.length < 6) {
      setErrorState((prev) => ({
        ...prev,
        password: {
          isError: true,
          errorMessage: 'Password must be at least 6 characters',
        },
      }));
    }

    if (userData.email && password) {
      setIsLoading(true);
      const data = {
        email: userData.email,
        password,
      };
      setUserData(data);
      const res = await signInWithEmailAndPassword(
        auth,
        userData.email,
        password
      );
      if (res.user.uid) {
        setIsLoading(false);
        setIsSubmitted(false);
        await AsyncStorage.setItem(USER_ID, res.user.uid);
        await AsyncStorage.setItem(IS_LOGGED_IN, 'true');
        await AsyncStorage.setItem('email', userData.email);
        setUserCredentials({
          isAuth: true,
          user: res.user.uid,
          token: res.user.refreshToken,
          userId: res.user.uid,
          email: userData.email,
        });
        navigation.navigate(STACK_NAMES.AuthScreen, {
          screen: STACK_NAMES.ExpenseForm,
          params: {
            slug: 'add',
          },
        });
      }
    }
  };
  return (
    <ScrollView>
      <View>
        <TextInput
          returnKeyLabel='done'
          label='Email'
          placeholderTextColor={theme.colors.primaryContainer}
          theme={{ roundness: 8 }}
          mode='outlined'
          style={{
            borderRadius: 10,
            margin: 0,
            padding: 0,
          }}
          inputMode='email'
          autoComplete='email'
          returnKeyType={'done'}
          value={userData.email}
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, email: text }))
          }
        />
        {errorState.email.isError && (
          <CustomErrorMessage error={errorState.email.errorMessage} />
        )}
      </View>
      <View>
        <TextInput
          label='Password'
          secureTextEntry={showPassword}
          returnKeyLabel='done'
          returnKeyType='done'
          mode='outlined'
          style={{
            borderRadius: 10,
            margin: 0,
            padding: 0,
            marginTop: 12,
          }}
          placeholderTextColor={theme.colors.primaryContainer}
          theme={{ roundness: 8 }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          right={
            <TextInput.Icon
              onPress={() => setShowPassword((prev) => !prev)}
              icon={showPassword ? 'eye' : 'eye-off'}
            />
          }
        />
        {errorState.password.isError && (
          <CustomErrorMessage error={errorState.password.errorMessage} />
        )}
      </View>
      <Button
        loading={isLoading}
        onPress={onSubmit}
        className='mt-4'
        mode='elevated'
      >
        {isLoading ? '' : 'Sign In'}
      </Button>
    </ScrollView>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});
