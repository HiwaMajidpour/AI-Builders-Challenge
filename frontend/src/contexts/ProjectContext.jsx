/**
 * contexts/ProjectContext.jsx
 * Manages project state and connects the UI to the mock project service.
 */

import { createContext, useCallback, useEffect, useReducer } from 'react';
import { projectService } from '../services/projectService';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'sf_projects';

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext(null);

// ─────────────────────────────────────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────────────────────────────────────

const initialState = {
  projects: storage.get(STORAGE_KEY, null),
  currentProject: null,
  loading: false,
  error: null,
};

function projectReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };

    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        loading: false,
        projects: [action.payload, ...(state.projects ?? [])],
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        loading: false,
        projects: (state.projects ?? []).map((project) =>
          project.id === action.payload.id
            ? action.payload
            : project
        ),
        currentProject:
          state.currentProject?.id === action.payload.id
            ? action.payload
            : state.currentProject,
      };

    case 'REMOVE_PROJECT': {
      const filtered = (state.projects ?? []).filter(
        (project) => project.id !== action.payload
      );

      return {
        ...state,
        loading: false,
        projects: filtered,
        currentProject:
          state.currentProject?.id === action.payload
            ? null
            : state.currentProject,
      };
    }

    case 'SELECT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Persist projects whenever they change.
  useEffect(() => {
    if (state.projects !== null) {
      storage.set(STORAGE_KEY, state.projects);
    }
  }, [state.projects]);

  // Load all projects.
  const loadProjects = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });

    try {
      const projects = await projectService.getProjects();

      dispatch({
        type: 'LOAD_SUCCESS',
        payload: projects,
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_ERROR',
        payload: error.message ?? 'Failed to load projects.',
      });
    }
  }, []);

  // Reload the project list.
  const refreshProjects = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

  // Create a new project.
  const createProject = useCallback(async (data) => {
    dispatch({ type: 'LOAD_START' });

    try {
      const project = await projectService.createProject(data);

      dispatch({
        type: 'ADD_PROJECT',
        payload: project,
      });

      return project;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message ?? 'Failed to create project.',
      });

      throw error;
    }
  }, []);

  // Update an existing project.
  const updateProject = useCallback(async (id, data) => {
    dispatch({ type: 'LOAD_START' });

    try {
      const project = await projectService.updateProject(id, data);

      dispatch({
        type: 'UPDATE_PROJECT',
        payload: project,
      });

      return project;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message ?? 'Failed to update project.',
      });

      throw error;
    }
  }, []);

  // Delete a project.
  const deleteProject = useCallback(async (id) => {
    dispatch({ type: 'LOAD_START' });

    try {
      await projectService.deleteProject(id);

      dispatch({
        type: 'REMOVE_PROJECT',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message ?? 'Failed to delete project.',
      });

      throw error;
    }
  }, []);

  // Duplicate an existing project.
  const duplicateProject = useCallback(async (id) => {
    try {
      const project = await projectService.getProject(id);

      const duplicated = await projectService.createProject({
        ...project,
        title: `${project.title} (Copy)`,
      });

      dispatch({
        type: 'ADD_PROJECT',
        payload: duplicated,
      });

      return duplicated;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message ?? 'Failed to duplicate project.',
      });

      throw error;
    }
  }, []);

  // Search projects locally.
  const searchProjects = useCallback(
    (query) => {
      const keyword = query.trim().toLowerCase();

      if (!keyword) {
        return state.projects ?? [];
      }

      return (state.projects ?? []).filter((project) => {
        return (
          project.title.toLowerCase().includes(keyword) ||
          (project.description ?? '')
            .toLowerCase()
            .includes(keyword) ||
          (project.genre ?? '').toLowerCase().includes(keyword)
        );
      });
    },
    [state.projects]
  );

  // Select the active project.
  const selectProject = useCallback((project) => {
    dispatch({
      type: 'SELECT_PROJECT',
      payload: project,
    });
  }, []);

  // Clear the current error.
  const clearError = useCallback(() => {
    dispatch({
      type: 'CLEAR_ERROR',
    });
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        loadProjects,
        refreshProjects,
        createProject,
        updateProject,
        deleteProject,
        duplicateProject,
        searchProjects,
        selectProject,
        clearError,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}