/**
 * features/auth/LoginPage.jsx
 */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { loginSchema } from '../../utils/validators';
import { useAuth }     from '../../hooks/useAuth';
import { ROUTES }      from '../../constants/routes';

import Button  from '../../components/ui/Button';
import Input   from '../../components/ui/Input';
import Badge   from '../../components/ui/Badge';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Redirect back to the page the user tried to access, or fall back to dashboard.
  const from = location.state?.from?.pathname ?? ROUTES.DASHBOARD;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:      zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  async function onSubmit({ email, password }) {
    try {
      await login({ email, password });
      toast.success('Welcome back! 👋');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message ?? 'Login failed. Please try again.');
    }
  }

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="space-y-1 text-center">
        <Badge variant="brand" dot className="mx-auto mb-3">
          Sign in to continue
        </Badge>
        <h1 className="text-[var(--text-2xl)] font-[var(--weight-bold)] text-[var(--color-text-primary)]">
          Welcome back
        </h1>
        <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          New here?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="font-[var(--weight-medium)] text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
          >
            Create a free account
          </Link>
        </p>
      </div>

      {/* Demo hint */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-accent-border)] bg-[var(--color-accent-subtle)] px-4 py-3">
        <p className="text-[var(--text-xs)] text-[var(--color-accent-text)]">
          <span className="font-[var(--weight-semibold)]">Demo credentials: </span>
          demo@storyforge.ai / Password1
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

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          required
          trailingIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              {showPassword ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M13.875 6.625C12.636 9.1 10.42 10.75 8 10.75s-4.636-1.65-5.875-4.125M8 11.5v2M4.5 10.5l-1.5 1.5M11.5 10.5l1.5 1.5" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M8 3.25C4.5 3.25 1.5 7 1.5 8s3 4.75 6.5 4.75S14.5 9 14.5 8s-3-4.75-6.5-4.75Z" />
                  <circle cx="8" cy="8" r="1.75" />
                </svg>
              )}
            </button>
          }
          {...register('password')}
        />

        {/* Remember me + Forgot password row */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--color-border-strong)] accent-[var(--color-brand)]"
              {...register('rememberMe')}
            />
            <span className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              Remember me
            </span>
          </label>

          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>

      </form>
    </div>
  );
}
