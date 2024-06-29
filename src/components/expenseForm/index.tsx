import { Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

type Props = {
  handleNavigation: () => void;
};
type ErrorState = {
  isError: boolean;
  errorMessage: string;
};
const numberOfLines = 4;
const validateTitle = (title: string) => {
  const value = title?.trim();
  if (!value) {
    return {
      isError: true,
      errorMessage: 'Title is required',
    };
  }
  if (value.length < 3) {
    return {
      isError: true,
      errorMessage: 'Title must be atleast 3 characters long',
    };
  }
  return {
    isError: false,
    errorMessage: '',
  };
};
const ExpenseForm = ({ handleNavigation }: Props) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [errorState, setErrorState] = useState<{
    title: ErrorState;
    description: ErrorState;
    cost: ErrorState;
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
  });

  return (
    <View>
      <View className='gap-3'>
        <Text variant='headlineMedium' className='text-center my-6'>
          Add New Expense
        </Text>
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
        <TextInput
          placeholderTextColor={theme.colors.primaryContainer}
          theme={{
            roundness: 8,
            colors: {
              background: 'transparent',
            },
          }}
          value={cost}
          label='Cost'
          style={{
            backgroundColor: theme.colors.surface,
            margin: 0,
            padding: 0,
          }}
          onChangeText={(text) => setCost(text)}
          returnKeyType='done'
          keyboardType='numeric'
          mode='flat'
        />
      </View>
      <View className='flex-row justify-between  mt-4 '>
        <Button mode='contained-tonal' onPress={handleNavigation}>
          <Text variant='titleSmall'>Cancel</Text>
        </Button>
        <Button mode='contained-tonal' onPress={() => {}}>
          <Text variant='titleSmall'> Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({});
