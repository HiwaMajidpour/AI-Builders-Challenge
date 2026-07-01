import { cn } from '../../utils/cn';

// ── Sub-components ────────────────────────────────────────────────────────────

export function CardHeader({ children, className }) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-3', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, as: Tag = 'h3' }) {
  return (
    <Tag
      className={cn(
        'text-[var(--text-base)] font-[var(--weight-semibold)]',
        'text-[var(--color-text-primary)] leading-[var(--leading-snug)]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p
      className={cn(
        'text-[var(--text-sm)] text-[var(--color-text-secondary)]',
        'leading-[var(--leading-normal)]',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('text-[var(--text-sm)] text-[var(--color-text-secondary)]', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        'mt-4 flex items-center justify-between gap-3',
        'border-t border-[var(--color-border)] pt-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── Variant map ───────────────────────────────────────────────────────────────
const variantStyles = {
  default: [
    'bg-[var(--color-bg-elevated)]',
    'border border-[var(--color-border)]',
    'shadow-[var(--shadow-sm)]',
  ],
  surface: [
    'bg-[var(--color-bg-surface)]',
    'border border-[var(--color-border-subtle)]',
  ],
  brand: [
    'bg-[var(--color-brand-subtle)]',
    'border border-[var(--color-brand-border)]',
  ],
  ai: [
    'bg-[var(--color-bg-ai)]',
    'border border-[var(--color-brand-border)]',
    'shadow-[var(--shadow-sm)]',
  ],
  ghost: [
    'bg-transparent',
    'border border-transparent',
    'hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-border)]',
  ],
  outline: [
    'bg-transparent',
    'border border-[var(--color-border-strong)]',
  ],
};

// ── Card ──────────────────────────────────────────────────────────────────────
export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  as: Tag = 'div',
  ...props
}) {
  const paddingStyles = {
    none: '',
    sm:   'p-3',
    md:   'p-5',
    lg:   'p-6',
    xl:   'p-8',
  };

  return (
    <Tag
      className={cn(
        'rounded-[var(--radius-xl)]',
        'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
