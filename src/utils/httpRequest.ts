import database from '@/firebase/firebase.config';
import { IExpense } from '@/types';
import { child, get, ref, set, update } from 'firebase/database';
export const getExpensesFromDb = async () => {
  try {
    const dbRef = ref(database);
    const value = await get(child(dbRef, 'expenses')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Check if data is already an array
        if (Array.isArray(data)) {
          return data;
        } else {
          // Convert object to array if data is not an array
          return Object.keys(data).map((key) => data[key]);
        }
      } else {
        console.log('No data available');
        return []; // Return an empty array if no data
      }
    });

    return value;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of error
  }
};

export const saveExpenseToDb = async (expense: IExpense) => {
  try {
    set(ref(database, 'expenses/' + expense.id), expense);
  } catch (error) {
    console.log(error);
  }
};
export const updateExpenseInDb = async (id: string, expense: IExpense) => {
  try {
    return update(ref(database, 'expenses/' + id), expense);
  } catch (error) {
    console.log(error);
  }
};
