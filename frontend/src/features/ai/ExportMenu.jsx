/**
 * features/ai/ExportMenu.jsx
 *
 * Dropdown menu for exporting generated AI content.
 *
 * Supports:
 * - TXT
 * - Markdown
 * - JSON
 * - Copy Markdown
 */

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';

export default function ExportMenu({ result }) {
    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (!menuRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function download(filename, content, type) {
        const blob = new Blob([content], {
            type,
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;

        link.download = filename;

        link.click();

        URL.revokeObjectURL(url);

        setOpen(false);
    }

    function fileName(extension) {
        return `${result.title
            .replace(/\s+/g, '-')
            .toLowerCase()}.${extension}`;
    }

    async function copyMarkdown() {
        const markdown = `# ${result.title}

${result.content}
`;

        await navigator.clipboard.writeText(markdown);

        toast.success('Markdown copied.');

        setOpen(false);
    }

    function downloadTxt() {
        download(
            fileName('txt'),
            `${result.title}\n\n${result.content}`,
            'text/plain;charset=utf-8',
        );

        toast.success('TXT downloaded.');
    }

    function downloadMarkdown() {
        download(
            fileName('md'),
            `# ${result.title}

${result.content}
`,
            'text/markdown;charset=utf-8',
        );

        toast.success('Markdown downloaded.');
    }

    function downloadJson() {
        download(
            fileName('json'),
            JSON.stringify(result, null, 2),
            'application/json',
        );

        toast.success('JSON downloaded.');
    }

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpen((v) => !v)}
            >
                Export
            </Button>

            {open && (
                <div
                    className="
            absolute right-0 top-11 z-30
            w-56 overflow-hidden
            rounded-xl border border-[var(--color-border)]
            bg-[var(--color-bg-elevated)]
            shadow-lg
          "
                >
                    <button
                        type="button"
                        onClick={downloadTxt}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-surface)]"
                    >
                        Download TXT
                    </button>

                    <button
                        type="button"
                        onClick={downloadMarkdown}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-surface)]"
                    >
                        Download Markdown
                    </button>

                    <button
                        type="button"
                        onClick={downloadJson}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-surface)]"
                    >
                        Download JSON
                    </button>

                    <hr className="border-[var(--color-border)]" />

                    <button
                        type="button"
                        onClick={copyMarkdown}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-surface)]"
                    >
                        Copy Markdown
                    </button>
                </div>
            )}
        </div>
    );
}