/**
 * features/projects/ProjectFilters.jsx
 * Genre and status filter dropdowns + reset button.
 *
 * Props
 *   filters     { genre: string, status: string }
 *   onChange    fn(partial)
 *   onReset     fn()
 */
import { cn }                       from '../../utils/cn';
import Button                       from '../../components/ui/Button';
import { GENRES, STATUSES }         from './data/projectConstants';

function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-[var(--text-xs)] font-[var(--weight-medium)] text-[var(--color-text-muted)]"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={cn(
          'h-9 rounded-[var(--radius-md)] border border-[var(--color-border)]',
          'bg-[var(--color-bg-elevated)] px-3 pr-8 text-[var(--text-sm)]',
          'text-[var(--color-text-primary)]',
          'focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)]',
          'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
          'cursor-pointer',
        )}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default function ProjectFilters({ filters, onChange, onReset }) {
  const isDirty = filters.genre !== 'All' || filters.status !== 'All';

  return (
    <div className="flex flex-wrap items-end gap-3" role="group" aria-label="Project filters">
      <FilterSelect
        id="filter-genre"
        label="Genre"
        value={filters.genre}
        options={GENRES}
        onChange={(v) => onChange({ genre: v })}
      />
      <FilterSelect
        id="filter-status"
        label="Status"
        value={filters.status}
        options={STATUSES}
        onChange={(v) => onChange({ status: v })}
      />
      {isDirty && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          aria-label="Reset all filters"
          className="self-end text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        >
          Reset
        </Button>
      )}
    </div>
  );
}
