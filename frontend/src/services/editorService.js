/**
 * services/editorService.js
 * Mock editor service — stores documents in memory, seeded from mockDocuments.js.
 * Every method resolves after 700 ms to simulate network latency.
 */
import { MOCK_DOCUMENTS } from '../features/editor/data/mockDocuments';

let store = MOCK_DOCUMENTS.map((d) => ({ ...d }));

const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

function genId() {
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const editorService = {
  /** GET /documents */
  async getDocuments() {
    await delay();
    return store.map((d) => ({ ...d }));
  },

  /** GET /documents/:id */
  async getDocument(id) {
    await delay();
    const doc = store.find((d) => d.id === id);
    if (!doc) throw new Error(`Document "${id}" not found.`);
    return { ...doc };
  },

  /**
   * PUT /documents/:id
   * Saves/updates a document and returns the updated copy.
   */
  async saveDocument(document) {
    await delay(400);
    const idx = store.findIndex((d) => d.id === document.id);
    const now = new Date().toISOString();
    const wc  = countWords(document.content);
    if (idx === -1) {
      const saved = { ...document, updatedAt: now, wordCount: wc };
      store = [saved, ...store];
      return { ...saved };
    }
    store[idx] = { ...store[idx], ...document, updatedAt: now, wordCount: wc };
    return { ...store[idx] };
  },

  /** POST /documents — create blank document */
  async createDocument(data = {}) {
    await delay();
    const now = new Date().toISOString();
    const doc = {
      id:          genId(),
      title:       data.title ?? 'Untitled Story',
      genre:       data.genre ?? 'Fiction',
      content:     '',
      chapters:    [{ id: `ch_${Date.now()}`, title: 'Chapter One', wordCount: 0, order: 0 }],
      versions:    [],
      favorite:    false,
      wordCount:   0,
      readingTime: 0,
      updatedAt:   now,
      createdAt:   now,
    };
    store = [doc, ...store];
    return { ...doc };
  },

  /** DELETE /documents/:id */
  async deleteDocument(id) {
    await delay();
    const before = store.length;
    store = store.filter((d) => d.id !== id);
    if (store.length === before) throw new Error(`Document "${id}" not found.`);
  },

  /**
   * POST /documents/:id/export
   * Returns a mock export payload.
   */
  async exportDocument(id, format) {
    await delay(600);
    const doc = store.find((d) => d.id === id);
    if (!doc) throw new Error(`Document "${id}" not found.`);
    return {
      id,
      format,
      filename: `${doc.title.replace(/\s+/g, '-').toLowerCase()}.${format === 'epub' ? 'epub' : format}`,
      content:  doc.content,
    };
  },
};
