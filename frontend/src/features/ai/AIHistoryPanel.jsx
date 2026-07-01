/**
 * features/ai/AIHistoryPanel.jsx
 */
import { useEffect } from 'react';
import { useAI } from '../../hooks/useAI';
import Card, { CardTitle } from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { truncate, formatRelativeTime } from '../../utils/formatters';

export default function AIHistoryPanel() {
  const { history, fetchHistory, isGenerating } = useAI();

  useEffect(() => {
    fetchHistory({ page: 1, limit: 10 }).catch(() => {/* silently ignore on 404 */});
  }, [fetchHistory]);

  return (
    <Card className="h-fit">
      <CardTitle className="mb-4">History</CardTitle>

      {isGenerating && history.length === 0 ? (
        <div className="flex justify-center py-6">
          <Spinner className="text-[var(--color-ai)]" />
        </div>
      ) : history.length === 0 ? (
        <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
          No generations yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item.id} className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
              <p className="text-xs font-medium text-[var(--color-text-primary)]">
                {truncate(item.result, 80)}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {formatRelativeTime(item.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
