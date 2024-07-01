import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';

type Props = {
  totalCost: number | undefined;
};

const TotalCount = ({ totalCost }: Props) => {
  return (
    <Card mode='contained' className='flex-row justify-between p-2  w-full'>
      <View className='flex-row justify-between w-full'>
        <Text variant='bodyMedium'>Total Expense:</Text>
        <Text variant='bodyMedium'> {totalCost}</Text>
      </View>
    </Card>
  );
};

export default TotalCount;

const styles = StyleSheet.create({});
