/**
 * features/editor/ExportMenu.jsx
 * Export dropdown menu for TXT, PDF, EPUB.
 *
 * Props
 *   documentId    string | null
 *   documentTitle string
 *   onExport      fn(id, format)
 *   disabled      bool
 */
import { useState, useRef, useEffect } from 'react';
import { cn }    from '../../utils/cn';
import Button    from '../../components/ui/Button';
import Spinner   from '../../components/ui/Spinner';

const FORMATS = [
  { id: 'txt',  label: 'Export as TXT',  icon: '📄' },
  { id: 'pdf',  label: 'Export as PDF',  icon: '📕' },
  { id: 'epub', label: 'Export as EPUB', icon: '📚' },
];

const DownloadIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function ExportMenu({ documentId, documentTitle, onExport, disabled }) {
  const [open,      setOpen]      = useState(false);
  const [exporting, setExporting] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  async function handleExport(format) {
    if (!documentId || exporting) return;
    setExporting(format);
    setOpen(false);
    try {
      await onExport(documentId, format);
    } finally {
      setExporting(null);
    }
  }

  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled || !documentId || Boolean(exporting)}
        aria-label="Export document"
        aria-haspopup="menu"
        aria-expanded={open}
        leftIcon={exporting ? <Spinner size="sm" className="text-current" /> : DownloadIcon}
      >
        {exporting ? 'Exporting…' : 'Export'}
      </Button>

      {open && (
        <div
          role="menu"
          aria-label={`Export "${documentTitle}"`}
          className={cn(
            'absolute right-0 top-full mt-1 z-[var(--z-tooltip,70)]',
            'w-48 rounded-[var(--radius-lg)]',
            'border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
            'shadow-[var(--shadow-lg)] py-1',
            'animate-scale-in',
          )}
        >
          {FORMATS.map(({ id, label }) => (
            <button
              key={id}
              role="menuitem"
              onClick={() => handleExport(id)}
              className={cn(
                'flex w-full items-center gap-2.5 px-4 py-2',
                'text-[var(--text-sm)] text-[var(--color-text-secondary)]',
                'hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
                'transition-colors focus-visible:outline-none focus-visible:bg-[var(--color-bg-surface)]',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
