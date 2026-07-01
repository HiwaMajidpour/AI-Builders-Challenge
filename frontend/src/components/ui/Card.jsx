/**
 * components/ui/Card.jsx
 * Surface container with optional header and footer slots.
 */
import { cn } from '../../utils/cn';

export default function Card({ children, className, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)]',
        'bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-sm)]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('mb-4 flex items-center justify-between', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-base font-semibold text-[var(--color-text-primary)]', className)}>
      {children}
    </h3>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        'mt-4 border-t border-[var(--color-border)] pt-4 flex items-center justify-between',
        className,
      )}
    >
      {children}
    </div>
  );
}
