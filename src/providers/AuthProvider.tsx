import { IAuth } from '@/types';
import { createContext, useContext, useMemo, useState } from 'react';

interface IAuthContext extends IAuth {
  setUserCredentials: React.Dispatch<React.SetStateAction<IAuth>>;
}
const initalState: IAuthContext = {
  isAuth: false,
  token: null,
  user: null,
  userId: null,
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
  });
  const value = useMemo(() => {
    return {
      isAuth: userCredentials.isAuth,
      token: userCredentials.token,
      user: userCredentials.user,
      userId: userCredentials.userId,
      setUserCredentials,
    };
  }, [
    userCredentials.isAuth,
    userCredentials.token,
    userCredentials.user,
    userCredentials.userId,
  ]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
