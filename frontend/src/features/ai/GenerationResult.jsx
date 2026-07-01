/**
 * features/ai/GenerationResult.jsx
 */
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import { toast } from 'sonner';
import { formatDate } from '../../utils/formatters';

export default function GenerationResult({ result, isLoading }) {
  function handleCopy() {
    if (!result?.result) return;
    navigator.clipboard.writeText(result.result).then(() => toast.success('Copied to clipboard'));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        {result && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-muted)]">
              {formatDate(result.createdAt)}
            </span>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              Copy
            </Button>
          </div>
        )}
      </CardHeader>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" className="text-[var(--color-ai)]" />
        </div>
      ) : (
        <div className="prose max-w-none text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">
          {result?.result ?? 'Your generated content will appear here.'}
        </div>
      )}
    </Card>
  );
}
