/**
 * services/authService.js
 *
 * Mock authentication service — simulates real API latency (800 ms).
 * Returns fake JWT tokens and user objects so the rest of the app
 * can be developed / tested without a running backend.
 *
 * Drop-in replacement: swap the mock* implementations for real
 * api.post() calls when the backend is ready.
 */

const MOCK_DELAY = 800;

/** Pause for MOCK_DELAY ms */
function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Deterministic fake JWT — NOT cryptographically valid */
function makeFakeJwt(userId) {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 h
  }));
  const sig = btoa(`mock-signature-${userId}`);
  return `${header}.${payload}.${sig}`;
}

/** In-memory "database" — seeded with one demo account */
const MOCK_DB = {
  users: [
    {
      id:        'usr_demo_001',
      name:      'Demo User',
      email:     'demo@storyforge.ai',
      // bcrypt hash of "Password1" (shown only for developer reference)
      password:  'Password1',
      avatar:    null,
      plan:      'pro',
      createdAt: '2024-01-15T10:00:00.000Z',
    },
  ],

  findByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  },

  findById(id) {
    return this.users.find((u) => u.id === id) ?? null;
  },

  create({ name, email, password }) {
    const newUser = {
      id:        `usr_${Date.now()}`,
      name,
      email,
      password,
      avatar:    null,
      plan:      'free',
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  },
};

/** Strip password before returning user to the client */
function sanitize(userRecord) {
  // eslint-disable-next-line no-unused-vars
  const { password, ...safeUser } = userRecord;
  return safeUser;
}

// ─────────────────────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Simulate POST /auth/login
   * @param {{ email: string, password: string }} credentials
   * @returns {{ token: string, refreshToken: string, user: object }}
   */
  async login({ email, password }) {
    await delay();

    const found = MOCK_DB.findByEmail(email);

    if (!found || found.password !== password) {
      const err = new Error('Invalid email or password.');
      err.code  = 'INVALID_CREDENTIALS';
      throw err;
    }

    return {
      token:        makeFakeJwt(found.id),
      refreshToken: makeFakeJwt(`refresh_${found.id}`),
      user:         sanitize(found),
    };
  },

  /**
   * Simulate POST /auth/register
   * @param {{ name: string, email: string, password: string }} payload
   * @returns {{ token: string, refreshToken: string, user: object }}
   */
  async register({ name, email, password }) {
    await delay();

    if (MOCK_DB.findByEmail(email)) {
      const err = new Error('An account with this email already exists.');
      err.code  = 'EMAIL_TAKEN';
      throw err;
    }

    const newUser = MOCK_DB.create({ name, email, password });

    return {
      token:        makeFakeJwt(newUser.id),
      refreshToken: makeFakeJwt(`refresh_${newUser.id}`),
      user:         sanitize(newUser),
    };
  },

  /**
   * Simulate POST /auth/logout
   * Server-side token revocation — no-op in mock.
   */
  async logout() {
    await delay(300);
  },

  /**
   * Simulate POST /auth/forgot-password
   * @param {string} email
   * @returns {{ message: string }}
   */
  async forgotPassword(email) {
    await delay();

    // We intentionally do NOT reveal whether the email exists (security).
    void email;

    return {
      message: 'If an account with that email exists, a reset link has been sent.',
    };
  },

  /**
   * Simulate GET /auth/me — validates a stored token on mount.
   * Decodes the fake JWT payload to look up the user in mock DB.
   * @param {string} token
   * @returns {object} sanitized user
   */
  async getMe(token) {
    await delay(300);

    try {
      const [, payloadB64] = token.split('.');
      const { sub } = JSON.parse(atob(payloadB64));
      const found   = MOCK_DB.findById(sub);

      if (!found) throw new Error('User not found.');

      return sanitize(found);
    } catch {
      const err = new Error('Token is invalid or expired.');
      err.code  = 'INVALID_TOKEN';
      throw err;
    }
  },
};
