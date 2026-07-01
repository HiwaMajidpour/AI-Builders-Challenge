/**
 * features/editor/ChapterList.jsx
 * Chapter management panel — create, rename, delete chapters.
 *
 * Props
 *   chapters     Chapter[]
 *   onAdd        fn()
 *   onRename     fn(id, newTitle)
 *   onDelete     fn(id)
 */
import { useState } from 'react';
import { cn }       from '../../utils/cn';
import Button       from '../../components/ui/Button';

export default function ChapterList({ chapters = [], onAdd, onRename, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  function startEdit(chapter) {
    setEditingId(chapter.id);
    setEditValue(chapter.title);
  }

  function commitEdit(id) {
    if (editValue.trim()) onRename(id, editValue.trim());
    setEditingId(null);
  }

  function handleKeyDown(e, id) {
    if (e.key === 'Enter') commitEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-3" aria-label="Chapter list">
      <div className="flex items-center justify-between">
        <p className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
          Chapters
        </p>
        <Button
          variant="ghost"
          size="xs"
          onClick={onAdd}
          aria-label="Add new chapter"
          leftIcon={
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="1" x2="6" y2="11" />
              <line x1="1" y1="6" x2="11" y2="6" />
            </svg>
          }
        >
          Add
        </Button>
      </div>

      {chapters.length === 0 ? (
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] italic">No chapters yet.</p>
      ) : (
        <ul className="flex flex-col gap-0.5" aria-label="Chapters">
          {chapters.map((ch, idx) => (
            <li
              key={ch.id}
              className="group flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 hover:bg-[var(--color-bg-surface)] transition-colors"
            >
              {/* Drag handle (visual only) */}
              <span
                aria-hidden="true"
                className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
              >
                <svg width="10" height="14" fill="currentColor" viewBox="0 0 10 14">
                  <circle cx="3" cy="3"  r="1.5" />
                  <circle cx="7" cy="3"  r="1.5" />
                  <circle cx="3" cy="7"  r="1.5" />
                  <circle cx="7" cy="7"  r="1.5" />
                  <circle cx="3" cy="11" r="1.5" />
                  <circle cx="7" cy="11" r="1.5" />
                </svg>
              </span>

              {/* Chapter number */}
              <span className="w-4 shrink-0 text-[var(--text-2xs)] text-[var(--color-text-muted)] font-[var(--weight-semibold)]">
                {idx + 1}.
              </span>

              {/* Title / edit input */}
              {editingId === ch.id ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => commitEdit(ch.id)}
                  onKeyDown={(e) => handleKeyDown(e, ch.id)}
                  autoFocus
                  aria-label={`Rename chapter ${idx + 1}`}
                  className={cn(
                    'flex-1 rounded-[var(--radius-xs)] border border-[var(--color-border-focus)]',
                    'bg-[var(--color-bg-elevated)] px-1.5 py-0.5',
                    'text-[var(--text-xs)] text-[var(--color-text-primary)]',
                    'focus:outline-none',
                  )}
                />
              ) : (
                <button
                  className="flex-1 truncate text-left text-[var(--text-xs)] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]"
                  onDoubleClick={() => startEdit(ch)}
                  title="Double-click to rename"
                >
                  {ch.title}
                </button>
              )}

              {/* Word count */}
              <span className="shrink-0 text-[var(--text-2xs)] text-[var(--color-text-muted)]">
                {ch.wordCount}w
              </span>

              {/* Delete */}
              <button
                onClick={() => onDelete(ch.id)}
                aria-label={`Delete "${ch.title}"`}
                className={cn(
                  'shrink-0 flex h-5 w-5 items-center justify-center rounded-[var(--radius-xs)]',
                  'text-[var(--color-text-muted)] hover:text-[var(--color-error)]',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-error)]',
                )}
              >
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="10" y1="0" x2="0" y2="10" />
                  <line x1="0"  y1="0" x2="10" y2="10" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
