/**
 * components/ui/Avatar.jsx
 * User avatar — shows image if available, falls back to initials.
 */
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
  xl: 'h-14 w-14 text-lg',
};

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function Avatar({ src, name, size = 'md', className }) {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'Avatar'}
        className={cn('rounded-full object-cover', sizes[size], className)}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        'bg-[var(--color-ai-subtle)] text-[var(--color-ai)]',
        sizes[size],
        className,
      )}
    >
      {initials || '?'}
    </div>
  );
}
