import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum STACK_NAMES {
  Home = 'Home',
  AllExpenses = 'All Expenses',
  LastExpenses = 'Last Expenses',
  SignIn = 'Sign In',
  SignUp = 'Sign Up',
  ExpenseForm = 'Expense Form',
  AuthScreen = 'Auth Screen',
  Settings = 'Settings',
}
export interface IClassName {
  className: string;
}
export type ITimeMode = 'date' | 'time' | 'datetime' | 'countdown';
export type IAuth = {
  isAuth: boolean;
  token: string | null;
  user: string | null;
  userId: string | null;
  email: string | null;
};
export type ISlug = {
  slug: string;
};
export type IScreenType = {
  slug: string;
  screen: string;
};
export interface ITitle {
  title: string;
}
export type ErrorState = {
  isError: boolean;
  errorMessage: string;
};
export interface IUserData {
  userName: string;
  email: string;
  password: string;
}
export interface IUserDb {
  id: string;
  userName: string;
  email: string;
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
  [STACK_NAMES.Settings]: ITitle;
};
export type RootStackParamList = {
  [STACK_NAMES.Home]: ITitle;
  [STACK_NAMES.SignIn]: undefined;
  [STACK_NAMES.SignUp]: undefined;
  [STACK_NAMES.ExpenseForm]: IScreenType;
  [STACK_NAMES.AuthScreen]: {
    screen: string;
    params: {
      slug: string;
    };
  };
};
export type StackNavigation = NavigationProp<RootStackParamList>;
export interface ManageExpensesProps
  extends NativeStackScreenProps<RootStackParamList, STACK_NAMES.ExpenseForm> {}
export interface ProtectedScreenProps
  extends NativeStackScreenProps<RootStackParamList, STACK_NAMES.AuthScreen> {}
