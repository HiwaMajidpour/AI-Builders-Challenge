/**
 * contexts/AIContext.jsx
 * Manages AI generation state: current result, history (persisted to localStorage),
 * loading state, and generation options.
 */
import { createContext, useCallback, useEffect, useReducer } from 'react';
import { aiService } from '../services/aiService';
import { storage }   from '../utils/storage';

const HISTORY_KEY  = 'sf_ai_history';
const MAX_HISTORY  = 10;

// eslint-disable-next-line react-refresh/only-export-components
export const AIContext = createContext(null);

/** Load persisted history once at boot (synchronous). */
function loadPersistedHistory() {
  return storage.get(HISTORY_KEY, []);
}

const initialState = {
  isGenerating:  false,
  currentResult: null,
  history:       loadPersistedHistory(),
  error:         null,
};

function aiReducer(state, action) {
  switch (action.type) {

    case 'GENERATE_START':
      return { ...state, isGenerating: true, error: null };

    case 'GENERATE_SUCCESS': {
      const next = [action.payload, ...state.history].slice(0, MAX_HISTORY);
      return {
        ...state,
        isGenerating:  false,
        currentResult: action.payload,
        history:       next,
      };
    }

    case 'GENERATE_ERROR':
      return { ...state, isGenerating: false, error: action.payload };

    case 'SET_CURRENT_RESULT':
      return { ...state, currentResult: action.payload };

    case 'DELETE_GENERATION': {
      const filtered = state.history.filter((item) => item.id !== action.payload);
      return {
        ...state,
        history:       filtered,
        currentResult: state.currentResult?.id === action.payload ? null : state.currentResult,
      };
    }

    case 'CLEAR_HISTORY':
      return { ...state, history: [], currentResult: null };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

export function AIProvider({ children }) {
  const [state, dispatch] = useReducer(aiReducer, initialState);

  // ── Persist history to localStorage whenever it changes ──────────────────
  useEffect(() => {
    storage.set(HISTORY_KEY, state.history);
  }, [state.history]);

  // ── generate({ prompt, type, tone, length, creativity }) ─────────────────
  const generate = useCallback(async (params) => {
    dispatch({ type: 'GENERATE_START' });
    try {
      const result = await aiService.generate(params);
      dispatch({ type: 'GENERATE_SUCCESS', payload: result });
      return result;
    } catch (err) {
      dispatch({ type: 'GENERATE_ERROR', payload: err.message ?? 'Generation failed.' });
      throw err;
    }
  }, []);

  // ── Load a history item into the result panel ─────────────────────────────
  const loadResult = useCallback((item) => {
    dispatch({ type: 'SET_CURRENT_RESULT', payload: item });
  }, []);

  // ── deleteGeneration(id) ──────────────────────────────────────────────────
  const deleteGeneration = useCallback((id) => {
    dispatch({ type: 'DELETE_GENERATION', payload: id });
  }, []);

  // ── clearHistory() ────────────────────────────────────────────────────────
  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AIContext.Provider
      value={{
        ...state,
        generate,
        loadResult,
        deleteGeneration,
        clearHistory,
        clearError,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}
