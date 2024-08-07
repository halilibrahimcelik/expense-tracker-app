import { EXPENSES_DB, USERS_DB } from '@/constants';
import database from '@/firebase/firebase.config';
import { IExpense, IUserDb } from '@/types';
import { child, get, ref, remove, set, update } from 'firebase/database';
export const getExpensesFromDb = async (userId: string) => {
  try {
    const dbRef = ref(database);
    const value = await get(child(dbRef, `${EXPENSES_DB}/ ${userId}`)).then(
      (snapshot) => {
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
      }
    );

    return value;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of error
  }
};
export const getUserFromDb = async (userId: string) => {
  try {
    const dbRef = ref(database);
    const value = await get(child(dbRef, `${USERS_DB}/${userId}`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Check if data is already an array
          return data as IUserDb;
        } else {
          console.log('No data available');
          return {
            email: '',
            userName: '',
            id: '',
          }; // Return an empty array if no data
        }
      }
    );

    return value;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of error
  }
};

export const saveUserToDb = async (userId: string, userInfo: {}) => {
  try {
    set(ref(database, `${USERS_DB}/` + userId), {
      ...userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveExpenseToDb = async (expense: IExpense, userId: string) => {
  try {
    set(ref(database, `${EXPENSES_DB}/ ${userId}/` + expense.id), {
      ...expense,
      expenseDate: expense.expenseDate.toISOString(),
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateExpenseInDb = async (userId: string, expense: IExpense) => {
  try {
    return update(
      ref(database, `/${EXPENSES_DB}/ ${userId}/` + expense.id),
      expense
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteExpenseFromDb = async (userId: string, id: string) => {
  try {
    return remove(ref(database, `/${EXPENSES_DB}/ ${userId}` + id));
  } catch (error) {
    console.log(error);
  }
};
