import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, STACK_NAMES } from '@/types';
import DarkModeToggle from '@/components/UI/Switch';

interface Props
  extends BottomTabScreenProps<RootStackParamList, STACK_NAMES.AllExpenses> {}

const AllExpenses = ({ navigation, route }: Props) => {
  return (
    <View>
      <Text>AllExpenses</Text>
      <DarkModeToggle />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
