/**
 * utils/aiStatistics.js
 * Utility helpers for AI generation statistics.
 */

export function getAIStatistics(history = []) {
    if (!Array.isArray(history) || history.length === 0) {
        return {
            total: 0,
            pinned: 0,
            averageWords: 0,
            stories: 0,
            scripts: 0,
            characters: 0,
            dialogues: 0,
            outlines: 0,
            worldBuilding: 0,
            lastGeneration: null,
        };
    }

    const total = history.length;

    const pinned = history.filter((item) => item.pinned).length;

    const totalWords = history.reduce(
        (sum, item) => sum + (item.wordCount ?? 0),
        0
    );

    const averageWords = Math.round(totalWords / total);

    const countByType = (type) =>
        history.filter((item) => item.type === type).length;

    return {
        total,
        pinned,
        averageWords,

        stories: countByType('Story'),
        scripts: countByType('Script'),
        characters: countByType('Character'),
        dialogues: countByType('Dialogue'),
        outlines: countByType('Outline'),
        worldBuilding: countByType('World Building'),

        lastGeneration: history[0]?.createdAt ?? null,
    };
}