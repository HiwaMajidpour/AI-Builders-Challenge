/**
 * contexts/ProjectContext.jsx
 * Global project state.
 */

import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';

import { projectService } from '../services/projectService';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'sf_projects';

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext(null);

const initialState = {
  projects: storage.get(STORAGE_KEY, []),
  currentProject: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
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
        projects: Array.isArray(action.payload)
          ? action.payload
          : [],
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

    case 'REMOVE_PROJECT':
      return {
        ...state,
        loading: false,
        projects: (state.projects ?? []).filter(
          (project) => project.id !== action.payload
        ),
        currentProject:
          state.currentProject?.id === action.payload
            ? null
            : state.currentProject,
      };

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

export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist projects whenever they change
  useEffect(() => {
    storage.set(STORAGE_KEY, state.projects ?? []);
  }, [state.projects]);

  const loadProjects = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });

    try {
      const projects = await projectService.getProjects();

      dispatch({
        type: 'LOAD_SUCCESS',
        payload: Array.isArray(projects) ? projects : [],
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_ERROR',
        payload: error.message || 'Failed to load projects.',
      });
    }
  }, []);

  // Load projects on initial mount
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const refreshProjects = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

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
        payload: error.message || 'Failed to create project.',
      });

      throw error;
    }
  }, []);

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
        payload: error.message || 'Failed to update project.',
      });

      throw error;
    }
  }, []);

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
        payload: error.message || 'Failed to delete project.',
      });

      throw error;
    }
  }, []);

  const duplicateProject = useCallback(async (id) => {
    dispatch({ type: 'LOAD_START' });

    try {
      const duplicated =
        await projectService.duplicateProject(id);

      dispatch({
        type: 'ADD_PROJECT',
        payload: duplicated,
      });

      return duplicated;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Failed to duplicate project.',
      });

      throw error;
    }
  }, []);

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
          (project.genre ?? '')
            .toLowerCase()
            .includes(keyword)
        );
      });
    },
    [state.projects]
  );

  const selectProject = useCallback((project) => {
    dispatch({
      type: 'SELECT_PROJECT',
      payload: project,
    });
  }, []);

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