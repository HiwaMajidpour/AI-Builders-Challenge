/**
 * features/editor/ReadingStats.jsx
 * Displays estimated reading time, speaking time, and page count.
 *
 * Props
 *   content  string
 */
export default function ReadingStats({ content = '' }) {
  const words       = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readingMins = Math.max(1, Math.ceil(words / 200));
  const speakingMins= Math.max(1, Math.ceil(words / 130));
  const pages       = Math.max(1, Math.ceil(words / 275));

  const fmt = (mins) => mins < 60
    ? `~${mins} min`
    : `~${Math.floor(mins / 60)}h ${mins % 60}m`;

  const stats = [
    { label: 'Reading time',  value: fmt(readingMins) },
    { label: 'Speaking time', value: fmt(speakingMins) },
    { label: 'Est. pages',    value: `~${pages}` },
  ];

  return (
    <div className="flex flex-col gap-3 px-4 py-3" aria-label="Reading statistics">
      <p className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
        Reading Stats
      </p>
      <dl className="flex flex-col gap-1.5">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <dt className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{label}</dt>
            <dd className="text-[var(--text-xs)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
