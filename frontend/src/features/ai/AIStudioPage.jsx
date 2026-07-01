/**
 * features/ai/AIStudioPage.jsx
 *
 * Three-panel AI creation workspace.
 *
 * Desktop (≥ lg)
 * ┌─────────────────┬──────────────────────────────┬────────────────┐
 * │  Prompt + opts  │      Generation Result        │    History     │
 * │  (w-80 fixed)   │      (flex-1, scrollable)     │  (w-72 fixed)  │
 * └─────────────────┴──────────────────────────────┴────────────────┘
 *
 * Tablet (md–lg)
 * ┌──────────────────────────┐
 * │   Prompt + opts          │
 * ├──────────────────────────┤
 * │   Generation Result      │
 * ├──────────────────────────┤
 * │   History                │
 * └──────────────────────────┘
 *
 * Mobile (< md)
 * Prompt + Result stacked; History accessible via slide-up drawer.
 */

import { useState, useCallback } from 'react';
import { toast }                 from 'sonner';
import { useAI }                 from '../../hooks/useAI';
import { cn }                    from '../../utils/cn';
import Button                    from '../../components/ui/Button';
import Badge                     from '../../components/ui/Badge';
import PromptInput               from './PromptInput';
import GenerationResult          from './GenerationResult';
import AIHistoryPanel            from './AIHistoryPanel';

// ── Default generation options ────────────────────────────────────────────────

const DEFAULT_OPTIONS = {
  type:       'Story',
  tone:       'Fantasy',
  length:     'Medium',
  creativity: 65,
};

// ── Mobile history drawer ─────────────────────────────────────────────────────

function HistoryDrawer({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
      />
      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Generation history"
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 md:hidden',
          'flex max-h-[75vh] flex-col',
          'rounded-t-[var(--radius-2xl)] border-t border-[var(--color-border)]',
          'bg-[var(--color-bg-elevated)] px-5 pb-8 pt-4',
          'shadow-[var(--shadow-2xl,0_-8px_40px_rgba(0,0,0,0.15))]',
          'animate-slide-up',
        )}
      >
        {/* Drag handle */}
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--color-border-strong)]"
        />
        {children}
      </div>
    </>
  );
}

// ── Prompt saved for regeneration ─────────────────────────────────────────────

export default function AIStudioPage() {
  const { isGenerating, currentResult, history, generate, loadResult, deleteGeneration, clearHistory } = useAI();

  const [prompt,        setPrompt]        = useState('');
  const [options,       setOptionsState]  = useState(DEFAULT_OPTIONS);
  const [historyOpen,   setHistoryOpen]   = useState(false);
  const [lastPrompt,    setLastPrompt]    = useState('');
  const [lastOptions,   setLastOptions]   = useState(DEFAULT_OPTIONS);

  // Merge-update options (partial)
  const setOptions = useCallback((patch) => {
    setOptionsState((prev) => ({ ...prev, ...patch }));
  }, []);

  // ── Generate ────────────────────────────────────────────────────────────────
  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLastPrompt(prompt);
    setLastOptions({ ...options });
    try {
      await generate({ prompt: prompt.trim(), ...options });
    } catch {
      toast.error('Generation failed. Please try again.');
    }
  }

  // ── Regenerate (re-run last prompt+options) ─────────────────────────────────
  async function handleRegenerate() {
    if (!lastPrompt) return;
    try {
      await generate({ prompt: lastPrompt, ...lastOptions });
    } catch {
      toast.error('Regeneration failed. Please try again.');
    }
  }

  // ── Delete current result ───────────────────────────────────────────────────
  function handleDelete() {
    if (!currentResult) return;
    deleteGeneration(currentResult.id);
    toast.success('Generation deleted.');
  }

  // ── Select from history ─────────────────────────────────────────────────────
  function handleHistorySelect(item) {
    loadResult(item);
    setHistoryOpen(false);
  }

  // ── Delete from history ──────────────────────────────────────────────────────
  function handleHistoryDelete(id) {
    deleteGeneration(id);
    toast.success('Removed from history.');
  }

  // ── Clear all ───────────────────────────────────────────────────────────────
  function handleClearAll() {
    clearHistory();
    toast.success('History cleared.');
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-0 flex-col gap-0">

      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[var(--text-xl)] font-[var(--weight-bold)] leading-[var(--leading-snug)] text-[var(--color-text-primary)]">
              AI Studio
            </h1>
            <Badge variant="brand" size="sm" dot>
              Beta
            </Badge>
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Generate stories, scripts, characters, and more with AI.
          </p>
        </div>

        {/* Mobile — open history drawer */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setHistoryOpen(true)}
          aria-label={`Open history${history.length > 0 ? `, ${history.length} items` : ''}`}
          className="shrink-0 md:hidden"
          leftIcon={
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 8V4H8" />
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
              <path d="M2 14l4-4 4 4 4-4 4 4" />
            </svg>
          }
        >
          History
          {history.length > 0 && (
            <Badge variant="brand" size="sm">{history.length}</Badge>
          )}
        </Button>
      </div>

      {/* ── Three-panel layout ── */}
      <div
        className={cn(
          'flex min-h-0 gap-5',
          // Desktop: horizontal row; tablet+: stacked
          'flex-col lg:flex-row',
          // On desktop, all panels share full page height minus header
          'lg:h-[calc(100vh-var(--size-topbar,3.5rem)-5rem)]',
        )}
      >

        {/* ══ Left: Prompt editor ══ */}
        <div
          className={cn(
            'flex flex-col',
            'rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
            'p-5 shadow-[var(--shadow-sm)]',
            // Desktop: fixed width + full height with internal scroll
            'lg:w-80 lg:shrink-0 lg:overflow-hidden',
          )}
        >
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            options={options}
            setOptions={setOptions}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* ══ Middle: Generation result ══ */}
        <div
          className={cn(
            'flex flex-col',
            'rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
            'p-5 shadow-[var(--shadow-sm)]',
            // Mobile: min height; Desktop: flex-1 + overflow hidden (internal scroll)
            'min-h-[28rem] lg:min-h-0 lg:flex-1 lg:overflow-hidden',
          )}
        >
          <GenerationResult
            result={currentResult}
            isGenerating={isGenerating}
            onRegenerate={handleRegenerate}
            onDelete={handleDelete}
          />
        </div>

        {/* ══ Right: History panel (desktop + tablet) ══ */}
        <div
          className={cn(
            'hidden md:flex flex-col',
            'rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
            'p-5 shadow-[var(--shadow-sm)]',
            // Desktop: fixed width + full height with internal scroll
            'lg:w-72 lg:shrink-0 lg:overflow-hidden',
            // Tablet: full width stacked
            'md:w-full lg:w-72',
          )}
        >
          <AIHistoryPanel
            history={history}
            currentResult={currentResult}
            onSelect={handleHistorySelect}
            onDelete={handleHistoryDelete}
            onClearAll={handleClearAll}
          />
        </div>

      </div>

      {/* ══ Mobile history drawer ══ */}
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
      >
        <AIHistoryPanel
          history={history}
          currentResult={currentResult}
          onSelect={handleHistorySelect}
          onDelete={handleHistoryDelete}
          onClearAll={handleClearAll}
        />
      </HistoryDrawer>

    </div>
  );
}
