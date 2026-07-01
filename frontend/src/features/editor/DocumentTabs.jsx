/**
 * features/editor/DocumentTabs.jsx
 * Horizontal tab bar for open documents.
 *
 * Props
 *   tabs            Array<{ id, title }>
 *   activeId        string | null
 *   onSelect        fn(id)
 *   onClose         fn(id)
 */
import { cn } from '../../utils/cn';

export default function DocumentTabs({ tabs, activeId, onSelect, onClose }) {
  if (!tabs || tabs.length === 0) return null;

  return (
    <div
      role="tablist"
      aria-label="Open documents"
      className="flex items-stretch overflow-x-auto border-b border-[var(--color-border)] bg-[var(--color-bg-surface)] scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            className={cn(
              'group flex shrink-0 items-center gap-1.5 border-r border-[var(--color-border)]',
              'px-3 py-2 max-w-[160px]',
              'transition-colors duration-[var(--duration-fast)]',
              isActive
                ? 'bg-[var(--color-bg-elevated)] border-b-2 border-b-[var(--color-brand)]'
                : 'hover:bg-[var(--color-bg-elevated)] cursor-pointer',
            )}
          >
            <button
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(tab.id)}
              className="min-w-0 flex-1 truncate text-left text-[var(--text-xs)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              style={{
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
                fontWeight: isActive ? 'var(--weight-medium)' : 'var(--weight-normal)',
              }}
            >
              {tab.title || 'Untitled'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
              aria-label={`Close ${tab.title ?? 'Untitled'}`}
              className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm',
                'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)]',
                isActive && 'opacity-100',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]',
              )}
            >
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="10" y1="0" x2="0" y2="10" />
                <line x1="0"  y1="0" x2="10" y2="10" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
