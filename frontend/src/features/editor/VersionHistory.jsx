/**
 * features/editor/VersionHistory.jsx
 * Mock version history timeline with restore button.
 *
 * Props
 *   versions    Array<{ id, savedAt, label, wordCount }>
 *   onRestore   fn(version)
 */
import { cn } from '../../utils/cn';
import Button  from '../../components/ui/Button';

function relTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function VersionHistory({ versions = [], onRestore }) {
  if (!versions.length) {
    return (
      <div className="px-4 py-3">
        <p className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)] mb-2">
          Version History
        </p>
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] italic">No saved versions yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-3" aria-label="Version history">
      <p className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
        Version History
      </p>
      <ol className="relative ml-2 flex flex-col gap-0 border-l border-[var(--color-border)]">
        {versions.map((v, i) => (
          <li key={v.id} className="group relative flex items-start gap-3 pl-4 pb-4 last:pb-0">
            {/* Timeline dot */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-[-5px] top-[5px] h-2.5 w-2.5 rounded-full border-2',
                i === 0
                  ? 'border-[var(--color-brand)] bg-[var(--color-brand)]'
                  : 'border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]',
              )}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[var(--text-xs)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">
                  {v.label}
                </p>
                {i > 0 && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onRestore(v)}
                    aria-label={`Restore version: ${v.label}`}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-brand)]"
                  >
                    Restore
                  </Button>
                )}
              </div>
              <p className="text-[var(--text-2xs)] text-[var(--color-text-muted)]">
                {relTime(v.savedAt)} · {v.wordCount.toLocaleString()} words
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
