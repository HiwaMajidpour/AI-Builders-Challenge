import { cn } from '../../utils/cn';

// ── Size map ──────────────────────────────────────────────────────────────────
const sizeStyles = {
  sm: 'h-4 w-4 border-[1.5px]',
  md: 'h-5 w-5 border-2',
  lg: 'h-7 w-7 border-[2.5px]',
  xl: 'h-9 w-9 border-[3px]',
};

export default function Spinner({ size = 'md', className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block shrink-0 rounded-full animate-spin-smooth',
        'border-[var(--color-border-strong)] border-t-[var(--color-brand)]',
        sizeStyles[size],
        className,
      )}
    />
  );
}
