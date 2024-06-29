import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackNavigation } from '@/types';

type Props = {
  navigation: StackNavigation;
};

const ManagaExpenses = (props: Props) => {
  return (
    <View>
      <Text>ManagaExpenses</Text>
      <Pressable onPress={() => props.navigation.goBack()}>
        <Text>Go back</Text>
      </Pressable>
    </View>
  );
};

export default ManagaExpenses;

const styles = StyleSheet.create({});
