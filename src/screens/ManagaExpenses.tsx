import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect } from 'react';
import { ManageExpensesProps, STACK_NAMES } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from '@/components/UI/Container';
import ExpenseForm from '@/components/expenseForm';
import { useAuthContext } from '@/providers/AuthProvider';

interface Props extends ManageExpensesProps {}
const ManagaExpenses = ({ navigation, route }: Props) => {
  const { isAuth, token } = useAuthContext();

  const handleNavigation = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (!isAuth || !token) {
      navigation.navigate(STACK_NAMES.Home, {
        title: 'All Expenses',
      });
    }
  }, [isAuth, navigation, token]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 10}
        >
          <SafeAreaView>
            <ScrollView>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                <Container>
                  <ExpenseForm
                    expenseId={route?.params?.params?.slug}
                    handleNavigation={handleNavigation}
                  />
                </Container>
              </TouchableWithoutFeedback>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ManagaExpenses;
