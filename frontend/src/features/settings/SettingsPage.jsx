/**
 * features/settings/SettingsPage.jsx
 * Main Settings page.
 */

import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';

const TABS = [
    {
        label: 'Profile',
        to: ROUTES.PROFILE_SETTINGS,
    },
    {
        label: 'Account',
        to: ROUTES.ACCOUNT_SETTINGS,
    },
    {
        label: 'Appearance',
        to: ROUTES.APPEARANCE_SETTINGS,
    },
    {
        label: 'Notifications',
        to: ROUTES.NOTIFICATION_SETTINGS,
    },
    {
        label: 'Security',
        to: ROUTES.SECURITY_SETTINGS,
    },
    {
        label: 'Billing',
        to: ROUTES.BILLING_SETTINGS,
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Manage your StoryForge AI account preferences.
                </p>
            </header>

            <div className="overflow-x-auto">
                <nav className="flex gap-2 border-b border-[var(--color-border)] pb-3">
                    {TABS.map((tab) => (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            className={({ isActive }) =>
                                cn(
                                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-[var(--color-brand)] text-white'
                                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]'
                                )
                            }
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
                <Outlet />
            </section>
        </div>
    );
}