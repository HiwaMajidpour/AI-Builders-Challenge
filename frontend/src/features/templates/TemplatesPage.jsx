/**
 * features/templates/TemplatesPage.jsx
 *
 * Dashboard-style templates gallery page.
 *
 * Layout
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  Header: Title · Count · Featured badge                              │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │  CategoryTabs (scrollable)                                           │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │  Toolbar: Search · Filters                                           │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │  Featured strip (when "All" is selected and no active search)        │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │  TemplateGrid                                                        │
 * └──────────────────────────────────────────────────────────────────────┘
 * TemplatePreview slides in from the right (portal).
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate }          from 'react-router-dom';
import { toast }                from 'sonner';
import { cn }                   from '../../utils/cn';
import { useTemplates }         from '../../hooks/useTemplates';
import { ROUTES }               from '../../constants/routes';
import Badge                    from '../../components/ui/Badge';
import Button                   from '../../components/ui/Button';
import CategoryTabs              from './CategoryTabs';
import TemplateSearch            from './TemplateSearch';
import TemplateFilters           from './TemplateFilters';
import TemplateGrid              from './TemplateGrid';
import TemplatePreview           from './TemplatePreview';
import { TEMPLATE_CATEGORIES }  from './data/templateCategories';

// ── Default filter state ──────────────────────────────────────────────────────

const DEFAULT_FILTERS = {
  difficulty:    'All',
  featuredOnly:  false,
  favoritesOnly: false,
};

// ── TemplatesPage ─────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const { templates, loading, loadTemplates, selectTemplate, selectedTemplate, toggleFavorite } = useTemplates();
  const navigate = useNavigate();

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('All');
  const [search,         setSearch]         = useState('');
  const [filters,        setFiltersState]   = useState(DEFAULT_FILTERS);
  const [previewOpen,    setPreviewOpen]     = useState(false);

  const patchFilters = useCallback((patch) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetAll = useCallback(() => {
    setSearch('');
    setActiveCategory('All');
    setFiltersState(DEFAULT_FILTERS);
  }, []);

  // ── Load templates on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (templates === null && !loading) loadTemplates();
  }, [templates, loading, loadTemplates]);

  // ── Category counts ───────────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    if (!templates) return {};
    const counts = { All: templates.length };
    for (const t of templates) {
      counts[t.category] = (counts[t.category] ?? 0) + 1;
    }
    return counts;
  }, [templates]);

  // ── Derived / filtered list ───────────────────────────────────────────────
  const displayed = useMemo(() => {
    if (!templates) return null;

    let list = templates;

    // Category tab
    if (activeCategory !== 'All') {
      list = list.filter((t) => t.category === activeCategory);
    }

    // Text search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }

    // Difficulty
    if (filters.difficulty !== 'All') {
      list = list.filter((t) => t.difficulty === filters.difficulty);
    }

    // Featured only
    if (filters.featuredOnly) {
      list = list.filter((t) => t.featured);
    }

    // Favorites only
    if (filters.favoritesOnly) {
      list = list.filter((t) => t.favorite);
    }

    return list;
  }, [templates, activeCategory, search, filters]);

  const isFiltered =
    activeCategory !== 'All' ||
    search.trim() !== '' ||
    filters.difficulty !== 'All' ||
    filters.featuredOnly ||
    filters.favoritesOnly;

  // ── Featured strip data (shown only on All tab, no active text search) ────
  const featuredTemplates = useMemo(() => {
    if (!templates) return [];
    return templates.filter((t) => t.featured);
  }, [templates]);

  const showFeaturedStrip =
    activeCategory === 'All' &&
    !search.trim() &&
    !filters.featuredOnly &&
    !filters.favoritesOnly &&
    filters.difficulty === 'All' &&
    featuredTemplates.length > 0;

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handlePreview(template) {
    selectTemplate(template);
    setPreviewOpen(true);
  }

  function handleClosePreview() {
    setPreviewOpen(false);
  }

  function handleUse(template) {
    toast.success(`"${template.title}" template applied! Redirecting to AI Studio…`);
    setPreviewOpen(false);
    navigate(ROUTES.AI_STUDIO);
  }

  async function handleFavorite(id) {
    await toggleFavorite(id);
    const tpl = templates?.find((t) => t.id === id);
    if (tpl) {
      toast.success(tpl.favorite ? 'Removed from favorites.' : 'Added to favorites!');
    }
  }

  // ── Featured count badge ──────────────────────────────────────────────────
  const featuredCount = featuredTemplates.length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        // When preview is open on desktop, leave room for the side panel
        previewOpen && 'md:mr-[420px] transition-[margin] duration-[var(--duration-normal)]',
      )}
    >

      {/* ── Page header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[var(--text-xl)] font-[var(--weight-bold)] leading-[var(--leading-snug)] text-[var(--color-text-primary)]">
              Templates
            </h1>
            {templates !== null && (
              <Badge variant="default" size="sm">{templates.length}</Badge>
            )}
            {featuredCount > 0 && (
              <Badge variant="brand" size="sm" dot>
                {featuredCount} featured
              </Badge>
            )}
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Professionally crafted starting points for every type of writing.
          </p>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <CategoryTabs
        categories={TEMPLATE_CATEGORIES}
        active={activeCategory}
        onChange={setActiveCategory}
        counts={categoryCounts}
      />

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        <TemplateSearch value={search} onChange={setSearch} />
        <TemplateFilters filters={filters} onChange={patchFilters} onReset={resetAll} />
      </div>

      {/* ── Results summary ── */}
      {isFiltered && displayed !== null && (
        <p
          className="text-[var(--text-xs)] text-[var(--color-text-muted)]"
          aria-live="polite"
          aria-atomic="true"
        >
          {displayed.length === 0
            ? 'No templates match your criteria.'
            : `${displayed.length} template${displayed.length !== 1 ? 's' : ''} found`}
        </p>
      )}

      {/* ── Featured section (when All + no filters) ── */}
      {showFeaturedStrip && (
        <section aria-labelledby="featured-heading">
          <div className="mb-3 flex items-center gap-2">
            <h2
              id="featured-heading"
              className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]"
            >
              Featured
            </h2>
            <div className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
          </div>
          <TemplateGrid
            templates={featuredTemplates}
            onPreview={handlePreview}
            onFavorite={handleFavorite}
            onUse={handleUse}
            onResetFilters={resetAll}
            isFiltered={false}
          />
        </section>
      )}

      {/* ── Main grid ── */}
      {showFeaturedStrip && (
        <div className="flex items-center gap-2">
          <h2 className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
            All Templates
          </h2>
          <div className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
        </div>
      )}

      {/* ── Error state ── */}
      {!loading && templates === null && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] px-4 py-3"
        >
          <p className="text-[var(--text-sm)] text-[var(--color-error-text)]">
            Could not load templates. Check your connection and try again.
          </p>
          <Button variant="secondary" size="sm" onClick={loadTemplates}>
            Retry
          </Button>
        </div>
      )}

      <TemplateGrid
        templates={displayed}
        onPreview={handlePreview}
        onFavorite={handleFavorite}
        onUse={handleUse}
        onResetFilters={resetAll}
        isFiltered={isFiltered}
      />

      {/* ── Template preview panel (portal) ── */}
      {previewOpen && (
        <TemplatePreview
          template={selectedTemplate}
          onClose={handleClosePreview}
          onFavorite={handleFavorite}
          onUse={handleUse}
        />
      )}

    </div>
  );
}
