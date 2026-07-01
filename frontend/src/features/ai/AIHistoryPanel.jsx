/**
 * features/ai/AIHistoryPanel.jsx
 *
 * Right / drawer panel of AI Studio.
 * Lists the last 10 generations; clicking one loads it into the result panel.
 *
 * Props
 *   history          array of generation objects
 *   currentResult    object | null  (highlights active item)
 *   onSelect         fn(item)
 *   onDelete         fn(id)
 *   onClearAll       fn()
 */
import { cn } from '../../utils/cn';
import Badge   from '../../components/ui/Badge';
import Button  from '../../components/ui/Button';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatRelTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Subtle colour per type (maps to badge variants)
const TYPE_VARIANT = {
  Story:           'brand',
  Script:          'accent',
  Character:       'success',
  Dialogue:        'warning',
  Outline:         'default',
  'World Building':'default',
};

// ── EmptyState ────────────────────────────────────────────────────────────────

function EmptyHistory() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <path d="M2 14l4-4 4 4 4-4 4 4" />
        </svg>
      </div>
      <p className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-secondary)]">
        No history yet
      </p>
      <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
        Your generations appear here automatically.
      </p>
    </div>
  );
}

// ── HistoryItem ───────────────────────────────────────────────────────────────

function HistoryItem({ item, isActive, onSelect, onDelete }) {
  return (
    <li className={cn('group relative', isActive && 'z-10')}>
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-pressed={isActive}
        aria-label={`Load generation: ${item.title}`}
        className={cn(
          'w-full rounded-[var(--radius-lg)] border p-3 text-left',
          'transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
          isActive
            ? 'border-[var(--color-brand-border)] bg-[var(--color-brand-subtle)]'
            : 'border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]',
        )}
      >
        {/* Title */}
        <p className={cn(
          'truncate text-[var(--text-sm)] font-[var(--weight-medium)] leading-snug',
          isActive ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-primary)]',
        )}>
          {item.title}
        </p>

        {/* Meta row */}
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Badge variant={TYPE_VARIANT[item.type] ?? 'default'} size="sm">
              {item.type}
            </Badge>
            <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {item.wordCount}w
            </span>
          </div>
          <span className="shrink-0 text-[var(--text-2xs)] text-[var(--color-text-muted)]">
            {formatRelTime(item.createdAt)}
          </span>
        </div>
      </button>

      {/* Delete button — appears on hover */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
        aria-label={`Delete generation: ${item.title}`}
        className={cn(
          'absolute right-2 top-2',
          'flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)]',
          'text-[var(--color-text-muted)] hover:bg-[var(--color-error)] hover:text-white',
          'opacity-0 transition-[opacity,background-color,color] duration-[var(--duration-fast)]',
          'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]',
          'group-hover:opacity-100',
        )}
      >
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
}

// ── AIHistoryPanel ────────────────────────────────────────────────────────────

export default function AIHistoryPanel({ history, currentResult, onSelect, onDelete, onClearAll }) {
  const hasHistory = history.length > 0;

  return (
    <section
      aria-label="Generation history"
      className="flex h-full flex-col gap-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--color-border)] px-1 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
            History
          </h2>
          {hasHistory && (
            <Badge variant="default" size="sm" dot>
              {history.length}
            </Badge>
          )}
        </div>

        {hasHistory && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClearAll}
            aria-label="Clear all history"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-error)]"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* List */}
      <div className="mt-3 flex-1 overflow-y-auto">
        {hasHistory ? (
          <ul className="flex flex-col gap-2" aria-label="Past generations">
            {history.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                isActive={currentResult?.id === item.id}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            ))}
          </ul>
        ) : (
          <EmptyHistory />
        )}
      </div>

      {/* Footer hint */}
      {hasHistory && (
        <p className="mt-3 shrink-0 text-center text-[var(--text-2xs)] text-[var(--color-text-muted)]">
          Showing {history.length} of {history.length} · Last 10 kept
        </p>
      )}
    </section>
  );
}
