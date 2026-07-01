/**
 * contexts/AIContext.jsx
 * Manages AI generation state: active generation, history, selected model.
 */
import { createContext, useCallback, useReducer } from 'react';
import { aiService } from '../services/aiService';

// eslint-disable-next-line react-refresh/only-export-components
export const AIContext = createContext(null);

const initialState = {
  isGenerating: false,
  lastResult: null,
  history: [],
  historyMeta: { total: 0, page: 1 },
  selectedModel: null,
  error: null,
};

function aiReducer(state, action) {
  switch (action.type) {
    case 'GENERATE_START':
      return { ...state, isGenerating: true, error: null };
    case 'GENERATE_SUCCESS':
      return {
        ...state,
        isGenerating: false,
        lastResult: action.payload,
        history: [action.payload, ...state.history],
      };
    case 'GENERATE_ERROR':
      return { ...state, isGenerating: false, error: action.payload };
    case 'SET_HISTORY':
      return {
        ...state,
        history: action.payload.items,
        historyMeta: { total: action.payload.total, page: action.payload.page },
      };
    case 'DELETE_HISTORY_ITEM':
      return {
        ...state,
        history: state.history.filter((item) => item.id !== action.payload),
      };
    case 'SET_MODEL':
      return { ...state, selectedModel: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AIProvider({ children }) {
  const [state, dispatch] = useReducer(aiReducer, initialState);

  const generateText = useCallback(async (prompt) => {
    dispatch({ type: 'GENERATE_START' });
    try {
      const result = await aiService.generateText({ prompt });
      dispatch({ type: 'GENERATE_SUCCESS', payload: result });
      return result;
    } catch (err) {
      dispatch({ type: 'GENERATE_ERROR', payload: err.message });
      throw err;
    }
  }, []);

  const fetchHistory = useCallback(async (params) => {
    const data = await aiService.getHistory(params);
    dispatch({ type: 'SET_HISTORY', payload: data });
    return data;
  }, []);

  const deleteHistoryItem = useCallback(async (id) => {
    await aiService.deleteHistoryItem(id);
    dispatch({ type: 'DELETE_HISTORY_ITEM', payload: id });
  }, []);

  const selectModel = useCallback((model) => {
    dispatch({ type: 'SET_MODEL', payload: model });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AIContext.Provider
      value={{
        ...state,
        generateText,
        fetchHistory,
        deleteHistoryItem,
        selectModel,
        clearError,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}
