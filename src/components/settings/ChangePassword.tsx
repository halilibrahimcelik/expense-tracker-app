import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { useAuthContext } from '@/providers/AuthProvider';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { set } from 'firebase/database';

type Props = {};

const ChangePassword = (props: Props) => {
  const { email } = useAuthContext();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorState, setErrorState] = useState({
    password: {
      isError: false,
      errorMessage: '',
    },
  });

  useEffect(() => {}, []);
  const validateCurrentPassword = async () => {
    try {
      if (email && password) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res.user) {
          return setIsCurrentPasswordValid(true);
        }
      }
    } catch (error: any) {
      setIsCurrentPasswordValid(false);
      Alert.alert('Error', "Current password doesn't match");
    }
  };
  const updatePasswordFn = async () => {
    try {
      setIsSubmitted(true);
      if (confirmPassword.trim().length < 6) {
        setErrorState((prev) => ({
          ...prev,
          password: {
            isError: true,
            errorMessage: 'Password must be at least 6 characters long',
          },
        }));
        return;
      }
      if (email && confirmPassword) {
        const user = auth.currentUser;
        updatePassword(user!, confirmPassword).then((a) => {
          Alert.alert('Success', 'Password updated successfully');
          setIsSubmitted(false);
        });
        //   if (res) {
        //     Alert.alert('Success', 'Password updated successfully');
      }
    } catch (error: any) {
      Alert.alert('Error', 'There was an error updating your password');
    }
  };
  const theme = useTheme();

  return (
    <View>
      <View>
        <View className='mb-1'>
          <TextInput
            label='Current Password'
            secureTextEntry={showPassword}
            returnKeyLabel='done'
            mode='outlined'
            style={{
              borderRadius: 10,
              margin: 0,
              padding: 0,
            }}
            onBlur={validateCurrentPassword}
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
            label='New password'
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
        <Button
          disabled={!isCurrentPasswordValid}
          onPress={updatePasswordFn}
          className='mt-3 w-auto mx-12'
          mode='contained-tonal'
        >
          <Text>Change Password</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;
