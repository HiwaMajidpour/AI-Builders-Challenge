import { cn } from '../../utils/cn';

// ── Variant map ───────────────────────────────────────────────────────────────
const variantStyles = {
  default: [
    'border border-[var(--color-border)]',
    'bg-[var(--color-bg-surface)]',
    'text-[var(--color-text-secondary)]',
  ],
  brand: [
    'bg-[var(--color-brand-subtle)]',
    'text-[var(--color-brand-text)]',
    'border border-[var(--color-brand-border)]',
  ],
  accent: [
    'bg-[var(--color-accent-subtle)]',
    'text-[var(--color-accent-text)]',
    'border border-[var(--color-accent-border)]',
  ],
  success: [
    'bg-[var(--color-success-subtle)]',
    'text-[var(--color-success-text)]',
    'border border-[var(--color-success-border)]',
  ],
  warning: [
    'bg-[var(--color-warning-subtle)]',
    'text-[var(--color-warning-text)]',
    'border border-[var(--color-warning-border)]',
  ],
  error: [
    'bg-[var(--color-error-subtle)]',
    'text-[var(--color-error-text)]',
    'border border-[var(--color-error-border)]',
  ],
  // Solid filled — for status pills, AI labels
  solid: [
    'bg-[var(--color-brand)] text-white border border-transparent',
  ],
};

const sizeStyles = {
  sm: 'px-1.5 py-px  text-[var(--text-2xs)]',
  md: 'px-2.5 py-0.5 text-[var(--text-xs)]',
  lg: 'px-3   py-1   text-[var(--text-sm)]',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-full)]',
        'font-[var(--weight-medium)] leading-none whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-full',
            variant === 'default'  && 'bg-[var(--color-text-muted)]',
            variant === 'brand'    && 'bg-[var(--color-brand)]',
            variant === 'accent'   && 'bg-[var(--color-accent)]',
            variant === 'success'  && 'bg-[var(--color-success)]',
            variant === 'warning'  && 'bg-[var(--color-warning)]',
            variant === 'error'    && 'bg-[var(--color-error)]',
            variant === 'solid'    && 'bg-white',
          )}
        />
      )}
      {children}
    </span>
  );
}
