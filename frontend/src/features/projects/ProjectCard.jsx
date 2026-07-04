/**
 * features/projects/ProjectCard.jsx
 * Displays a single project in either grid or list view.
 *
 * Props
 *   project       Project object
 *   view          'grid' | 'list'
 *   onEdit        fn(project)
 *   onDelete      fn(project)
 *   onDuplicate   fn(project)
 */

import { cn } from '../../utils/cn';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);

  return `${months}mo ago`;
}

function formatWords(count) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return String(count);
}

const STATUS_VARIANT = {
  Draft: 'default',
  'In Progress': 'warning',
  Completed: 'success',
};

const GENRE_VARIANT = {
  Fantasy: 'brand',
  'Sci-Fi': 'accent',
  Mystery: 'default',
  Thriller: 'error',
  Romance: 'default',
  Historical: 'default',
  Literary: 'default',
};

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────

const EditIcon = (
  <svg
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 4 8 1 1 8v3h3z" />
    <path d="m7.5 2.5 2 2" />
  </svg>
);

const DuplicateIcon = (
  <svg
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="8" y="8" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const DeleteIcon = (
  <svg
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const OpenIcon = (
  <svg
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectCard({
  project,
  view = 'grid',
  onEdit,
  onDelete,
  onDuplicate,
}) {
  const {
    title,
    genre,
    description,
    status,
    progress,
    wordCount,
    updatedAt,
    coverColor,
  } = project;

  const isGrid = view === 'grid';

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'group overflow-hidden transition-[border-color,box-shadow,transform]',
        'duration-[var(--duration-normal)]',
        'hover:border-[var(--color-border-strong)]',
        'hover:shadow-[var(--shadow-md)]',
        'hover:-translate-y-0.5',
        isGrid
          ? 'flex flex-col'
          : 'flex flex-row items-stretch'
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'shrink-0',
          isGrid ? 'h-2 w-full' : 'w-1.5'
        )}
        style={{
          backgroundColor: coverColor ?? '#6d28d9',
        }}
      />

      <div className={cn('flex flex-1 flex-col gap-3 p-4', !isGrid && 'py-3')}>

        <div className="flex items-start justify-between gap-2">

          <div className="min-w-0 flex flex-col gap-1">

            <h3 className="truncate text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
              {title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant={GENRE_VARIANT[genre] ?? 'default'}
                size="sm"
              >
                {genre}
              </Badge>

              <Badge
                variant={STATUS_VARIANT[status] ?? 'default'}
                size="sm"
                dot
              >
                {status}
              </Badge>
            </div>

          </div>

          <div
            className={cn(
              'flex items-center gap-1 shrink-0',
              isGrid &&
              'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity'
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit?.(project)}
              aria-label={`Edit ${title}`}
            >
              {EditIcon}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDuplicate?.(project)}
              aria-label={`Duplicate ${title}`}
            >
              {DuplicateIcon}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(project)}
              aria-label={`Delete ${title}`}
            >
              {DeleteIcon}
            </Button>
          </div>
        </div>

        {isGrid && description && (
          <p className="line-clamp-2 text-[var(--text-xs)] text-[var(--color-text-muted)]">
            {description}
          </p>
        )}

        <div className="space-y-1">

          <div className="flex justify-between text-[var(--text-xs)]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-1.5 rounded-full bg-[var(--color-bg-surface)]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: coverColor ?? '#6d28d9',
              }}
            />
          </div>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex gap-3 text-[var(--text-xs)] text-[var(--color-text-muted)]">
            <span>{formatWords(wordCount)} words</span>
            <span>•</span>
            <span>{relativeTime(updatedAt)}</span>
          </div>

          <Button
            variant="ghost"
            size="xs"
            leftIcon={OpenIcon}
          >
            Open
          </Button>

        </div>

      </div>
    </Card>
  );
}