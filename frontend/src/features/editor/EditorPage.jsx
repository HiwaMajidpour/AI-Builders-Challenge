/**
 * features/editor/EditorPage.jsx
 *
 * Three-column writing workspace.
 *
 * Desktop (≥ lg)
 * ┌──────────────┬──────────────────────────────────┬────────────────┐
 * │  Sidebar     │  Toolbar + Tabs + Canvas          │  AI Panel      │
 * │  (w-56)      │  (flex-1)                         │  (w-64)        │
 * └──────────────┴──────────────────────────────────┴────────────────┘
 * Status bar spans full width at bottom.
 *
 * Tablet / Mobile — sidebar and AI panel collapse to drawers.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { toast }            from 'sonner';
import { cn }               from '../../utils/cn';
import { useEditor }        from '../../hooks/useEditor';
import Button               from '../../components/ui/Button';
import EditorToolbar        from './EditorToolbar';
import EditorCanvas         from './EditorCanvas';
import EditorSidebar        from './EditorSidebar';
import EditorStatusBar      from './EditorStatusBar';
import DocumentTabs         from './DocumentTabs';
import AIAssistantPanel     from './AIAssistantPanel';

// ── Debounce helper ───────────────────────────────────────────────────────────
function useDebounce(fn, delay) {
  const timerRef = useRef(null);
  return useCallback((...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);
}

// ── Undo / Redo history hook ──────────────────────────────────────────────────
function useUndoHistory(initial = '') {
  const stackRef    = useRef([initial]);
  const indexRef    = useRef(0);

  function push(value) {
    // Trim forward history
    stackRef.current = stackRef.current.slice(0, indexRef.current + 1);
    stackRef.current.push(value);
    indexRef.current = stackRef.current.length - 1;
  }

  function undo() {
    if (indexRef.current <= 0) return null;
    indexRef.current--;
    return stackRef.current[indexRef.current];
  }

  function redo() {
    if (indexRef.current >= stackRef.current.length - 1) return null;
    indexRef.current++;
    return stackRef.current[indexRef.current];
  }

  function reset(value) {
    stackRef.current = [value];
    indexRef.current = 0;
  }

  return { push, undo, redo, reset };
}

// ── Drawer wrapper ────────────────────────────────────────────────────────────
function Drawer({ open, onClose, side = 'left', children }) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={side === 'left' ? 'Navigation sidebar' : 'AI Assistant'}
        className={cn(
          'fixed top-0 bottom-0 z-50 flex flex-col w-72',
          'bg-[var(--color-bg-elevated)] shadow-[var(--shadow-2xl)]',
          side === 'left'
            ? 'left-0 border-r border-[var(--color-border)] animate-slide-right'
            : 'right-0 border-l border-[var(--color-border)] animate-slide-left',
        )}
      >
        {children}
      </div>
    </>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onCreate, loading }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
      <div
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-2xl)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[var(--text-lg)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          No document selected
        </p>
        <p className="max-w-xs text-[var(--text-sm)] text-[var(--color-text-muted)]">
          Open a document from the sidebar or create a new one to start writing.
        </p>
      </div>
      <Button
        variant="brand"
        size="md"
        onClick={onCreate}
        isLoading={loading}
        aria-label="Create a new document"
        leftIcon={
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        }
      >
        Create Document
      </Button>
    </div>
  );
}

// ── EditorPage ────────────────────────────────────────────────────────────────
export default function EditorPage() {
  const {
    documents,
    currentDocument,
    openTabIds,
    loading,
    saving,
    loadDocuments,
    openDocument,
    closeTab,
    save,
    createDocument,
    deleteDocument,
    updateContent,
    updateTitle,
    createChapter,
    updateChapter,
    deleteChapter,
    exportDocument,
  } = useEditor();

  // ── Local UI state ────────────────────────────────────────────────────────
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [aiPanelOpen,  setAIPanelOpen]  = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorPos,    setCursorPos]    = useState(null);
  const [lastSaved,    setLastSaved]    = useState(null);

  // ── Undo / redo ───────────────────────────────────────────────────────────
  const undoHistory = useUndoHistory(currentDocument?.content ?? '');
  const prevDocId   = useRef(null);

  // Reset undo history when switching documents
  useEffect(() => {
    if (currentDocument?.id !== prevDocId.current) {
      undoHistory.reset(currentDocument?.content ?? '');
      prevDocId.current = currentDocument?.id ?? null;
    }
  }, [currentDocument?.id, currentDocument?.content, undoHistory]);

  // ── Load documents on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (documents === null && !loading) loadDocuments();
  }, [documents, loading, loadDocuments]);

  // Auto-open first document if none is current and docs loaded
  useEffect(() => {
    if (!currentDocument && documents && documents.length > 0 && openTabIds.length === 0) {
      openDocument(documents[0]);
    }
  }, [currentDocument, documents, openTabIds.length, openDocument]);

  // ── Auto-save (debounced 1000ms) ──────────────────────────────────────────
  const doSave = useCallback(async (doc) => {
    if (!doc) return;
    try {
      await save(doc);
      setLastSaved(new Date());
    } catch {
      toast.error('Auto-save failed.');
    }
  }, [save]);

  const debouncedSave = useDebounce(doSave, 1000);

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handleContentChange(value) {
    undoHistory.push(value);
    updateContent(value);
    // Pass latest doc snapshot for auto-save
    debouncedSave({ ...currentDocument, content: value });
  }

  function handleManualSave() {
    if (currentDocument) doSave(currentDocument);
  }

  function handleUndo() {
    const prev = undoHistory.undo();
    if (prev !== null) updateContent(prev);
  }

  function handleRedo() {
    const next = undoHistory.redo();
    if (next !== null) updateContent(next);
  }

  async function handleCreate() {
    try {
      await createDocument();
      toast.success('New document created!');
    } catch {
      toast.error('Failed to create document.');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDocument(id);
      toast.success('Document deleted.');
    } catch {
      toast.error('Failed to delete document.');
    }
  }

  function handleRestoreVersion(version) {
    toast.success(`Restored to "${version.label}" (${version.wordCount} words).`);
  }

  function handleInsertFromAI(text) {
    if (!currentDocument) return;
    const newContent = (currentDocument.content ?? '') + text;
    handleContentChange(newContent);
    toast.success('AI content inserted.');
  }

  function toggleFullscreen() {
    setIsFullscreen((v) => !v);
  }

  // ── Derive open tab docs ──────────────────────────────────────────────────
  const openTabs = (documents ?? []).filter((d) => openTabIds.includes(d.id));

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        'flex flex-col',
        isFullscreen
          ? 'fixed inset-0 z-[var(--z-modal)] bg-[var(--color-bg-base)]'
          : 'h-[calc(100vh-var(--size-topbar,3.5rem))]',
      )}
    >
      {/* ── Top: mobile toolbar ── */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 lg:hidden">
        {/* Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open document sidebar"
          className="h-8 w-8"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"  />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
        <span className="flex-1 truncate text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">
          {currentDocument?.title ?? 'Editor'}
        </span>
        {/* AI panel toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setAIPanelOpen(true)}
          aria-label="Open AI assistant"
          className="h-8 w-8 text-[var(--color-brand)]"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </Button>
      </div>

      {/* ── Main body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Desktop sidebar ── */}
        <div className="hidden lg:flex w-56 shrink-0">
          <EditorSidebar
            documents={documents}
            currentDocument={currentDocument}
            loading={loading}
            onOpen={openDocument}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onCreateChapter={createChapter}
            onRenameChapter={(id, title) => updateChapter({ id, title })}
            onDeleteChapter={deleteChapter}
            onRestoreVersion={handleRestoreVersion}
          />
        </div>

        {/* ── Center column ── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <EditorToolbar
            document={currentDocument}
            saving={saving}
            lastSaved={lastSaved}
            onTitleChange={updateTitle}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onExport={exportDocument}
            isFullscreen={isFullscreen}
            onFullscreen={toggleFullscreen}
          />

          {/* Document tabs */}
          {openTabs.length > 1 && (
            <DocumentTabs
              tabs={openTabs}
              activeId={currentDocument?.id ?? null}
              onSelect={(id) => {
                const doc = (documents ?? []).find((d) => d.id === id);
                if (doc) openDocument(doc);
              }}
              onClose={closeTab}
            />
          )}

          {/* Canvas or empty state */}
          {currentDocument ? (
            <EditorCanvas
              content={currentDocument.content ?? ''}
              onChange={handleContentChange}
              onSave={handleManualSave}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onCursorMove={setCursorPos}
            />
          ) : (
            <EmptyState onCreate={handleCreate} loading={loading} />
          )}

          {/* Status bar */}
          <EditorStatusBar
            content={currentDocument?.content ?? ''}
            saving={saving}
            lastSaved={lastSaved}
            cursorPos={cursorPos}
          />
        </div>

        {/* ── Desktop AI panel ── */}
        <div
          className={cn(
            'hidden lg:flex w-64 shrink-0 flex-col',
            'border-l border-[var(--color-border)] bg-[var(--color-bg-elevated)]',
            'overflow-hidden',
          )}
        >
          <AIAssistantPanel
            content={currentDocument?.content ?? ''}
            onInsert={handleInsertFromAI}
          />
        </div>
      </div>

      {/* ── Mobile: sidebar drawer ── */}
      <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} side="left">
        <EditorSidebar
          documents={documents}
          currentDocument={currentDocument}
          loading={loading}
          onOpen={(doc) => { openDocument(doc); setSidebarOpen(false); }}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onCreateChapter={createChapter}
          onRenameChapter={(id, title) => updateChapter({ id, title })}
          onDeleteChapter={deleteChapter}
          onRestoreVersion={handleRestoreVersion}
        />
      </Drawer>

      {/* ── Mobile: AI panel drawer ── */}
      <Drawer open={aiPanelOpen} onClose={() => setAIPanelOpen(false)} side="right">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <span className="text-[var(--text-sm)] font-[var(--weight-semibold)] text-[var(--color-text-primary)]">AI Assistant</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAIPanelOpen(false)}
            aria-label="Close AI assistant"
            className="h-8 w-8"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="14" y1="0" x2="0" y2="14" />
              <line x1="0"  y1="0" x2="14" y2="14" />
            </svg>
          </Button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <AIAssistantPanel
            content={currentDocument?.content ?? ''}
            onInsert={(text) => { handleInsertFromAI(text); setAIPanelOpen(false); }}
          />
        </div>
      </Drawer>
    </div>
  );
}
