import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ManageExpensesProps } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from '@/components/UI/Container';
import { Text, TextInput, useTheme } from 'react-native-paper';

interface Props extends ManageExpensesProps {}
const numberOfLines = 4;
const ManagaExpenses = ({ navigation, route }: Props) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const defaultStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      padding: 20,
      height: '50%',
      width: '100%',
    },
  });
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior='position'>
        <SafeAreaView>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Container>
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
                  width: '100%',
                  backgroundColor: theme.colors.surface,
                }}
                onChangeText={(text) => setCost(text)}
                returnKeyType='done'
                keyboardType='numeric'
                mode='flat'
              />
              <Pressable onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
              </Pressable>
            </Container>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ManagaExpenses;
