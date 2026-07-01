/**
 * components/layout/Sidebar.jsx
 *
 * Full production sidebar used by DashboardLayout.
 * Features:
 *   • Brand logo + app name
 *   • Navigation with active-route highlighting
 *   • User profile section (avatar, name, email, plan badge)
 *   • Logout button pinned to bottom
 *   • Optional onClose prop for mobile drawer mode
 */
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth }  from '../../hooks/useAuth';
import { ROUTES }   from '../../constants/routes';
import { APP_NAME } from '../../config';
import { cn }       from '../../utils/cn';
import Avatar       from '../ui/Avatar';
import Badge        from '../ui/Badge';
import { toast }    from 'sonner';

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to:    ROUTES.DASHBOARD,
    end:   true,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: 'AI Studio',
    to:    '/dashboard/ai-studio',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    to:    '/dashboard/projects',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Templates',
    to:    '/dashboard/templates',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    to:    '/dashboard/settings',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
export default function Sidebar({ onClose }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success('Signed out successfully.');
      navigate(ROUTES.LOGIN, { replace: true });
    } catch {
      toast.error('Sign out failed. Please try again.');
    }
  }

  return (
    <aside
      className={cn(
        'flex h-full flex-shrink-0 flex-col',
        'w-[var(--size-sidebar,15rem)]',
        'bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)]',
      )}
      aria-label="Main navigation"
    >
      {/* ── Brand ──────────────────────────────────────────────────────────── */}
      <div className="flex h-[var(--size-topbar,3.5rem)] items-center gap-2.5 border-b border-[var(--color-border)] px-4">
        {/* Logo mark */}
        <div
          className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand)] text-white text-xs font-bold shrink-0"
          aria-hidden="true"
        >
          ✦
        </div>
        <span className="text-[var(--text-sm)] font-[var(--weight-bold)] tracking-tight text-[var(--color-text-primary)] truncate">
          {APP_NAME}
        </span>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)] transition-colors lg:hidden"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M13 1 1 13M1 1l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Sidebar navigation">
        <ul className="space-y-0.5" role="list">
          {NAV_ITEMS.map(({ label, to, end, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onClose}
                aria-label={label}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2',
                    'text-[var(--text-sm)] font-[var(--weight-medium)]',
                    'transition-colors duration-[var(--duration-fast)]',
                    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:outline-none',
                    isActive
                      ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand-text)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
                  )
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── User profile + logout ───────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-[var(--color-border)] p-3 space-y-2">
        {/* Profile row */}
        <div className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-2 py-1.5">
          <Avatar
            name={currentUser?.name ?? 'User'}
            src={currentUser?.avatar}
            size="sm"
            status="online"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[var(--text-xs)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
              {currentUser?.name ?? 'User'}
            </p>
            <p className="truncate text-[var(--text-2xs)] text-[var(--color-text-muted)]">
              {currentUser?.email ?? ''}
            </p>
          </div>
          {/* Plan badge */}
          {currentUser?.plan && (
            <Badge variant={currentUser.plan === 'pro' ? 'brand' : 'default'} size="sm" className="shrink-0">
              {currentUser.plan}
            </Badge>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2',
            'text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-secondary)]',
            'hover:bg-[var(--color-error-subtle)] hover:text-[var(--color-error-text)]',
            'transition-colors duration-[var(--duration-fast)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-error)] focus-visible:outline-none',
          )}
          aria-label="Sign out of StoryForge AI"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}
