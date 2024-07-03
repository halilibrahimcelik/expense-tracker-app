import { Alert, Platform, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {
  formatDate,
  validateCost,
  validateDescription,
  validateExpenseDate,
  validateTitle,
} from '@/utils';
import CustomErrorMessage from '../UI/CustomErrorMessage';
import { IExpense, ITimeMode } from '@/types';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { useThemeContext } from '@/theme/ThemeProvider';
import { nanoid } from 'nanoid';
import { useMainExpenseCtx } from '@/providers/MainExpenseProvider';
import { ref, set } from 'firebase/database';
import database from '@/firebase/firebase.config';

type Props = {
  handleNavigation: () => void;
  expenseId: string;
};
type ErrorState = {
  isError: boolean;
  errorMessage: string;
};
const numberOfLines = 4;

const ExpenseForm = ({ handleNavigation, expenseId }: Props) => {
  const theme = useTheme();
  const themeCtx = useThemeContext();
  const { addNewExpense, allExpenses, updateAnExpense } = useMainExpenseCtx();
  const [title, setTitle] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [mode, setMode] = useState<ITimeMode>('date');
  const [show, setShow] = useState(false);
  const [errorState, setErrorState] = useState<{
    title: ErrorState;
    description: ErrorState;
    cost: ErrorState;
    expenseDate: ErrorState;
  }>({
    title: {
      isError: false,
      errorMessage: '',
    },
    description: {
      isError: false,
      errorMessage: '',
    },
    cost: {
      isError: false,
      errorMessage: '',
    },
    expenseDate: {
      isError: false,
      errorMessage: '',
    },
  });
  useEffect(() => {
    if (isSubmitted) {
      const titleError = validateTitle(title);
      const descriptionError = validateDescription(description);
      const costError = validateCost(cost);
      const expenseDateError = validateExpenseDate(date);
      setErrorState({
        title: titleError,
        description: descriptionError,
        cost: costError,
        expenseDate: expenseDateError,
      });
    }
  }, [cost, date, description, isSubmitted, title]);

  useEffect(() => {
    const isExpenseExist = allExpenses.find(
      (expense) => expense.id === expenseId
    );
    if (isExpenseExist) {
      setTitle(isExpenseExist.title);
      setDescription(isExpenseExist.description);
      setCost(isExpenseExist.cost.toString());
      setDate(isExpenseExist.expenseDate);
    }
  }, [allExpenses, expenseId]);
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCost('');
    setDate(undefined);
    setIsSubmitted(false);
    handleNavigation();
  };

  const saveExpenseToDb = async (expense: IExpense) => {
    try {
      set(ref(database, 'expenses/' + expense.id), expense);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async () => {
    const titleError = validateTitle(title);

    const descriptionError = validateDescription(description);
    const costError = validateCost(cost);
    const expenseDateError = validateExpenseDate(date);
    setIsSubmitted(true);
    setErrorState({
      title: titleError,
      description: descriptionError,
      cost: costError,
      expenseDate: expenseDateError,
    });
    if (
      titleError.isError ||
      descriptionError.isError ||
      costError.isError ||
      !date
    ) {
      //Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const isExpenseExist = allExpenses.find(
      (expense) => expense.id === expenseId
    );

    if (isExpenseExist) {
      const updatedExpense: IExpense = {
        id: expenseId,
        title,
        description,
        cost: parseInt(cost),
        expenseDate: date,
      };
      updateAnExpense(expenseId, updatedExpense);
    } else {
      const newExpense: IExpense = {
        id: nanoid(),
        title,
        description,
        cost: parseInt(cost),
        expenseDate: date,
      };
      addNewExpense(newExpense);
      await saveExpenseToDb(newExpense);
    }
    resetForm();
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
  return (
    <View>
      <View className='gap-3'>
        <Text variant='headlineMedium' className='text-center my-6'>
          Add New Expense
        </Text>
        <View>
          <TextInput
            returnKeyLabel='Done'
            label='Title'
            placeholderTextColor={theme.colors.primaryContainer}
            theme={{ roundness: 8 }}
            mode='outlined'
            returnKeyType={'done'}
            style={{
              borderRadius: 10,
              margin: 0,
              padding: 0,
            }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          {errorState.title.isError && (
            <CustomErrorMessage error={errorState.title.errorMessage} />
          )}
        </View>
        <View>
          <TextInput
            multiline
            returnKeyType={'done'}
            numberOfLines={Platform.OS === 'ios' ? 0 : numberOfLines}
            returnKeyLabel='Done'
            label='Description'
            placeholderTextColor={theme.colors.primaryContainer}
            theme={{ roundness: 8 }}
            mode='outlined'
            style={{
              borderRadius: 10,
              minHeight: Platform.OS === 'ios' ? 100 : 0,
              maxHeight: 300,
              margin: 0,
              padding: 0,
            }}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          {errorState.description.isError && (
            <CustomErrorMessage error={errorState.description.errorMessage} />
          )}
        </View>
        <View className='flex-row    justify-between items-start'>
          <View className=''>
            <TextInput
              // placeholderTextColor={theme.colors.primaryContainer}
              theme={{
                roundness: 8,
                colors: {
                  background: 'transparent',
                },
              }}
              placeholder='Cost'
              value={cost}
              // label='Cost'
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: theme.colors.surface,
                height: 35,
              }}
              onChangeText={(text) => setCost(text)}
              returnKeyType='done'
              keyboardType='numeric'
              mode='flat'
            />
            {errorState.cost.isError && (
              <CustomErrorMessage error={errorState.cost.errorMessage} />
            )}
          </View>
          {!show && (
            <View className='flex-row    items-center  '>
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
              <Text className='' variant='labelSmall'>
                {date && formatDate(date)}{' '}
              </Text>
              {errorState.expenseDate.isError && (
                <CustomErrorMessage
                  error={errorState.expenseDate.errorMessage}
                />
              )}
            </View>
          )}
          {show && (
            <DateTimePicker
              accentColor={theme.colors.primary}
              textColor={theme.colors.primary}
              themeVariant={themeCtx?.isDarkMode ? 'dark' : 'light'}
              testID='dateTimePicker'
              value={date || new Date()}
              mode={mode}
              onChange={onChange}
            />
          )}
        </View>
      </View>

      <View className='flex-row justify-between  mt-4 '>
        <Button mode='contained-tonal' onPress={handleNavigation}>
          <Text variant='titleSmall'>Cancel</Text>
        </Button>
        <Button mode='contained-tonal' onPress={onSubmit}>
          <Text variant='titleSmall'> Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({});
