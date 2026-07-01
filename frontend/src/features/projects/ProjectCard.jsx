/**
 * features/projects/ProjectCard.jsx
 * Displays one project in grid or list orientation.
 *
 * Props
 *   project     Project object
 *   view        'grid' | 'list'
 *   onEdit      fn(project)
 *   onDelete    fn(project)
 */
import { cn }       from '../../utils/cn';
import Card         from '../../components/ui/Card';
import Badge        from '../../components/ui/Badge';
import Button       from '../../components/ui/Button';

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function fmtWords(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

const STATUS_VARIANT = {
  'Draft':       'default',
  'In Progress': 'warning',
  'Completed':   'success',
};

const GENRE_VARIANT = {
  'Fantasy':    'brand',
  'Sci-Fi':     'accent',
  'Mystery':    'default',
  'Thriller':   'error',
  'Romance':    'default',
  'Historical': 'default',
  'Literary':   'default',
};

// ── EditIcon / DeleteIcon ─────────────────────────────────────────────────────

const EditIcon = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4 8 1 1 8v3h3z" />
    <path d="m7.5 2.5 2 2" />
  </svg>
);

const DeleteIcon = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const OpenIcon = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── ProjectCard ───────────────────────────────────────────────────────────────

export default function ProjectCard({ project, view = 'grid', onEdit, onDelete }) {
  const { title, genre, description, status, progress, wordCount, updatedAt, coverColor } = project;

  const isGrid = view === 'grid';

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'group overflow-hidden',
        'transition-[border-color,box-shadow,transform] duration-[var(--duration-normal)]',
        'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
        'hover:-translate-y-0.5',
        isGrid ? 'flex flex-col' : 'flex flex-row items-stretch',
      )}
    >
      {/* ── Cover strip ── */}
      <div
        aria-hidden="true"
        className={cn(
          'shrink-0',
          isGrid ? 'h-2 w-full' : 'w-1.5',
        )}
        style={{ backgroundColor: coverColor ?? '#6d28d9' }}
      />

      {/* ── Content ── */}
      <div className={cn('flex flex-1 flex-col gap-3 p-4', !isGrid && 'py-3')}>

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="truncate text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)] leading-[var(--leading-snug)]">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant={GENRE_VARIANT[genre] ?? 'default'} size="sm">{genre}</Badge>
              <Badge variant={STATUS_VARIANT[status] ?? 'default'} size="sm" dot>{status}</Badge>
            </div>
          </div>

          {/* Action buttons — always visible on list, hover on grid */}
          <div className={cn(
            'flex shrink-0 items-center gap-1',
            isGrid && 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-[var(--duration-fast)]',
          )}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(project)}
              aria-label={`Edit ${title}`}
              className="h-7 w-7 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              {EditIcon}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(project)}
              aria-label={`Delete ${title}`}
              className="h-7 w-7 text-[var(--color-text-muted)] hover:text-[var(--color-error)]"
            >
              {DeleteIcon}
            </Button>
          </div>
        </div>

        {/* Description (grid only) */}
        {isGrid && description && (
          <p className="line-clamp-2 text-[var(--text-xs)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
            {description}
          </p>
        )}

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">Progress</span>
            <span className="text-[var(--text-xs)] font-[var(--weight-semibold)] text-[var(--color-text-secondary)]">{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${title} progress: ${progress}%`}
            className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-surface)]"
          >
            <div
              className="h-full rounded-full transition-[width] duration-[var(--duration-slow)]"
              style={{
                width:           `${progress}%`,
                backgroundColor: coverColor ?? '#6d28d9',
              }}
            />
          </div>
        </div>

        {/* Footer: word count + date + open button */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-3 text-[var(--text-xs)] text-[var(--color-text-muted)]">
            <span>{fmtWords(wordCount)} words</span>
            <span>·</span>
            <span>{relativeTime(updatedAt)}</span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            aria-label={`Open ${title}`}
            leftIcon={OpenIcon}
            className="shrink-0 text-[var(--color-brand)] hover:bg-[var(--color-brand-subtle)]"
          >
            Open
          </Button>
        </div>
      </div>
    </Card>
  );
}
