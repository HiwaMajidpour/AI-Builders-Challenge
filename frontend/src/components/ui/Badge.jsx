/**
 * components/ui/Badge.jsx
 * Small status / label chip.
 */
import { cn } from '../../utils/cn';

const variants = {
  default:  'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
  accent:   'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]',
  ai:       'bg-[var(--color-ai-subtle)] text-[var(--color-ai)]',
  success:  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  warning:  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  error:    'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
};

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
