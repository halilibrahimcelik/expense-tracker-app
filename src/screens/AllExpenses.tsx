import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootBottomParamList, STACK_NAMES } from '@/types';
import FadeInView from '@/components/animations/FadeInView';
import Container from '@/components/UI/Container';
import AllExpensesWrapper from '@/components/allExpenses/AllExpensesWrapper';

interface Props
  extends BottomTabScreenProps<RootBottomParamList, STACK_NAMES.AllExpenses> {}

const AllExpenses = ({ navigation, route }: Props) => {
  return (
    <FadeInView>
      <Container>
        <AllExpensesWrapper />
      </Container>
    </FadeInView>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
