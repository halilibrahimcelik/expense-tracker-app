import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Container from '@/components/UI/Container';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, STACK_NAMES } from '@/types';
import { Button, Divider, Text } from 'react-native-paper';
import SignUpWrapper from '@/components/auth/SignUpWrapper';
import AuthDivider from '@/components/UI/AuthDivider';
import KeyboardWrapper from '@/containers/KeyboardWrapper';

type Props = {};

const SignUpScreen = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <KeyboardWrapper>
      <Container customClass={'mt-10  '}>
        <ScrollView>
          <SignUpWrapper />
          <AuthDivider isSignUp={true} />
          <Button
            mode='contained'
            onPress={() => navigation.replace(STACK_NAMES.SignIn)}
            style={{}}
          >
            Sign In
          </Button>
        </ScrollView>
      </Container>
    </KeyboardWrapper>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
