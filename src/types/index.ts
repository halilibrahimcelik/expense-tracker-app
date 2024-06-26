export enum STACK_NAMES {
  AllExpenses = 'AllExpenses',
  LastExpenses = 'LastExpenses',
  ManageExpenses = 'ManageExpenses',
}

export type ISlug = {
  slug: string;
};

export type RootStackParamList = {
  [STACK_NAMES.AllExpenses]: {
    title: STACK_NAMES.AllExpenses;
  };
  [STACK_NAMES.LastExpenses]: {
    title: STACK_NAMES.LastExpenses;
  };
  [STACK_NAMES.ManageExpenses]: ISlug;
};
