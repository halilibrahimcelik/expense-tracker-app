import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { ErrorState, IUserData } from '@/types';
import { auth } from '@/firebase/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { saveUserToDb } from '@/utils/httpRequest';
import { useAuthContext } from '@/providers/AuthProvider';

type Props = {
  isSignUp: boolean;
};

const AuthForm = (props: Props) => {
  const theme = useTheme();
  const { setUserCredentials } = useAuthContext();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userData, setUserData] = useState<IUserData>({
    userName: '',
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = useState<{
    userName: ErrorState;
    email: ErrorState;
    password: ErrorState;
  }>({
    userName: { isError: false, errorMessage: '' },
    email: { isError: false, errorMessage: '' },
    password: { isError: false, errorMessage: '' },
  });

  useEffect(() => {
    const validatePassword = (text: string) => {
      if (!text || !password) return;
      if (text.trim() !== password.trim()) {
        setErrorState((prev) => ({
          ...prev,
          password: { isError: true, errorMessage: 'Password does not match' },
        }));
      } else {
        setErrorState((prev) => ({
          ...prev,
          password: { isError: false, errorMessage: '' },
        }));
      }

      if (text.trim() === password.trim()) {
        setUserData((prev) => ({
          ...prev,
          password: text.trim(),
        }));
      }
    };
    const validateEmail = (text: string) => {
      if (!text) {
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
    const validateUserName = (text: string) => {
      if (!text) {
        setErrorState((prev) => ({
          ...prev,
          userName: { isError: true, errorMessage: 'User name is required' },
        }));
      } else {
        setErrorState((prev) => ({
          ...prev,
          userName: { isError: false, errorMessage: '' },
        }));
      }
    };
    if (confirmPassword && isSubmitted) {
      validatePassword(confirmPassword);
    }
    if (userData.email && isSubmitted) {
      validateEmail(userData.email);
    }
    if (userData.userName && isSubmitted) {
      validateUserName(userData.userName);
    }
  }, [
    confirmPassword,
    isSubmitted,
    password,
    userData.email,
    userData.userName,
  ]);
  const resetForm = () => {
    setUserData({
      userName: '',
      email: '',
      password: '',
    });
    setIsSubmitted(false);
  };
  const onSubmit = async () => {
    const { userName, email, password } = userData;
    try {
      setIsSubmitted(true);
      if (!userName) {
        setErrorState((prev) => ({
          ...prev,
          userName: { isError: true, errorMessage: 'User name is required' },
        }));
      }
      if (!email) {
        setErrorState((prev) => ({
          ...prev,
          email: { isError: true, errorMessage: 'Email is required' },
        }));
      }
      if (!password) {
        setErrorState((prev) => ({
          ...prev,
          password: { isError: true, errorMessage: 'Password is required' },
        }));
      }
      if (password !== confirmPassword) {
        setErrorState((prev) => ({
          ...prev,
          password: { isError: true, errorMessage: 'Password does not match' },
        }));
      }

      if (!userName || !email || !password || password !== confirmPassword)
        return;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user.uid) {
        setIsSubmitted(false);
        saveUserToDb(res.user.uid, { userName, email, id: res.user.uid });
        setUserCredentials({
          isAuth: true,
          token: res.user.refreshToken,
          user: userName,
          userId: res.user.uid,
        });
        resetForm();
      }
      // console.log(res);
      // console.log(userData);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong try again');
    }
  };
  return (
    <View>
      <View className='gap-3 '>
        <View>
          <TextInput
            returnKeyLabel='done'
            label='User name'
            placeholderTextColor={theme.colors.primaryContainer}
            theme={{ roundness: 8 }}
            mode='outlined'
            style={{
              borderRadius: 10,
              margin: 0,
              padding: 0,
            }}
            returnKeyType={'done'}
            value={userData.userName}
            onChangeText={(text) =>
              setUserData((prev) => ({ ...prev, userName: text }))
            }
          />
          {errorState.userName.isError && (
            <CustomErrorMessage error={errorState.userName.errorMessage} />
          )}
        </View>
        <View>
          <TextInput
            returnKeyLabel='done'
            label={<Text>Email</Text>}
            autoComplete='email'
            inputMode='email'
            placeholderTextColor={theme.colors.primaryContainer}
            theme={{ roundness: 8 }}
            mode='outlined'
            returnKeyType={'done'}
            style={{
              borderRadius: 10,
              margin: 0,
              padding: 0,
            }}
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
          <View className='mb-3'>
            <TextInput
              label='Password'
              secureTextEntry={showPassword}
              returnKeyLabel='done'
              mode='outlined'
              style={{
                borderRadius: 10,
                margin: 0,
                padding: 0,
              }}
              placeholderTextColor={theme.colors.primaryContainer}
              theme={{ roundness: 8 }}
              returnKeyType='done'
              onChangeText={(text) => setPassword(text)}
              value={password}
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword((prev) => !prev)}
                  icon={showPassword ? 'eye' : 'eye-off'}
                />
              }
            />
          </View>
          <View>
            <TextInput
              label='Confirm password'
              secureTextEntry={showConfirmPassword}
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
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              right={
                <TextInput.Icon
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  icon={showConfirmPassword ? 'eye' : 'eye-off'}
                />
              }
            />
            {errorState.password.isError && (
              <CustomErrorMessage error={errorState.password.errorMessage} />
            )}
          </View>
        </View>
        <View>
          <Button loading onPress={onSubmit} className='mt-2' mode='elevated'>
            {props.isSignUp ? 'Register' : 'Login'}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
