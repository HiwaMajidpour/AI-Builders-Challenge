/**
 * components/layout/DashboardLayout.jsx
 *
 * Authenticated two-column shell used by all /dashboard routes.
 *
 * Structure (desktop)
 * ┌──────────┬──────────────────────────────┐
 * │          │  <header>  Top-bar            │
 * │ Sidebar  ├──────────────────────────────┤
 * │ (fixed)  │  <main>  <Outlet />           │
 * │          │          scrollable           │
 * └──────────┴──────────────────────────────┘
 *
 * Structure (mobile)
 * ┌─────────────────────────────────────────┐
 * │  <header>  Top-bar (hamburger menu)     │
 * ├─────────────────────────────────────────┤
 * │  <main>  <Outlet />                     │
 * └─────────────────────────────────────────┘
 * The sidebar slides in as an overlay on mobile via a toggle.
 */
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Dashboard',  to: '/dashboard',            icon: '▦' },
  { label: 'AI Studio',  to: '/dashboard/ai-studio',  icon: '✦' },
  { label: 'Projects',   to: '/dashboard/projects',   icon: '⊞' },
  { label: 'Settings',   to: '/dashboard/settings',   icon: '⚙' },
];

// ── Sidebar placeholder ───────────────────────────────────────────────────────
function SidebarPlaceholder({ onClose }) {
  return (
    <aside className="
      flex h-full w-60 flex-shrink-0 flex-col
      border-r border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-950
    ">
      {/* Brand */}
      <div className="
        flex h-16 items-center gap-2.5
        border-b border-slate-200 dark:border-slate-800
        px-5
      ">
        <span className="h-7 w-7 rounded-md bg-violet-600" />
        <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
          StoryForge AI
        </span>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="ml-auto text-xl text-slate-400 hover:text-slate-700
                       dark:hover:text-slate-200 lg:hidden"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ label, to, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                    'transition-colors duration-150',
                    isActive
                      ? 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                  ].join(' ')
                }
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User area */}
      <div className="
        border-t border-slate-200 dark:border-slate-800
        p-4
      ">
        <div className="flex items-center gap-3">
          <div className="
            flex h-8 w-8 items-center justify-center
            rounded-full bg-violet-100 dark:bg-violet-950
            text-sm font-semibold text-violet-700 dark:text-violet-300
          ">
            U
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
              User Name
            </p>
            <p className="truncate text-xs text-slate-400">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── Top-bar placeholder ───────────────────────────────────────────────────────
function TopBarPlaceholder({ onMenuOpen }) {
  return (
    <header className="
      flex h-16 flex-shrink-0 items-center justify-between
      border-b border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-950
      px-4 sm:px-6
    ">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuOpen}
        aria-label="Open sidebar"
        className="
          text-slate-500 hover:text-slate-700
          dark:hover:text-slate-200
          lg:hidden
        "
      >
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" d="M3 6h16M3 12h16M3 18h16" />
        </svg>
      </button>

      {/* Page heading slot — filled by each page via context/portal if needed */}
      <div className="hidden text-sm font-semibold text-slate-700 dark:text-slate-300 lg:block">
        Dashboard
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          aria-label="Notifications"
          className="
            relative rounded-lg p-2
            text-slate-400 hover:bg-slate-100 hover:text-slate-700
            dark:hover:bg-slate-800 dark:hover:text-slate-200
            transition-colors duration-150
          "
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M6 18h6M9 2a5 5 0 0 1 5 5v3l1.5 3H3.5L5 10V7a5 5 0 0 1 4-4.9V2Z" />
          </svg>
          {/* Badge */}
          <span className="
            absolute right-1.5 top-1.5
            h-2 w-2 rounded-full bg-violet-600
          " />
        </button>

        {/* Avatar */}
        <div className="
          flex h-8 w-8 items-center justify-center
          rounded-full bg-violet-100 dark:bg-violet-950
          text-sm font-semibold text-violet-700 dark:text-violet-300
          cursor-pointer select-none
        ">
          U
        </div>
      </div>
    </header>
  );
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">

      {/* ── Desktop sidebar (always visible ≥ lg) ── */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <SidebarPlaceholder />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
            className="
              fixed inset-0 z-30
              bg-slate-900/50 backdrop-blur-sm
              lg:hidden
            "
          />

          {/* Drawer */}
          <div className="
            fixed inset-y-0 left-0 z-40
            w-60 shadow-xl
            lg:hidden
          ">
            <SidebarPlaceholder onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ── Right column ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBarPlaceholder onMenuOpen={() => setSidebarOpen(true)} />

        {/* Scrollable content area */}
        <main className="
          flex-1 overflow-y-auto
          px-4 py-6
          sm:px-6 lg:px-8
        ">
          {/* Max-width container keeps wide screens comfortable */}
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
