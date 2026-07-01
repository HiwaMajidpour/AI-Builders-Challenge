/**
 * features/landing/PricingSection.jsx
 */
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ROUTES } from '../../constants/routes';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started.',
    features: ['10 AI generations / month', '1 active project', 'Export to plain text'],
    cta: 'Get started',
    variant: 'secondary',
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For serious creators.',
    features: ['Unlimited AI generations', 'Unlimited projects', 'All export formats', 'Priority support'],
    cta: 'Start Pro',
    variant: 'ai',
    popular: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'For studios and agencies.',
    features: ['Everything in Pro', 'Up to 10 seats', 'Shared project library', 'Dedicated account manager'],
    cta: 'Contact sales',
    variant: 'secondary',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 bg-[var(--color-bg-surface)]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Simple, transparent pricing</h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">No hidden fees. Cancel any time.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card key={plan.name} className={plan.popular ? 'border-[var(--color-ai)] ring-2 ring-[var(--color-ai)]/20' : ''}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-[var(--color-text-primary)]">{plan.name}</h3>
                {plan.popular && <Badge variant="ai">Most popular</Badge>}
              </div>
              <div className="mb-2 flex items-end gap-1">
                <span className="text-3xl font-bold text-[var(--color-text-primary)]">{plan.price}</span>
                <span className="mb-1 text-sm text-[var(--color-text-muted)]">{plan.period}</span>
              </div>
              <p className="mb-5 text-sm text-[var(--color-text-secondary)]">{plan.description}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <span className="text-[var(--color-success)]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button as={Link} to={ROUTES.REGISTER} variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
