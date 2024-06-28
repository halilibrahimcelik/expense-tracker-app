import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TotalCount from './TotalCount';
import { Checkbox, Text, useTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
type Props = {};
type Currency = {
  dollar: boolean;
  euro: boolean;
  lira: boolean;
};
const LastExpensesWrapper = (props: Props) => {
  const [currency, setCurrency] = useState<Currency>({
    dollar: true,
    euro: false,
    lira: false,
  });
  const theme = useTheme();
  return (
    <View>
      <View className='flex-row items-center  w-full gap-0'>
        <Text variant='bodyLarge'>Choose a currency: </Text>
        <View className='flex-row justify-center items-center  gap-x-3 '>
          <View className='flex-row items-center gap-0 border border-white'>
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
    </View>
  );
};

export default LastExpensesWrapper;

const styles = StyleSheet.create({});
