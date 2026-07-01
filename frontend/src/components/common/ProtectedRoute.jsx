/**
 * components/common/ProtectedRoute.jsx
 *
 * Two-in-one guard:
 *
 *  mode="protected"  (default)
 *    — Redirects unauthenticated visitors to /login (saving the intended URL
 *      in location.state.from so LoginPage can redirect back after login).
 *    — Shows a full-screen Spinner while auth state is resolving on mount.
 *
 *  mode="guest"
 *    — Redirects already-authenticated visitors away from auth pages
 *      (login / register) to /dashboard.
 *    — Prevents a logged-in user from seeing the login form.
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth }   from '../../hooks/useAuth';
import { ROUTES }    from '../../constants/routes';
import Spinner       from '../ui/Spinner';

export default function ProtectedRoute({ children, mode = 'protected' }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ── Auth state still resolving on mount ──────────────────────────────────
  if (loading) {
    return (
      <div
        role="status"
        aria-label="Checking authentication"
        className="flex min-h-screen items-center justify-center bg-[var(--color-bg-base)]"
      >
        <Spinner size="lg" />
      </div>
    );
  }

  // ── Guest guard: bounce authenticated users away from auth pages ─────────
  if (mode === 'guest' && isAuthenticated) {
    const destination = location.state?.from?.pathname ?? ROUTES.DASHBOARD;
    return <Navigate to={destination} replace />;
  }

  // ── Protected guard: bounce unauthenticated users to login ───────────────
  if (mode === 'protected' && !isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
