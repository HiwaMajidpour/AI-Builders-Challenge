/**
 * features/editor/AIAssistantPanel.jsx
 * Mock AI assistant panel. Uses AIContext.generate() for actual mock generation.
 *
 * Props
 *   content    string  (current editor content, sent as context)
 *   onInsert   fn(text) — inserts AI-generated text at cursor / end
 */
import { useState }  from 'react';
import { useAI }     from '../../hooks/useAI';
import Button        from '../../components/ui/Button';
import Spinner       from '../../components/ui/Spinner';

const ACTIONS = [
  {
    id:     'continue',
    label:  'Continue Writing',
    prompt: 'Continue this story naturally from where it left off, maintaining the same voice and tone.',
    icon:   (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id:     'rewrite',
    label:  'Rewrite',
    prompt: 'Rewrite the last paragraph with more clarity, stronger prose, and better pacing.',
    icon:   (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3" />
      </svg>
    ),
  },
  {
    id:     'summarize',
    label:  'Summarize',
    prompt: 'Write a one-paragraph summary of this story so far.',
    icon:   (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="21" y1="10" x2="3"  y2="10" />
        <line x1="21" y1="6"  x2="3"  y2="6"  />
        <line x1="21" y1="14" x2="3"  y2="14" />
        <line x1="21" y1="18" x2="7"  y2="18" />
      </svg>
    ),
  },
  {
    id:     'style',
    label:  'Improve Style',
    prompt: 'Improve the prose style of this passage — make it more vivid, precise, and engaging.',
    icon:   (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id:     'ending',
    label:  'Generate Ending',
    prompt: 'Write a satisfying ending for this story that resolves the central conflict.',
    icon:   (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function AIAssistantPanel({ content, onInsert }) {
  const { generate, isGenerating } = useAI();
  const [activeAction, setActiveAction] = useState(null);
  const [result,       setResult]       = useState(null);

  async function handleAction(action) {
    setActiveAction(action.id);
    setResult(null);
    try {
      const fullPrompt = `${action.prompt}\n\n---\n\n${content?.slice(-600) ?? ''}`;
      const res = await generate({ prompt: fullPrompt, type: 'Story', tone: 'Fantasy', length: 'Short' });
      setResult(res.content);
    } catch {
      setResult('Generation failed. Please try again.');
    } finally {
      setActiveAction(null);
    }
  }

  function handleInsert() {
    if (result) {
      onInsert(`\n\n${result}`);
      setResult(null);
    }
  }

  return (
    <div className="flex h-full flex-col" aria-label="AI writing assistant">
      {/* Header */}
      <div className="shrink-0 border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-brand)]" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <h2 className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
            AI Assistant
          </h2>
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 flex flex-col gap-1.5 p-3">
        {ACTIONS.map((action) => {
          const isThis = activeAction === action.id;
          return (
            <Button
              key={action.id}
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => handleAction(action)}
              disabled={isGenerating}
              aria-label={action.label}
              leftIcon={isThis ? <Spinner size="sm" className="text-current" /> : action.icon}
              className="justify-start text-left"
            >
              {isThis ? 'Generating…' : action.label}
            </Button>
          );
        })}
      </div>

      {/* Result */}
      {(isGenerating && !activeAction) || result ? (
        <div className="flex flex-1 flex-col gap-2 overflow-hidden border-t border-[var(--color-border)] p-3">
          <p className="shrink-0 text-[var(--text-xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
            Result
          </p>
          <div className="flex-1 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
            {result ? (
              <p className="whitespace-pre-wrap text-[var(--text-xs)] leading-[var(--leading-relaxed)] text-[var(--color-text-secondary)]">
                {result}
              </p>
            ) : (
              <div className="flex items-center gap-2 text-[var(--text-xs)] text-[var(--color-text-muted)]">
                <Spinner size="sm" />
                Generating…
              </div>
            )}
          </div>
          {result && (
            <div className="shrink-0 flex gap-2">
              <Button
                variant="brand"
                size="sm"
                onClick={handleInsert}
                aria-label="Insert generated text into document"
                fullWidth
              >
                Insert
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setResult(null)}
                aria-label="Dismiss result"
              >
                Dismiss
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
            Select an action above to generate content for your story.
          </p>
        </div>
      )}
    </div>
  );
}
