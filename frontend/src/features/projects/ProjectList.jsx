/**
 * features/projects/ProjectList.jsx
 * Displays projects in grid or list view with loading and empty states.
 *
 * Props:
 *   projects        Project[] | null
 *   view            'grid' | 'list'
 *   onEdit          function
 *   onDelete        function
 *   onDuplicate     function
 *   onCreateFirst   function
 *   isFiltered      boolean
 */

import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import ProjectCard from './ProjectCard';

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton Card
// ─────────────────────────────────────────────────────────────────────────────

function SkeletonCard({ view }) {
  const isGrid = view === 'grid';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
        isGrid ? 'flex flex-col' : 'flex flex-row'
      )}
    >
      <div
        className={cn(
          'shrink-0 bg-[var(--color-bg-surface)]',
          isGrid ? 'h-2 w-full' : 'w-1.5'
        )}
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-2/3 rounded bg-[var(--color-bg-surface)]" />

        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-[var(--color-bg-surface)]" />
          <div className="h-5 w-20 rounded-full bg-[var(--color-bg-surface)]" />
        </div>

        {isGrid && (
          <div className="h-3 w-full rounded bg-[var(--color-bg-surface)]" />
        )}

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

// ─────────────────────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ isFiltered, onCreateFirst }) {
  return (
    <div
      role="status"
      className="col-span-full flex flex-col items-center justify-center gap-5 py-20 text-center"
    >
      <div
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-2xl)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        📁
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          {isFiltered
            ? 'No matching projects'
            : 'No projects yet'}
        </h3>

        <p className="text-sm text-[var(--color-text-muted)]">
          {isFiltered
            ? 'Try changing your search or filters.'
            : 'Create your first project to get started.'}
        </p>
      </div>

      {!isFiltered && (
        <Button
          variant="brand"
          onClick={onCreateFirst}
        >
          Create Project
        </Button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project List
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectList({
  projects,
  view,
  onEdit,
  onDelete,
  onDuplicate,
  onCreateFirst,
  isFiltered,
}) {
  const loading = projects === null;

  const layout =
    view === 'grid'
      ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
      : 'flex flex-col gap-3';

  if (loading) {
    return (
      <div
        className={layout}
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard
            key={index}
            view={view}
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={layout}>
        <EmptyState
          isFiltered={isFiltered}
          onCreateFirst={onCreateFirst}
        />
      </div>
    );
  }

  return (
    <div
      className={layout}
      role="list"
    >
      {projects.map((project) => (
        <div
          key={project.id}
          role="listitem"
        >
          <ProjectCard
            project={project}
            view={view}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        </div>
      ))}
    </div>
  );
}