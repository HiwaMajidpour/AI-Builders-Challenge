/**
 * features/editor/WordCounter.jsx
 * Displays live word, character, and paragraph counts for editor content.
 *
 * Props
 *   content  string
 */
export default function WordCounter({ content = '' }) {
  const words      = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const characters = content.length;
  const paragraphs = content.trim() ? content.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;

  const stats = [
    { label: 'Words',      value: words.toLocaleString() },
    { label: 'Characters', value: characters.toLocaleString() },
    { label: 'Paragraphs', value: paragraphs.toLocaleString() },
  ];

  return (
    <div className="flex flex-col gap-3 px-4 py-3" aria-label="Word count statistics">
      <p className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
        Word Count
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
