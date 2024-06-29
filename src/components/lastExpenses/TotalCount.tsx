import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';

type Props = {};

const TotalCount = (props: Props) => {
  return (
    <Card mode='contained' className='flex-row justify-between p-2  w-full'>
      <Text variant='bodyMedium'>Total Expense:</Text>
    </Card>
  );
};

export default TotalCount;

const styles = StyleSheet.create({});
