/**
 * features/projects/DeleteProjectModal.jsx
 * Confirmation dialog before permanently deleting a project.
 *
 * Props
 *   isOpen    bool
 *   onClose   fn()
 *   project   Project | null
 *   onDelete  fn(id) → Promise
 */
import { useState, useEffect } from 'react';
import { toast }  from 'sonner';
import Modal      from '../../components/ui/Modal';
import Button     from '../../components/ui/Button';

export default function DeleteProjectModal({ isOpen, onClose, project, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    Promise.resolve().then(() => setDeleting(false));
  }, [isOpen]);

  async function handleDelete() {
    if (!project) return;
    setDeleting(true);
    try {
      await onDelete(project.id);
      toast.success(`"${project.title}" deleted.`);
      onClose();
    } catch {
      toast.error('Failed to delete project. Please try again.');
      setDeleting(false);
    }
  }

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete project?"
      description="This action cannot be undone."
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleDelete}
            isLoading={deleting}
            aria-label={deleting ? 'Deleting project…' : `Delete "${project.title}"`}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        </>
      }
    >
      <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
        Are you sure you want to permanently delete{' '}
        <strong className="font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          &ldquo;{project.title}&rdquo;
        </strong>
        ? All words, progress, and AI generations linked to this project will be lost.
      </p>
    </Modal>
  );
}
