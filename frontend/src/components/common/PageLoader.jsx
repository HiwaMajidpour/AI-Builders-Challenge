/**
 * components/common/PageLoader.jsx
 * Full-viewport centred loading state.
 */
import Spinner from '../ui/Spinner';
import { APP_NAME } from '../../config';

export default function PageLoader({ message }) {
  return (
    <div
      role="status"
      aria-label={message ?? 'Loading'}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4
                 bg-[var(--color-bg-base)]"
    >
      <Spinner size="lg" className="text-[var(--color-accent)]" />
      <p className="text-sm text-[var(--color-text-muted)]">
        {message ?? `Loading ${APP_NAME}…`}
      </p>
    </div>
  );
}
