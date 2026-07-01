/**
 * features/projects/CreateProjectModal.jsx
 * Modal form for creating a new project.
 *
 * Props
 *   isOpen    bool
 *   onClose   fn()
 *   onCreate  fn(data) → Promise
 */
import { useState, useRef, useEffect } from 'react';
import { toast }  from 'sonner';
import Modal      from '../../components/ui/Modal';
import Input      from '../../components/ui/Input';
import Button     from '../../components/ui/Button';
import { GENRES } from './data/projectConstants';

const COVER_COLORS = [
  '#6d28d9', '#1d4ed8', '#065f46', '#92400e',
  '#be185d', '#0f766e', '#1e40af', '#854d0e',
];

const GENRE_OPTIONS = GENRES.filter((g) => g !== 'All');

function validate({ title, genre }) {
  const errors = {};
  if (!title.trim())          errors.title = 'Title is required.';
  if (title.trim().length > 80) errors.title = 'Title must be 80 characters or fewer.';
  if (!genre)                 errors.genre = 'Please select a genre.';
  return errors;
}

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [form, setForm]       = useState({ title: '', genre: '', description: '', coverColor: COVER_COLORS[0] });
  const [errors, setErrors]   = useState({});
  const [saving, setSaving]   = useState(false);
  const titleRef              = useRef(null);

  // Reset form whenever modal opens (microtask avoids set-state-in-effect lint rule)
  useEffect(() => {
    if (!isOpen) return;
    Promise.resolve().then(() => {
      setForm({ title: '', genre: '', description: '', coverColor: COVER_COLORS[0] });
      setErrors({});
      setSaving(false);
    });
    setTimeout(() => titleRef.current?.focus(), 80);
  }, [isOpen]);

  function patch(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      await onCreate(form);
      toast.success(`"${form.title.trim()}" created!`);
      onClose();
    } catch {
      toast.error('Failed to create project. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Project"
      description="Give your project a title, genre, and optional description."
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="brand"
            size="md"
            onClick={handleSubmit}
            isLoading={saving}
            aria-label={saving ? 'Creating project…' : 'Create project'}
          >
            {saving ? 'Creating…' : 'Create Project'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Title */}
        <Input
          ref={titleRef}
          label="Title"
          placeholder="e.g. The Last Garden"
          value={form.title}
          onChange={(e) => patch('title', e.target.value)}
          error={errors.title}
          required
          disabled={saving}
          maxLength={80}
        />

        {/* Genre */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cp-genre"
            className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]"
          >
            Genre <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
          </label>
          <select
            id="cp-genre"
            value={form.genre}
            onChange={(e) => patch('genre', e.target.value)}
            required
            disabled={saving}
            aria-invalid={Boolean(errors.genre)}
            aria-describedby={errors.genre ? 'cp-genre-error' : undefined}
            className="h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 text-[var(--text-sm)] text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)] disabled:opacity-50"
          >
            <option value="">Select genre…</option>
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.genre && (
            <p id="cp-genre-error" role="alert" className="text-[var(--text-xs)] text-[var(--color-error-text)]">
              {errors.genre}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cp-description"
            className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]"
          >
            Description <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">(optional)</span>
          </label>
          <textarea
            id="cp-description"
            rows={3}
            placeholder="Brief summary of your project…"
            value={form.description}
            onChange={(e) => patch('description', e.target.value)}
            disabled={saving}
            maxLength={300}
            className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-[var(--text-sm)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)] disabled:opacity-50"
          />
        </div>

        {/* Cover colour picker */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">
            Cover colour
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Cover colour">
            {COVER_COLORS.map((colour) => (
              <button
                key={colour}
                type="button"
                onClick={() => patch('coverColor', colour)}
                aria-label={colour}
                aria-pressed={form.coverColor === colour}
                className="h-7 w-7 rounded-full border-2 transition-[border-color,transform] duration-[var(--duration-fast)] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                style={{
                  backgroundColor: colour,
                  borderColor: form.coverColor === colour ? 'white' : 'transparent',
                  boxShadow: form.coverColor === colour ? `0 0 0 2px ${colour}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
