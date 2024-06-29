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
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import ExpenseForm from '@/components/expenseForm';

interface Props extends ManageExpensesProps {}
const ManagaExpenses = ({ navigation, route }: Props) => {
  const handleNavigation = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <KeyboardAvoidingView
          style={{ overflow: 'hidden' }}
          behavior='position'
        >
          <SafeAreaView>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <Container>
                <ExpenseForm handleNavigation={handleNavigation} />
              </Container>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ManagaExpenses;
