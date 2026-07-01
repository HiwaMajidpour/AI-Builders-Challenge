import { cn } from '../../utils/cn';
import Spinner from './Spinner';

// ── Variant styles ────────────────────────────────────────────────────────────
const variantStyles = {
  primary: [
    'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]',
    'hover:bg-[var(--color-brand-hover)]',
    'active:bg-[var(--color-brand-active)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-base)]',
    'shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)]',
  ],
  secondary: [
    'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]',
    'border border-[var(--color-border-strong)]',
    'hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-border-focus)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-base)]',
  ],
  ghost: [
    'bg-transparent text-[var(--color-text-secondary)]',
    'hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-base)]',
  ],
  danger: [
    'bg-[var(--color-error)] text-white',
    'hover:opacity-90 active:opacity-80',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-error)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-base)]',
    'shadow-[var(--shadow-xs)]',
  ],
  brand: [
    'gradient-brand text-white',
    'hover:opacity-90 active:opacity-80',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-base)]',
    'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
  ],
  link: [
    'bg-transparent text-[var(--color-accent)] underline-offset-4',
    'hover:underline hover:text-[var(--color-accent-hover)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-base)]',
  ],
};

// ── Size styles ───────────────────────────────────────────────────────────────
const sizeStyles = {
  xs:   'h-7  px-2.5 text-[var(--text-xs)]  gap-1   rounded-[var(--radius-sm)]',
  sm:   'h-8  px-3   text-[var(--text-sm)]  gap-1.5 rounded-[var(--radius-md)]',
  md:   'h-9  px-4   text-[var(--text-sm)]  gap-2   rounded-[var(--radius-md)]',
  lg:   'h-11 px-5   text-[var(--text-base)] gap-2  rounded-[var(--radius-lg)]',
  xl:   'h-13 px-6   text-[var(--text-md)]  gap-2.5 rounded-[var(--radius-lg)]',
  icon: 'h-9  w-9    text-[var(--text-base)]        rounded-[var(--radius-md)]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  as: Tag = 'button',
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <Tag
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={Tag !== 'button' ? isDisabled : undefined}
      aria-busy={isLoading || undefined}
      className={cn(
        // Base
        'relative inline-flex items-center justify-center',
        'font-[var(--weight-medium)] whitespace-nowrap select-none',
        'transition-[color,background-color,border-color,box-shadow,opacity]',
        'duration-[var(--duration-fast)]',
        // Disabled
        'disabled:pointer-events-none disabled:opacity-50',
        // Full width
        fullWidth && 'w-full',
        // Variant + size
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {/* Left icon or spinner */}
      {isLoading ? (
        <Spinner
          size="sm"
          className="text-current opacity-80"
        />
      ) : leftIcon ? (
        <span className="shrink-0 leading-none">{leftIcon}</span>
      ) : null}

      {children && (
        <span className={cn(isLoading && 'opacity-0 pointer-events-none')}>
          {children}
        </span>
      )}

      {/* Right icon */}
      {!isLoading && rightIcon && (
        <span className="shrink-0 leading-none">{rightIcon}</span>
      )}
    </Tag>
  );
}
