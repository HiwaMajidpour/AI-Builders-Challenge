/**
 * features/dashboard/RecentProjects.jsx
 * Lists up to 5 recent projects with status badge, progress bar and empty state.
 */

import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { useProjects } from '../../hooks/useProjects';

import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

import { cn } from '../../utils/cn';
import { formatRelativeTime } from '../../utils/formatters';

// ─────────────────────────────────────────────────────────────────────────────
// Status config
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Draft: {
    label: 'Draft',
    variant: 'default',
    dot: true,
  },

  'In Progress': {
    label: 'In Progress',
    variant: 'accent',
    dot: true,
  },

  Completed: {
    label: 'Completed',
    variant: 'success',
    dot: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Progress bar
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBar({ value, status }) {
  const colorMap = {
    Draft: 'bg-[var(--color-border-strong)]',
    'In Progress': 'bg-[var(--color-accent)]',
    Completed: 'bg-[var(--color-success)]',
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${value}% complete`}
      className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-surface)]"
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-500',
          colorMap[status] ?? colorMap.Draft
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────────────────

function ProjectRowSkeleton() {
  return (
    <li className="flex items-center gap-4 py-3">
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="h-4 w-40 rounded skeleton animate-shimmer" />
        <div className="h-3 w-24 rounded skeleton animate-shimmer" />
        <div className="mt-2 h-1.5 w-full rounded-full skeleton animate-shimmer" />
      </div>

      <div className="h-5 w-16 shrink-0 rounded-full skeleton animate-shimmer" />
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────────────────────

function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-brand-subtle)]">
        📚
      </div>

      <div>
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
          No projects yet
        </p>

        <p className="text-xs text-[var(--color-text-muted)]">
          Start your first story and it will appear here.
        </p>
      </div>

      <Button
        as={Link}
        to="/dashboard/projects"
        variant="primary"
        size="sm"
      >
        Create Project
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RecentProjects
// ─────────────────────────────────────────────────────────────────────────────

export default function RecentProjects({ isLoading = false }) {
  const { projects = [] } = useProjects();

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      )
      .slice(0, 5);
  }, [projects]);

  return (
    <Card padding="none" className="overflow-hidden">
      <CardHeader className="mb-0 px-5 pb-0 pt-5">
        <CardTitle>Recent Projects</CardTitle>

        <Button
          as={Link}
          to="/dashboard/projects"
          variant="ghost"
          size="sm"
        >
          View all →
        </Button>
      </CardHeader>

      {isLoading ? (
        <ul className="divide-y divide-[var(--color-border)] px-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectRowSkeleton key={index} />
          ))}
        </ul>
      ) : recentProjects.length === 0 ? (
        <div className="px-5 pb-5">
          <EmptyProjects />
        </div>
      ) : (
        <ul className="divide-y divide-[var(--color-border)] px-5">
          {recentProjects.map((project) => {
            const status =
              STATUS_CONFIG[project.status] ??
              STATUS_CONFIG.Draft;

            return (
              <li key={project.id} className="py-3.5">
                <div className="flex items-start gap-4">

                  <div className="min-w-0 flex-1">

                    <Link
                      to={`/dashboard/projects/${project.id}`}
                      className="truncate text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand)]"
                    >
                      {project.title}
                    </Link>

                    <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                      <span>{project.genre}</span>

                      <span>•</span>

                      <time dateTime={project.updatedAt}>
                        {formatRelativeTime(project.updatedAt)}
                      </time>
                    </div>

                    <div className="mt-2">
                      <ProgressBar
                        value={project.progress}
                        status={project.status}
                      />
                    </div>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {project.progress}% complete

                      {project.wordCount
                        ? ` · ${project.wordCount.toLocaleString()} words`
                        : ''}
                    </p>
                  </div>

                  <Badge
                    variant={status.variant}
                    dot={status.dot}
                  >
                    {status.label}
                  </Badge>

                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}