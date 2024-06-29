import { IExpense } from '@/types';
import { createContext, useContext, useMemo, useState } from 'react';
export type Currency = {
  dollar: boolean;
  euro: boolean;
  lira: boolean;
};
type InitialState = {
  currency: Currency;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
};
const MainExpenseContext = createContext<InitialState | null>(null);

export const useMainExpenseContext = () => {
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
  const [allExpenses, setAllExpenseses] = useState<IExpense[]>([]);

  const value = useMemo(() => {
    return {
      currency,
      setCurrency,
    };
  }, [currency]);
  return (
    <MainExpenseContext.Provider value={value}>
      {children}
    </MainExpenseContext.Provider>
  );
};

export default MainExpenseProvider;
