import { NavigationProp } from '@react-navigation/native';

export enum STACK_NAMES {
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
  [STACK_NAMES.LastExpenses]: ITitle;
  [STACK_NAMES.ManageExpenses]: ISlug;
};
export type StackNavigation = NavigationProp<RootStackParamList>;
