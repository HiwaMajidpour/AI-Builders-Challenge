/**
 * routes/AppRouter.jsx
 *
 * React Router v7 configuration.
 *
 * Route tree
 * ──────────────────────────────────────────────────────────
 *  /                → MainLayout  → LandingPage    (lazy)
 *  /dashboard       → DashboardLayout → DashboardPage (lazy)
 *  *                → NotFoundPage
 * ──────────────────────────────────────────────────────────
 *
 * Every page-level component is lazy-imported so Vite
 * automatically emits a separate chunk for each route.
 */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// ── Layouts (small — not worth splitting) ──────────────────
import MainLayout      from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// ── Lazy pages ─────────────────────────────────────────────
const LandingPage   = lazy(() => import('../features/landing/LandingPage'));
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));

// ── Fallback shown during every lazy load ──────────────────
function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="h-8 w-8 animate-spin-smooth rounded-full border-2 border-current border-r-transparent text-[var(--color-accent)]" />
    </div>
  );
}

function Lazy({ children }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

// ── 404 — inline, no chunk needed ─────────────────────────
function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="text-7xl font-bold text-[var(--color-text-muted)]">404</span>
      <p className="text-lg font-medium text-[var(--color-text-primary)]">Page not found</p>
      <p className="text-sm text-[var(--color-text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href={ROUTES.HOME}
        className="mt-2 text-sm text-[var(--color-accent)] underline-offset-4 hover:underline"
      >
        ← Back to home
      </a>
    </div>
  );
}

// ── Router definition ──────────────────────────────────────
const router = createBrowserRouter([
  // Public — wrapped in MainLayout (Navbar + Footer)
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Lazy>
            <LandingPage />
          </Lazy>
        ),
      },
    ],
  },

  // Dashboard — wrapped in DashboardLayout (Sidebar + top-bar)
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Lazy>
            <DashboardPage />
          </Lazy>
        ),
      },
    ],
  },

  // 404 catch-all
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);

// ── Provider component consumed by App.jsx ─────────────────
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
