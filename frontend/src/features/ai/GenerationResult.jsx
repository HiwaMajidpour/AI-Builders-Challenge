/**
 * features/ai/GenerationResult.jsx
 *
 * Middle/right panel of AI Studio.
 * Displays the generated content with metadata and action buttons.
 * Also exposes skeleton loading state while generation is in progress.
 *
 * Props
 *   result         object | null
 *   isGenerating   bool
 *   onRegenerate   fn()
 *   onDelete       fn()
 */
import { useState } from 'react';
import TextStatisticsCard from './TextStatisticsCard';
import { toast } from 'sonner';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { CardTitle } from '../../components/ui/Card';
import ExportMenu from './ExportMenu';

// ── Skeleton ──────────────────────────────────────────────────────────────────

function ResultSkeleton() {
  return (
    <div
      role="status"
      aria-label="Generating content"
      className="flex h-full flex-col gap-5 animate-pulse"
    >
      {/* Header skeleton */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-6 w-2/3 rounded-[var(--radius-md)] bg-[var(--color-bg-surface)]" />
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-full bg-[var(--color-bg-surface)]" />
            <div className="h-5 w-14 rounded-full bg-[var(--color-bg-surface)]" />
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="h-8 w-16 rounded-[var(--radius-md)] bg-[var(--color-bg-surface)]" />
          <div className="h-8 w-16 rounded-[var(--radius-md)] bg-[var(--color-bg-surface)]" />
        </div>
      </div>

      {/* Metadata skeleton */}
      <div className="flex gap-4">
        <div className="h-4 w-20 rounded bg-[var(--color-bg-surface)]" />
        <div className="h-4 w-24 rounded bg-[var(--color-bg-surface)]" />
        <div className="h-4 w-20 rounded bg-[var(--color-bg-surface)]" />
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border)]" />

      {/* Content skeleton lines */}
      <div className="flex flex-col gap-3">
        {[100, 90, 95, 85, 100, 70, 92, 80, 60].map((w, i) => (
          <div
            key={i}
            className="h-4 rounded bg-[var(--color-bg-surface)]"
            style={{ width: `${w}%` }}
          />
        ))}
        <div className="mt-2 flex flex-col gap-3">
          {[100, 88, 96, 75].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded bg-[var(--color-bg-surface)]"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── EmptyState ────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">

      {/* Illustration */}
      <div
        className="
          mb-6 flex h-20 w-20 items-center justify-center
          rounded-2xl
          border border-[var(--color-border)]
          bg-[var(--color-bg-surface)]
        "
      >
        <svg
          width="36"
          height="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-brand)]"
        >
          <path d="M12 3h8l5 5v13a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M20 3v5h5" />
          <path d="M15 13h5" />
          <path d="M15 17h5" />
        </svg>
      </div>

      {/* Title */}

      <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
        Ready to create
      </h2>

      {/* Description */}

      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
        Start with a prompt to generate stories, scripts,
        characters, dialogue or world building ideas.
      </p>

      {/* Tips */}

      <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">

        <div className="rounded-xl border border-[var(--color-border)] p-4">
          <p className="font-medium">
            ✨ Story ideas
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Fantasy, mystery, sci-fi and more.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] p-4">
          <p className="font-medium">
            🎭 Characters
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Build detailed heroes and villains.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] p-4">
          <p className="font-medium">
            💬 Dialogue
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Generate realistic conversations.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] p-4">
          <p className="font-medium">
            🌍 World Building
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Design kingdoms, cities and lore.
          </p>
        </div>

      </div>

    </div>
  );
}

// ── GenerationResult ──────────────────────────────────────────────────────────

export default function GenerationResult({ result, isGenerating, onRegenerate, onDelete }) {
  const [copied, setCopied] = useState(false);

  if (isGenerating) return <ResultSkeleton />;
  if (!result) return <EmptyState />;

  // ── Clipboard ───────────────────────────────────────────────────────────────

  async function handleCopy() {
    await navigator.clipboard.writeText(result.content);

    setCopied(true);

    toast.success('Copied to clipboard.');

    setTimeout(() => setCopied(false), 2000);
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <article
      className="flex h-full flex-col gap-5 animate-fade-in"
      aria-label={`Generated result: ${result.title}`}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <CardTitle as="h2" className="text-[var(--text-lg)] leading-[var(--leading-snug)] truncate">
            {result.title}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="brand" size="sm">{result.type}</Badge>
            <Badge variant="default" size="sm">{result.tone}</Badge>
            <Badge variant="default" size="sm">{result.length}</Badge>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>

          <ExportMenu result={result} />

        </div>
      </div>

      {/* ── Text statistics ── */}
      <TextStatisticsCard text={result.content} />

      {/* ── Divider ── */}
      <div
        className="h-px shrink-0 bg-[var(--color-border)]"
        aria-hidden="true"
      />

      {/* ── Generated text ── */}
      <div className="flex-1 overflow-y-auto">
        <p
          className={cn(
            'whitespace-pre-wrap text-[var(--text-sm)] leading-[var(--leading-relaxed)]',
            'text-[var(--color-text-primary)]',
          )}
        >
          {result.content}
        </p>
      </div>

      {/* ── Footer actions ── */}
      <div
        className={cn(
          'flex items-center gap-2.5 border-t border-[var(--color-border)] pt-4',
        )}
      >
        <Button
          variant="primary"
          size="sm"
          onClick={onRegenerate}
          aria-label="Regenerate with same prompt"
          leftIcon={
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3" />
            </svg>
          }
        >
          Regenerate
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          aria-label="Delete this generation"
          className="text-[var(--color-error)] hover:bg-[var(--color-error-subtle,#fef2f2)]"
          leftIcon={
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          }
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
