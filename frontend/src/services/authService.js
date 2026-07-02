/**
 * services/authService.js
 *
 * Mock authentication service with persistent session support.
 * Simulates a backend API while storing the authenticated session
 * in LocalStorage.
 */

const MOCK_DELAY = 800;

const TOKEN_KEY = 'sf_token';
const REFRESH_TOKEN_KEY = 'sf_refresh_token';
const USER_KEY = 'sf_user';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeFakeJwt(userId) {
  const header = btoa(
    JSON.stringify({
      alg: 'HS256',
      typ: 'JWT',
    })
  );

  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    })
  );

  const signature = btoa(`mock-signature-${userId}`);

  return `${header}.${payload}.${signature}`;
}

/* -------------------------------------------------------------------------- */
/* Mock Database                                                              */
/* -------------------------------------------------------------------------- */

const MOCK_DB = {
  users: [
    {
      id: 'usr_demo_001',
      name: 'Demo User',
      email: 'demo@storyforge.ai',
      password: 'Password1',
      avatar: null,
      plan: 'pro',
      createdAt: '2024-01-15T10:00:00.000Z',
    },
  ],

  findByEmail(email) {
    return (
      this.users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()
      ) ?? null
    );
  },

  findById(id) {
    return this.users.find((user) => user.id === id) ?? null;
  },

  create({ name, email, password }) {
    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      avatar: null,
      plan: 'free',
      createdAt: new Date().toISOString(),
    };

    this.users.push(user);

    return user;
  },
};

function sanitize(user) {
  // eslint-disable-next-line no-unused-vars
  const { password, ...safeUser } = user;

  return safeUser;
}

/* -------------------------------------------------------------------------- */
/* Auth Service                                                               */
/* -------------------------------------------------------------------------- */

export const authService = {
  saveSession(session) {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      session.refreshToken
    );
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getStoredSession() {
    const token = localStorage.getItem(TOKEN_KEY);
    const refreshToken = localStorage.getItem(
      REFRESH_TOKEN_KEY
    );

    const rawUser = localStorage.getItem(USER_KEY);

    return {
      token,
      refreshToken,
      user: rawUser ? JSON.parse(rawUser) : null,
    };
  },

  async login({ email, password }) {
    await delay();

    const found = MOCK_DB.findByEmail(email);

    if (!found || found.password !== password) {
      const error = new Error('Invalid email or password.');
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    const session = {
      token: makeFakeJwt(found.id),
      refreshToken: makeFakeJwt(`refresh_${found.id}`),
      user: sanitize(found),
    };

    this.saveSession(session);

    return session;
  },

  async register({ name, email, password }) {
    await delay();

    if (MOCK_DB.findByEmail(email)) {
      const error = new Error(
        'An account with this email already exists.'
      );

      error.code = 'EMAIL_TAKEN';

      throw error;
    }

    const user = MOCK_DB.create({
      name,
      email,
      password,
    });

    const session = {
      token: makeFakeJwt(user.id),
      refreshToken: makeFakeJwt(`refresh_${user.id}`),
      user: sanitize(user),
    };

    this.saveSession(session);

    return session;
  },

  async logout() {
    await delay(300);

    this.clearSession();
  },

  async forgotPassword(email) {
    await delay();

    void email;

    return {
      message:
        'If an account with that email exists, a reset link has been sent.',
    };
  },

  async getMe(token) {
    await delay(300);

    try {
      const [, payload] = token.split('.');

      const { sub } = JSON.parse(atob(payload));

      const user = MOCK_DB.findById(sub);

      if (!user) {
        throw new Error();
      }

      return sanitize(user);
    } catch {
      this.clearSession();

      const error = new Error(
        'Token is invalid or expired.'
      );

      error.code = 'INVALID_TOKEN';

      throw error;
    }
  },
};