/**
 * contexts/SettingsContext.jsx
 * Global settings state with localStorage persistence.
 */
import {
    createContext,
    useCallback,
    useEffect,
    useReducer,
} from 'react';

import { settingsService } from '../services/settingsService';

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext(null);

const initialState = {
    settings: null,
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
                settings: action.payload,
            };

        case 'LOAD_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'UPDATE':
            return {
                ...state,
                settings: action.payload,
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

export function SettingsProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Load settings
    const loadSettings = useCallback(async () => {
        dispatch({ type: 'LOAD_START' });

        try {
            const settings = await settingsService.getSettings();

            dispatch({
                type: 'LOAD_SUCCESS',
                payload: settings,
            });
        } catch (err) {
            dispatch({
                type: 'LOAD_ERROR',
                payload: err.message ?? 'Failed to load settings.',
            });
        }
    }, []);

    // Load on mount
    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    // Update settings
    const updateSettings = useCallback(async (patch) => {
        try {
            const updated = await settingsService.updateSettings(patch);

            dispatch({
                type: 'UPDATE',
                payload: updated,
            });

            return updated;
        } catch (err) {
            dispatch({
                type: 'LOAD_ERROR',
                payload: err.message ?? 'Failed to update settings.',
            });

            throw err;
        }
    }, []);

    // Reset settings
    const resetSettings = useCallback(async () => {
        try {
            const settings = await settingsService.resetSettings();

            dispatch({
                type: 'UPDATE',
                payload: settings,
            });

            return settings;
        } catch (err) {
            dispatch({
                type: 'LOAD_ERROR',
                payload: err.message ?? 'Failed to reset settings.',
            });

            throw err;
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        dispatch({
            type: 'CLEAR_ERROR',
        });
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                ...state,
                loadSettings,
                updateSettings,
                resetSettings,
                clearError,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}