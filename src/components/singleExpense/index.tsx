import { Platform, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Card, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { formatDate } from '@/utils';
import { Currency, useMainExpenseCtx } from '@/providers/MainExpenseProvider';
import { IExpense, ITimeMode, STACK_NAMES, StackNavigation } from '@/types';
import { useThemeContext } from '@/theme/ThemeProvider';
import { Entypo } from '@expo/vector-icons';
import DropDownMenu from '../UI/DropdownMenu';
import DeleteModal from '../UI/DeleteModal';
import { useNavigation } from '@react-navigation/native';
const SingleExpense = ({
  cost,
  id,
  description,
  expenseDate,
  title,
}: IExpense) => {
  const themeCtx = useThemeContext();
  const navigation = useNavigation<StackNavigation>();
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { currency, deleteAnExpense } = useMainExpenseCtx();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<ITimeMode>('date');
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const toggleDropdown = () => setVisibleDropdown((prev) => !prev);
  const handleCloseModal = () => setVisibleModal(false);
  const handleDeleteExpense = () => {
    deleteAnExpense(id);
  };
  const handleEditExpense = () => {
    navigation.navigate(STACK_NAMES.ManageExpenses, {
      slug: id,
    });
  };
  const handleOpenExpenseModal = () => {
    setVisibleModal(true);
  };
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setShow(false);
    currentDate && setDate(currentDate);
  };

  const showMode = (currentMode: ITimeMode) => {
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
    <>
      <Card className='px-4 pt-6 pb-4 relative h-auto flex-1' mode='elevated'>
        <View className='absolute top-[-24px] right-[-20px]'>
          <DropDownMenu
            visible={visibleDropdown}
            toggleVisibility={toggleDropdown}
            handleOpenExpenseModal={handleOpenExpenseModal}
            handleEditExpense={handleEditExpense}
          />
        </View>

        <View className='flex-row  justify-between'>
          <View className='flex-shrink '>
            <Text className='mb-2' variant='titleSmall'>
              {title}
            </Text>
            <Text className='flex-shrink-0' variant='bodySmall'>
              {description}
            </Text>
            <View className='mt-8 h-5 flex-row  items-center justify-between w-full '>
              <View className='flex-row items-center  '>
                {!show && (
                  <>
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
                      {date && formatDate(date)}{' '}
                    </Text>
                  </>
                )}
                {show && (
                  <DateTimePicker
                    accentColor={theme.colors.primary}
                    textColor={theme.colors.primary}
                    themeVariant={themeCtx?.isDarkMode ? 'dark' : 'light'}
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
          </View>
          <View className='items-start justify-center'>
            <Text variant='headlineMedium'>
              {returnCurrencySymbol(currency)}
              {cost}
            </Text>
          </View>
        </View>
      </Card>
      <DeleteModal
        title='Delete an expense'
        text='One you delete an expense, it cannot be undone.
Are you sure you?'
        visible={visibleModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteExpense}
      />
    </>
  );
};

export default SingleExpense;

const styles = StyleSheet.create({});
