/**
 * features/settings/NotificationsSettings.jsx
 * Notification preferences.
 */

import { toast } from 'sonner';

import { useSettings } from '../../hooks/useSettings';

const OPTIONS = [
    {
        key: 'email',
        title: 'Email Notifications',
        description: 'Receive important updates by email.',
    },
    {
        key: 'push',
        title: 'Push Notifications',
        description: 'Receive browser notifications.',
    },
    {
        key: 'aiTips',
        title: 'AI Tips',
        description: 'Receive AI tips and productivity suggestions.',
    },
    {
        key: 'marketing',
        title: 'Marketing Emails',
        description: 'Receive product news and promotional emails.',
    },
];

export default function NotificationsSettings() {
    const {
        settings,
        updateSettings,
        loading,
    } = useSettings();

    if (loading && !settings) {
        return (
            <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                Loading notification settings...
            </div>
        );
    }

    const notifications = settings?.notifications ?? {};

    async function handleToggle(key) {
        try {
            await updateSettings({
                notifications: {
                    ...notifications,
                    [key]: !notifications[key],
                },
            });

            toast.success('Notification preferences updated.');
        } catch {
            toast.error('Failed to update notification preferences.');
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Notifications
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Choose which notifications you want to receive.
                </p>
            </div>

            <div className="space-y-4">
                {OPTIONS.map((option) => (
                    <label
                        key={option.key}
                        className="flex items-center justify-between rounded-xl border border-[var(--color-border)] p-4"
                    >
                        <div className="pr-6">
                            <h3 className="font-medium text-[var(--color-text-primary)]">
                                {option.title}
                            </h3>

                            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                {option.description}
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={Boolean(notifications[option.key])}
                            onChange={() => handleToggle(option.key)}
                            className="h-5 w-5"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}