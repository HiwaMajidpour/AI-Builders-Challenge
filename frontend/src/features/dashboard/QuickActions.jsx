/**
 * features/dashboard/QuickActions.jsx
 * Four primary action buttons for the most-used dashboard workflows.
 */
import { Link } from 'react-router-dom';
import Card, { CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { QUICK_ACTIONS } from './data/mockData';
import { cn } from '../../utils/cn';

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const ACTION_ICONS = {
  pen: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  ai: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  import: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  template: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
};

// ── QuickActions ──────────────────────────────────────────────────────────────
export default function QuickActions() {
  return (
    <Card padding="md" className="h-full">
      <CardTitle className="mb-4">Quick Actions</CardTitle>

      <div className="flex flex-col gap-2.5" role="list" aria-label="Quick action buttons">
        {QUICK_ACTIONS.map(({ id, label, icon, variant, to }) => (
          <div key={id} role="listitem">
            <Button
              as={Link}
              to={to}
              variant={variant}
              size="md"
              fullWidth
              leftIcon={ACTION_ICONS[icon]}
              className="justify-start"
              aria-label={label}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>

      {/* Keyboard nav hint */}
      <p className="mt-4 text-[var(--text-xs)] text-[var(--color-text-muted)]">
        Press <kbd className="rounded bg-[var(--color-bg-surface)] px-1 py-0.5 font-mono text-[10px] border border-[var(--color-border)]">N</kbd> to start a new story anywhere.
      </p>
    </Card>
  );
}
