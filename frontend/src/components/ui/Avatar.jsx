import { cn } from '../../utils/cn';

// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// Deterministic colour from name — keeps colours consistent across re-renders
const AVATAR_COLORS = [
  ['bg-[var(--color-brand-subtle)]',   'text-[var(--color-brand-text)]'],
  ['bg-[var(--color-accent-subtle)]',  'text-[var(--color-accent-text)]'],
  ['bg-[var(--color-success-subtle)]', 'text-[var(--color-success-text)]'],
  ['bg-[var(--color-warning-subtle)]', 'text-[var(--color-warning-text)]'],
  ['bg-[var(--color-error-subtle)]',   'text-[var(--color-error-text)]'],
];

function getColorPair(name = '') {
  const code = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

// ── Size map ──────────────────────────────────────────────────────────────────
const sizeStyles = {
  xs: 'h-6  w-6  text-[var(--text-2xs)]',
  sm: 'h-7  w-7  text-[var(--text-xs)]',
  md: 'h-9  w-9  text-[var(--text-sm)]',
  lg: 'h-11 w-11 text-[var(--text-base)]',
  xl: 'h-14 w-14 text-[var(--text-lg)]',
  '2xl': 'h-20 w-20 text-[var(--text-2xl)]',
};

// ── Avatar ────────────────────────────────────────────────────────────────────
export default function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',   // 'circle' | 'square'
  status,             // 'online' | 'away' | 'busy' | 'offline'
  className,
  imgClassName,
}) {
  const initials    = getInitials(name);
  const [bg, text]  = getColorPair(name);
  const shapeClass  = shape === 'square'
    ? 'rounded-[var(--radius-lg)]'
    : 'rounded-full';

  const statusColors = {
    online:  'bg-[var(--color-success)]',
    away:    'bg-[var(--color-warning)]',
    busy:    'bg-[var(--color-error)]',
    offline: 'bg-[var(--color-text-muted)]',
  };

  return (
    <span className={cn('relative inline-flex shrink-0', sizeStyles[size], className)}>
      {src ? (
        <img
          src={src}
          alt={name ?? 'User avatar'}
          className={cn('h-full w-full object-cover', shapeClass, imgClassName)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          aria-label={name ? `${name} avatar` : 'Avatar'}
          className={cn(
            'flex h-full w-full items-center justify-center',
            'font-[var(--weight-semibold)] leading-none select-none',
            shapeClass,
            bg,
            text,
          )}
        >
          {initials || '?'}
        </span>
      )}

      {/* Status indicator */}
      {status && (
        <span
          aria-label={status}
          className={cn(
            'absolute bottom-0 right-0',
            'h-2.5 w-2.5 rounded-full',
            'ring-2 ring-[var(--color-bg-elevated)]',
            statusColors[status],
          )}
        />
      )}
    </span>
  );
}
