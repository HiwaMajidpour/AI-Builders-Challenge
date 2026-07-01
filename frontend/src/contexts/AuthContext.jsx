/**
 * contexts/AuthContext.jsx
 * Manages authenticated user state; exposes login / logout / register actions.
 */
import { createContext, useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../config';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.USER));
  const [token, setToken] = useState(() => storage.get(STORAGE_KEYS.AUTH_TOKEN));
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(token && user);

  function persistSession({ token: t, refreshToken, user: u }) {
    storage.set(STORAGE_KEYS.AUTH_TOKEN, t);
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    storage.set(STORAGE_KEYS.USER, u);
    setToken(t);
    setUser(u);
  }

  function clearSession() {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }

  // Verify token on mount — re-fetch user profile to ensure token is still valid.
  useEffect(() => {
    if (!token) {
      // Use a microtask so we don't setState synchronously inside the effect body.
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }
    authService
      .getMe()
      .then((freshUser) => {
        setUser(freshUser);
        storage.set(STORAGE_KEYS.USER, freshUser);
      })
      .catch(() => {
        // Token invalid — clear session silently.
        clearSession();
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    persistSession(data);
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    persistSession(data);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
