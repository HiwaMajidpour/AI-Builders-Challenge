/**
 * components/layout/Navbar.jsx
 * Top navigation bar — used by RootLayout and DashboardLayout.
 */
import { Link, NavLink } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { APP_NAME } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../common/ThemeToggle';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { label: 'Features', to: '/#features' },
  { label: 'Pricing', to: '/#pricing' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg-base)]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
          <span className="text-lg text-[var(--color-ai)]">✦</span>
          {APP_NAME}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DASHBOARD}>
                <Avatar src={user?.avatar} name={user?.name} size="sm" />
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to={ROUTES.LOGIN} variant="ghost" size="sm">
                Sign in
              </Button>
              <Button as={Link} to={ROUTES.REGISTER} size="sm">
                Get started
              </Button>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            className="ml-1 md:hidden text-[var(--color-text-secondary)]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-base)] px-4 pb-4 md:hidden">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block py-2 text-sm text-[var(--color-text-secondary)]',
                'hover:text-[var(--color-text-primary)]',
              )}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
