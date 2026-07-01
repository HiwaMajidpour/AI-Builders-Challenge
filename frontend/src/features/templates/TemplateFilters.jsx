/**
 * features/templates/TemplateFilters.jsx
 * Difficulty, featured-only, and favorites-only filter controls.
 *
 * Props
 *   filters   { difficulty: string, featuredOnly: bool, favoritesOnly: bool }
 *   onChange  fn(partial)
 *   onReset   fn()
 */
import { cn }                 from '../../utils/cn';
import Button                 from '../../components/ui/Button';
import { DIFFICULTY_LEVELS }  from './data/templateCategories';

// ── StarIcon ──────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <svg
    width="13" height="13"
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

// ── ToggleChip ─────────────────────────────────────────────────────────────────
function ToggleChip({ active, onClick, children, ariaLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-[var(--radius-full)] border px-3 py-1',
        'text-[var(--text-xs)] font-[var(--weight-medium)]',
        'transition-[color,background-color,border-color] duration-[var(--duration-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
        active
          ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)] text-[var(--color-brand)]'
          : 'border-[var(--color-border)] bg-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]',
      )}
    >
      {children}
    </button>
  );
}

export default function TemplateFilters({ filters, onChange, onReset }) {
  const isDirty =
    filters.difficulty !== 'All' ||
    filters.featuredOnly ||
    filters.favoritesOnly;

  return (
    <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Template filters">

      {/* Difficulty select */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="tpl-difficulty"
          className="text-[var(--text-xs)] font-[var(--weight-medium)] text-[var(--color-text-muted)] whitespace-nowrap"
        >
          Difficulty
        </label>
        <select
          id="tpl-difficulty"
          value={filters.difficulty}
          onChange={(e) => onChange({ difficulty: e.target.value })}
          className={cn(
            'h-8 rounded-[var(--radius-md)] border border-[var(--color-border)]',
            'bg-[var(--color-bg-elevated)] px-2.5 pr-7 text-[var(--text-xs)]',
            'text-[var(--color-text-primary)] cursor-pointer',
            'focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)]',
            'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
          )}
        >
          {DIFFICULTY_LEVELS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Featured toggle */}
      <ToggleChip
        active={filters.featuredOnly}
        onClick={() => onChange({ featuredOnly: !filters.featuredOnly })}
        ariaLabel={`Featured only ${filters.featuredOnly ? '(active)' : ''}`}
      >
        <StarIcon filled={filters.featuredOnly} />
        Featured
      </ToggleChip>

      {/* Favorites toggle */}
      <ToggleChip
        active={filters.favoritesOnly}
        onClick={() => onChange({ favoritesOnly: !filters.favoritesOnly })}
        ariaLabel={`Favorites only ${filters.favoritesOnly ? '(active)' : ''}`}
      >
        <svg width="13" height="13" fill={filters.favoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Favorites
      </ToggleChip>

      {isDirty && (
        <Button
          variant="ghost"
          size="xs"
          onClick={onReset}
          aria-label="Reset all filters"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        >
          Reset
        </Button>
      )}
    </div>
  );
}
