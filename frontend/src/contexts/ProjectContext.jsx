/**
 * contexts/ProjectContext.jsx
 * Manages project list state with localStorage persistence and hydration.
 */
import { createContext, useCallback, useEffect, useReducer } from 'react';
import { projectService } from '../services/projectService';
import { storage }        from '../utils/storage';

const STORAGE_KEY = 'sf_projects';

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext(null);

// ── Reducer ───────────────────────────────────────────────────────────────────
const initialState = {
  projects:       storage.get(STORAGE_KEY, null),  // null = not yet loaded
  currentProject: null,
  loading:        false,
  error:          null,
};

function projectReducer(state, action) {
  switch (action.type) {

    case 'LOAD_START':
      return { ...state, loading: true, error: null };

    case 'LOAD_SUCCESS':
      return { ...state, loading: false, projects: action.payload };

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [action.payload, ...(state.projects ?? [])],
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: (state.projects ?? []).map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
        currentProject:
          state.currentProject?.id === action.payload.id
            ? action.payload
            : state.currentProject,
      };

    case 'REMOVE_PROJECT': {
      const filtered = (state.projects ?? []).filter((p) => p.id !== action.payload);
      return {
        ...state,
        projects:       filtered,
        currentProject: state.currentProject?.id === action.payload ? null : state.currentProject,
      };
    }

    case 'SELECT_PROJECT':
      return { ...state, currentProject: action.payload };

    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Persist projects on every change
  useEffect(() => {
    if (state.projects !== null) {
      storage.set(STORAGE_KEY, state.projects);
    }
  }, [state.projects]);

  // ── loadProjects ─────────────────────────────────────────────────────────
  const loadProjects = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const data = await projectService.getProjects();
      dispatch({ type: 'LOAD_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message ?? 'Failed to load projects.' });
    }
  }, []);

  // ── createProject ────────────────────────────────────────────────────────
  const createProject = useCallback(async (data) => {
    dispatch({ type: 'LOAD_START' });
    try {
      const project = await projectService.createProject(data);
      dispatch({ type: 'ADD_PROJECT', payload: project });
      return project;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message ?? 'Failed to create project.' });
      throw err;
    }
  }, []);

  // ── updateProject ────────────────────────────────────────────────────────
  const updateProject = useCallback(async (id, data) => {
    dispatch({ type: 'LOAD_START' });
    try {
      const project = await projectService.updateProject(id, data);
      dispatch({ type: 'UPDATE_PROJECT', payload: project });
      return project;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message ?? 'Failed to update project.' });
      throw err;
    }
  }, []);

  // ── deleteProject ────────────────────────────────────────────────────────
  const deleteProject = useCallback(async (id) => {
    dispatch({ type: 'LOAD_START' });
    try {
      await projectService.deleteProject(id);
      dispatch({ type: 'REMOVE_PROJECT', payload: id });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message ?? 'Failed to delete project.' });
      throw err;
    }
  }, []);

  // ── selectProject ─────────────────────────────────────────────────────────
  const selectProject = useCallback((project) => {
    dispatch({ type: 'SELECT_PROJECT', payload: project });
  }, []);

  // ── clearError ────────────────────────────────────────────────────────────
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        loadProjects,
        createProject,
        updateProject,
        deleteProject,
        selectProject,
        clearError,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
