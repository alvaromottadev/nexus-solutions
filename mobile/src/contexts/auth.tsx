import { createContext, useEffect, useState } from 'react';
import { AuthMeType } from '../types/AuthMeType';
import api from '../client/api-client';
import * as Keychain from 'react-native-keychain';
import { useTypedNavigation } from '../hooks/useTypedNavigation';
import { showToast } from '../utils/showToast';
import { logoutEvent } from '../utils/logoutEvent';

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
  user: AuthMeType | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const STORAGE_TOKEN_KEY = 'com.mobile.token';
const STORAGE_USER_KEY = 'com.mobile.user';

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthMeType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handler = () => logout();
    logoutEvent.on('logout', handler);
    return () => {
      logoutEvent.off('logout', handler);
    };
  }, []);

  async function storageToken(token: string) {
    setToken(token);
    await Keychain.setGenericPassword('token', token, {
      service: STORAGE_TOKEN_KEY,
    });
  }

  async function storageUser(user: AuthMeType) {
    setUser(user);
    await Keychain.setGenericPassword('user', JSON.stringify(user), {
      service: STORAGE_USER_KEY,
    });
  }

  async function resetStorage() {
    await Keychain.resetGenericPassword({ service: STORAGE_TOKEN_KEY });
    await Keychain.resetGenericPassword({ service: STORAGE_USER_KEY });
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  async function getStoredToken() {
    const tokenStorage = await Keychain.getGenericPassword({
      service: STORAGE_TOKEN_KEY,
    });
    if (tokenStorage) {
      setToken(tokenStorage.password);
      await getAuthMe(tokenStorage.password);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }

  async function getStorageAuthMe() {
    const userStorage = await Keychain.getGenericPassword({
      service: STORAGE_USER_KEY,
    });
    if (userStorage) {
      setUser(JSON.parse(userStorage.password));
    }
  }

  async function login(email: string, password: string) {
    api
      .post(`/auth/login`, JSON.stringify({ email, password }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async response => {
        await storageToken(response.data.token);
        await getAuthMe(response.data.token);
        showToast(
          'success',
          'Login realizado com sucesso',
          'Bem-vindo de volta! 👋',
        );
        setIsAuthenticated(true);
      });
  }

  async function logout() {
    await resetStorage();
    showToast(
      'success',
      'Logout realizado com sucesso',
      'Você foi desconectado.',
    );
  }

  async function getAuthMe(token: string) {
    api
      .get(`/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
        storageUser(response.data);
      });
  }

  useEffect(() => {
    getStoredToken();
    getStorageAuthMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        token,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
