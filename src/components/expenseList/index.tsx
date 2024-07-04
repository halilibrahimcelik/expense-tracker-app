import { FlatList, View } from 'react-native';
import React from 'react';
import { IExpense } from '@/types';
import SingleExpense from '../singleExpense';

type Props = {
  expenses: IExpense[];
};

const ExpenseList = ({ expenses }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        contentContainerStyle={{
          gap: 10,
          marginTop: 20,
          paddingHorizontal: 10,
          flexGrow: 1,
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <>
            <SingleExpense {...item} />
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpenseList;
