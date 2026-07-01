/**
 * hooks/useAuth.js
 * Convenience hook — consumes AuthContext with a helpful error boundary.
 *
 * Returns the full AuthContext value:
 *   { currentUser, token, isAuthenticated, loading,
 *     login, register, logout, forgotPassword }
 */
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'useAuth() must be used inside <AuthProvider>. ' +
      'Make sure AuthProvider wraps your component tree in App.jsx.',
    );
  }
  return ctx;
}
