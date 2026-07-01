/**
 * features/templates/TemplateCard.jsx
 * Displays a single template in the gallery grid.
 *
 * Props
 *   template      Template object
 *   onPreview     fn(template)
 *   onFavorite    fn(id)
 *   onUse         fn(template)
 */
import { cn }     from '../../utils/cn';
import Card       from '../../components/ui/Card';
import Badge      from '../../components/ui/Badge';
import Button     from '../../components/ui/Button';

// ── Helpers ───────────────────────────────────────────────────────────────────

const DIFFICULTY_VARIANT = {
  Beginner:     'success',
  Intermediate: 'warning',
  Advanced:     'error',
};

const CATEGORY_VARIANT = {
  Fantasy:    'brand',
  'Sci-Fi':   'accent',
  Mystery:    'default',
  Romance:    'default',
  Business:   'success',
  Marketing:  'warning',
  Blog:       'default',
  Novel:      'brand',
  Screenplay: 'accent',
  Poetry:     'default',
};

// ── StarIcon ──────────────────────────────────────────────────────────────────
function StarIcon({ filled, className }) {
  return (
    <svg
      width="15" height="15"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ── ClockIcon ─────────────────────────────────────────────────────────────────
const ClockIcon = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ── FeaturedBadge ─────────────────────────────────────────────────────────────
const FeaturedStarIcon = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── TemplateCard ──────────────────────────────────────────────────────────────

export default function TemplateCard({ template, onPreview, onFavorite, onUse }) {
  const { title, description, category, difficulty, estimatedTime, featured, favorite, coverColor } = template;

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'group flex flex-col overflow-hidden',
        'transition-[border-color,box-shadow,transform] duration-[var(--duration-normal)]',
        'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
        'hover:-translate-y-0.5',
      )}
    >
      {/* ── Cover strip ── */}
      <div
        className="relative h-1.5 w-full shrink-0"
        style={{ backgroundColor: coverColor ?? '#6d28d9' }}
        aria-hidden="true"
      >
        {/* Featured badge overlay */}
        {featured && (
          <span
            className="absolute right-3 top-2 flex items-center gap-1 rounded-[var(--radius-full)] bg-[var(--color-brand)] px-2 py-0.5 text-[var(--text-2xs)] font-[var(--weight-semibold)] text-white shadow-[var(--shadow-xs)]"
            aria-label="Featured template"
          >
            {FeaturedStarIcon}
            Featured
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h3 className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)] leading-[var(--leading-snug)] line-clamp-2">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant={CATEGORY_VARIANT[category] ?? 'default'} size="sm">
                {category}
              </Badge>
              <Badge variant={DIFFICULTY_VARIANT[difficulty] ?? 'default'} size="sm">
                {difficulty}
              </Badge>
            </div>
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={() => onFavorite(template.id)}
            aria-label={favorite ? `Remove "${title}" from favorites` : `Add "${title}" to favorites`}
            aria-pressed={favorite}
            className={cn(
              'mt-0.5 shrink-0 flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)]',
              'transition-[color,background-color] duration-[var(--duration-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              favorite
                ? 'text-[var(--color-warning)] hover:text-[var(--color-warning)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-warning)] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
            )}
          >
            <StarIcon filled={favorite} />
          </button>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-[var(--text-xs)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)] flex-1">
          {description}
        </p>

        {/* Estimated time */}
        <div className="flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-text-muted)]">
          {ClockIcon}
          <span>{estimatedTime}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-[var(--color-border)] pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPreview(template)}
            aria-label={`Preview "${title}"`}
            className="flex-1"
          >
            Preview
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUse(template)}
            aria-label={`Use template "${title}"`}
            className="flex-1"
          >
            Use Template
          </Button>
        </div>
      </div>
    </Card>
  );
}
