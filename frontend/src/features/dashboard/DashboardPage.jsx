/**
 * features/dashboard/DashboardPage.jsx
 *
 * Main dashboard view.
 */

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';

import StatsCard, { StatsCardSkeleton } from './StatsCard';
import RecentProjects from './RecentProjects';
import QuickActions from './QuickActions';
import ActivityPanel from './ActivityPanel';
import Badge from '../../components/ui/Badge';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';

  return 'Good evening';
}

function formatFullDate() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { projects = [] } = useProjects();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const firstName = currentUser?.name?.split(' ')[0] ?? 'Creator';

  const stats = useMemo(() => {
    const totalProjects = projects.length;

    const draftProjects = projects.filter(
      (project) => project.status === 'Draft'
    ).length;

    const completedProjects = projects.filter(
      (project) => project.status === 'Completed'
    ).length;

    const totalWords = projects.reduce(
      (sum, project) => sum + (project.wordCount ?? 0),
      0
    );

    return [
      {
        id: 'projects',
        label: 'Projects',
        value: totalProjects,
        change: '+0%',
        trend: 'neutral',
        icon: '📚',
      },
      {
        id: 'drafts',
        label: 'Drafts',
        value: draftProjects,
        change: '+0%',
        trend: 'neutral',
        icon: '📝',
      },
      {
        id: 'completed',
        label: 'Completed',
        value: completedProjects,
        change: '+0%',
        trend: 'positive',
        icon: '✅',
      },
      {
        id: 'words',
        label: 'Words',
        value: totalWords.toLocaleString(),
        change: '+0%',
        trend: 'positive',
        icon: '✍️',
      },
    ];
  }, [projects]);

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}

      <section aria-labelledby="dashboard-heading">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="brand" dot size="sm">
                AI Active
              </Badge>
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

          <div className="hidden sm:flex items-center gap-4 text-right">
            <div>
              <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                Active streak
              </p>

              <p className="text-[var(--text-lg)] font-[var(--weight-bold)] text-[var(--color-brand)]">
                7 days 🔥
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Statistics */}

      <section aria-label="Statistics">

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Dashboard statistics"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} role="listitem">
                <StatsCardSkeleton />
              </div>
            ))
            : stats.map((stat) => (
              <div key={stat.id} role="listitem">
                <StatsCard {...stat} />
              </div>
            ))}
        </div>

      </section>

      {/* Main */}

      <section
        aria-label="Projects and quick actions"
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >

        <div className="lg:col-span-2">
          <RecentProjects isLoading={isLoading} />
        </div>

        <div>
          <QuickActions />
        </div>

      </section>

      {/* Activity */}

      <section aria-label="Recent activity">
        <ActivityPanel isLoading={isLoading} />
      </section>

    </div>
  );
}