import { View } from 'react-native';
import React from 'react';
import { Divider, Text } from 'react-native-paper';

type Props = {
  isSignUp: boolean;
};

const AuthDivider = ({ isSignUp }: Props) => {
  return (
    <View className='gap-1 my-6'>
      <Text variant='labelSmall' className='text-center'>
        {isSignUp
          ? 'If you have had already an account?'
          : "Don't have an account?"}
      </Text>
      <View className='flex-row  justify-center items-center'>
        <Divider
          bold
          style={{
            height: 2,
            alignSelf: 'center',
            width: 50,
          }}
          horizontalInset
        />
        <Text variant='labelLarge'> OR</Text>
        <Divider
          bold
          style={{
            height: 2,
            alignSelf: 'center',
            width: 50,
          }}
          horizontalInset
        />
      </View>
    </View>
  );
};

export default AuthDivider;
