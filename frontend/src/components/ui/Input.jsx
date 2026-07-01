import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

// ── Variant ───────────────────────────────────────────────────────────────────
const variantStyles = {
  default: [
    'border-[var(--input-border)] bg-[var(--input-bg)]',
    'focus:border-[var(--color-border-focus)]',
    'focus:shadow-[var(--shadow-brand)]',
  ],
  error: [
    'border-[var(--color-error)]',
    'focus:border-[var(--color-error)]',
    'focus:shadow-[var(--shadow-error)]',
  ],
};

const sizeStyles = {
  sm: 'h-8  text-[var(--text-xs)]  px-2.5 py-1.5',
  md: 'h-9  text-[var(--text-sm)]  px-3   py-2',
  lg: 'h-11 text-[var(--text-base)] px-4  py-2.5',
};

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    leadingIcon,
    trailingIcon,
    id,
    size = 'md',
    className,
    containerClassName,
    required,
    ...props
  },
  ref,
) {
  const autoId   = useId();
  const inputId  = id ?? autoId;
  const errorId  = `${inputId}-error`;
  const hintId   = `${inputId}-hint`;
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[var(--color-error)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {leadingIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 flex items-center text-[var(--color-text-muted)]"
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : hint ? hintId : undefined
          }
          className={cn(
            // Base
            'w-full rounded-[var(--radius-md)] border outline-none',
            'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
            'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-bg-surface)]',
            // Variant
            hasError ? variantStyles.error : variantStyles.default,
            // Size
            sizeStyles[size],
            // Icon padding
            leadingIcon  && 'pl-9',
            trailingIcon && 'pr-9',
            className,
          )}
          {...props}
        />

        {trailingIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 flex items-center text-[var(--color-text-muted)]"
          >
            {trailingIcon}
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-error-text)]"
        >
          {error}
        </p>
      )}

      {/* Hint */}
      {!hasError && hint && (
        <p id={hintId} className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
