/**
 * components/ui/Input.jsx
 * Controlled input with label, error, and leading/trailing icon slots.
 */
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    leadingIcon,
    trailingIcon,
    id,
    className,
    containerClassName,
    ...props
  },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 text-[var(--color-text-muted)]">
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-[var(--radius-md)] border bg-[var(--color-bg-base)]',
            'px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
            'border-[var(--color-border)] outline-none',
            'transition-colors duration-[var(--transition-fast)]',
            'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
            leadingIcon && 'pl-9',
            trailingIcon && 'pr-9',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />

        {trailingIcon && (
          <span className="pointer-events-none absolute right-3 text-[var(--color-text-muted)]">
            {trailingIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
