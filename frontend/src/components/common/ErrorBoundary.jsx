/**
 * components/common/ErrorBoundary.jsx
 * Class-based error boundary — catches render errors and shows a fallback UI.
 */
import { Component } from 'react';
import Button from '../ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // TODO: Forward to Sentry / observability service
    console.error('[ErrorBoundary]', error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;

    const { fallback } = this.props;
    if (fallback) return fallback(this.state.error, this.reset);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl">⚠️</span>
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Something went wrong
          </h1>
          <p className="max-w-sm text-sm text-[var(--color-text-secondary)]">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={this.reset}>
            Try again
          </Button>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      </div>
    );
  }
}
