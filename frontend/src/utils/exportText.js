/**
 * utils/exportText.js
 *
 * Utility helpers for exporting generated AI content.
 * Supports:
 * - Copy to clipboard
 * - Download as TXT
 * - Download as Markdown
 */

function createBlobAndDownload(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * Copy text to the system clipboard.
 */
export async function copyToClipboard(text) {
    if (!text) return;

    await navigator.clipboard.writeText(text);
}

/**
 * Download content as a plain text file.
 */
export function downloadTxt(filename, text) {
    createBlobAndDownload(
        `${filename}.txt`,
        text,
        'text/plain;charset=utf-8',
    );
}

/**
 * Download content as a Markdown file.
 */
export function downloadMarkdown(filename, markdown) {
    createBlobAndDownload(
        `${filename}.md`,
        markdown,
        'text/markdown;charset=utf-8',
    );
}

/**
 * Download any text content.
 */
export function downloadFile(
    filename,
    content,
    mimeType = 'text/plain;charset=utf-8',
) {
    createBlobAndDownload(
        filename,
        content,
        mimeType,
    );
}