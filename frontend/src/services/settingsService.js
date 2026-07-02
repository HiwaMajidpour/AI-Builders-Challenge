/**
 * services/settingsService.js
 * Mock settings service with localStorage persistence.
 */

import { storage } from '../utils/storage';

const SETTINGS_KEY = 'sf_settings';

const DEFAULT_SETTINGS = {
    profile: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: null,
        bio: '',
        country: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },

    appearance: {
        theme: 'system',
    },

    notifications: {
        email: true,
        push: true,
        aiTips: true,
        marketing: false,
    },

    security: {
        twoFactor: false,
    },

    billing: {
        plan: 'Free',
        aiCredits: 100,
        usage: 24,
    },
};

function delay(ms = 400) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export const settingsService = {
    async getSettings() {
        await delay();

        const settings = storage.get(
            SETTINGS_KEY,
            structuredClone(DEFAULT_SETTINGS)
        );

        storage.set(SETTINGS_KEY, settings);

        return settings;
    },

    async updateSettings(patch) {
        await delay();

        const current = storage.get(
            SETTINGS_KEY,
            structuredClone(DEFAULT_SETTINGS)
        );

        const updated = {
            ...current,

            profile: {
                ...current.profile,
                ...(patch.profile ?? {}),
            },

            appearance: {
                ...current.appearance,
                ...(patch.appearance ?? {}),
            },

            notifications: {
                ...current.notifications,
                ...(patch.notifications ?? {}),
            },

            security: {
                ...current.security,
                ...(patch.security ?? {}),
            },

            billing: {
                ...current.billing,
                ...(patch.billing ?? {}),
            },
        };

        storage.set(SETTINGS_KEY, updated);

        return updated;
    },

    async resetSettings() {
        await delay();

        const settings = structuredClone(DEFAULT_SETTINGS);

        storage.set(SETTINGS_KEY, settings);

        return settings;
    },
};

export { DEFAULT_SETTINGS };