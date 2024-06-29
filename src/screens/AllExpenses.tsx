import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, STACK_NAMES } from '@/types';
import FadeInView from '@/components/animations/FadeInView';
import Container from '@/components/UI/Container';

interface Props
  extends BottomTabScreenProps<RootStackParamList, STACK_NAMES.AllExpenses> {}

const AllExpenses = ({ navigation, route }: Props) => {
  return (
    <FadeInView>
      <Container>
        <Text className='text-xl'>AllExpenses</Text>
      </Container>
    </FadeInView>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
