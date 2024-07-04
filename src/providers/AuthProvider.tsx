import { IAuth } from '@/types';
import { createContext, useContext, useMemo, useState } from 'react';

const initalState: IAuth = {
  isAuth: false,
  token: null,
  user: null,
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
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    return {
      isAuth,
      token,
      user,
    };
  }, [isAuth, token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
