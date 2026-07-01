/**
 * features/templates/CategoryTabs.jsx
 * Horizontally scrollable category tab bar.
 * Highlights the active category; scrolls selected tab into view.
 *
 * Props
 *   categories    string[]
 *   active        string
 *   onChange      fn(string)
 *   counts        Record<string, number>  (optional — shows count badge)
 */
import { useEffect, useRef } from 'react';
import { cn }                from '../../utils/cn';

export default function CategoryTabs({ categories, active, onChange, counts = {} }) {
  const containerRef = useRef(null);
  const activeRef    = useRef(null);

  // Scroll active tab into view on category change
  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block:    'nearest',
        inline:   'center',
      });
    }
  }, [active]);

  return (
    <nav
      aria-label="Template categories"
      className="relative"
    >
      {/* Fade masks for scroll indication */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[var(--color-bg-subtle)] to-transparent z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--color-bg-subtle)] to-transparent z-10" />

      <div
        ref={containerRef}
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-1 overflow-x-auto scroll-smooth pb-1 px-1 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = cat === active;
          const count    = counts[cat];
          return (
            <button
              key={cat}
              ref={isActive ? activeRef : null}
              role="tab"
              aria-selected={isActive}
              aria-label={`${cat}${count !== undefined ? `, ${count} templates` : ''}`}
              onClick={() => onChange(cat)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-[var(--radius-full)] px-3.5 py-1.5',
                'text-[var(--text-sm)] font-[var(--weight-medium)] whitespace-nowrap',
                'transition-[color,background-color,border-color,box-shadow] duration-[var(--duration-fast)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                isActive
                  ? [
                    'bg-[var(--color-brand)] text-white',
                    'shadow-[var(--shadow-xs)]',
                  ]
                  : [
                    'text-[var(--color-text-secondary)]',
                    'hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
                  ],
              )}
            >
              {cat}
              {count !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-px text-[var(--text-2xs)] font-[var(--weight-semibold)] leading-none',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]',
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
