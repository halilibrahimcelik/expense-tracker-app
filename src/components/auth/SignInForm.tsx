import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { ErrorState } from '@/types';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const onSubmit = () => {
    if (userData.email === '') {
      setErrorState((prev) => ({
        ...prev,
        email: { isError: true, errorMessage: 'Email is required' },
      }));
      return;
    }
    if (userData.password === '') {
      setErrorState((prev) => ({
        ...prev,
        password: { isError: true, errorMessage: 'Password is required' },
      }));
      return;
    }
    if (userData.password.length < 6) {
      setErrorState((prev) => ({
        ...prev,
        password: {
          isError: true,
          errorMessage: 'Password must be at least 6 characters',
        },
      }));
      return;
    }
    if (userData.email && userData.password) {
      setIsLoading(true);
    }
  };
  return (
    <View>
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
          returnKeyType={'done'}
          value={userData.email}
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, userName: text }))
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
        className='mt-2'
        mode='elevated'
      >
        {isLoading ? '' : 'Sign In'}
      </Button>
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});
