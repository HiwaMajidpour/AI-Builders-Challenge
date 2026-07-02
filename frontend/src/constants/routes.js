/**
 * constants/routes.js
 * ------------------------------------------------------------------
 * Centralized application routes.
 * Import ROUTES everywhere instead of hardcoding path strings.
 * ------------------------------------------------------------------
 */

export const ROUTES = {
  // ──────────────────────────────────────────────────────────
  // Public
  // ──────────────────────────────────────────────────────────
  HOME: '/',

  // ──────────────────────────────────────────────────────────
  // Authentication
  // ──────────────────────────────────────────────────────────
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // ──────────────────────────────────────────────────────────
  // Dashboard
  // ──────────────────────────────────────────────────────────
  DASHBOARD: '/dashboard',

  AI_STUDIO: '/dashboard/ai-studio',
  PROJECTS: '/dashboard/projects',
  TEMPLATES: '/dashboard/templates',
  EDITOR: '/dashboard/editor',

  // ──────────────────────────────────────────────────────────
  // Settings
  // ──────────────────────────────────────────────────────────
  SETTINGS: '/dashboard/settings',

  PROFILE_SETTINGS: '/dashboard/settings/profile',
  ACCOUNT_SETTINGS: '/dashboard/settings/account',
  APPEARANCE_SETTINGS: '/dashboard/settings/appearance',
  NOTIFICATION_SETTINGS: '/dashboard/settings/notifications',
  SECURITY_SETTINGS: '/dashboard/settings/security',
  BILLING_SETTINGS: '/dashboard/settings/billing',

  // ──────────────────────────────────────────────────────────
  // Fallback
  // ──────────────────────────────────────────────────────────
  NOT_FOUND: '*',
};