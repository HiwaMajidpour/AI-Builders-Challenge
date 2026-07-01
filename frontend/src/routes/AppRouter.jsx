/**
 * routes/AppRouter.jsx
 *
 * React Router v7 — BrowserRouter-based application routing.
 *
 * Route tree
 * ─────────────────────────────────────────────────────────────────
 *  MainLayout  (public shell — Navbar + Footer)
 *  └─ /                  →  LandingPage            (lazy)
 *
 *  AuthLayout  (centred card shell)
 *  ├─ /login             →  LoginPage              (lazy)
 *  ├─ /register          →  RegisterPage           (lazy)
 *  └─ /forgot-password   →  ForgotPasswordPage     (lazy)
 *
 *  DashboardLayout  (sidebar + top-bar shell)
 *  └─ /dashboard         →  DashboardPage          (lazy)
 *
 *  /anything-else        →  NotFoundPage           (inline)
 * ─────────────────────────────────────────────────────────────────
 *
 * Every page is React.lazy() so Vite emits a separate JS chunk
 * per route — no page code ships until the route is visited.
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// ── Layouts — eager (always needed, tiny, no benefit splitting) ──
import MainLayout      from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// ── Auth layout — inline (no external deps) ─────────────────────
function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      {/* Back-to-home link */}
      <Link
        to={ROUTES.HOME}
        className="mb-8 flex items-center gap-2 text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600 text-white text-xs">✦</span>
        StoryForge AI
      </Link>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
}

// ── Lazy page imports ────────────────────────────────────────────
const LandingPage        = lazy(() => import('../features/landing/LandingPage'));
const LoginPage          = lazy(() => import('../features/auth/LoginPage'));
const RegisterPage       = lazy(() => import('../features/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/ForgotPasswordPage'));
const DashboardPage      = lazy(() => import('../features/dashboard/DashboardPage'));
const AIStudioPage       = lazy(() => import('../features/ai/AIStudioPage'));
const ProjectsPage       = lazy(() => import('../features/projects/ProjectsPage'));
const TemplatesPage      = lazy(() => import('../features/templates/TemplatesPage'));

// ── Suspense fallback ────────────────────────────────────────────
function PageFallback() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-screen items-center justify-center"
    >
      <span
        className="
          h-9 w-9 rounded-full
          border-[3px] border-violet-200
          border-t-violet-600
          animate-spin
        "
      />
    </div>
  );
}

/**
 * Wraps a lazily-imported page in Suspense.
 * Use: <Lazy><SomePage /></Lazy>
 */
function Lazy({ children }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

// ── 404 Not Found ────────────────────────────────────────────────
// Kept inline — it's tiny and always bundled with the shell.
function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-8 text-center">
      <span className="text-8xl font-black leading-none tracking-tighter text-slate-200 dark:text-slate-800 select-none">
        404
      </span>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Page not found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        to={ROUTES.HOME}
        className="
          mt-1 inline-flex items-center gap-1.5 rounded-lg
          bg-violet-600 px-4 py-2.5
          text-sm font-medium text-white
          transition-colors hover:bg-violet-700
        "
      >
        ← Back to home
      </Link>
    </div>
  );
}

// ── Router ───────────────────────────────────────────────────────
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public routes — MainLayout ── */}
        <Route element={<MainLayout />}>
          <Route
            index
            element={<Lazy><LandingPage /></Lazy>}
          />
        </Route>

        {/* ── Auth routes — AuthLayout ── */}
        <Route element={<AuthLayout />}>
          <Route
            path={ROUTES.LOGIN}
            element={<Lazy><LoginPage /></Lazy>}
          />
          <Route
            path={ROUTES.REGISTER}
            element={<Lazy><RegisterPage /></Lazy>}
          />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<Lazy><ForgotPasswordPage /></Lazy>}
          />
        </Route>

        {/* ── Protected routes — DashboardLayout ── */}
        <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
          <Route
            index
            element={<Lazy><DashboardPage /></Lazy>}
          />
          <Route
            path="ai-studio"
            element={<Lazy><AIStudioPage /></Lazy>}
          />
          <Route
            path="projects"
            element={<Lazy><ProjectsPage /></Lazy>}
          />
          <Route
            path="templates"
            element={<Lazy><TemplatesPage /></Lazy>}
          />
        </Route>

        {/* ── 404 catch-all ── */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}
