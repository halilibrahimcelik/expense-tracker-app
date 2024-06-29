import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { formatDate } from '@/utils';
import {
  Currency,
  useMainExpenseContext,
} from '@/providers/MainExpenseProvider';
type Props = {};
type AndroidMode = 'date' | 'time' | 'datetime' | 'countdown';
const SingleExpense = (props: Props) => {
  const { currency } = useMainExpenseContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setShow(false);
    currentDate && setDate(currentDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const returnCurrencySymbol = (currency: Currency) => {
    switch (true) {
      case currency.lira:
        return '₺';
      case currency.dollar:
        return '$';
      case currency.euro:
        return '€';
      default:
        return '₺';
    }
  };
  return (
    <Card className='p-2 h-auto' mode='elevated'>
      <View className='flex-row  justify-between'>
        <View className='flex-shrink '>
          <Text className='mb-2' variant='titleSmall'>
            Road Trip to Capodox{' '}
          </Text>
          <Text className='flex-shrink-0' variant='bodySmall'>
            Description Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolor, exercitationem!, Description
            Lorem ipsum dolor sit amet.
          </Text>
          <View className='flex-row mt-4 h-5 items-center  '>
            <IconButton
              style={{
                margin: 0,
                padding: 0,
              }}
              onPress={showDatepicker}
              icon={() => (
                <AntDesign
                  name='calendar'
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
            <Text className='' variant='bodySmall'>
              {' '}
              {date && formatDate(date)}{' '}
            </Text>
          </View>
        </View>
        <View className='items-center'>
          <Text className='mb-2' variant='titleSmall'>
            Cost{' '}
          </Text>
          <Text variant='headlineMedium'>
            {returnCurrencySymbol(currency)}323{' '}
          </Text>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
    </Card>
  );
};

export default SingleExpense;

const styles = StyleSheet.create({});
