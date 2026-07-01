/**
 * components/layout/AuthLayout.jsx
 * Centred card layout for auth pages (login, register, forgot-password).
 */
import { Outlet, Link } from 'react-router-dom';
import { APP_NAME } from '../../config';
import { ROUTES } from '../../constants/routes';
import ThemeToggle from '../common/ThemeToggle';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-base)] p-4">
      {/* Theme toggle — top right */}
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>

      {/* Logo */}
      <Link
        to={ROUTES.HOME}
        className="mb-8 flex items-center gap-2 text-lg font-bold text-[var(--color-text-primary)]"
      >
        <span className="text-[var(--color-ai)]">✦</span>
        {APP_NAME}
      </Link>

      {/* Auth card */}
      <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 shadow-[var(--shadow-md)]">
        <Outlet />
      </div>
    </div>
  );
}
