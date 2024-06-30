import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TotalCount from './TotalCount';
import { Checkbox, Text, useTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useMainExpenseCtx } from '@/providers/MainExpenseProvider';
import SingleExpense from '../singleExpense';
type Props = {};

const LastExpensesWrapper = (props: Props) => {
  const { currency, setCurrency } = useMainExpenseCtx();
  const theme = useTheme();
  return (
    <View>
      <View className='flex-row items-center  mb-5 w-full gap-0'>
        <Text variant='bodyLarge'>Choose a currency: </Text>
        <View className='flex-row flex-1 justify-between items-center  gap-x-2 '>
          <View className='flex-row items-center gap-0 '>
            <FontAwesome name='dollar' size={24} color={theme.colors.primary} />
            <View className='items-center p-0 flex h-full '>
              <Checkbox.Android
                style={{ alignSelf: 'center', padding: 0, margin: 0 }}
                accessibilityLabel='Dollar'
                status={currency.dollar ? 'checked' : 'unchecked'}
                onPress={() =>
                  setCurrency({
                    euro: false,
                    lira: false,
                    dollar: !currency.dollar,
                  })
                }
              />
            </View>
          </View>

          <View className='flex-row items-center gap-0'>
            <FontAwesome name='euro' size={24} color={theme.colors.primary} />
            <Checkbox.Android
              status={currency.euro ? 'checked' : 'unchecked'}
              onPress={() =>
                setCurrency({
                  dollar: false,
                  lira: false,
                  euro: !currency.euro,
                })
              }
            />
          </View>
          <View className='flex-row items-center gap-0'>
            <FontAwesome
              name='turkish-lira'
              size={24}
              color={theme.colors.primary}
            />
            <Checkbox.Android
              status={currency.lira ? 'checked' : 'unchecked'}
              onPress={() =>
                setCurrency({
                  dollar: false,
                  euro: false,
                  lira: !currency.lira,
                })
              }
            />
          </View>
        </View>
      </View>
      <TotalCount />
      {/* <SingleExpense /> */}
    </View>
  );
};

export default LastExpensesWrapper;

const styles = StyleSheet.create({});
