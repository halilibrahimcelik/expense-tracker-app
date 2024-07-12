import { StyleSheet } from 'react-native';
import React from 'react';
import Container from '@/components/UI/Container';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, STACK_NAMES, StackNavigation } from '@/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SingInWrapper from '@/components/auth/SingInWrapper';
import AuthDivider from '@/components/UI/AuthDivider';

interface Props {}

const SignInScreen = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Container customClass={'mt-10  '}>
      <SingInWrapper />
      <AuthDivider isSignUp={false} />

      <Button
        mode='contained'
        onPress={() => navigation.replace(STACK_NAMES.SignUp)}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
