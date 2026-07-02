/**
 * features/settings/SecuritySettings.jsx
 * Security settings page.
 */

export default function SecuritySettings() {
    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Security
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Manage password and account security.
                </p>
            </div>

            <div className="space-y-4">

                <div className="rounded-lg border border-[var(--color-border)] p-4">
                    <h3 className="font-medium text-[var(--color-text-primary)]">
                        Password
                    </h3>

                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        Change your password to keep your account secure.
                    </p>

                    <button
                        type="button"
                        className="mt-4 rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        Change Password
                    </button>
                </div>

                <div className="rounded-lg border border-[var(--color-border)] p-4">
                    <h3 className="font-medium text-[var(--color-text-primary)]">
                        Two-Factor Authentication
                    </h3>

                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        Add an extra layer of protection to your account.
                    </p>

                    <button
                        type="button"
                        className="mt-4 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium"
                    >
                        Enable 2FA
                    </button>
                </div>

            </div>

        </div>
    );
}