export enum STACK_NAMES {
  AllExpenses = 'All Expenses',
  LastExpenses = 'Last Expenses',
  ManageExpenses = 'ManageExpenses',
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
export type RootStackParamList = {
  [STACK_NAMES.AllExpenses]: ITitle;
  [STACK_NAMES.LastExpenses]: ITitle;
  [STACK_NAMES.ManageExpenses]: ISlug;
};
