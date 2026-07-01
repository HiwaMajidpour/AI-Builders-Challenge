/**
 * features/ai/AIStudioPage.jsx
 */
import { useAI } from '../../hooks/useAI';
import PromptInput from './PromptInput';
import GenerationResult from './GenerationResult';
import AIHistoryPanel from './AIHistoryPanel';

export default function AIStudioPage() {
  const { isGenerating, lastResult, error } = useAI();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">AI Studio</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Describe what you want to create and let the AI do the heavy lifting.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main prompt + result */}
        <div className="space-y-4 lg:col-span-2">
          <PromptInput />

          {error && (
            <p className="rounded-[var(--radius-md)] border border-[var(--color-error)]/30 bg-red-50 px-4 py-3 text-sm text-[var(--color-error)]">
              {error}
            </p>
          )}

          {(isGenerating || lastResult) && (
            <GenerationResult result={lastResult} isLoading={isGenerating} />
          )}
        </div>

        {/* History sidebar */}
        <AIHistoryPanel />
      </div>
    </div>
  );
}
