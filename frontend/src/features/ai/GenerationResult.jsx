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
import { toast } from 'sonner';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { CardTitle } from '../../components/ui/Card';

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
    <div
      role="status"
      className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center"
    >
      <div
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3a11 11 0 1 0 0 22A11 11 0 0 0 14 3z" />
          <path d="M14 9v5l3 3" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[var(--text-base)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          No generation yet
        </p>
        <p className="max-w-xs text-[var(--text-sm)] text-[var(--color-text-muted)]">
          Write a prompt and press <strong>Generate</strong> to create your first story.
        </p>
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

  // ── Copy Markdown ───────────────────────────────────────────────────────────

  async function handleCopyMarkdown() {
    const markdown = `# ${result.title}

${result.content}
`;

    await navigator.clipboard.writeText(markdown);

    toast.success('Markdown copied.');
  }

  // ── Download TXT ────────────────────────────────────────────────────────────

  function handleDownloadTxt() {
    const blob = new Blob(
      [`${result.title}\n\n${result.content}`],
      {
        type: 'text/plain;charset=utf-8',
      },
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = `${result.title
      .replace(/\s+/g, '-')
      .toLowerCase()}.txt`;

    link.click();

    URL.revokeObjectURL(url);

    toast.success('TXT downloaded.');
  }

  // ── Download Markdown ───────────────────────────────────────────────────────

  function handleDownloadMarkdown() {
    const markdown = `# ${result.title}

${result.content}
`;

    const blob = new Blob(
      [markdown],
      {
        type: 'text/markdown;charset=utf-8',
      },
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = `${result.title
      .replace(/\s+/g, '-')
      .toLowerCase()}.md`;

    link.click();

    URL.revokeObjectURL(url);

    toast.success('Markdown downloaded.');
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

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadTxt}
          >
            TXT
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadMarkdown}
          >
            MD
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyMarkdown}
          >
            Copy MD
          </Button>

        </div>
      </div>

      {/* ── Metadata ── */}
      <dl
        className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[var(--text-xs)] text-[var(--color-text-muted)]"
        aria-label="Generation statistics"
      >
        <div className="flex items-center gap-1">
          <dt>Words</dt>
          <dd className="font-[var(--weight-semibold)] text-[var(--color-text-secondary)]">{result.wordCount.toLocaleString()}</dd>
        </div>
        <div className="flex items-center gap-1">
          <dt>Characters</dt>
          <dd className="font-[var(--weight-semibold)] text-[var(--color-text-secondary)]">{result.charCount.toLocaleString()}</dd>
        </div>
        <div className="flex items-center gap-1">
          <dt>Reading time</dt>
          <dd className="font-[var(--weight-semibold)] text-[var(--color-text-secondary)]">~{result.readingTime} min</dd>
        </div>
      </dl>

      {/* ── Divider ── */}
      <div className="h-px shrink-0 bg-[var(--color-border)]" aria-hidden="true" />

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
