/**
 * Calculate useful statistics for generated text.
 *
 * @param {string} text
 * @returns {{
 *   words: number,
 *   characters: number,
 *   paragraphs: number,
 *   sentences: number,
 *   readingTime: number,
 * }}
 */
export function getTextStatistics(text = '') {
    const content = text.trim();

    if (!content) {
        return {
            words: 0,
            characters: 0,
            paragraphs: 0,
            sentences: 0,
            readingTime: 0,
        };
    }

    const words = content.split(/\s+/).filter(Boolean).length;

    const characters = content.length;

    const paragraphs = content.split(/\n\s*\n/).filter(Boolean).length;

    const sentences = content.split(/[.!?]+/).filter(Boolean).length;

    const readingTime = Math.max(1, Math.ceil(words / 200));

    return {
        words,
        characters,
        paragraphs,
        sentences,
        readingTime,
    };
}