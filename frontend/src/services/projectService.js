/**
 * services/projectService.js
 * Mock project service with localStorage persistence.
 */

import { storage } from '../utils/storage';
import { activityService } from './activityService';
import { MOCK_PROJECTS } from '../features/projects/data/mockProjects';

const PROJECTS_KEY = 'sf_projects';

/**
 * Simulate network latency.
 */
function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate unique project id.
 */
function generateId() {
  return `project_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/**
 * Load projects from storage or seed defaults.
 */
function loadProjects() {
  const projects = storage.get(PROJECTS_KEY);

  if (Array.isArray(projects)) {
    return projects;
  }

  const seeded = MOCK_PROJECTS.map((project) => ({
    ...project,
  }));

  storage.set(PROJECTS_KEY, seeded);

  return seeded;
}

/**
 * Save projects.
 */
function saveProjects(projects) {
  storage.set(PROJECTS_KEY, projects);
}

export const projectService = {
  /**
   * Get all projects.
   */
  async getProjects() {
    await delay();

    return [...loadProjects()].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );
  },

  /**
   * Get one project.
   */
  async getProject(id) {
    await delay();

    const project = loadProjects().find((p) => p.id === id);

    if (!project) {
      throw new Error(`Project "${id}" not found.`);
    }

    return { ...project };
  },

  /**
 * Create project.
 */
  async createProject(data) {
    await delay();

    const projects = loadProjects();
    const now = new Date().toISOString();

    const project = {
      id: generateId(),

      title: data.title.trim(),
      genre: data.genre,
      description: data.description?.trim() ?? '',

      status: data.status ?? 'Draft',
      progress: data.progress ?? 0,
      wordCount: data.wordCount ?? 0,

      coverColor: data.coverColor ?? '#6d28d9',

      createdAt: now,
      updatedAt: now,
    };

    projects.unshift(project);

    saveProjects(projects);

    activityService.logProjectCreated(project);

    return { ...project };
  },

  /**
   * Update project.
   */
  async updateProject(id, data) {
    await delay();

    const projects = loadProjects();

    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error(`Project "${id}" not found.`);
    }

    projects[index] = {
      ...projects[index],

      title: data.title?.trim() ?? projects[index].title,
      genre: data.genre ?? projects[index].genre,
      description:
        data.description ?? projects[index].description,

      status: data.status ?? projects[index].status,
      progress: data.progress ?? projects[index].progress,
      wordCount: data.wordCount ?? projects[index].wordCount,

      coverColor:
        data.coverColor ?? projects[index].coverColor,

      updatedAt: new Date().toISOString(),
    };

    saveProjects(projects);

    activityService.logProjectUpdated(projects[index]);

    return { ...projects[index] };
  },

  /**
   * Delete project.
   */
  async deleteProject(id) {
    await delay();

    const projects = loadProjects();

    const project = projects.find((p) => p.id === id);

    const filtered = projects.filter((p) => p.id !== id);

    if (filtered.length === projects.length) {
      throw new Error(`Project "${id}" not found.`);
    }

    activityService.logProjectDeleted(project.title);

    saveProjects(filtered);
  },

  /**
 * Duplicate project.
 */
  async duplicateProject(id) {
    await delay();

    const projects = loadProjects();

    const original = projects.find((p) => p.id === id);

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

    activityService.logProjectDuplicated(copy);

    return { ...copy };
  },

  /**
   * Search projects.
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
        project.genre.toLowerCase().includes(search)
      );
    });
  },
};