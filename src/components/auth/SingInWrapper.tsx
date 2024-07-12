import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import SignInForm from './SignInForm';

type Props = {};

const SingInWrapper = (props: Props) => {
  return (
    <View>
      <Text className='text-center' variant='bodyLarge'>
        Sign In
      </Text>
      <SignInForm />
    </View>
  );
};

export default SingInWrapper;
