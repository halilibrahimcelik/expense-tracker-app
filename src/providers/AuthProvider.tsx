import { auth } from '@/firebase/firebase.config';
import { IAuth } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface IAuthContext extends IAuth {
  setUserCredentials: React.Dispatch<React.SetStateAction<IAuth>>;
}

const initalState: IAuthContext = {
  isAuth: false,
  token: null,
  user: null,
  userId: null,
  email: null,
  setUserCredentials: () => {},
};

export const AuthContext = createContext(initalState);

export const useAuthContext = () => {
  if (!AuthContext) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return useContext(AuthContext);
};
type Props = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<Props> = ({ children }) => {
  // const [isAuth, setIsAuth] = useState(false);
  // const [token, setToken] = useState(null);
  // const [user, setUser] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [userCredentials, setUserCredentials] = useState<IAuth>({
    isAuth: false,
    token: null,
    user: null,
    userId: null,
    email: null,
  });

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const emailStored = await AsyncStorage.getItem('email');
        if (!userId) {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              setUserCredentials((prev) => {
                return {
                  ...prev,
                  isAuth: true,
                  token: user.refreshToken,
                  userId: uid,
                  email: user.email,
                };
              });
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
        } else {
          setUserCredentials((prev) => {
            return {
              ...prev,
              isAuth: true,
              token: userId,
              userId: userId,
              email: emailStored,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserId();
  }, []);
  const value = useMemo(() => {
    return {
      isAuth: userCredentials.isAuth,
      token: userCredentials.token,
      user: userCredentials.user,
      userId: userCredentials.userId,
      email: userCredentials.email,
      setUserCredentials,
    };
  }, [
    userCredentials.email,
    userCredentials.isAuth,
    userCredentials.token,
    userCredentials.user,
    userCredentials.userId,
  ]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
