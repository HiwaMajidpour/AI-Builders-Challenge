/**
 * services/templateService.js
 * Mock template service — stores templates in memory, seeded from mockTemplates.js.
 * Every method resolves after 500 ms to simulate network latency.
 * Swap each method body for a real API call when a backend is available.
 */
import { MOCK_TEMPLATES } from '../features/templates/data/mockTemplates';

// ── In-memory store ───────────────────────────────────────────────────────────
let store = MOCK_TEMPLATES.map((t) => ({ ...t }));

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ── Service ───────────────────────────────────────────────────────────────────
export const templateService = {
  /** GET /templates → Template[] */
  async getTemplates() {
    await delay();
    return store.map((t) => ({ ...t }));
  },

  /** GET /templates/:id → Template */
  async getTemplate(id) {
    await delay();
    const template = store.find((t) => t.id === id);
    if (!template) throw new Error(`Template "${id}" not found.`);
    return { ...template };
  },

  /**
   * POST /templates/:id/favorite
   * Toggles the favorite flag and returns the updated template.
   */
  async toggleFavorite(id) {
    await delay();
    const idx = store.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Template "${id}" not found.`);
    store[idx] = { ...store[idx], favorite: !store[idx].favorite };
    return { ...store[idx] };
  },
};
