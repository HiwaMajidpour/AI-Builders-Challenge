/**
 * features/templates/TemplatePreview.jsx
 * Right-side slide-in panel (desktop) / bottom drawer (mobile)
 * for previewing a template before using it.
 *
 * Props
 *   template    Template | null
 *   onClose     fn()
 *   onFavorite  fn(id)
 *   onUse       fn(template)
 */
import { useEffect, useRef } from 'react';
import { createPortal }      from 'react-dom';
import { cn }                from '../../utils/cn';
import Badge                 from '../../components/ui/Badge';
import Button                from '../../components/ui/Button';

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

function StarIcon({ filled }) {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ── TemplatePreview ────────────────────────────────────────────────────────────

export default function TemplatePreview({ template, onClose, onFavorite, onUse }) {
  const panelRef  = useRef(null);
  const closeRef  = useRef(null);
  const isVisible = Boolean(template);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isVisible) return;
    // Focus the close button on open
    setTimeout(() => closeRef.current?.focus(), 60);

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wasMobile = window.innerWidth < 768;
    if (isVisible && wasMobile) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  if (!template) return null;

  const { title, description, category, difficulty, estimatedTime, favorite, coverColor, preview } = template;

  const panel = (
    <>
      {/* ── Mobile backdrop ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
          'md:hidden',
          isVisible ? 'block' : 'hidden',
        )}
      />

      {/* ── Panel ── */}
      <div
        ref={panelRef}
        role="complementary"
        aria-label={`Template preview: ${title}`}
        className={cn(
          // Desktop: fixed right-side panel
          'hidden md:flex md:flex-col',
          'fixed right-0 top-0 bottom-0 z-40',
          'w-[420px] border-l border-[var(--color-border)]',
          'bg-[var(--color-bg-elevated)] shadow-[var(--shadow-xl)]',
          'overflow-hidden',
          // Slide-in animation
          'translate-x-0 animate-slide-left',
        )}
      >
        <PanelContent
          title={title}
          description={description}
          category={category}
          difficulty={difficulty}
          estimatedTime={estimatedTime}
          favorite={favorite}
          coverColor={coverColor}
          preview={preview}
          closeRef={closeRef}
          onClose={onClose}
          onFavorite={() => onFavorite(template.id)}
          onUse={() => onUse(template)}
        />
      </div>

      {/* ── Mobile bottom drawer ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Template preview: ${title}`}
        className={cn(
          'md:hidden fixed bottom-0 left-0 right-0 z-50',
          'flex max-h-[85vh] flex-col',
          'rounded-t-[var(--radius-2xl)] border-t border-[var(--color-border)]',
          'bg-[var(--color-bg-elevated)] shadow-[var(--shadow-2xl)]',
          'overflow-hidden animate-slide-up',
        )}
      >
        {/* Drag handle */}
        <div
          aria-hidden="true"
          className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-[var(--color-border-strong)]"
        />
        <div className="flex-1 overflow-y-auto">
          <PanelContent
            title={title}
            description={description}
            category={category}
            difficulty={difficulty}
            estimatedTime={estimatedTime}
            favorite={favorite}
            coverColor={coverColor}
            preview={preview}
            closeRef={closeRef}
            onClose={onClose}
            onFavorite={() => onFavorite(template.id)}
            onUse={() => onUse(template)}
          />
        </div>
      </div>
    </>
  );

  return createPortal(panel, document.body);
}

// ── PanelContent ──────────────────────────────────────────────────────────────

function PanelContent({
  title, description, category, difficulty, estimatedTime,
  favorite, coverColor, preview,
  closeRef, onClose, onFavorite, onUse,
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-5 py-4 border-b border-[var(--color-border)]"
        style={{ borderTopColor: coverColor, borderTopWidth: '3px' }}
      >
        <div className="flex flex-col gap-1.5 min-w-0">
          <h2 className="text-[var(--text-base)] font-[var(--weight-semibold)] text-[var(--color-text-primary)] leading-[var(--leading-snug)] line-clamp-2">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={CATEGORY_VARIANT[category] ?? 'default'} size="sm">{category}</Badge>
            <Badge variant={DIFFICULTY_VARIANT[difficulty] ?? 'default'} size="sm">{difficulty}</Badge>
            <span className="flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-text-muted)]">
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {estimatedTime}
            </span>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="shrink-0 flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M15 1 1 15M1 1l14 14" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <div className="shrink-0 px-5 py-4 border-b border-[var(--color-border)]">
        <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
          {description}
        </p>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <h3 className="mb-3 text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
          Preview
        </h3>
        <pre
          className={cn(
            'whitespace-pre-wrap font-[var(--font-sans)] text-[var(--text-xs)]',
            'text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]',
          )}
        >
          {preview}
        </pre>
      </div>

      {/* Footer actions */}
      <div className="shrink-0 flex items-center gap-2.5 border-t border-[var(--color-border)] px-5 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onFavorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          leftIcon={<StarIcon filled={favorite} />}
          className={cn(
            'shrink-0',
            favorite ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)]',
          )}
        >
          {favorite ? 'Saved' : 'Favorite'}
        </Button>
        <Button
          variant="brand"
          size="sm"
          onClick={onUse}
          aria-label={`Use template: ${title}`}
          fullWidth
        >
          Use Template
        </Button>
      </div>
    </div>
  );
}
