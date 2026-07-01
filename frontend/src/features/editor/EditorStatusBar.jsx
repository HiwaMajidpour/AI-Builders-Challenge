/**
 * features/editor/EditorStatusBar.jsx
 * Bottom status bar: word count, character count, cursor position, save state.
 *
 * Props
 *   content       string
 *   saving        bool
 *   lastSaved     Date | null
 *   cursorPos     { line: number, col: number } | null
 */
import { cn } from '../../utils/cn';

function relTime(date) {
  if (!date) return 'Never';
  const diff = Date.now() - new Date(date).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 10)  return 'Just now';
  if (secs < 60)  return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60)  return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export default function EditorStatusBar({ content = '', saving, lastSaved, cursorPos }) {
  const words  = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const chars  = content.length;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="false"
      className={cn(
        'flex items-center justify-between gap-4',
        'border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]',
        'px-4 py-1.5',
      )}
    >
      {/* Left: stats */}
      <div className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-text-muted)]">
        <span aria-label={`${words} words`}>{words.toLocaleString()} words</span>
        <span className="text-[var(--color-border)]" aria-hidden="true">·</span>
        <span aria-label={`${chars} characters`}>{chars.toLocaleString()} chars</span>
        {cursorPos && (
          <>
            <span className="text-[var(--color-border)]" aria-hidden="true">·</span>
            <span aria-label={`Cursor at line ${cursorPos.line}, column ${cursorPos.col}`}>
              Ln {cursorPos.line}, Col {cursorPos.col}
            </span>
          </>
        )}
      </div>

      {/* Right: save state */}
      <div className="flex items-center gap-1.5 text-[var(--text-xs)]">
        {saving ? (
          <>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-warning)] animate-pulse" aria-hidden="true" />
            <span className="text-[var(--color-warning)]">Saving…</span>
          </>
        ) : (
          <>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
            <span className="text-[var(--color-text-muted)]">
              Saved {relTime(lastSaved)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
