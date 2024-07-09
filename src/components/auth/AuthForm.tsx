import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { ErrorState, IUserData } from '@/types';

type Props = {
  isSignUp: boolean;
};

const AuthForm = (props: Props) => {
  const theme = useTheme();
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
  return (
    <View>
      <View className='gap-3'>
        <View>
          <TextInput
            returnKeyLabel='done'
            label='User name'
            placeholderTextColor={theme.colors.primaryContainer}
            theme={{ roundness: 8 }}
            mode='outlined'
            returnKeyType={'done'}
            style={{
              borderRadius: 10,
              margin: 0,
              padding: 0,
            }}
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
            label='Email'
            autoComplete='email'
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
          <TextInput
            label='Password'
            secureTextEntry={false}
            right={<TextInput.Icon icon='eye-off' />}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({});
