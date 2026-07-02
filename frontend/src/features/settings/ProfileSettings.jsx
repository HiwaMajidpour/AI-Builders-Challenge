/**
 * features/settings/ProfileSettings.jsx
 * User profile settings.
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { useSettings } from '../../hooks/useSettings';

export default function ProfileSettings() {
    const {
        settings,
        updateSettings,
        loading,
    } = useSettings();

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState(() => ({
        name: settings?.profile?.name ?? '',
        email: settings?.profile?.email ?? '',
        bio: settings?.profile?.bio ?? '',
        country: settings?.profile?.country ?? '',
        timezone: settings?.profile?.timezone ?? '',
    }));

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);

            await updateSettings({
                profile: form,
            });

            toast.success('Profile updated successfully.');
        } catch {
            toast.error('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    }

    if (loading && !settings) {
        return (
            <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                Loading profile...
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Profile
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Update your public profile information.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Full Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium"
                    >
                        Country
                    </label>

                    <input
                        id="country"
                        name="country"
                        type="text"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="timezone"
                        className="mb-2 block text-sm font-medium"
                    >
                        Timezone
                    </label>

                    <input
                        id="timezone"
                        name="timezone"
                        type="text"
                        value={form.timezone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="bio"
                        className="mb-2 block text-sm font-medium"
                    >
                        Bio
                    </label>

                    <textarea
                        id="bio"
                        name="bio"
                        rows={5}
                        value={form.bio}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-2"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[var(--color-brand)] px-5 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
}