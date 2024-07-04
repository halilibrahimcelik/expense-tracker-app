import { StyleSheet } from 'react-native';
import React from 'react';
import Container from '@/components/UI/Container';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, STACK_NAMES } from '@/types';
import { Button, Text } from 'react-native-paper';

type Props = {};

const SignUpScreen = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Container>
      <Text variant='titleMedium' className='text-center'>
        Sig Up Screen
      </Text>
      <Button
        mode='contained'
        onPress={() => navigation.replace(STACK_NAMES.SignIn)}
        style={{ marginTop: 20 }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
