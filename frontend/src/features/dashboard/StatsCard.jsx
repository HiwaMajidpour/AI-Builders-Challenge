/**
 * features/dashboard/StatsCard.jsx
 */
import Card from '../../components/ui/Card';

export default function StatsCard({ label, value, delta }) {
  return (
    <Card>
      <p className="text-xs font-medium text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{delta}</p>
    </Card>
  );
}
