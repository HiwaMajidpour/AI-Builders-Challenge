/**
 * contexts/AuthContext.jsx
 *
 * Global authentication state for StoryForge AI.
 *
 * Exposed contract:
 *   currentUser      — the authenticated user object (or null)
 *   token            — raw JWT string (or null)
 *   isAuthenticated  — boolean derived from token + currentUser
 *   loading          — true while the initial token validation runs on mount
 *   login(email, password)   → resolves or throws
 *   register(data)           → resolves or throws
 *   logout()                 → always resolves
 *   forgotPassword(email)    → resolves or throws
 */

import { createContext, useCallback, useEffect, useReducer } from 'react';
import { authService } from '../services/authService';
import { storage }     from '../utils/storage';
import { STORAGE_KEYS } from '../config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// ── State shape ───────────────────────────────────────────────────────────────
const initialState = {
  currentUser:     storage.get(STORAGE_KEYS.USER),
  token:           storage.get(STORAGE_KEYS.AUTH_TOKEN),
  loading:         true,   // true until mount validation completes
};

// ── Reducer ───────────────────────────────────────────────────────────────────
function authReducer(state, action) {
  switch (action.type) {

    case 'INIT_DONE':
      return { ...state, loading: false };

    case 'SESSION_SET':
      return {
        ...state,
        currentUser: action.payload.user,
        token:       action.payload.token,
        loading:     false,
      };

    case 'SESSION_CLEAR':
      return {
        ...state,
        currentUser: null,
        token:       null,
        loading:     false,
      };

    default:
      return state;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function persistSession({ token, refreshToken, user }) {
  storage.set(STORAGE_KEYS.AUTH_TOKEN,   token);
  storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  storage.set(STORAGE_KEYS.USER,         user);
}

function clearStorage() {
  storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  storage.remove(STORAGE_KEYS.USER);
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const isAuthenticated = Boolean(state.token && state.currentUser);

  // ── Mount: validate stored token ─────────────────────────────────────────
  useEffect(() => {
    const storedToken = storage.get(STORAGE_KEYS.AUTH_TOKEN);

    if (!storedToken) {
      dispatch({ type: 'INIT_DONE' });
      return;
    }

    authService
      .getMe(storedToken)
      .then((freshUser) => {
        storage.set(STORAGE_KEYS.USER, freshUser);
        dispatch({
          type:    'SESSION_SET',
          payload: { user: freshUser, token: storedToken },
        });
      })
      .catch(() => {
        // Stored token invalid / expired — clear silently.
        clearStorage();
        dispatch({ type: 'SESSION_CLEAR' });
      });
  }, []);

  // ── Actions ───────────────────────────────────────────────────────────────

  /** @param {{ email: string, password: string }} credentials */
  const login = useCallback(async ({ email, password }) => {
    const data = await authService.login({ email, password });
    persistSession(data);
    dispatch({ type: 'SESSION_SET', payload: { user: data.user, token: data.token } });
    return data;
  }, []);

  /** @param {{ name: string, email: string, password: string }} payload */
  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    persistSession(data);
    dispatch({ type: 'SESSION_SET', payload: { user: data.user, token: data.token } });
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearStorage();
      dispatch({ type: 'SESSION_CLEAR' });
    }
  }, []);

  /** @param {string} email */
  const forgotPassword = useCallback(async (email) => {
    return authService.forgotPassword(email);
  }, []);

  // ── Context value ─────────────────────────────────────────────────────────
  const value = {
    currentUser:    state.currentUser,
    token:          state.token,
    isAuthenticated,
    loading:        state.loading,
    login,
    register,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
