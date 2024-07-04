import { StyleSheet } from 'react-native';
import React from 'react';
import { RootBottomParamList, STACK_NAMES } from '@/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import FadeInView from '@/components/animations/FadeInView';
import Container from '@/components/UI/Container';
import LastExpensesWrapper from '@/components/lastExpenses/LastExpensesWrapper';

interface Props
  extends BottomTabScreenProps<RootBottomParamList, STACK_NAMES.LastExpenses> {}

const LastExpenses = (props: Props) => {
  return (
    <FadeInView>
      <Container>
        <LastExpensesWrapper />
      </Container>
    </FadeInView>
  );
};

export default LastExpenses;

const styles = StyleSheet.create({});
