/**
 * utils/formatters.js
 * Pure, side-effect-free formatting helpers.
 */

/** Format ISO date string → "Jan 15, 2025" */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr));
}

/** Format ISO date → relative time ("2 hours ago") */
export function formatRelativeTime(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const thresholds = [
    [60_000, 'minute', 60_000],
    [3_600_000, 'hour', 3_600_000],
    [86_400_000, 'day', 86_400_000],
    [2_592_000_000, 'month', 2_592_000_000],
  ];
  for (const [limit, unit, divisor] of thresholds) {
    if (diff < limit) return rtf.format(-Math.round(diff / (divisor / 60)), unit);
  }
  return formatDate(dateStr);
}

/** Truncate long strings with ellipsis */
export function truncate(str, maxLen = 120) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + '…';
}

/** Format a number with locale-aware commas */
export function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

/** Capitalise first letter */
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
