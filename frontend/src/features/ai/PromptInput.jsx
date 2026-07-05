/**
 * features/ai/PromptInput.jsx
 *
 * Left panel of AI Studio.
 * Hosts the prompt textarea, generation options (type / tone / length / creativity),
 * and the Generate + Clear buttons.
 *
 * Props
 *   prompt         string
 *   setPrompt      fn(string)
 *   options        { type, tone, length, creativity }
 *   setOptions     fn(partial)
 *   onGenerate     fn()
 *   isGenerating   bool
 */
import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';

import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { PROMPT_TEMPLATES } from './promptTemplates';

// ── Configuration data ────────────────────────────────────────────────────────

const STORY_TYPES = ['Story', 'Script', 'Character', 'Dialogue', 'Outline', 'World Building'];
const TONES = ['Fantasy', 'Sci-Fi', 'Professional', 'Dark', 'Funny'];
const LENGTHS = ['Short', 'Medium', 'Long'];
const MAX_CHARS = 1000;

// ── SegmentedControl ──────────────────────────────────────────────────────────

function SegmentedControl({ label, options, value, onChange, disabled }) {
  const id = useId();
  return (
    <fieldset>
      <legend
        id={id}
        className="mb-1.5 block text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]"
      >
        {label}
      </legend>
      <div
        role="group"
        aria-labelledby={id}
        className="flex flex-wrap gap-1.5"
      >
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={value === opt}
            disabled={disabled}
            onClick={() => onChange(opt)}
            className={cn(
              'rounded-[var(--radius-md)] border px-2.5 py-1',
              'text-[var(--text-xs)] font-[var(--weight-medium)] leading-none',
              'transition-[color,background-color,border-color] duration-[var(--duration-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              'disabled:pointer-events-none disabled:opacity-40',
              value === opt
                ? 'border-[var(--color-brand)] bg-[var(--color-brand-subtle)] text-[var(--color-brand)]'
                : 'border-[var(--color-border)] bg-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// ── CreativitySlider ──────────────────────────────────────────────────────────

function CreativitySlider({ value, onChange, disabled }) {
  const id = useId();
  const label =
    value < 30 ? 'Precise' :
      value < 60 ? 'Balanced' :
        value < 85 ? 'Creative' : 'Wild';

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]"
        >
          Creativity
        </label>
        <span className="flex items-center gap-1.5 text-[var(--text-xs)]">
          <span className="font-[var(--weight-semibold)] text-[var(--color-brand)]">{value}</span>
          <span className="text-[var(--color-text-muted)]">· {label}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        aria-label={`Creativity: ${value} — ${label}`}
        className={cn(
          'w-full cursor-pointer appearance-none',
          'h-1.5 rounded-full',
          'bg-[var(--color-border)]',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-[var(--color-brand)]',
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white',
          '[&::-webkit-slider-thumb]:shadow-[var(--shadow-sm)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
          'disabled:pointer-events-none disabled:opacity-40',
        )}
        style={{
          background: `linear-gradient(to right, var(--color-brand) ${value}%, var(--color-border) ${value}%)`,
        }}
      />
    </div>
  );
}

// ── PromptInput ───────────────────────────────────────────────────────────────

const PromptInput = forwardRef(function PromptInput({
  prompt,
  setPrompt,
  options,
  setOptions,
  onGenerate,
  isGenerating,
  recentPrompts = [],
}, ref) {
  const textareaId = useId();

  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      textareaRef.current?.focus();
    },

    blur() {
      textareaRef.current?.blur();
    },
  }));

  // Always work with a safe string value.
  const safePrompt = prompt ?? '';

  const charCount = safePrompt.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isEmpty = safePrompt.trim().length === 0;

  function handleKeyDown(e) {
    // Escape → remove focus from the textarea
    if (e.key === 'Escape') {
      textareaRef.current?.blur();
      return;
    }

    // Ctrl/Cmd + Enter → generate
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === 'Enter' &&
      !isGenerating &&
      !isEmpty &&
      !isOverLimit
    ) {
      e.preventDefault();
      onGenerate();
    }
  }

  return (
    <section
      className="flex h-full flex-col gap-5 overflow-y-auto"
      aria-label="Prompt editor"
    >
      {/* ── Textarea ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]"
        >
          Your Prompt
        </label>

        <div className="relative">
          <textarea
            ref={textareaRef}
            id={textareaId}
            value={safePrompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            placeholder="Describe your story idea…"
            aria-label="Story prompt"
            aria-describedby={`${textareaId}-counter`}
            rows={7}
            className={cn(
              'w-full resize-none rounded-[var(--radius-xl)]',
              'border bg-[var(--color-bg-elevated)]',
              'px-4 py-3.5 text-[var(--text-sm)] text-[var(--color-text-primary)]',
              'placeholder:text-[var(--color-text-muted)]',
              'leading-[var(--leading-relaxed)]',
              'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]',
              'disabled:pointer-events-none disabled:opacity-60',
              isOverLimit
                ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                : 'border-[var(--color-border)] focus:border-[var(--color-border-focus)]',
            )}
          />

          {/* Empty-state hint (shown inside textarea area when empty) */}
          {isEmpty && !isGenerating && (
            <p className="pointer-events-none absolute bottom-3 right-4 text-[var(--text-2xs)] text-[var(--color-text-muted)] select-none">
              Ctrl+Enter to generate
            </p>
          )}
        </div>

      </div>

      {/* Prompt templates */}

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
          Templates
        </p>

        <div className="flex flex-wrap gap-2">

          {PROMPT_TEMPLATES.map((template) => (

            <Button
              key={template.label}
              size="xs"
              variant="secondary"
              onClick={() => setPrompt(template.prompt)}
            >
              {template.label}
            </Button>

          ))}

        </div>

        {/* Character counter */}
        <div
          id={`${textareaId}-counter`}
          className="flex items-center justify-end gap-1.5"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className={cn(
              'text-[var(--text-xs)]',
              isOverLimit
                ? 'font-[var(--weight-semibold)] text-[var(--color-error)]'
                : charCount > MAX_CHARS * 0.8
                  ? 'text-[var(--color-warning)]'
                  : 'text-[var(--color-text-muted)]',
            )}
          >
            {charCount} / {MAX_CHARS}
          </span>
        </div>
      </div>

      {recentPrompts.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
            Recent Prompts
          </p>

          <div className="flex flex-wrap gap-2">
            {recentPrompts.slice(0, 5).map((item) => (
              <Button
                key={item.id}
                size="xs"
                variant="ghost"
                onClick={() => setPrompt(item.prompt)}
                title={item.prompt}
              >
                {item.prompt.length > 24
                  ? `${item.prompt.slice(0, 24)}...`
                  : item.prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* ── Generation options ── */}
      <div className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">

        <SegmentedControl
          label="Story Type"
          options={STORY_TYPES}
          value={options.type}
          onChange={(v) => setOptions({ type: v })}
          disabled={isGenerating}
        />

        <SegmentedControl
          label="Tone"
          options={TONES}
          value={options.tone}
          onChange={(v) => setOptions({ tone: v })}
          disabled={isGenerating}
        />

        <SegmentedControl
          label="Length"
          options={LENGTHS}
          value={options.length}
          onChange={(v) => setOptions({ length: v })}
          disabled={isGenerating}
        />

        <CreativitySlider
          value={options.creativity}
          onChange={(v) => setOptions({ creativity: v })}
          disabled={isGenerating}
        />
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-2.5">
        <Button
          variant="brand"
          size="lg"
          fullWidth
          onClick={onGenerate}
          disabled={isGenerating || isEmpty || isOverLimit}
          aria-label={isGenerating ? 'Generating…' : 'Generate story'}
          leftIcon={
            isGenerating
              ? <Spinner size="sm" className="text-current opacity-80" />
              : (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              )
          }
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => setPrompt('')}
          disabled={isGenerating || isEmpty}
          aria-label="Clear prompt"
        >
          Clear
        </Button>
      </div>
    </section>
  );
});

export default PromptInput;
