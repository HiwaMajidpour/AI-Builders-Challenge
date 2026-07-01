/**
 * features/auth/ForgotPasswordPage.jsx
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { forgotPasswordSchema } from '../../utils/validators';
import { useAuth }              from '../../hooks/useAuth';
import { ROUTES }               from '../../constants/routes';

import Button  from '../../components/ui/Button';
import Input   from '../../components/ui/Input';
import Badge   from '../../components/ui/Badge';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:      zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit({ email }) {
    try {
      await forgotPassword(email);
      setSubmittedEmail(email);
      setSubmitted(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch (err) {
      toast.error(err?.message ?? 'Something went wrong. Please try again.');
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="w-full space-y-6 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success-subtle)] border border-[var(--color-success-border)]">
          <svg
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-success)]"
            aria-hidden="true"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-[var(--text-xl)] font-[var(--weight-bold)] text-[var(--color-text-primary)]">
            Check your inbox
          </h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
            We sent a password reset link to{' '}
            <span className="font-[var(--weight-medium)] text-[var(--color-text-primary)]">
              {submittedEmail}
            </span>
            . The link expires in 30 minutes.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
            Didn&apos;t receive it? Check your spam folder or try again.
          </p>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => { setSubmitted(false); setSubmittedEmail(''); }}
          >
            Try a different email
          </Button>
        </div>

        <Link
          to={ROUTES.LOGIN}
          className="block text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  // ── Default state ─────────────────────────────────────────────────────────
  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="space-y-1 text-center">
        <Badge variant="warning" dot className="mx-auto mb-3">
          Password reset
        </Badge>
        <h1 className="text-[var(--text-2xl)] font-[var(--weight-bold)] text-[var(--color-text-primary)]">
          Forgot your password?
        </h1>
        <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          required
          {...register('email')}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Sending link…' : 'Send reset link'}
        </Button>

      </form>

      <Link
        to={ROUTES.LOGIN}
        className="block text-center text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
      >
        ← Back to sign in
      </Link>

    </div>
  );
}
