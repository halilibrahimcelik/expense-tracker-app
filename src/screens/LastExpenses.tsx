import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RootStackParamList, STACK_NAMES } from '@/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import FadeInView from '@/components/animations/FadeInView';
import Container from '@/components/UI/Container';

interface Props
  extends BottomTabScreenProps<RootStackParamList, STACK_NAMES.LastExpenses> {}

const LastExpenses = (props: Props) => {
  return (
    <FadeInView>
      <Container>
        <Text className='text-xl'>LastExpenses</Text>
      </Container>
    </FadeInView>
  );
};

export default LastExpenses;

const styles = StyleSheet.create({});
