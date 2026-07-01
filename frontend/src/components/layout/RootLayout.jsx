/**
 * components/layout/RootLayout.jsx
 * Wraps the public-facing pages (Landing, etc.)
 */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-base)]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
