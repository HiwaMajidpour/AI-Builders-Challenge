import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useCallback } from 'react';
import { cn } from '../../utils/cn';
import Button from './Button';

// ── Size map ──────────────────────────────────────────────────────────────────
const sizeStyles = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

// ── Motion variants ───────────────────────────────────────────────────────────
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    scale:   0.97,
    y:       6,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

// ── Modal ─────────────────────────────────────────────────────────────────────
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  hideCloseButton = false,
}) {
  const titleId = useId();
  const descId  = useId();

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Escape key
  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--color-bg-overlay)] backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnOverlay ? onClose : undefined}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descId : undefined}
            className={cn(
              'relative w-full overflow-hidden',
              'rounded-[var(--radius-2xl)]',
              'border border-[var(--color-border)]',
              'bg-[var(--color-bg-elevated)]',
              'shadow-[var(--shadow-2xl)]',
              sizeStyles[size],
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            {(title || !hideCloseButton) && (
              <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-6 py-4">
                <div className="space-y-1">
                  {title && (
                    <h2
                      id={titleId}
                      className="text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text-primary)] leading-[var(--leading-snug)]"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id={descId}
                      className="text-[var(--text-sm)] text-[var(--color-text-secondary)]"
                    >
                      {description}
                    </p>
                  )}
                </div>

                {!hideCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="shrink-0 mt-0.5"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 4L4 12M4 4l8 8"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
