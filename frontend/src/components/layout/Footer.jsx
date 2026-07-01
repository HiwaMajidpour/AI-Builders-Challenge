/**
 * components/layout/Footer.jsx
 * Public-facing footer.
 */
import { Link } from 'react-router-dom';
import { APP_NAME, APP_VERSION } from '../../config';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[var(--color-text-muted)] sm:flex-row sm:px-6">
        <span>
          © {year} {APP_NAME} v{APP_VERSION}. All rights reserved.
        </span>
        <nav className="flex gap-5">
          <Link to="/privacy" className="hover:text-[var(--color-text-secondary)]">Privacy</Link>
          <Link to="/terms"   className="hover:text-[var(--color-text-secondary)]">Terms</Link>
          <Link to="/contact" className="hover:text-[var(--color-text-secondary)]">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
