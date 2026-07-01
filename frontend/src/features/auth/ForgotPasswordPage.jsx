/**
 * features/auth/ForgotPasswordPage.jsx
 */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { forgotPasswordSchema } from '../../utils/validators';
import { authService } from '../../services/authService';
import { ROUTES } from '../../constants/routes';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit({ email }) {
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error('Failed to send reset email. Please try again.');
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mb-4 block text-4xl">📬</span>
        <h1 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">Check your inbox</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          We&apos;ve sent a password reset link to your email.
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="mt-6 block text-sm text-[var(--color-accent)] hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Reset password</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Enter your email and we&apos;ll send a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
        Remembered it?{' '}
        <Link to={ROUTES.LOGIN} className="text-[var(--color-accent)] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
