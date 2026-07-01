/**
 * features/dashboard/DashboardPage.jsx
 *
 * Main dashboard view — composes all panels with a responsive grid layout.
 *
 * Layout (desktop):
 *   ┌──────────────────────────────────┬──────────────┐
 *   │  Header (greeting + date + badge)               │
 *   ├──────────────────────────────────┬──────────────┤
 *   │  Stats grid (4 cards)                           │
 *   ├──────────────────────────────────┬──────────────┤
 *   │  Recent Projects (2/3)  │  Quick Actions (1/3)  │
 *   ├──────────────────────────────────┬──────────────┤
 *   │  Activity Panel (full width)                    │
 *   └─────────────────────────────────────────────────┘
 */
import { useState, useEffect } from 'react';
import { useAuth }        from '../../hooks/useAuth';
import StatsCard, { StatsCardSkeleton } from './StatsCard';
import RecentProjects     from './RecentProjects';
import QuickActions       from './QuickActions';
import ActivityPanel      from './ActivityPanel';
import Badge              from '../../components/ui/Badge';
import { MOCK_STATS }     from './data/mockData';

// ── Greeting helper ───────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatFullDate() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  }).format(new Date());
}

// ── DashboardPage ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a brief data-fetch on mount (800 ms matches the mock auth delay).
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const firstName = currentUser?.name?.split(' ')[0] ?? 'Creator';

  return (
    <div className="space-y-6 pb-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="dashboard-heading">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="brand" dot size="sm">AI Active</Badge>
            </div>
            <h1
              id="dashboard-heading"
              className="text-[var(--text-3xl)] font-[var(--weight-bold)] text-[var(--color-text-primary)] leading-[var(--leading-tight)]"
            >
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              {formatFullDate()}
            </p>
          </div>

          {/* Summary strip — desktop only */}
          <div className="hidden sm:flex items-center gap-4 text-right">
            <div>
              <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">Active streak</p>
              <p className="text-[var(--text-lg)] font-[var(--weight-bold)] text-[var(--color-brand)]">7 days 🔥</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats grid ─────────────────────────────────────────────────────── */}
      <section aria-label="Statistics">
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Dashboard statistics"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} role="listitem"><StatsCardSkeleton /></div>
              ))
            : MOCK_STATS.map((stat) => (
                <div key={stat.id} role="listitem">
                  <StatsCard {...stat} />
                </div>
              ))
          }
        </div>
      </section>

      {/* ── Main content: Projects + Quick Actions ──────────────────────────── */}
      <section
        aria-label="Projects and quick actions"
        className="grid gap-6 grid-cols-1 lg:grid-cols-3"
      >
        {/* Recent projects — takes 2/3 on desktop */}
        <div className="lg:col-span-2">
          <RecentProjects isLoading={isLoading} />
        </div>

        {/* Quick actions — takes 1/3 on desktop */}
        <div>
          <QuickActions />
        </div>
      </section>

      {/* ── Activity panel ─────────────────────────────────────────────────── */}
      <section aria-label="Recent activity">
        <ActivityPanel isLoading={isLoading} />
      </section>

    </div>
  );
}
