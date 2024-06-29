import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum STACK_NAMES {
  Home = 'Home',
  AllExpenses = 'All Expenses',
  LastExpenses = 'Last Expenses',
  ManageExpenses = 'Manage Expenses',
}

export type ISlug = {
  slug: string;
};
export interface ITitle {
  title: string;
}
export interface IExpense {
  id: string;
  title: string;
  description: string;
  cost: number;
  expenseDate: Date;
}
export type RootBottomParamList = {
  [STACK_NAMES.LastExpenses]: ITitle;
  [STACK_NAMES.AllExpenses]: ITitle;
};
export type RootStackParamList = {
  [STACK_NAMES.Home]: ITitle;
  [STACK_NAMES.ManageExpenses]: ISlug;
};
export type StackNavigation = NavigationProp<RootStackParamList>;
export interface ManageExpensesProps
  extends NativeStackScreenProps<
    RootStackParamList,
    STACK_NAMES.ManageExpenses
  > {}
