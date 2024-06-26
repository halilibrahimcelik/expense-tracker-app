import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, STACK_NAMES } from '@/types';

interface Props
  extends BottomTabScreenProps<RootStackParamList, STACK_NAMES.AllExpenses> {}

const AllExpenses = (props: Props) => {
  return (
    <View>
      <Text>AllExpenses</Text>
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
