/**
 * services/activityService.js
 * Stores dashboard activity history in localStorage.
 */

import { storage } from '../utils/storage';

const ACTIVITY_KEY = 'sf_activity';

function loadActivity() {
    return storage.get(ACTIVITY_KEY, []);
}

function saveActivity(activity) {
    storage.set(ACTIVITY_KEY, activity);
}

function createActivity(type, title, detail) {
    const activity = loadActivity();

    activity.unshift({
        id: `activity_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        type,
        title,
        detail,
        timestamp: new Date().toISOString(),
    });

    saveActivity(activity);
}

export const activityService = {
    getActivity() {
        return loadActivity();
    },

    logProjectCreated(project) {
        createActivity(
            'create',
            'Created project',
            project.title
        );
    },

    logProjectUpdated(project) {
        createActivity(
            'update',
            'Updated project',
            project.title
        );
    },

    logProjectDeleted(projectTitle) {
        createActivity(
            'delete',
            'Deleted project',
            projectTitle
        );
    },

    logProjectDuplicated(project) {
        createActivity(
            'duplicate',
            'Duplicated project',
            project.title
        );
    },
};