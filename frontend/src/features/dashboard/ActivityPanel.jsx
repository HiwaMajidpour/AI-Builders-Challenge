/**
 * features/dashboard/ActivityPanel.jsx
 * Right-side activity timeline: recent AI generations, logins, exports.
 */
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import { cn } from '../../utils/cn';
import { formatRelativeTime } from '../../utils/formatters';
import { MOCK_ACTIVITY } from './data/mockData';

// ── Activity type config ──────────────────────────────────────────────────────
const TYPE_CONFIG = {
  generation: {
    label:   'Generation',
    iconBg:  'bg-[var(--color-brand-subtle)]',
    iconFg:  'text-[var(--color-brand)]',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  login: {
    label:   'Login',
    iconBg:  'bg-[var(--color-success-subtle)]',
    iconFg:  'text-[var(--color-success)]',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
  },
  export: {
    label:   'Export',
    iconBg:  'bg-[var(--color-accent-subtle)]',
    iconFg:  'text-[var(--color-accent)]',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
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

// ── ActivityPanel ─────────────────────────────────────────────────────────────
export default function ActivityPanel({ activities = MOCK_ACTIVITY, isLoading = false }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <CardHeader className="px-5 pt-5 pb-4 border-b border-[var(--color-border)] mb-0">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <div className="px-5 py-4">
        {isLoading ? (
          <ul aria-label="Loading activity" className="space-y-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <ActivitySkeleton key={i} />
            ))}
          </ul>
        ) : activities.length === 0 ? (
          <p className="py-6 text-center text-[var(--text-sm)] text-[var(--color-text-muted)]">
            No recent activity.
          </p>
        ) : (
          <ol
            aria-label="Recent activity timeline"
            className="space-y-0"
          >
            {activities.map((act, idx) => {
              const cfg = TYPE_CONFIG[act.type] ?? TYPE_CONFIG.login;
              const isLast = idx === activities.length - 1;

              return (
                <li key={act.id} className="flex gap-3">
                  {/* Timeline track */}
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                        cfg.iconBg,
                        cfg.iconFg,
                      )}
                      aria-hidden="true"
                    >
                      {cfg.icon}
                    </span>
                    {!isLast && (
                      <span
                        className="mt-1 mb-1 w-px flex-1 bg-[var(--color-border)]"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={cn('flex-1 pb-4', isLast && 'pb-0')}>
                    <p className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)] leading-snug">
                      {act.title}
                    </p>
                    <p className="mt-0.5 text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                      {act.detail}
                    </p>
                    <time
                      dateTime={act.timestamp}
                      className="mt-0.5 block text-[var(--text-2xs)] text-[var(--color-text-muted)]"
                    >
                      {formatRelativeTime(act.timestamp)}
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
