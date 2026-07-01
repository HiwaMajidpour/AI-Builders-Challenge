/**
 * components/layout/Sidebar.jsx
 * Dashboard sidebar navigation.
 */
import { NavLink } from 'react-router-dom';
import {
  RiDashboardLine,
  RiRobot2Line,
  RiFolderLine,
  RiSettings3Line,
} from 'react-icons/ri';
import { ROUTES } from '../../constants/routes';
import { APP_NAME } from '../../config';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD_HOME, icon: RiDashboardLine, end: true },
  { label: 'AI Studio',  to: ROUTES.AI_STUDIO,      icon: RiRobot2Line },
  { label: 'Projects',   to: ROUTES.PROJECTS,        icon: RiFolderLine },
  { label: 'Settings',   to: ROUTES.SETTINGS,        icon: RiSettings3Line },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-60 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 border-b border-[var(--color-border)] px-4 font-bold text-[var(--color-text-primary)]">
        <span className="text-lg text-[var(--color-ai)]">✦</span>
        {APP_NAME}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium',
                    'transition-colors duration-[var(--transition-fast)]',
                    isActive
                      ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]',
                  )
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
