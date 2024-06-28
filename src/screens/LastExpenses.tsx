import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RootStackParamList, STACK_NAMES } from '@/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

interface Props
  extends BottomTabScreenProps<RootStackParamList, STACK_NAMES.LastExpenses> {}

const LastExpenses = (props: Props) => {
  return (
    <View>
      <Text>LastExpenses</Text>
    </View>
  );
};

export default LastExpenses;

const styles = StyleSheet.create({});
