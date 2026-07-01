/**
 * components/layout/MainLayout.jsx
 *
 * Public-facing shell used by all non-dashboard routes (Landing, etc.).
 *
 * Structure
 * ┌─────────────────────────────────┐
 * │  <header>  Navbar placeholder   │  sticky, blurred
 * ├─────────────────────────────────┤
 * │  <main>    <Outlet />           │  flex-1, scrollable
 * ├─────────────────────────────────┤
 * │  <footer>  Footer placeholder   │
 * └─────────────────────────────────┘
 */
import { Outlet } from 'react-router-dom';

// ── Navbar placeholder ────────────────────────────────────────────────────────
function NavbarPlaceholder() {
  return (
    <header className="
      sticky top-0 z-40
      h-16
      border-b border-slate-200 dark:border-slate-800
      bg-white/80 dark:bg-slate-950/80
      backdrop-blur-md
    ">
      <div className="
        mx-auto flex h-full max-w-7xl
        items-center justify-between
        px-4 sm:px-6 lg:px-8
      ">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-violet-600" />
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            StoryForge AI
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          {['Features', 'Pricing', 'Blog'].map((label) => (
            <span
              key={label}
              className="text-sm font-medium text-slate-500 hover:text-slate-900
                         dark:text-slate-400 dark:hover:text-slate-100
                         cursor-pointer transition-colors duration-150"
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 rounded-md bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-24 rounded-md bg-violet-600" />
        </div>
      </div>
    </header>
  );
}

// ── Footer placeholder ────────────────────────────────────────────────────────
function FooterPlaceholder() {
  return (
    <footer className="
      border-t border-slate-200 dark:border-slate-800
      bg-slate-50 dark:bg-slate-950
    ">
      <div className="
        mx-auto flex max-w-7xl
        flex-col items-center justify-between gap-4
        px-4 py-8
        sm:flex-row sm:px-6 lg:px-8
      ">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded bg-violet-600" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            StoryForge AI
          </span>
        </div>

        {/* Links row */}
        <div className="flex items-center gap-5">
          {['Privacy', 'Terms', 'Contact'].map((label) => (
            <span
              key={label}
              className="text-xs text-slate-400 hover:text-slate-600
                         dark:hover:text-slate-300
                         cursor-pointer transition-colors duration-150"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} StoryForge AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <NavbarPlaceholder />

      <main className="flex-1">
        <Outlet />
      </main>

      <FooterPlaceholder />
    </div>
  );
}
