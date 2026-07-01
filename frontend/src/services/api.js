/**
 * services/api.js
 * Axios instance with request/response interceptors.
 * - Attaches Authorization header from storage on every request.
 * - On 401, clears tokens and redirects to login.
 */
import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT_MS, STORAGE_KEYS } from '../config';
import { storage } from '../utils/storage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor ───────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      storage.remove(STORAGE_KEYS.USER);
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

export default api;
