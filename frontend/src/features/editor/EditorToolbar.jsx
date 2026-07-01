/**
 * features/editor/EditorToolbar.jsx
 * Toolbar row above the editor canvas.
 * Handles title editing, undo/redo, export, fullscreen toggle.
 *
 * Props
 *   document      Document | null
 *   saving        bool
 *   lastSaved     Date | null
 *   onTitleChange fn(title)
 *   onUndo        fn()
 *   onRedo        fn()
 *   onExport      fn(id, format)
 *   isFullscreen  bool
 *   onFullscreen  fn()
 */
import { cn }        from '../../utils/cn';
import Button        from '../../components/ui/Button';
import ExportMenu    from './ExportMenu';

// ── Icons ─────────────────────────────────────────────────────────────────────
const UndoIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const RedoIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const FullscreenIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3"  x2="14" y2="10" />
    <line x1="3"  y1="21" x2="10" y2="14" />
  </svg>
);

const ExitFullscreenIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="10" y1="14" x2="3"  y2="21" />
    <line x1="21" y1="3"  x2="14" y2="10" />
  </svg>
);

export default function EditorToolbar({
  document,
  saving,
  lastSaved,
  onTitleChange,
  onUndo,
  onRedo,
  onExport,
  isFullscreen,
  onFullscreen,
}) {
  const title = document?.title ?? '';

  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-2 border-b border-[var(--color-border)]',
        'bg-[var(--color-bg-elevated)] px-3 py-2',
      )}
      role="toolbar"
      aria-label="Editor toolbar"
    >
      {/* Title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Untitled Story"
        aria-label="Document title"
        disabled={!document}
        className={cn(
          'flex-1 min-w-0 rounded-[var(--radius-md)] border-none bg-transparent',
          'px-2 py-1 text-[var(--text-base)] font-[var(--weight-semibold)]',
          'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:bg-[var(--color-bg-surface)]',
          'transition-[background-color,box-shadow] duration-[var(--duration-fast)]',
          'disabled:pointer-events-none disabled:opacity-40',
        )}
      />

      {/* Auto-save indicator */}
      <div className="shrink-0 flex items-center gap-1.5 text-[var(--text-xs)]" aria-live="polite" aria-atomic="true">
        {saving ? (
          <>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-warning)] animate-pulse" aria-hidden="true" />
            <span className="hidden sm:block text-[var(--color-warning)]">Saving…</span>
          </>
        ) : lastSaved ? (
          <>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
            <span className="hidden sm:block text-[var(--color-text-muted)]">Saved</span>
          </>
        ) : null}
      </div>

      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5" role="group" aria-label="Undo and redo">
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!document}
          aria-label="Undo (Ctrl+Z)"
          className="h-8 w-8"
        >
          {UndoIcon}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!document}
          aria-label="Redo (Ctrl+Shift+Z)"
          className="h-8 w-8"
        >
          {RedoIcon}
        </Button>
      </div>

      {/* Export */}
      <ExportMenu
        documentId={document?.id ?? null}
        documentTitle={document?.title ?? 'document'}
        onExport={onExport}
        disabled={!document}
      />

      {/* Fullscreen toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onFullscreen}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        className="h-8 w-8"
      >
        {isFullscreen ? ExitFullscreenIcon : FullscreenIcon}
      </Button>
    </div>
  );
}
