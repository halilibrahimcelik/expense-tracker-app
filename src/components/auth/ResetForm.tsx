import { Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { EMAIL_PATTERN } from '@/constants';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAMES, StackNavigation } from '@/types';

type Props = {};

const ResetForm = (props: Props) => {
  const theme = useTheme();
  const [email, SetEmail] = useState<string>('');
  const navigation = useNavigation<StackNavigation>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<{
    email: { isError: boolean; errorMessage: string };
  }>({
    email: { isError: false, errorMessage: '' },
  });
  const validateEmail = (text: string) => {
    if (text.trim() === '') {
      setErrorState((prev) => ({
        ...prev,
        email: { isError: true, errorMessage: 'Email is required' },
      }));
      return;
    } else if (!text.match(EMAIL_PATTERN)) {
      setErrorState((prev) => ({
        ...prev,
        email: { isError: true, errorMessage: 'Invalid email address' },
      }));
      return;
    } else {
      setErrorState((prev) => ({
        ...prev,
        email: { isError: false, errorMessage: '' },
      }));
    }
  };
  useEffect(() => {
    if (isSubmitted) {
      validateEmail(email);
    }
  }, [isSubmitted, email]);
  const handleReset = async () => {
    console.log('reset');
    try {
      setIsLoading(true);
      setIsSubmitted(true);
      const res = await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Reset email sent successfully');
      setIsSubmitted(false);
      navigation.navigate(STACK_NAMES.SignIn);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', 'Something went wrong, please try again later');
    }
  };
  return (
    <View>
      <Text className='text-center mb-4' variant='bodyLarge'>
        Reset Email
      </Text>
      <View className='mb-4'>
        <TextInput
          returnKeyLabel='done'
          label={
            <>
              <Text className='p-0 h-0 '>Email</Text>
            </>
          }
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
            position: 'relative',
          }}
          value={email}
          onChangeText={(text) => SetEmail(text)}
        />
        {errorState.email.isError && (
          <CustomErrorMessage error={errorState.email.errorMessage} />
        )}
      </View>
      <Button onPress={handleReset} loading={isLoading} mode='elevated'>
        {isLoading ? 'Sending' : 'Send'}{' '}
      </Button>
    </View>
  );
};

export default ResetForm;
