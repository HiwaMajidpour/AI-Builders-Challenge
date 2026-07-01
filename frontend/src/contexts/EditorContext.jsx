/**
 * contexts/EditorContext.jsx
 * Manages editor state: documents, current document, chapters, version history.
 * Current document is persisted to localStorage and hydrated on startup.
 */
import { createContext, useCallback, useEffect, useReducer, useRef } from 'react';
import { editorService } from '../services/editorService';
import { storage }       from '../utils/storage';

const CURRENT_DOC_KEY = 'sf_editor_current_doc';
const OPEN_TABS_KEY   = 'sf_editor_open_tabs';

// eslint-disable-next-line react-refresh/only-export-components
export const EditorContext = createContext(null);

// ── Helpers ───────────────────────────────────────────────────────────────────
function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ── Reducer ───────────────────────────────────────────────────────────────────
const initialState = {
  documents:       null,             // null = not loaded yet
  currentDocument: storage.get(CURRENT_DOC_KEY, null),
  openTabIds:      storage.get(OPEN_TABS_KEY, []),
  loading:         false,
  saving:          false,
  error:           null,
};

function editorReducer(state, action) {
  switch (action.type) {

    case 'LOAD_START':
      return { ...state, loading: true, error: null };

    case 'LOAD_SUCCESS':
      return { ...state, loading: false, documents: action.payload };

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SAVE_START':
      return { ...state, saving: true };

    case 'SAVE_SUCCESS': {
      const updated = action.payload;
      return {
        ...state,
        saving:          false,
        currentDocument: state.currentDocument?.id === updated.id ? updated : state.currentDocument,
        documents:       (state.documents ?? []).map((d) => d.id === updated.id ? updated : d),
      };
    }

    case 'SAVE_ERROR':
      return { ...state, saving: false, error: action.payload };

    case 'OPEN_DOCUMENT': {
      const doc = action.payload;
      const tabIds = state.openTabIds.includes(doc.id)
        ? state.openTabIds
        : [...state.openTabIds, doc.id];
      return { ...state, currentDocument: doc, openTabIds: tabIds };
    }

    case 'CLOSE_TAB': {
      const tabIds = state.openTabIds.filter((id) => id !== action.payload);
      const current = state.currentDocument?.id === action.payload
        ? (tabIds.length > 0
            ? (state.documents ?? []).find((d) => d.id === tabIds[tabIds.length - 1]) ?? null
            : null)
        : state.currentDocument;
      return { ...state, openTabIds: tabIds, currentDocument: current };
    }

    case 'ADD_DOCUMENT': {
      const tabIds = [...state.openTabIds, action.payload.id];
      return {
        ...state,
        documents:       [action.payload, ...(state.documents ?? [])],
        currentDocument: action.payload,
        openTabIds:      tabIds,
      };
    }

    case 'REMOVE_DOCUMENT': {
      const tabIds = state.openTabIds.filter((id) => id !== action.payload);
      const current = state.currentDocument?.id === action.payload ? null : state.currentDocument;
      return {
        ...state,
        documents:       (state.documents ?? []).filter((d) => d.id !== action.payload),
        currentDocument: current,
        openTabIds:      tabIds,
      };
    }

    case 'UPDATE_CONTENT': {
      if (!state.currentDocument) return state;
      const wc  = countWords(action.payload);
      const doc = { ...state.currentDocument, content: action.payload, wordCount: wc };
      return {
        ...state,
        currentDocument: doc,
        documents:       (state.documents ?? []).map((d) => d.id === doc.id ? doc : d),
      };
    }

    case 'UPDATE_TITLE': {
      if (!state.currentDocument) return state;
      const doc = { ...state.currentDocument, title: action.payload };
      return {
        ...state,
        currentDocument: doc,
        documents:       (state.documents ?? []).map((d) => d.id === doc.id ? doc : d),
      };
    }

    case 'ADD_CHAPTER': {
      if (!state.currentDocument) return state;
      const chapters = [...(state.currentDocument.chapters ?? []), action.payload];
      const doc = { ...state.currentDocument, chapters };
      return {
        ...state,
        currentDocument: doc,
        documents:       (state.documents ?? []).map((d) => d.id === doc.id ? doc : d),
      };
    }

    case 'UPDATE_CHAPTER': {
      if (!state.currentDocument) return state;
      const chapters = (state.currentDocument.chapters ?? []).map((c) =>
        c.id === action.payload.id ? { ...c, ...action.payload } : c,
      );
      const doc = { ...state.currentDocument, chapters };
      return {
        ...state,
        currentDocument: doc,
        documents:       (state.documents ?? []).map((d) => d.id === doc.id ? doc : d),
      };
    }

    case 'DELETE_CHAPTER': {
      if (!state.currentDocument) return state;
      const chapters = (state.currentDocument.chapters ?? []).filter((c) => c.id !== action.payload);
      const doc = { ...state.currentDocument, chapters };
      return {
        ...state,
        currentDocument: doc,
        documents:       (state.documents ?? []).map((d) => d.id === doc.id ? doc : d),
      };
    }

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const saveTimerRef      = useRef(null);

  // Persist current document
  useEffect(() => {
    storage.set(CURRENT_DOC_KEY, state.currentDocument);
  }, [state.currentDocument]);

  // Persist open tab ids
  useEffect(() => {
    storage.set(OPEN_TABS_KEY, state.openTabIds);
  }, [state.openTabIds]);

  // ── loadDocuments ─────────────────────────────────────────────────────────
  const loadDocuments = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const docs = await editorService.getDocuments();
      dispatch({ type: 'LOAD_SUCCESS', payload: docs });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message ?? 'Failed to load documents.' });
    }
  }, []);

  // ── openDocument ──────────────────────────────────────────────────────────
  const openDocument = useCallback((doc) => {
    dispatch({ type: 'OPEN_DOCUMENT', payload: doc });
  }, []);

  // ── closeTab ──────────────────────────────────────────────────────────────
  const closeTab = useCallback((id) => {
    dispatch({ type: 'CLOSE_TAB', payload: id });
  }, []);

  // ── save ──────────────────────────────────────────────────────────────────
  const save = useCallback(async (doc) => {
    if (!doc) return;
    dispatch({ type: 'SAVE_START' });
    try {
      const saved = await editorService.saveDocument(doc);
      dispatch({ type: 'SAVE_SUCCESS', payload: saved });
      return saved;
    } catch (err) {
      dispatch({ type: 'SAVE_ERROR', payload: err.message ?? 'Save failed.' });
      throw err;
    }
  }, []);

  // ── createDocument ────────────────────────────────────────────────────────
  const createDocument = useCallback(async (data) => {
    dispatch({ type: 'LOAD_START' });
    try {
      const doc = await editorService.createDocument(data);
      dispatch({ type: 'ADD_DOCUMENT', payload: doc });
      return doc;
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message ?? 'Failed to create document.' });
      throw err;
    }
  }, []);

  // ── deleteDocument ────────────────────────────────────────────────────────
  const deleteDocument = useCallback(async (id) => {
    dispatch({ type: 'LOAD_START' });
    try {
      await editorService.deleteDocument(id);
      dispatch({ type: 'REMOVE_DOCUMENT', payload: id });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err.message ?? 'Failed to delete document.' });
      throw err;
    }
  }, []);

  // ── updateContent (triggers debounced auto-save) ──────────────────────────
  const updateContent = useCallback((content) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: content });
  }, []);

  // ── updateTitle ───────────────────────────────────────────────────────────
  const updateTitle = useCallback((title) => {
    dispatch({ type: 'UPDATE_TITLE', payload: title });
  }, []);

  // ── chapter operations ────────────────────────────────────────────────────
  const createChapter = useCallback((title) => {
    const chapter = {
      id:        `ch_${Date.now()}`,
      title:     title ?? 'New Chapter',
      wordCount: 0,
      order:     Date.now(),
    };
    dispatch({ type: 'ADD_CHAPTER', payload: chapter });
  }, []);

  const updateChapter = useCallback((patch) => {
    dispatch({ type: 'UPDATE_CHAPTER', payload: patch });
  }, []);

  const deleteChapter = useCallback((id) => {
    dispatch({ type: 'DELETE_CHAPTER', payload: id });
  }, []);

  // ── exportDocument ────────────────────────────────────────────────────────
  const exportDocument = useCallback(async (id, format) => {
    const result = await editorService.exportDocument(id, format);
    const blob   = new Blob([result.content], { type: 'text/plain' });
    const url    = URL.createObjectURL(blob);
    const link   = document.createElement('a');
    link.href     = url;
    link.download = result.filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // ── clearError ────────────────────────────────────────────────────────────
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Cleanup auto-save timer on unmount
  useEffect(() => {
    const timer = saveTimerRef.current;
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  return (
    <EditorContext.Provider
      value={{
        ...state,
        loadDocuments,
        openDocument,
        closeTab,
        save,
        createDocument,
        deleteDocument,
        updateContent,
        updateTitle,
        createChapter,
        updateChapter,
        deleteChapter,
        exportDocument,
        clearError,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
