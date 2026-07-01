/**
 * features/dashboard/StatsCard.jsx
 * Single statistic card: icon · label · value · percentage change + trend arrow.
 * Uses existing Card component from the design system.
 */
import Card from '../../components/ui/Card';
import { cn } from '../../utils/cn';

// ── Inline SVG icons (no external dep) ───────────────────────────────────────
const ICONS = {
  story: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  folder: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  ai: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4M2 22a10 10 0 0 1 20 0" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  words: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
};

// ── Color tokens per card ─────────────────────────────────────────────────────
const COLOR_MAP = {
  brand:   {
    icon: 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)]',
    pct:  'text-[var(--color-brand-text)]',
  },
  accent:  {
    icon: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]',
    pct:  'text-[var(--color-accent-text)]',
  },
  success: {
    icon: 'bg-[var(--color-success-subtle)] text-[var(--color-success)]',
    pct:  'text-[var(--color-success-text)]',
  },
  warning: {
    icon: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)]',
    pct:  'text-[var(--color-warning-text)]',
  },
};

// ── Trend arrow ───────────────────────────────────────────────────────────────
function TrendArrow({ trend }) {
  if (trend === 'up') {
    return (
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <polyline points="1 8 6 3 11 8" />
        <line x1="6" y1="3" x2="6" y2="11" />
      </svg>
    );
  }
  if (trend === 'down') {
    return (
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <polyline points="1 4 6 9 11 4" />
        <line x1="6" y1="9" x2="6" y2="1" />
      </svg>
    );
  }
  return null;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
export function StatsCardSkeleton() {
  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-[var(--radius-lg)] skeleton animate-shimmer" />
        <div className="h-5 w-12 rounded-[var(--radius-sm)] skeleton animate-shimmer" />
      </div>
      <div className="h-7 w-20 rounded-[var(--radius-sm)] skeleton animate-shimmer" />
      <div className="h-4 w-28 rounded-[var(--radius-sm)] skeleton animate-shimmer" />
    </Card>
  );
}

// ── StatsCard ─────────────────────────────────────────────────────────────────
export default function StatsCard({ label, value, delta, trend = 'up', pct, icon = 'story', color = 'brand' }) {
  const colors = COLOR_MAP[color] ?? COLOR_MAP.brand;

  return (
    <Card
      padding="md"
      className="group hover:shadow-[var(--shadow-md)] transition-shadow"
    >
      {/* Top row: icon + trend badge */}
      <div className="mb-4 flex items-start justify-between">
        {/* Icon pill */}
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[var(--radius-lg)]',
            colors.icon,
          )}
          aria-hidden="true"
        >
          {ICONS[icon]}
        </div>

        {/* Percentage change */}
        {pct && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5',
              'rounded-[var(--radius-full)] px-2 py-0.5',
              'text-[var(--text-xs)] font-[var(--weight-semibold)]',
              colors.pct,
              trend === 'up'   && 'bg-[var(--color-success-subtle)]',
              trend === 'down' && 'bg-[var(--color-error-subtle)]',
            )}
            aria-label={`${trend === 'up' ? 'Up' : 'Down'} ${pct} from last period`}
          >
            <TrendArrow trend={trend} />
            {pct}
          </span>
        )}
      </div>

      {/* Value */}
      <p
        className="text-[var(--text-3xl)] font-[var(--weight-bold)] leading-none text-[var(--color-text-primary)]"
        aria-label={`${label}: ${value}`}
      >
        {value}
      </p>

      {/* Label + delta */}
      <div className="mt-1 flex items-center gap-1.5">
        <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          {label}
        </span>
        {delta && (
          <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
            · {delta} this week
          </span>
        )}
      </div>
    </Card>
  );
}
