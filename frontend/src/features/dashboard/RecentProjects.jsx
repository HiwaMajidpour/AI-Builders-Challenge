/**
 * features/dashboard/RecentProjects.jsx
 */
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../constants/routes';
import { formatRelativeTime } from '../../utils/formatters';

const MOCK_PROJECTS = [
  { id: '1', title: 'The Neon Chronicles',  type: 'Sci-Fi Novel',  updatedAt: new Date(Date.now() - 3_600_000).toISOString() },
  { id: '2', title: 'Dragon Heart',          type: 'Fantasy Script', updatedAt: new Date(Date.now() - 86_400_000).toISOString() },
  { id: '3', title: 'Under Quiet Skies',     type: 'Short Story',   updatedAt: new Date(Date.now() - 259_200_000).toISOString() },
];

export default function RecentProjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <Button as={Link} to={ROUTES.PROJECTS} variant="ghost" size="sm">
          View all
        </Button>
      </CardHeader>

      <ul className="divide-y divide-[var(--color-border)]">
        {MOCK_PROJECTS.map((p) => (
          <li key={p.id} className="flex items-center justify-between py-3">
            <div>
              <Link
                to={`/dashboard/projects/${p.id}`}
                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
              >
                {p.title}
              </Link>
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Updated {formatRelativeTime(p.updatedAt)}
              </p>
            </div>
            <Badge>{p.type}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
