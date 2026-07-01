/**
 * features/projects/ProjectList.jsx
 * Renders the project grid or list with skeleton loading and empty state.
 *
 * Props
 *   projects      Project[] | null (null = loading)
 *   view          'grid' | 'list'
 *   onEdit        fn(project)
 *   onDelete      fn(project)
 *   onCreateFirst fn()            — CTA when empty after filtering
 *   isFiltered    bool            — true when search/filters are active
 */
import { cn }         from '../../utils/cn';
import Button         from '../../components/ui/Button';
import ProjectCard    from './ProjectCard';

// ── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard({ view }) {
  const isGrid = view === 'grid';
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
        isGrid ? 'flex flex-col' : 'flex flex-row',
      )}
    >
      <div className={cn('shrink-0 bg-[var(--color-bg-surface)]', isGrid ? 'h-2 w-full' : 'w-1.5')} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-2/3 rounded bg-[var(--color-bg-surface)]" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-[var(--color-bg-surface)]" />
          <div className="h-5 w-20 rounded-full bg-[var(--color-bg-surface)]" />
        </div>
        {isGrid && <div className="h-3 w-full rounded bg-[var(--color-bg-surface)]" />}
        <div className="space-y-1">
          <div className="flex justify-between">
            <div className="h-3 w-14 rounded bg-[var(--color-bg-surface)]" />
            <div className="h-3 w-8 rounded bg-[var(--color-bg-surface)]" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--color-bg-surface)]" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-28 rounded bg-[var(--color-bg-surface)]" />
          <div className="h-6 w-14 rounded bg-[var(--color-bg-surface)]" />
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ isFiltered, onCreateFirst }) {
  return (
    <div
      role="status"
      className="col-span-full flex flex-col items-center justify-center gap-5 py-20 text-center"
    >
      {/* Illustration placeholder */}
      <div
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-2xl)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          {isFiltered ? 'No matching projects' : 'No projects yet'}
        </p>
        <p className="max-w-xs text-[var(--text-sm)] text-[var(--color-text-muted)]">
          {isFiltered
            ? 'Try adjusting your search or filters.'
            : 'Start writing your first story. Your projects will live here.'}
        </p>
      </div>

      {!isFiltered && (
        <Button
          variant="brand"
          size="md"
          onClick={onCreateFirst}
          aria-label="Create your first project"
          leftIcon={
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          }
        >
          Create your first project
        </Button>
      )}
    </div>
  );
}

// ── ProjectList ───────────────────────────────────────────────────────────────

export default function ProjectList({ projects, view, onEdit, onDelete, onCreateFirst, isFiltered }) {
  const isLoading = projects === null;

  const gridClass = view === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
    : 'flex flex-col gap-3';

  if (isLoading) {
    return (
      <div className={gridClass} aria-label="Loading projects" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} view={view} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={gridClass}>
        <EmptyState isFiltered={isFiltered} onCreateFirst={onCreateFirst} />
      </div>
    );
  }

  return (
    <div className={gridClass} role="list" aria-label={`${projects.length} project${projects.length !== 1 ? 's' : ''}`}>
      {projects.map((project) => (
        <div key={project.id} role="listitem">
          <ProjectCard
            project={project}
            view={view}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
