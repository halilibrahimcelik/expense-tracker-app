import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import AuthForm from './AuthForm';

type Props = {};

const SignUpWrapper = (props: Props) => {
  return (
    <View>
      <Text className='text-center' variant='bodyLarge'>
        Sign Up Form
      </Text>
      <AuthForm isSignUp={true} />
    </View>
  );
};

export default SignUpWrapper;
