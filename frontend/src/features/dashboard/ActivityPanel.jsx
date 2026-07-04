/**
 * features/dashboard/ActivityPanel.jsx
 * Dashboard activity timeline.
 */

import { useMemo } from 'react';

import Card, {
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

import { cn } from '../../utils/cn';
import { formatRelativeTime } from '../../utils/formatters';
import { activityService } from '../../services/activityService';

// ─────────────────────────────────────────────────────────────────────────────
// Activity type configuration
// ─────────────────────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  create: {
    iconBg: 'bg-[var(--color-success-subtle)]',
    iconFg: 'text-[var(--color-success)]',
    icon: '➕',
  },

  update: {
    iconBg: 'bg-[var(--color-accent-subtle)]',
    iconFg: 'text-[var(--color-accent)]',
    icon: '✏️',
  },

  delete: {
    iconBg: 'bg-[var(--color-error-subtle)]',
    iconFg: 'text-[var(--color-error)]',
    icon: '🗑️',
  },

  duplicate: {
    iconBg: 'bg-[var(--color-brand-subtle)]',
    iconFg: 'text-[var(--color-brand)]',
    icon: '📄',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────────────────

function ActivitySkeleton() {
  return (
    <li className="flex gap-3 pb-4">
      <div className="flex flex-col items-center">
        <div className="h-7 w-7 rounded-full skeleton animate-shimmer shrink-0" />
        <div className="mt-1 h-full w-px bg-[var(--color-border)]" />
      </div>

      <div className="flex-1 space-y-1.5 pt-0.5">
        <div className="h-3.5 w-40 rounded skeleton animate-shimmer" />
        <div className="h-3 w-28 rounded skeleton animate-shimmer" />
        <div className="h-3 w-20 rounded skeleton animate-shimmer" />
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ActivityPanel
// ─────────────────────────────────────────────────────────────────────────────

export default function ActivityPanel({
  isLoading = false,
}) {
  const activities = useMemo(() => {
    return activityService.getActivity();
  }, []);

  return (
    <Card
      padding="none"
      className="overflow-hidden"
    >
      <CardHeader className="mb-0 border-b border-[var(--color-border)] px-5 pt-5 pb-4">
        <CardTitle>
          Recent Activity
        </CardTitle>
      </CardHeader>

      <div className="px-5 py-4">
        {isLoading ? (
          <ul
            aria-label="Loading activity"
            className="space-y-0"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <ActivitySkeleton key={index} />
            ))}
          </ul>
        ) : activities.length === 0 ? (
          <p className="py-6 text-center text-[var(--text-sm)] text-[var(--color-text-muted)]">
            No activity yet. Start creating projects to see your timeline.
          </p>
        ) : (
          <ol
            aria-label="Recent activity timeline"
            className="space-y-0"
          >
            {activities.map((activity, index) => {
              const config =
                TYPE_CONFIG[activity.type] ??
                TYPE_CONFIG.update;

              const isLast =
                index === activities.length - 1;

              return (
                <li
                  key={activity.id}
                  className="flex gap-3"
                >
                  {/* Timeline */}

                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                        config.iconBg,
                        config.iconFg
                      )}
                      aria-hidden="true"
                    >
                      <span className="text-sm">
                        {config.icon}
                      </span>
                    </span>

                    {!isLast && (
                      <span
                        className="mt-1 mb-1 w-px flex-1 bg-[var(--color-border)]"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}

                  <div
                    className={cn(
                      'flex-1 pb-4',
                      isLast && 'pb-0'
                    )}
                  >
                    <p className="text-[var(--text-sm)] font-[var(--weight-medium)] leading-snug text-[var(--color-text-primary)]">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                      {activity.detail}
                    </p>

                    <time
                      dateTime={activity.timestamp}
                      className="mt-0.5 block text-[var(--text-2xs)] text-[var(--color-text-muted)]"
                    >
                      {formatRelativeTime(
                        activity.timestamp
                      )}
                    </time>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </Card>
  );
}