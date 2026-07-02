/**
 * features/settings/AccountSettings.jsx
 * Account settings.
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { useSettings } from '../../hooks/useSettings';

export default function AccountSettings() {
    const {
        settings,
        loading,
    } = useSettings();

    const [deleting, setDeleting] = useState(false);

    async function handleDeleteAccount() {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (!confirmed) return;

        try {
            setDeleting(true);

            // TODO:
            // Replace with real API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            toast.success('Account deleted successfully.');
        } catch {
            toast.error('Failed to delete account.');
        } finally {
            setDeleting(false);
        }
    }

    if (loading && !settings) {
        return (
            <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                Loading account...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Account
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    View your account information and manage your account.
                </p>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] p-5">
                <dl className="space-y-4">

                    <div className="flex items-center justify-between">
                        <dt className="font-medium">
                            Email
                        </dt>

                        <dd className="text-[var(--color-text-muted)]">
                            {settings?.profile?.email ?? '-'}
                        </dd>
                    </div>

                    <div className="flex items-center justify-between">
                        <dt className="font-medium">
                            Current Plan
                        </dt>

                        <dd className="text-[var(--color-text-muted)]">
                            {settings?.billing?.plan ?? 'Free'}
                        </dd>
                    </div>

                    <div className="flex items-center justify-between">
                        <dt className="font-medium">
                            AI Credits
                        </dt>

                        <dd className="text-[var(--color-text-muted)]">
                            {settings?.billing?.aiCredits ?? 0}
                        </dd>
                    </div>

                </dl>
            </div>

            <div className="rounded-xl border border-red-300 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/30">

                <h3 className="text-lg font-semibold text-red-600">
                    Danger Zone
                </h3>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Permanently delete your account and all stored data.
                </p>

                <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {deleting
                        ? 'Deleting...'
                        : 'Delete Account'}
                </button>

            </div>

        </div>
    );
}