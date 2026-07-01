/**
 * services/projectService.js
 * Mock project service — stores projects in memory, seeded from mockProjects.js.
 * Every method resolves after 600 ms to simulate network latency.
 * Swap each method body for a real API call (api.get / api.post / …) when ready.
 */
import { MOCK_PROJECTS } from '../features/projects/data/mockProjects';

// ── In-memory store ───────────────────────────────────────────────────────────
let store = MOCK_PROJECTS.map((p) => ({ ...p }));

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

function genId() {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const projectService = {
  /** GET /projects → Project[] */
  async getProjects() {
    await delay();
    return store.map((p) => ({ ...p }));
  },

  /** GET /projects/:id → Project */
  async getProject(id) {
    await delay();
    const project = store.find((p) => p.id === id);
    if (!project) throw new Error(`Project "${id}" not found.`);
    return { ...project };
  },

  /**
   * POST /projects
   * data: { title, genre, description }
   * → Project
   */
  async createProject(data) {
    await delay();
    const now = new Date().toISOString();
    const project = {
      id:          genId(),
      title:       data.title.trim(),
      genre:       data.genre,
      description: (data.description ?? '').trim(),
      status:      'Draft',
      progress:    0,
      wordCount:   0,
      coverColor:  data.coverColor ?? '#6d28d9',
      createdAt:   now,
      updatedAt:   now,
    };
    store = [project, ...store];
    return { ...project };
  },

  /**
   * PATCH /projects/:id
   * data: Partial<Project>
   * → Project
   */
  async updateProject(id, data) {
    await delay();
    const idx = store.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Project "${id}" not found.`);
    store[idx] = { ...store[idx], ...data, updatedAt: new Date().toISOString() };
    return { ...store[idx] };
  },

  /** DELETE /projects/:id */
  async deleteProject(id) {
    await delay();
    const before = store.length;
    store = store.filter((p) => p.id !== id);
    if (store.length === before) throw new Error(`Project "${id}" not found.`);
  },
};
