/**
 * features/projects/ProjectsPage.jsx
 *
 * Dashboard-style project management page.
 *
 * Header  — title · count · Create button
 * Toolbar — Search · Filters · Sort · Grid/List toggle
 * Content — ProjectList (grid or list, with skeleton + empty states)
 * Modals  — CreateProjectModal · EditProjectModal · DeleteProjectModal
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useProjects } from '../../hooks/useProjects';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProjectSearch from './ProjectSearch';
import ProjectFilters from './ProjectFilters';
import ProjectList from './ProjectList';
import CreateProjectModal from './CreateProjectModal';
import EditProjectModal from './EditProjectModal';
import DeleteProjectModal from './DeleteProjectModal';

// ── Sort options ──────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A → Z' },
  { value: 'progress', label: 'Progress' },
];

function sortProjects(projects, sort) {
  const arr = [...projects];
  switch (sort) {
    case 'newest': return arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    case 'oldest': return arr.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    case 'az': return arr.sort((a, b) => a.title.localeCompare(b.title));
    case 'progress': return arr.sort((a, b) => b.progress - a.progress);
    default: return arr;
  }
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const GridIcon = (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="13" y="3" width="7" height="7" />
    <rect x="13" y="13" width="7" height="7" />
    <rect x="3" y="13" width="7" height="7" />
  </svg>
);

const ListIcon = (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const PlusIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ── ProjectsPage ──────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const {
    projects,
    loading,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
  } = useProjects();

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ genre: 'All', status: 'All' });
  const [sort, setSort] = useState('newest');

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Load projects on mount (or if context hasn't loaded yet) ─────────────────
  useEffect(() => {
    if (projects === null) loadProjects();
  }, [projects, loadProjects]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const patchFilters = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setSearch('');
    setFilters({ genre: 'All', status: 'All' });
  }, []);

  const handleDuplicate = useCallback(
    async (project) => {
      try {
        await duplicateProject(project.id);
        await loadProjects();
      } catch (error) {
        console.error('Duplicate failed:', error);
      }
    },
    [duplicateProject, loadProjects]
  );

  // ── Derived / filtered list ───────────────────────────────────────────────────
  const displayed = useMemo(() => {
    if (!projects) return null;

    let list = projects;

    // Text search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.genre.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q),
      );
    }

    // Genre filter
    if (filters.genre !== 'All') {
      list = list.filter((p) => p.genre === filters.genre);
    }

    // Status filter
    if (filters.status !== 'All') {
      list = list.filter((p) => p.status === filters.status);
    }

    return sortProjects(list, sort);
  }, [projects, search, filters, sort]);

  const isFiltered = search.trim() !== '' || filters.genre !== 'All' || filters.status !== 'All';

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">

      {/* ── Page header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[var(--text-xl)] font-[var(--weight-bold)] leading-[var(--leading-snug)] text-[var(--color-text-primary)]">
              Projects
            </h1>
            {projects !== null && (
              <Badge variant="default" size="sm">
                {projects.length}
              </Badge>
            )}
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Manage your stories, scripts, and creative works.
          </p>
        </div>

        <Button
          variant="brand"
          size="md"
          onClick={() => setCreateOpen(true)}
          aria-label="Create a new project"
          leftIcon={PlusIcon}
        >
          New Project
        </Button>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-end gap-3">
        {/* Search */}
        <ProjectSearch value={search} onChange={setSearch} />

        {/* Filters */}
        <ProjectFilters filters={filters} onChange={patchFilters} onReset={resetFilters} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort */}
        <div className="flex flex-col gap-1">
          <label htmlFor="sort-select" className="text-[var(--text-xs)] font-[var(--weight-medium)] text-[var(--color-text-muted)]">
            Sort
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort projects"
            className={cn(
              'h-9 rounded-[var(--radius-md)] border border-[var(--color-border)]',
              'bg-[var(--color-bg-elevated)] px-3 pr-8 text-[var(--text-sm)]',
              'text-[var(--color-text-primary)] cursor-pointer',
              'focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)]',
            )}
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="flex items-end gap-0.5" role="group" aria-label="View mode">
          <Button
            variant={view === 'grid' ? 'primary' : 'secondary'}
            size="icon"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className="rounded-r-none"
          >
            {GridIcon}
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'secondary'}
            size="icon"
            onClick={() => setView('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className="rounded-l-none"
          >
            {ListIcon}
          </Button>
        </div>
      </div>

      {/* ── Results summary (when filtering) ── */}
      {isFiltered && displayed !== null && (
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]" aria-live="polite" aria-atomic="true">
          {displayed.length === 0
            ? 'No projects match your criteria.'
            : `${displayed.length} project${displayed.length !== 1 ? 's' : ''} found`}
        </p>
      )}

      {/* ── Error banner ── */}
      {!loading && projects === null && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] px-4 py-3"
        >
          <p className="text-[var(--text-sm)] text-[var(--color-error-text)]">
            Could not load projects. Check your connection and try again.
          </p>
          <Button variant="secondary" size="sm" onClick={loadProjects}>
            Retry
          </Button>
        </div>
      )}

      {/* ── Project list ── */}
      <ProjectList
        projects={displayed}
        view={view}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
        onDuplicate={handleDuplicate}
        onCreateFirst={() => setCreateOpen(true)}
        isFiltered={isFiltered}
      />

      {/* ── Modals ── */}
      <CreateProjectModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createProject}
      />
      <EditProjectModal
        isOpen={Boolean(editTarget)}
        onClose={() => setEditTarget(null)}
        project={editTarget}
        onUpdate={updateProject}
      />
      <DeleteProjectModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        project={deleteTarget}
        onDelete={deleteProject}
      />

    </div>
  );
}
