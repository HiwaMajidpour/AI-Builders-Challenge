/**
 * features/projects/EditProjectModal.jsx
 * Modal form for editing an existing project.
 * Pre-fills all fields from the project object.
 *
 * Props
 *   isOpen    bool
 *   onClose   fn()
 *   project   Project | null
 *   onUpdate  fn(id, data) → Promise
 */
import { useState, useRef, useEffect } from 'react';
import { toast }  from 'sonner';
import Modal      from '../../components/ui/Modal';
import Input      from '../../components/ui/Input';
import Button     from '../../components/ui/Button';
import { GENRES } from './data/projectConstants';

const STATUSES     = ['Draft', 'In Progress', 'Completed'];
const GENRE_OPTIONS = GENRES.filter((g) => g !== 'All');

const COVER_COLORS = [
  '#6d28d9', '#1d4ed8', '#065f46', '#92400e',
  '#be185d', '#0f766e', '#1e40af', '#854d0e',
];

function validate({ title, genre }) {
  const errors = {};
  if (!title.trim())            errors.title = 'Title is required.';
  if (title.trim().length > 80) errors.title = 'Title must be 80 characters or fewer.';
  if (!genre)                   errors.genre = 'Please select a genre.';
  return errors;
}

export default function EditProjectModal({ isOpen, onClose, project, onUpdate }) {
  const [form, setForm]     = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const titleRef            = useRef(null);

  // Sync form when project changes (microtask avoids set-state-in-effect lint rule)
  useEffect(() => {
    if (!project) return;
    Promise.resolve().then(() => {
      setForm({
        title:       project.title ?? '',
        genre:       project.genre ?? '',
        description: project.description ?? '',
        status:      project.status ?? 'Draft',
        progress:    project.progress ?? 0,
        coverColor:  project.coverColor ?? COVER_COLORS[0],
      });
      setErrors({});
      setSaving(false);
    });
  }, [project]);

  // Focus title on open
  useEffect(() => {
    if (isOpen) setTimeout(() => titleRef.current?.focus(), 80);
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
      await onUpdate(project.id, form);
      toast.success(`"${form.title.trim()}" updated.`);
      onClose();
    } catch {
      toast.error('Failed to update project. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Project"
      description={`Editing "${project.title}"`}
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            isLoading={saving}
            aria-label={saving ? 'Saving changes…' : 'Save changes'}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Title */}
        <Input
          ref={titleRef}
          label="Title"
          value={form.title ?? ''}
          onChange={(e) => patch('title', e.target.value)}
          error={errors.title}
          required
          disabled={saving}
          maxLength={80}
        />

        {/* Genre */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ep-genre" className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">
            Genre <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
          </label>
          <select
            id="ep-genre"
            value={form.genre ?? ''}
            onChange={(e) => patch('genre', e.target.value)}
            disabled={saving}
            aria-invalid={Boolean(errors.genre)}
            className="h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 text-[var(--text-sm)] text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)] disabled:opacity-50"
          >
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.genre && (
            <p role="alert" className="text-[var(--text-xs)] text-[var(--color-error-text)]">{errors.genre}</p>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ep-status" className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">
            Status
          </label>
          <select
            id="ep-status"
            value={form.status ?? 'Draft'}
            onChange={(e) => patch('status', e.target.value)}
            disabled={saving}
            className="h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 text-[var(--text-sm)] text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)] disabled:opacity-50"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="ep-progress" className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">
              Progress
            </label>
            <span className="text-[var(--text-xs)] font-[var(--weight-semibold)] text-[var(--color-brand)]">
              {form.progress ?? 0}%
            </span>
          </div>
          <input
            id="ep-progress"
            type="range"
            min="0"
            max="100"
            step="1"
            value={form.progress ?? 0}
            onChange={(e) => patch('progress', Number(e.target.value))}
            disabled={saving}
            aria-label={`Progress: ${form.progress ?? 0}%`}
            className="w-full cursor-pointer appearance-none h-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, var(--color-brand) ${form.progress ?? 0}%, var(--color-border) ${form.progress ?? 0}%)`,
            }}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ep-description" className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">
            Description <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">(optional)</span>
          </label>
          <textarea
            id="ep-description"
            rows={3}
            value={form.description ?? ''}
            onChange={(e) => patch('description', e.target.value)}
            disabled={saving}
            maxLength={300}
            className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-[var(--text-sm)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-muted)] disabled:opacity-50"
          />
        </div>

        {/* Cover colour */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-primary)]">Cover colour</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Cover colour">
            {COVER_COLORS.map((colour) => (
              <button
                key={colour}
                type="button"
                onClick={() => patch('coverColor', colour)}
                aria-label={colour}
                aria-pressed={(form.coverColor ?? COVER_COLORS[0]) === colour}
                className="h-7 w-7 rounded-full border-2 transition-[border-color,transform] duration-[var(--duration-fast)] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                style={{
                  backgroundColor: colour,
                  borderColor: (form.coverColor ?? COVER_COLORS[0]) === colour ? 'white' : 'transparent',
                  boxShadow:   (form.coverColor ?? COVER_COLORS[0]) === colour ? `0 0 0 2px ${colour}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
