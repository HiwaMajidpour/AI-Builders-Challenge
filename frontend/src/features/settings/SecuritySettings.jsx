/**
 * features/settings/SecuritySettings.jsx
 * Security settings page.
 */

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function SecuritySettings() {
    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Security
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Manage your password and account security settings.
                </p>
            </div>

            <Card padding="md">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Password
                </h3>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Change your password regularly to keep your account secure.
                </p>

                <div className="mt-4">
                    <Button variant="primary">
                        Change Password
                    </Button>
                </div>
            </Card>

            <Card padding="md">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Two-Factor Authentication
                </h3>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Add an extra layer of protection to your account by enabling two-factor authentication.
                </p>

                <div className="mt-4">
                    <Button variant="secondary">
                        Enable 2FA
                    </Button>
                </div>
            </Card>

        </div>
    );
}