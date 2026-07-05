/**
 * features/ai/AIHistoryPanel.jsx
 *
 * Right / drawer panel of AI Studio.
 * Lists the last 10 generations; clicking one loads it into the result panel.
 *
 * Props
 *   history          array of generation objects
 *   currentResult    object | null
 *   onSelect         fn(item)
 *   onDelete         fn(id)
 *   onClearAll       fn()
 *   onReusePrompt    fn(item)
 */

import { useMemo, useState } from 'react';

import { cn } from '../../utils/cn';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getAIStatistics } from '../../utils/aiStatistics';
import AIStatisticsCard from './AIStatisticsCard';

// ─────────────────────────────────────────────────────────────

function formatRelTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return 'Just now';

  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);

  return `${days}d ago`;
}

// ─────────────────────────────────────────────────────────────

const TYPE_VARIANT = {
  Story: 'brand',
  Script: 'accent',
  Character: 'success',
  Dialogue: 'warning',
  Outline: 'default',
  'World Building': 'default',
};

// ─────────────────────────────────────────────────────────────

function EmptyHistory() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">

      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 8V4H8" />
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <path d="M2 14l4-4 4 4 4-4 4 4" />
        </svg>
      </div>

      <p className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-secondary)]">
        No history yet
      </p>

      <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
        Your generations appear here automatically.
      </p>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function HistoryItem({
  item,
  isActive,
  onSelect,
  onDelete,
  onReusePrompt,
  onTogglePin,
}) {
  return (
    <li
      className={cn(
        'group relative',
        isActive && 'z-10',
      )}
    >
      <div className="flex flex-col gap-2">

        <button
          type="button"
          onClick={() => onSelect(item)}
          aria-pressed={isActive}
          aria-label={`Load generation: ${item.title}`}
          className={cn(
            'w-full rounded-[var(--radius-lg)] border p-3 text-left',
            'transition-all duration-[var(--duration-fast)]',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[var(--color-border-focus)]',
            isActive
              ? 'border-[var(--color-brand-border)] bg-[var(--color-brand-subtle)]'
              : 'border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]',
          )}
        >
          <p
            className={cn(
              'truncate text-[var(--text-sm)] font-[var(--weight-medium)]',
              isActive
                ? 'text-[var(--color-brand)]'
                : 'text-[var(--color-text-primary)]',
            )}
          >
            {item.title}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={TYPE_VARIANT[item.type] ?? 'default'}
                size="sm"
              >
                {item.type}
              </Badge>

              <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                {item.wordCount}w
              </span>
            </div>

            <span className="text-[10px] text-[var(--color-text-muted)]">
              {formatRelTime(item.createdAt)}
            </span>
          </div>

          {item.prompt && (
            <p
              className="mt-3 line-clamp-2 text-[11px] text-[var(--color-text-muted)]"
              title={item.prompt}
            >
              {item.prompt}
            </p>
          )}
        </button>

        <div className="flex justify-between">

          <Button
            size="xs"
            variant="ghost"
            onClick={() => onTogglePin(item.id)}
          >
            {item.pinned ? '⭐ Pinned' : '☆ Pin'}
          </Button>

          {onReusePrompt && (
            <Button
              size="xs"
              variant="secondary"
              onClick={() => onReusePrompt(item)}
            >
              Reuse Prompt
            </Button>
          )}

        </div>

      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
        aria-label={`Delete generation: ${item.title}`}
        className={cn(
          'absolute right-2 top-2',
          'flex h-6 w-6 items-center justify-center',
          'rounded-[var(--radius-sm)]',
          'text-[var(--color-text-muted)]',
          'opacity-0 transition-all duration-[var(--duration-fast)]',
          'group-hover:opacity-100',
          'hover:bg-[var(--color-error)] hover:text-white',
          'focus-visible:opacity-100',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[var(--color-error)]',
        )}
      >
        <svg
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────

export default function AIHistoryPanel({
  history,
  currentResult,
  onSelect,
  onDelete,
  onClearAll,
  onReusePrompt,
  onTogglePin,
}) {

  const hasHistory = history.length > 0;

  // Search value
  const [search, setSearch] = useState('');

  // Filter history by title, prompt or type
  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = history.filter((item) => {
      if (!query) return true;

      return (
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.prompt ?? '').toLowerCase().includes(query)
      );
    });

    return filtered.sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return Number(b.pinned) - Number(a.pinned);
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  }, [history, search]);

  const statistics = useMemo(() => {
    return getAIStatistics(history);
  }, [history]);

  return (
    <section
      aria-label="Generation history"
      className="flex h-full flex-col overflow-hidden"
    >

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">

        <div className="flex items-center gap-2">

          <h2 className="text-[var(--text-sm)] font-semibold">
            History
          </h2>

          {hasHistory && (
            <Badge
              variant="default"
              size="sm"
              dot
            >
              {history.length}
            </Badge>
          )}

        </div>

        {hasHistory && (
          <Button
            size="xs"
            variant="ghost"
            onClick={onClearAll}
          >
            Clear all
          </Button>
        )}

      </div>

      {hasHistory && (
        <div className="mt-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..."
            aria-label="Search history"
          />
        </div>
      )}

      {hasHistory && (
        <AIStatisticsCard
          statistics={statistics}
        />
      )}

      {/* History List */}

      <div className="mt-4 flex-1 overflow-y-auto">

        {hasHistory ? (
          filteredHistory.length > 0 ? (

            <ul className="space-y-2">

              {filteredHistory.map((item) => (

                <HistoryItem
                  key={item.id}
                  item={item}
                  isActive={currentResult?.id === item.id}
                  onSelect={onSelect}
                  onDelete={onDelete}
                  onReusePrompt={onReusePrompt}
                  onTogglePin={onTogglePin}
                />

              ))}

            </ul>

          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                No matching generations found.
              </p>
            </div>
          )
        ) : (
          <EmptyHistory />
        )}

      </div>

      {hasHistory && (

        <div className="mt-4 border-t border-[var(--color-border)] pt-3">

          <p className="text-center text-[11px] text-[var(--color-text-muted)]">
            Showing {history.length} of {history.length} · Last 10 kept
          </p>

        </div>

      )}

    </section>
  );
}