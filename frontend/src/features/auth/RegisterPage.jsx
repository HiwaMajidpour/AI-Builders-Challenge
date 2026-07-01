/**
 * features/auth/RegisterPage.jsx
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { registerSchema } from '../../utils/validators';
import { useAuth }        from '../../hooks/useAuth';
import { ROUTES }         from '../../constants/routes';

import Button  from '../../components/ui/Button';
import Input   from '../../components/ui/Input';
import Badge   from '../../components/ui/Badge';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue,       setPasswordValue]       = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:      zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  // Live password-strength indicator — driven by local state to avoid
  // calling watch() which cannot be safely memoised by React Compiler.
  const strength = getPasswordStrength(passwordValue);

  async function onSubmit({ name, email, password }) {
    try {
      await registerUser({ name, email, password });
      toast.success('Account created! Welcome to StoryForge AI 🎉');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      toast.error(err?.message ?? 'Registration failed. Please try again.');
    }
  }

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="space-y-1 text-center">
        <Badge variant="brand" dot className="mx-auto mb-3">
          Create your account
        </Badge>
        <h1 className="text-[var(--text-2xl)] font-[var(--weight-bold)] text-[var(--color-text-primary)]">
          Start creating for free
        </h1>
        <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="font-[var(--weight-medium)] text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Alex Johnson"
          error={errors.name?.message}
          required
          {...register('name')}
        />

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          required
          {...register('email')}
        />

        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Min. 8 chars, 1 uppercase, 1 number"
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
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M8 3.25C4.5 3.25 1.5 7 1.5 8s3 4.75 6.5 4.75S14.5 9 14.5 8s-3-4.75-6.5-4.75Z" />
                  <circle cx="8" cy="8" r="1.75" />
                </svg>
              </button>
            }
            {...register('password', {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
          />

          {/* Password strength bar — only shown when user starts typing */}
          {passwordValue.length > 0 && (
            <div aria-label={`Password strength: ${strength.label}`} className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={[
                      'h-1 flex-1 rounded-full transition-colors duration-300',
                      level <= strength.score
                        ? strength.barColor
                        : 'bg-[var(--color-border)]',
                    ].join(' ')}
                  />
                ))}
              </div>
              <p className={`text-[var(--text-xs)] ${strength.textColor}`}>
                {strength.label}
              </p>
            </div>
          )}
        </div>

        <Input
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          required
          trailingIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M8 3.25C4.5 3.25 1.5 7 1.5 8s3 4.75 6.5 4.75S14.5 9 14.5 8s-3-4.75-6.5-4.75Z" />
                <circle cx="8" cy="8" r="1.75" />
              </svg>
            </button>
          }
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>

        <p className="text-center text-[var(--text-xs)] text-[var(--color-text-muted)]">
          By signing up you agree to our{' '}
          <a href="/terms" className="underline underline-offset-2 hover:text-[var(--color-text-secondary)]">
            Terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline underline-offset-2 hover:text-[var(--color-text-secondary)]">
            Privacy Policy
          </a>.
        </p>

      </form>
    </div>
  );
}

// ── Password strength helper ──────────────────────────────────────────────────
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { score: 0, label: '',          barColor: '',                                    textColor: '' },
    { score: 1, label: 'Weak',      barColor: 'bg-[var(--color-error)]',             textColor: 'text-[var(--color-error-text)]' },
    { score: 2, label: 'Fair',      barColor: 'bg-[var(--color-warning)]',           textColor: 'text-[var(--color-warning-text)]' },
    { score: 3, label: 'Good',      barColor: 'bg-[var(--color-accent)]',            textColor: 'text-[var(--color-accent-text)]' },
    { score: 4, label: 'Strong 🔒', barColor: 'bg-[var(--color-success)]',           textColor: 'text-[var(--color-success-text)]' },
  ];

  return map[score];
}
