/**
 * features/dashboard/DashboardPage.jsx
 */
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import StatsCard from './StatsCard';
import RecentProjects from './RecentProjects';
import QuickActions from './QuickActions';

const STATS = [
  { label: 'AI Generations', value: '142', delta: '+12 this week' },
  { label: 'Active Projects', value: '8',   delta: '+2 this month' },
  { label: 'Words Generated', value: '94k', delta: '+6k this week' },
  { label: 'Exports',         value: '31',  delta: 'All time' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Good day, {user?.name?.split(' ')[0] ?? 'Creator'} 👋
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Here&apos;s an overview of your creative workspace.
        </p>
      </div>

      {/* Stats row */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick actions + Recent projects */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
