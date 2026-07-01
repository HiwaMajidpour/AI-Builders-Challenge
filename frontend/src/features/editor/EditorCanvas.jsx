/**
 * features/editor/EditorCanvas.jsx
 * Pure textarea-based writing canvas.
 * Supports: Tab → 4 spaces, Ctrl+S save, Ctrl+Z undo, Ctrl+Shift+Z redo.
 * Auto-resizes to fit content.
 *
 * Props
 *   content      string
 *   onChange     fn(string)
 *   onSave       fn()
 *   onUndo       fn()
 *   onRedo       fn()
 *   onCursorMove fn({ line, col })
 *   disabled     bool
 *   placeholder  string
 */
import { useRef, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';

export default function EditorCanvas({
  content = '',
  onChange,
  onSave,
  onUndo,
  onRedo,
  onCursorMove,
  disabled = false,
  placeholder = 'Begin your story…',
}) {
  const ref = useRef(null);

  // Auto-resize on content change
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  const handleKeyDown = useCallback((e) => {
    // Tab → 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      const next = `${value.slice(0, selectionStart)}    ${value.slice(selectionEnd)}`;
      onChange(next);
      // Restore cursor after React re-render
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.selectionStart = selectionStart + 4;
          ref.current.selectionEnd   = selectionStart + 4;
        }
      });
      return;
    }

    // Ctrl/Cmd + S → save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      onSave?.();
      return;
    }

    // Ctrl/Cmd + Z → undo
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      onUndo?.();
      return;
    }

    // Ctrl/Cmd + Shift + Z → redo
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      onRedo?.();
      return;
    }
  }, [onChange, onSave, onUndo, onRedo]);

  function handleChange(e) {
    onChange(e.target.value);
  }

  function handleSelect(e) {
    if (!onCursorMove) return;
    const { selectionStart, value } = e.target;
    const textBefore = value.slice(0, selectionStart);
    const lines      = textBefore.split('\n');
    onCursorMove({ line: lines.length, col: lines[lines.length - 1].length + 1 });
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto bg-[var(--color-bg-base)]">
      <div className="mx-auto w-full max-w-3xl px-8 py-10">
        <textarea
          ref={ref}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          onClick={handleSelect}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Story editor"
          aria-multiline="true"
          spellCheck
          className={cn(
            'w-full resize-none overflow-hidden bg-transparent',
            'text-[var(--text-base)] text-[var(--color-text-primary)]',
            'leading-[1.9] font-[var(--font-sans)]',
            'placeholder:text-[var(--color-text-muted)]',
            'focus:outline-none',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          style={{ minHeight: '60vh', fontFamily: 'var(--font-sans)' }}
        />
      </div>
    </div>
  );
}
