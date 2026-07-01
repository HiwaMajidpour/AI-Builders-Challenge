/**
 * services/authService.js
 * All authentication-related API calls.
 */
import api from './api';

export const authService = {
  /** POST /auth/login → { token, refreshToken, user } */
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  /** POST /auth/register → { token, refreshToken, user } */
  async register(payload) {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },

  /** POST /auth/logout */
  async logout() {
    await api.post('/auth/logout');
  },

  /** POST /auth/forgot-password */
  async forgotPassword(email) {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  /** POST /auth/reset-password */
  async resetPassword(payload) {
    const { data } = await api.post('/auth/reset-password', payload);
    return data;
  },

  /** GET /auth/me → user profile */
  async getMe() {
    const { data } = await api.get('/auth/me');
    return data;
  },
};
