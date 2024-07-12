// eslint-disable-next-line import/no-unresolved
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
  // eslint-disable-next-line import/no-unresolved
} from '@env';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// eslint-disable-next-line import/named
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export default database;
