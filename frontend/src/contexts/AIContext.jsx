/**
 * contexts/AIContext.jsx
 * Manages AI generation state:
 * - current result
 * - generation history
 * - prompt history
 * - loading state
 * - persistence with localStorage
 */

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import { aiService } from '../services/aiService';
import { storage } from '../utils/storage';

const HISTORY_KEY = 'sf_ai_history';
const PROMPT_HISTORY_KEY = 'sf_prompt_history';

const MAX_HISTORY = 10;
const MAX_PROMPTS = 20;

// eslint-disable-next-line react-refresh/only-export-components
export const AIContext = createContext(null);

function loadPersistedHistory() {
  return storage.get(HISTORY_KEY, []);
}

function loadPromptHistory() {
  return storage.get(PROMPT_HISTORY_KEY, []);
}

const initialState = {
  isGenerating: false,
  currentResult: null,
  history: loadPersistedHistory(),
  promptHistory: loadPromptHistory(),
  error: null,
};

function aiReducer(state, action) {
  switch (action.type) {
    case 'GENERATE_START':
      return {
        ...state,
        isGenerating: true,
        error: null,
      };

    case 'GENERATE_SUCCESS': {
      const history = [action.payload, ...state.history].slice(
        0,
        MAX_HISTORY
      );

      return {
        ...state,
        isGenerating: false,
        currentResult: action.payload,
        history,
      };
    }

    case 'GENERATE_ERROR':
      return {
        ...state,
        isGenerating: false,
        error: action.payload,
      };

    case 'SET_CURRENT_RESULT':
      return {
        ...state,
        currentResult: action.payload,
      };

    case 'ADD_PROMPT_HISTORY': {
      const prompts = [
        action.payload,
        ...state.promptHistory.filter(
          (item) => item.prompt !== action.payload.prompt
        ),
      ].slice(0, MAX_PROMPTS);

      return {
        ...state,
        promptHistory: prompts,
      };
    }

    case 'TOGGLE_PIN_GENERATION': {
      const history = state.history.map((item) =>
        item.id === action.payload
          ? {
            ...item,
            pinned: !item.pinned,
          }
          : item
      );

      return {
        ...state,
        history,
        currentResult:
          state.currentResult?.id === action.payload
            ? history.find((item) => item.id === action.payload) ?? null
            : state.currentResult,
      };
    }

    case 'DELETE_GENERATION': {
      const history = state.history.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        history,
        currentResult:
          state.currentResult?.id === action.payload
            ? null
            : state.currentResult,
      };
    }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
        currentResult: null,
      };

    case 'CLEAR_PROMPT_HISTORY':
      return {
        ...state,
        promptHistory: [],
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

export function AIProvider({ children }) {
  const [state, dispatch] = useReducer(aiReducer, initialState);

  // Persist generation history
  useEffect(() => {
    storage.set(HISTORY_KEY, state.history);
  }, [state.history]);

  // Persist prompt history
  useEffect(() => {
    storage.set(PROMPT_HISTORY_KEY, state.promptHistory);
  }, [state.promptHistory]);

  const generate = useCallback(async (params) => {
    dispatch({ type: 'GENERATE_START' });

    dispatch({
      type: 'ADD_PROMPT_HISTORY',
      payload: {
        id: Date.now().toString(),
        prompt: params.prompt,
        options: {
          type: params.type,
          tone: params.tone,
          length: params.length,
          creativity: params.creativity,
        },
        createdAt: new Date().toISOString(),
      },
    });

    try {
      const result = await aiService.generate(params);

      // Initialize pin state for new generations
      result.pinned ??= false;

      dispatch({
        type: 'GENERATE_SUCCESS',
        payload: result,
      });

      return result;
    } catch (err) {
      dispatch({
        type: 'GENERATE_ERROR',
        payload: err.message ?? 'Generation failed.',
      });

      throw err;
    }
  }, []);

  const loadResult = useCallback((item) => {
    dispatch({
      type: 'SET_CURRENT_RESULT',
      payload: item,
    });
  }, []);

  const togglePin = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_PIN_GENERATION',
      payload: id,
    });
  }, []);

  const deleteGeneration = useCallback((id) => {
    dispatch({
      type: 'DELETE_GENERATION',
      payload: id,
    });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({
      type: 'CLEAR_HISTORY',
    });
  }, []);

  const clearPromptHistory = useCallback(() => {
    dispatch({
      type: 'CLEAR_PROMPT_HISTORY',
    });
  }, []);

  const clearError = useCallback(() => {
    dispatch({
      type: 'CLEAR_ERROR',
    });
  }, []);

  return (
    <AIContext.Provider
      value={{
        ...state,
        generate,
        loadResult,
        togglePin,
        deleteGeneration,
        clearHistory,
        clearPromptHistory,
        clearError,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}