/**
 * Application-wide configuration derived from Vite environment variables.
 * All VITE_* variables are injected at build-time by Vite.
 */

export const APP_NAME = 'StoryForge AI';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export const AI_API_BASE_URL =
  import.meta.env.VITE_AI_API_BASE_URL ?? 'http://localhost:8000/api/ai';

export const ENV = import.meta.env.MODE; // 'development' | 'production' | 'test'

export const IS_DEV = ENV === 'development';
export const IS_PROD = ENV === 'production';

/** Axios request timeout in milliseconds */
export const REQUEST_TIMEOUT_MS = 30_000;

/** Milliseconds to debounce search / AI prompt inputs */
export const DEBOUNCE_DELAY_MS = 400;

/** Local-storage keys — centralised to avoid typos */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'sf_auth_token',
  REFRESH_TOKEN: 'sf_refresh_token',
  THEME: 'sf_theme',
  USER: 'sf_user',
};
