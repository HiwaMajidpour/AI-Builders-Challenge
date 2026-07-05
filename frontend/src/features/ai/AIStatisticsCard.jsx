/**
 * features/ai/AIStatisticsCard.jsx
 *
 * Displays AI generation statistics.
 */

import Badge from '../../components/ui/Badge';

export default function AIStatisticsCard({ statistics }) {
    return (
        <div className="mb-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">

            <div className="mb-3 flex items-center justify-between">

                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    AI Statistics
                </h3>

                <Badge
                    variant="brand"
                    size="sm"
                >
                    {statistics.total}
                </Badge>

            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">

                <Stat
                    label="Pinned"
                    value={statistics.pinned}
                />

                <Stat
                    label="Avg Words"
                    value={statistics.averageWords}
                />

                <Stat
                    label="Stories"
                    value={statistics.stories}
                />

                <Stat
                    label="Scripts"
                    value={statistics.scripts}
                />

                <Stat
                    label="Characters"
                    value={statistics.characters}
                />

                <Stat
                    label="Dialogues"
                    value={statistics.dialogues}
                />

            </div>

        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2">

            <p className="text-[11px] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 font-semibold text-[var(--color-text-primary)]">
                {value}
            </p>

        </div>
    );
}