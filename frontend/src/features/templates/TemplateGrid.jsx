/**
 * features/templates/TemplateGrid.jsx
 * Renders the template grid with skeleton loading and empty state.
 *
 * Props
 *   templates       Template[] | null  (null = loading)
 *   onPreview       fn(template)
 *   onFavorite      fn(id)
 *   onUse           fn(template)
 *   onResetFilters  fn()
 *   isFiltered      bool
 */
import { cn }          from '../../utils/cn';
import Button          from '../../components/ui/Button';
import TemplateCard    from './TemplateCard';

// ── SkeletonCard ──────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
    >
      <div className="h-1.5 w-full bg-[var(--color-bg-surface)]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-3/4 rounded bg-[var(--color-bg-surface)]" />
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-full bg-[var(--color-bg-surface)]" />
              <div className="h-5 w-20 rounded-full bg-[var(--color-bg-surface)]" />
            </div>
          </div>
          <div className="h-7 w-7 rounded-md bg-[var(--color-bg-surface)]" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-[var(--color-bg-surface)]" />
          <div className="h-3 w-5/6 rounded bg-[var(--color-bg-surface)]" />
        </div>
        <div className="h-3 w-24 rounded bg-[var(--color-bg-surface)]" />
        <div className="flex gap-2 border-t border-[var(--color-border)] pt-3">
          <div className="h-8 flex-1 rounded-md bg-[var(--color-bg-surface)]" />
          <div className="h-8 flex-1 rounded-md bg-[var(--color-bg-surface)]" />
        </div>
      </div>
    </div>
  );
}

// ── EmptyState ────────────────────────────────────────────────────────────────

function EmptyState({ isFiltered, onResetFilters }) {
  return (
    <div
      role="status"
      className="col-span-full flex flex-col items-center justify-center gap-5 py-20 text-center"
    >
      <div
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-2xl)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          No templates found
        </p>
        <p className="max-w-xs text-[var(--text-sm)] text-[var(--color-text-muted)]">
          {isFiltered
            ? 'Try adjusting your search, category, or filters.'
            : 'No templates are available right now.'}
        </p>
      </div>

      {isFiltered && (
        <Button
          variant="secondary"
          size="md"
          onClick={onResetFilters}
          aria-label="Reset all filters and search"
        >
          Reset filters
        </Button>
      )}
    </div>
  );
}

// ── TemplateGrid ──────────────────────────────────────────────────────────────

export default function TemplateGrid({
  templates,
  onPreview,
  onFavorite,
  onUse,
  onResetFilters,
  isFiltered,
}) {
  const isLoading = templates === null;

  const gridClass = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4';

  if (isLoading) {
    return (
      <div className={gridClass} aria-label="Loading templates" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className={cn(gridClass)}>
        <EmptyState isFiltered={isFiltered} onResetFilters={onResetFilters} />
      </div>
    );
  }

  return (
    <div
      className={gridClass}
      role="list"
      aria-label={`${templates.length} template${templates.length !== 1 ? 's' : ''}`}
    >
      {templates.map((template) => (
        <div key={template.id} role="listitem">
          <TemplateCard
            template={template}
            onPreview={onPreview}
            onFavorite={onFavorite}
            onUse={onUse}
          />
        </div>
      ))}
    </div>
  );
}
