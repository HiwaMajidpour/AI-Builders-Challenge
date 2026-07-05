/**
 * features/ai/TextStatisticsCard.jsx
 *
 * Displays detailed statistics for the generated text.
 *
 * Props
 *   text   string
 */

import { getTextStatistics } from '../../utils/textStatistics';

// ── Small stat card ───────────────────────────────────────────────────────────

function Stat({ label, value }) {
    return (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
            <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
                {value}
            </p>
        </div>
    );
}

// ── TextStatisticsCard ────────────────────────────────────────────────────────

export default function TextStatisticsCard({ text }) {
    const stats = getTextStatistics(text);

    return (
        <section className="mb-5">
            <h3 className="mb-3 text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
                Text Statistics
            </h3>

            <div className="grid grid-cols-2 gap-3">
                <Stat
                    label="Reading Time"
                    value={`${stats.readingTime} min`}
                />

                <Stat
                    label="Words"
                    value={stats.words.toLocaleString()}
                />

                <Stat
                    label="Characters"
                    value={stats.characters.toLocaleString()}
                />

                <Stat
                    label="Paragraphs"
                    value={stats.paragraphs}
                />

                <Stat
                    label="Sentences"
                    value={stats.sentences}
                />

                <Stat
                    label="Avg. Word Length"
                    value={stats.averageWordLength}
                />
            </div>
        </section>
    );
}