/**
 * contexts/TemplateContext.jsx
 * Manages template gallery state.
 * Favorites are persisted to localStorage; templates are loaded on demand.
 */
import { createContext, useCallback, useEffect, useReducer } from 'react';
import { templateService } from '../services/templateService';
import { storage }         from '../utils/storage';

const FAVORITES_KEY = 'sf_template_favorites';

// eslint-disable-next-line react-refresh/only-export-components
export const TemplateContext = createContext(null);

// ── Reducer ───────────────────────────────────────────────────────────────────
const initialState = {
  templates:        null,          // null = not yet loaded
  favorites:        storage.get(FAVORITES_KEY, []),  // string[] of favorite ids
  selectedTemplate: null,
  loading:          false,
  error:            null,
};

function templateReducer(state, action) {
  switch (action.type) {

    case 'LOAD_START':
      return { ...state, loading: true, error: null };

    case 'LOAD_SUCCESS':
      // Re-apply persisted favorites to the freshly loaded templates
      return {
        ...state,
        loading:   false,
        templates: action.payload.map((t) => ({
          ...t,
          favorite: state.favorites.includes(t.id),
        })),
      };

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SELECT_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };

    case 'TOGGLE_FAVORITE': {
      const id        = action.payload;
      const isFav     = state.favorites.includes(id);
      const favorites = isFav
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];

      const templates = (state.templates ?? []).map((t) =>
        t.id === id ? { ...t, favorite: !isFav } : t,
      );

      const selectedTemplate =
        state.selectedTemplate?.id === id
          ? { ...state.selectedTemplate, favorite: !isFav }
          : state.selectedTemplate;

      return { ...state, favorites, templates, selectedTemplate };
    }

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function TemplateProvider({ children }) {
  const [state, dispatch] = useReducer(templateReducer, initialState);

  // Persist favorites whenever they change
  useEffect(() => {
    storage.set(FAVORITES_KEY, state.favorites);
  }, [state.favorites]);

  // ── loadTemplates ─────────────────────────────────────────────────────────
  const loadTemplates = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const data = await templateService.getTemplates();
      dispatch({ type: 'LOAD_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message ?? 'Failed to load templates.' });
    }
  }, []);

  // ── selectTemplate ────────────────────────────────────────────────────────
  const selectTemplate = useCallback((template) => {
    dispatch({ type: 'SELECT_TEMPLATE', payload: template });
  }, []);

  // ── toggleFavorite ────────────────────────────────────────────────────────
  const toggleFavorite = useCallback(async (id) => {
    // Optimistic update — dispatch immediately, then sync with service
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    try {
      await templateService.toggleFavorite(id);
    } catch {
      // Rollback on failure
      dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    }
  }, []);

  // ── clearError ────────────────────────────────────────────────────────────
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <TemplateContext.Provider
      value={{
        ...state,
        loadTemplates,
        selectTemplate,
        toggleFavorite,
        clearError,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
