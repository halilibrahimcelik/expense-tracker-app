import { IExpense } from '@/types';
import { getExpensesFromDb } from '@/utils/httpRequest';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuthContext } from './AuthProvider';
export type Currency = {
  dollar: boolean;
  euro: boolean;
  lira: boolean;
};
type InitialState = {
  currency: Currency;
  allExpenses: IExpense[];
  addNewExpense: (newExpense: IExpense) => void;
  updateAnExpense: (id: string, newExpenseValue: IExpense) => void;
  deleteAnExpense: (id: string) => void;
  lastSevenDaysExpense: () => IExpense[];
  totalExpense: (expenses: IExpense[]) => number;

  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
};
const MainExpenseContext = createContext<InitialState | null>(null);

export const useMainExpenseCtx = () => {
  const context = useContext(MainExpenseContext);
  if (!context) {
    throw new Error(
      'useMainExpenseContext must be used within a MainExpenseProvider'
    );
  }
  return context;
};
const MainExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>({
    dollar: true,
    euro: false,
    lira: false,
  });
  const { userId } = useAuthContext();
  const [allExpenses, setAllExpenseses] = useState<IExpense[]>([]);
  useEffect(() => {
    const getExpenses = async (userId: string) => {
      const expenses = (await getExpensesFromDb(userId!)) as IExpense[];
      if (expenses) {
        setAllExpenseses(expenses);
      }
    };
    if (userId) {
      getExpenses(userId);
    }
  }, [userId]);

  const lastSevenDaysExpense = useCallback(() => {
    const lastSevenDays = new Date();
    lastSevenDays.setDate(lastSevenDays.getDate() - 7);
    return allExpenses.filter((expense) => {
      return new Date(expense.expenseDate) > lastSevenDays;
    });
  }, [allExpenses]);

  const totalExpense = useCallback((expenses: IExpense[]) => {
    return expenses.reduce((acc, expense) => acc + expense.cost, 0);
  }, []);

  const addNewExpense = (newExpense: IExpense) => {
    setAllExpenseses((prev) => [...prev, newExpense]);
  };

  const updateAnExpense = useCallback(
    (id: string, newExpenseValue: IExpense) => {
      const updatedExpenses = allExpenses.map((expense) => {
        if (expense.id === id) {
          return newExpenseValue;
        }
        return expense;
      });
      setAllExpenseses(updatedExpenses);
    },
    [allExpenses]
  );

  const deleteAnExpense = useCallback(
    (id: string) => {
      const updatedExpenses = allExpenses.filter(
        (expense) => expense.id !== id
      );
      setAllExpenseses(updatedExpenses);
    },
    [allExpenses]
  );

  const value = useMemo(() => {
    return {
      currency,
      setCurrency,
      allExpenses,
      addNewExpense,
      updateAnExpense,
      deleteAnExpense,
      lastSevenDaysExpense,
      totalExpense,
    };
  }, [
    allExpenses,
    currency,
    deleteAnExpense,
    updateAnExpense,
    lastSevenDaysExpense,
    totalExpense,
  ]);
  return (
    <MainExpenseContext.Provider value={value}>
      {children}
    </MainExpenseContext.Provider>
  );
};

export default MainExpenseProvider;
