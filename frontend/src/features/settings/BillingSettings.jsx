/**
 * features/settings/BillingSettings.jsx
 * Billing settings.
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { useSettings } from '../../hooks/useSettings';

export default function BillingSettings() {
    const {
        settings,
        updateSettings,
        loading,
    } = useSettings();

    const [saving, setSaving] = useState(false);

    if (loading || !settings) {
        return (
            <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                Loading billing information...
            </div>
        );
    }

    const billing = settings.billing;

    async function handleUpgrade() {
        try {
            setSaving(true);

            await updateSettings({
                billing: {
                    ...billing,
                    plan: 'Pro',
                    aiCredits: billing.aiCredits + 500,
                },
            });

            toast.success('Plan upgraded successfully.');
        } catch {
            toast.error('Failed to upgrade plan.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Billing
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Manage your subscription and AI usage.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

                <div className="rounded-xl border border-[var(--color-border)] p-5">
                    <p className="text-sm text-[var(--color-text-muted)]">
                        Current Plan
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {billing.plan}
                    </h3>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] p-5">
                    <p className="text-sm text-[var(--color-text-muted)]">
                        AI Credits
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {billing.aiCredits}
                    </h3>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] p-5">
                    <p className="text-sm text-[var(--color-text-muted)]">
                        Monthly Usage
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {billing.usage}%
                    </h3>
                </div>

            </div>

            <div className="rounded-xl border border-[var(--color-border)] p-6">
                <h3 className="text-lg font-semibold">
                    Upgrade your plan
                </h3>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Upgrade to Pro and receive additional AI credits along with
                    premium features.
                </p>

                <button
                    type="button"
                    onClick={handleUpgrade}
                    disabled={saving}
                    className="mt-6 rounded-lg bg-[var(--color-brand)] px-5 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? 'Processing...' : 'Upgrade to Pro'}
                </button>
            </div>
        </div>
    );
}