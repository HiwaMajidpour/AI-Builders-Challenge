/**
 * features/settings/AppearanceSettings.jsx
 * Appearance preferences.
 */

import { useState } from 'react';
import { toast } from 'sonner';

import { useSettings } from '../../hooks/useSettings';

const THEMES = [
    {
        value: 'light',
        label: 'Light',
        description: 'Always use the light theme.',
    },
    {
        value: 'dark',
        label: 'Dark',
        description: 'Always use the dark theme.',
    },
    {
        value: 'system',
        label: 'System',
        description: 'Follow your operating system preference.',
    },
];

export default function AppearanceSettings() {
    const {
        settings,
        updateSettings,
        loading,
    } = useSettings();

    const [saving, setSaving] = useState(false);

    if (loading && !settings) {
        return (
            <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                Loading appearance settings...
            </div>
        );
    }

    const currentTheme = settings?.appearance?.theme ?? 'system';

    async function handleThemeChange(event) {
        const theme = event.target.value;

        try {
            setSaving(true);

            await updateSettings({
                appearance: {
                    ...settings.appearance,
                    theme,
                },
            });

            toast.success('Appearance updated successfully.');
        } catch {
            toast.error('Failed to update appearance.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Appearance
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Choose how StoryForge AI looks on your device.
                </p>
            </div>

            <div className="space-y-4">
                {THEMES.map((theme) => (
                    <label
                        key={theme.value}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-border)] p-4 transition hover:bg-[var(--color-bg-surface)]"
                    >
                        <input
                            type="radio"
                            name="theme"
                            value={theme.value}
                            checked={currentTheme === theme.value}
                            onChange={handleThemeChange}
                            disabled={saving}
                            className="mt-1"
                        />

                        <div>
                            <div className="font-medium text-[var(--color-text-primary)]">
                                {theme.label}
                            </div>

                            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                {theme.description}
                            </p>
                        </div>
                    </label>
                ))}
            </div>

            {saving && (
                <p className="text-sm text-[var(--color-text-muted)]">
                    Saving changes...
                </p>
            )}
        </div>
    );
}