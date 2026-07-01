/**
 * features/dashboard/QuickActions.jsx
 */
import { Link } from 'react-router-dom';
import Card, { CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../constants/routes';

const ACTIONS = [
  { label: '✦ New AI generation', to: ROUTES.AI_STUDIO, variant: 'ai' },
  { label: '＋ New project',       to: ROUTES.PROJECTS,  variant: 'secondary' },
];

export default function QuickActions() {
  return (
    <Card>
      <CardTitle className="mb-4">Quick actions</CardTitle>
      <div className="flex flex-col gap-3">
        {ACTIONS.map(({ label, to, variant }) => (
          <Button key={to} as={Link} to={to} variant={variant} className="w-full justify-start">
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
