import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import TotalCount from '../UI/TotalCount';
import { useMainExpenseCtx } from '@/providers/MainExpenseProvider';
import ExpenseList from '../expenseList';

type Props = {};

const AllExpensesWrapper = (props: Props) => {
  const { totalExpense, allExpenses } = useMainExpenseCtx();
  const totalCost = totalExpense(allExpenses);
  return (
    <View style={{ flex: 1 }}>
      <Text variant='bodyMedium' className='mb-3'>
        Display all expenses so far
      </Text>
      <TotalCount totalCost={totalCost} />
      <ExpenseList expenses={allExpenses} />
    </View>
  );
};

export default AllExpensesWrapper;

const styles = StyleSheet.create({});
