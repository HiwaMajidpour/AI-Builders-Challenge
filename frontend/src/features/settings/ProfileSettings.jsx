/**
 * features/settings/ProfileSettings.jsx
 * User profile settings.
 */

import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfileSettings() {
    const [form, setForm] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        bio: '',
    });

    const [saving, setSaving] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setSaving(true);

            // TODO: Connect to SettingsContext
            await new Promise((resolve) => setTimeout(resolve, 700));

            toast.success('Profile updated successfully.');
        } catch {
            toast.error('Failed to update profile.');
        } finally {
            setSaving(false);
        }
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

            <div className="space-y-5">

                <div>
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

                <div>
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
                        htmlFor="bio"
                        className="mb-2 block text-sm font-medium"
                    >
                        Bio
                    </label>

                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
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