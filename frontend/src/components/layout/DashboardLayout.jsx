/**
 * components/layout/DashboardLayout.jsx
 *
 * Authenticated two-column shell used by all /dashboard routes.
 *
 * Structure (desktop ≥ lg)
 * ┌──────────────┬──────────────────────────────────────────┐
 * │              │  DashboardHeader (h-[var(--size-topbar)]) │
 * │   Sidebar    ├──────────────────────────────────────────┤
 * │  (w-60 fixed)│  <main> overflow-y-auto  <Outlet />      │
 * └──────────────┴──────────────────────────────────────────┘
 *
 * Structure (mobile < lg)
 * ┌──────────────────────────────────────────────────────────┐
 * │  DashboardHeader (hamburger visible)                      │
 * ├──────────────────────────────────────────────────────────┤
 * │  <main>  <Outlet />                                       │
 * └──────────────────────────────────────────────────────────┘
 *   Sidebar slides in as a z-40 overlay drawer on mobile.
 */
import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import Avatar from '../ui/Avatar';
import ThemeToggle from '../common/ThemeToggle';
import { cn } from '../../utils/cn';

// ── DashboardHeader ───────────────────────────────────────────────────────────
function DashboardHeader({ onMenuOpen }) {
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);
  const notificationRef = useRef(null);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Project approved',
      message: 'Your AI project has been approved.',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'New message',
      message: 'You received a new team message.',
      time: '15 min ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Subscription',
      message: 'Your subscription renews tomorrow.',
      time: '1 day ago',
      unread: false,
    },
  ]);

  const notifCount = notifications.filter(
    notification => notification.unread
  ).length;

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    }
    if (avatarOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [avatarOpen]);

  useEffect(() => {
    function handleOutside(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }
    }

    if (notificationOpen)
      document.addEventListener('mousedown', handleOutside);

    return () =>
      document.removeEventListener('mousedown', handleOutside);
  }, [notificationOpen]);

  return (
    <header
      className={cn(
        'flex h-[var(--size-topbar,3.5rem)] shrink-0 items-center justify-between gap-3',
        'border-b border-[var(--topbar-border)] bg-[var(--topbar-bg)]',
        'px-4 sm:px-6',
      )}
      role="banner"
    >
      {/* Left: hamburger (mobile) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          aria-expanded={false}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]',
            'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
            'transition-colors lg:hidden',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:outline-none',
          )}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h14M3 11h14M3 16h14" />
          </svg>
        </button>

        {/* Search box */}
        <div className="relative hidden sm:block">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" aria-hidden="true">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <circle cx="6" cy="6" r="5" />
              <path d="m13 13-3.5-3.5" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search projects…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search projects"
            className={cn(
              'h-8 w-56 rounded-[var(--radius-md)] border border-[var(--color-border)]',
              'bg-[var(--color-bg-surface)] pl-8 pr-3',
              'text-[var(--text-sm)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
              'focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)]',
              'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
            )}
          />
        </div>
      </div>

      {/* Right: notifications · theme · avatar */}
      <div className="flex items-center gap-1">

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div ref={notificationRef} className="relative">

          <button
            onClick={() => setNotificationOpen(v => !v)}
            aria-label={`Notifications${notifCount > 0 ? `, ${notifCount} unread` : ''}`}
            className={cn(
              'relative flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]',
              'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
              'transition-colors',
              'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:outline-none',
            )}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-[9px] font-bold text-white"
              >
                {notifCount}
              </span>
            )}
          </button>

          {notificationOpen && (

            <div
              className="absolute right-0 mt-2 w-80 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xl z-[var(--z-tooltip,70)]"
            >

              <div className="border-b border-[var(--color-border)] px-4 py-3">

                <h3 className="font-semibold">
                  Notifications
                </h3>

              </div>

              <div className="max-h-80 overflow-y-auto">

                {notifications.map(item => (

                  <div
                    key={item.id}
                    onClick={() => {

                      setNotificationOpen(false);

                      setSelectedNotification(item);

                      setNotifications(prev =>
                        prev.map(notification =>
                          notification.id === item.id
                            ? {
                              ...notification,
                              unread: false,
                            }
                            : notification
                        )
                      );

                    }}
                    className="border-b border-[var(--color-border)] p-4 hover:bg-[var(--color-bg-surface)] cursor-pointer"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="font-medium">
                          {item.title}
                        </p>

                        <p className="text-sm text-[var(--color-text-muted)]">
                          {item.message}
                        </p>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                          {item.time}
                        </p>

                      </div>

                      {item.unread && (
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      )}

                    </div>

                  </div>

                ))}

              </div>

              <div className="p-3">

                <Link
                  to="/dashboard/settings/notifications"
                  onClick={() => setNotificationOpen(false)}
                  className="block rounded-lg bg-[var(--color-bg-surface)] py-2 text-center text-sm hover:bg-[var(--color-border)]"
                >
                  View all notifications
                </Link>

              </div>

            </div>

          )}

          {selectedNotification && (

            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40">

              <div className="w-[500px] rounded-xl bg-[var(--color-bg-elevated)] p-6 shadow-2xl">

                <h2 className="mb-3 text-lg font-semibold">
                  {selectedNotification.title}
                </h2>

                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedNotification.message}
                </p>

                <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                  {selectedNotification.time}
                </p>

                <button
                  onClick={() => {
                    setSelectedNotification(null);
                    setNotificationOpen(true);
                  }}
                  className="mt-6 rounded-lg bg-[var(--color-brand)] px-4 py-2 text-white"
                >
                  Close
                </button>

              </div>

            </div>

          )}

        </div>

        {/* Avatar menu */}
        <div ref={avatarRef} className="relative ml-1">
          <button
            onClick={() => {
              setNotificationOpen(false);
              setAvatarOpen(v => !v);
            }}
            aria-label="Open user menu"
            aria-expanded={avatarOpen}
            aria-haspopup="menu"
            className="flex items-center rounded-[var(--radius-full)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:outline-none"
          >
            <Avatar
              name={currentUser?.name ?? 'User'}
              src={currentUser?.avatar}
              size="sm"
              status="online"
            />
          </button>

          {/* Dropdown */}
          {avatarOpen && (
            <div
              role="menu"
              aria-label="User menu"
              className={cn(
                'absolute right-0 top-full mt-1.5 z-[var(--z-tooltip,70)]',
                'w-52 rounded-[var(--radius-xl)]',
                'border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
                'shadow-[var(--shadow-lg)]',
                'py-1',
                'animate-scale-in',
              )}
            >
              {/* User info */}
              <div className="border-b border-[var(--color-border)] px-4 py-3">
                <p className="truncate text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
                  {currentUser?.name ?? 'User'}
                </p>
                <p className="truncate text-[var(--text-xs)] text-[var(--color-text-muted)]">
                  {currentUser?.email ?? ''}
                </p>
              </div>

              {/* Menu items */}
              {[
                { label: 'Profile', to: '/dashboard/settings/profile' },
                { label: 'Billing', to: '/dashboard/settings/billing' },
                { label: 'Settings', to: '/dashboard/settings' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  role="menuitem"
                  onClick={() => setAvatarOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-2',
                    'text-[var(--text-sm)] text-[var(--color-text-secondary)]',
                    'hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
                    'transition-colors',
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ── DashboardLayout ───────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-subtle)]">

      {/* ── Desktop sidebar (always visible ≥ lg) ── */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-[var(--z-drawer,40)] bg-[var(--color-bg-overlay)] backdrop-blur-sm lg:hidden"
          />
          {/* Drawer */}
          <div
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            className="fixed inset-y-0 left-0 z-[calc(var(--z-drawer,40)+1)] shadow-[var(--shadow-2xl)] lg:hidden animate-slide-right"
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ── Right column ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuOpen={() => setSidebarOpen(true)} />

        {/* Scrollable content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 focus:outline-none"
          tabIndex={-1}
          aria-label="Dashboard content"
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
