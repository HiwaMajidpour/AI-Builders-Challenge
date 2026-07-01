/**
 * services/aiService.js
 * AI generation API calls — text, image, audio, history.
 */
import api from './api';

export const aiService = {
  /** POST /ai/generate/text → { id, result, tokens, createdAt } */
  async generateText(payload) {
    const { data } = await api.post('/ai/generate/text', payload);
    return data;
  },

  /** POST /ai/generate/image → { id, imageUrl, createdAt } */
  async generateImage(payload) {
    const { data } = await api.post('/ai/generate/image', payload);
    return data;
  },

  /** GET /ai/history?page&limit → { items, total, page } */
  async getHistory({ page = 1, limit = 20 } = {}) {
    const { data } = await api.get('/ai/history', { params: { page, limit } });
    return data;
  },

  /** DELETE /ai/history/:id */
  async deleteHistoryItem(id) {
    await api.delete(`/ai/history/${id}`);
  },

  /** GET /ai/models → [{ id, name, description, type }] */
  async listModels() {
    const { data } = await api.get('/ai/models');
    return data;
  },
};
