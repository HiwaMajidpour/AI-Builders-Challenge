/**
 * services/projectService.js
 * Mock project service with localStorage persistence.
 */

import { storage } from '../utils/storage';
import { MOCK_PROJECTS } from '../features/projects/data/mockProjects';

const PROJECTS_KEY = 'sf_projects';

/**
 * Simulate network latency.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function delay(ms = 600) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Generate a unique project ID.
 * @returns {string}
 */
function generateId() {
  return `project_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/**
 * Load projects from storage or seed default data.
 * @returns {Array}
 */
function loadProjects() {
  const projects = storage.get(PROJECTS_KEY);

  if (projects) {
    return projects;
  }

  const seeded = MOCK_PROJECTS.map((project) => ({
    ...project,
  }));

  storage.set(PROJECTS_KEY, seeded);

  return seeded;
}

/**
 * Save projects to storage.
 * @param {Array} projects
 */
function saveProjects(projects) {
  storage.set(PROJECTS_KEY, projects);
}

export const projectService = {
  /**
   * Get all projects.
   * @returns {Promise<Array>}
   */
  async getProjects() {
    await delay();

    return loadProjects().sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );
  },

  /**
   * Get a single project.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getProject(id) {
    await delay();

    const project = loadProjects().find((item) => item.id === id);

    if (!project) {
      throw new Error(`Project "${id}" not found.`);
    }

    return { ...project };
  },

  /**
   * Create a new project.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async createProject(data) {
    await delay();

    const projects = loadProjects();
    const now = new Date().toISOString();

    const project = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description?.trim() ?? '',
      category: data.category ?? 'Story',
      status: 'Draft',
      content: data.content ?? '',
      createdAt: now,
      updatedAt: now,
    };

    projects.unshift(project);

    saveProjects(projects);

    return { ...project };
  },

  /**
   * Update an existing project.
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updateProject(id, data) {
    await delay();

    const projects = loadProjects();

    const index = projects.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Project "${id}" not found.`);
    }

    projects[index] = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    saveProjects(projects);

    return { ...projects[index] };
  },

  /**
   * Delete a project.
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteProject(id) {
    await delay();

    const projects = loadProjects();

    const filtered = projects.filter((item) => item.id !== id);

    if (filtered.length === projects.length) {
      throw new Error(`Project "${id}" not found.`);
    }

    saveProjects(filtered);
  },

  /**
   * Duplicate an existing project.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async duplicateProject(id) {
    await delay();

    const projects = loadProjects();

    const original = projects.find((item) => item.id === id);

    if (!original) {
      throw new Error(`Project "${id}" not found.`);
    }

    const now = new Date().toISOString();

    const copy = {
      ...original,
      id: generateId(),
      title: `${original.title} (Copy)`,
      createdAt: now,
      updatedAt: now,
    };

    projects.unshift(copy);

    saveProjects(projects);

    return { ...copy };
  },

  /**
   * Search projects by title, description or category.
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async searchProjects(query) {
    await delay(250);

    const search = query.trim().toLowerCase();

    if (!search) {
      return this.getProjects();
    }

    return loadProjects().filter((project) => {
      return (
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.category.toLowerCase().includes(search)
      );
    });
  },
};