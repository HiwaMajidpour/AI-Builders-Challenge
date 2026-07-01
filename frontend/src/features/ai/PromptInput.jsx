/**
 * features/ai/PromptInput.jsx
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { promptSchema } from '../../utils/validators';
import { useAI } from '../../hooks/useAI';
import { toast } from 'sonner';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function PromptInput() {
  const { generateText, isGenerating } = useAI();
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(promptSchema), defaultValues: { prompt: '' } });

  async function onSubmit({ prompt }) {
    try {
      await generateText(prompt);
      reset();
    } catch {
      toast.error('Generation failed. Please try again.');
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prompt" className="text-sm font-medium text-[var(--color-text-primary)]">
            Your prompt
          </label>
          <textarea
            id="prompt"
            rows={5}
            placeholder="Write a thrilling opening chapter for a dystopian novel set in 2157…"
            className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-base)]
                       px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                       focus:border-[var(--color-ai)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ai)]/20"
            aria-invalid={Boolean(errors.prompt)}
            {...register('prompt', {
              onChange: (e) => setCharCount(e.target.value.length),
            })}
          />
          <div className="flex items-center justify-between">
            {errors.prompt
              ? <p className="text-xs text-[var(--color-error)]">{errors.prompt.message}</p>
              : <span />
            }
            <span className="text-xs text-[var(--color-text-muted)]">{charCount} / 2000</span>
          </div>
        </div>

        <Button type="submit" variant="ai" className="w-full" isLoading={isGenerating}>
          {isGenerating ? 'Generating…' : '✦ Generate'}
        </Button>
      </form>
    </Card>
  );
}
