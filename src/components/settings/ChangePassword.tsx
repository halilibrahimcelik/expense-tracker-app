import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';

type Props = {};

const ChangePassword = (props: Props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorState, setErrorState] = useState({
    password: {
      isError: false,
      errorMessage: '',
    },
  });
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
        <Button className='mt-3' mode='contained-tonal'>
          <Text>Change Password</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;
