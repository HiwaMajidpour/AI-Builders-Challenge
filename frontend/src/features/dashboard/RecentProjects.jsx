/**
 * features/dashboard/RecentProjects.jsx
 * Lists up to 5 recent projects with status badge, progress bar and empty state.
 */
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';
import { formatRelativeTime } from '../../utils/formatters';
import { MOCK_PROJECTS } from './data/mockData';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  'draft':       { label: 'Draft',       variant: 'default',  dot: true },
  'in-progress': { label: 'In Progress', variant: 'accent',   dot: true },
  'completed':   { label: 'Completed',   variant: 'success',  dot: true },
};

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, status }) {
  const colorMap = {
    'draft':       'bg-[var(--color-border-strong)]',
    'in-progress': 'bg-[var(--color-accent)]',
    'completed':   'bg-[var(--color-success)]',
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
          colorMap[status] ?? 'bg-[var(--color-border-strong)]',
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ── Skeleton row ──────────────────────────────────────────────────────────────
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

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      {/* Illustration */}
      <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-brand-subtle)]">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-brand)]" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          No projects yet
        </p>
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
          Start your first story and it will appear here.
        </p>
      </div>
      <Button
        as={Link}
        to="/dashboard/projects/new"
        variant="primary"
        size="sm"
      >
        + Create your first project
      </Button>
    </div>
  );
}

// ── RecentProjects ────────────────────────────────────────────────────────────
export default function RecentProjects({ projects = MOCK_PROJECTS, isLoading = false }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <CardHeader className="px-5 pt-5 pb-0 mb-0">
        <CardTitle>Recent Projects</CardTitle>
        <Button
          as={Link}
          to="/dashboard/projects"
          variant="ghost"
          size="sm"
          aria-label="View all projects"
        >
          View all →
        </Button>
      </CardHeader>

      {isLoading ? (
        <ul aria-label="Loading projects" className="divide-y divide-[var(--color-border)] px-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectRowSkeleton key={i} />
          ))}
        </ul>
      ) : projects.length === 0 ? (
        <div className="px-5 pb-5">
          <EmptyProjects />
        </div>
      ) : (
        <ul
          aria-label="Recent projects"
          className="divide-y divide-[var(--color-border)] px-5"
        >
          {projects.map((project) => {
            const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.draft;
            return (
              <li key={project.id} className="py-3.5">
                <div className="flex items-start gap-4">
                  {/* Text block */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/projects/${project.id}`}
                        className="truncate text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)] hover:text-[var(--color-brand)] transition-colors"
                        aria-label={`Open project: ${project.title}`}
                      >
                        {project.title}
                      </Link>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[var(--text-xs)] text-[var(--color-text-muted)]">
                      <span>{project.genre}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={project.updatedAt}>
                        {formatRelativeTime(project.updatedAt)}
                      </time>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2">
                      <ProgressBar value={project.progress} status={project.status} />
                    </div>
                    <p className="mt-1 text-[var(--text-2xs)] text-[var(--color-text-muted)]">
                      {project.progress}% complete
                      {project.wordCount ? ` · ${project.wordCount.toLocaleString()} words` : ''}
                    </p>
                  </div>

                  {/* Status badge */}
                  <Badge
                    variant={statusCfg.variant}
                    dot={statusCfg.dot}
                    className="mt-0.5 shrink-0"
                  >
                    {statusCfg.label}
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
