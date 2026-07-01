/**
 * constants/routes.js
 * Single source of truth for every application path.
 * Import ROUTES everywhere — never hardcode path strings.
 */

export const ROUTES = {
  // ── Public ──────────────────────────────────────────────
  HOME: '/',

  // ── Auth ────────────────────────────────────────────────
  LOGIN:            '/login',
  REGISTER:         '/register',
  FORGOT_PASSWORD:  '/forgot-password',

  // ── Protected ───────────────────────────────────────────
  DASHBOARD:  '/dashboard',
  AI_STUDIO:  '/dashboard/ai-studio',
  PROJECTS:   '/dashboard/projects',
  TEMPLATES:  '/dashboard/templates',

  // ── Misc ────────────────────────────────────────────────
  NOT_FOUND: '*',
};
