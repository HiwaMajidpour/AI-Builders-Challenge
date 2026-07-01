/**
 * features/editor/EditorSidebar.jsx
 * Left sidebar: document list (recent / favorites), search, chapters, stats, history.
 *
 * Props
 *   documents        Document[] | null
 *   currentDocument  Document | null
 *   loading          bool
 *   onOpen           fn(doc)
 *   onCreate         fn()
 *   onDelete         fn(id)
 *   onCreateChapter  fn()
 *   onRenameChapter  fn(id, title)
 *   onDeleteChapter  fn(id)
 *   onRestoreVersion fn(version)
 */
import { useState }    from 'react';
import { cn }          from '../../utils/cn';
import Button          from '../../components/ui/Button';
import Badge           from '../../components/ui/Badge';
import Input           from '../../components/ui/Input';
import ChapterList     from './ChapterList';
import WordCounter     from './WordCounter';
import ReadingStats    from './ReadingStats';
import VersionHistory  from './VersionHistory';

const GENRE_VARIANT = {
  'Sci-Fi':    'accent',
  Fantasy:     'brand',
  Mystery:     'default',
  Romance:     'default',
  Literary:    'default',
  Historical:  'default',
  Fiction:     'default',
};

const SearchIcon = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <circle cx="5.5" cy="5.5" r="4.5" />
    <path d="m11 11-2.5-2.5" />
  </svg>
);

const PlusIcon = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="7" y1="1" x2="7" y2="13" />
    <line x1="1" y1="7" x2="13" y2="7" />
  </svg>
);

function relTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function EditorSidebar({
  documents,
  currentDocument,
  loading,
  onOpen,
  onCreate,
  onDelete,
  onCreateChapter,
  onRenameChapter,
  onDeleteChapter,
  onRestoreVersion,
}) {
  const [search,  setSearch]  = useState('');
  const [section, setSection] = useState('documents'); // 'documents' | 'chapters' | 'stats' | 'history'

  const tabs = [
    { id: 'documents', label: 'Docs'    },
    { id: 'chapters',  label: 'Chapters'},
    { id: 'stats',     label: 'Stats'   },
    { id: 'history',   label: 'History' },
  ];

  const filteredDocs = (documents ?? []).filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()),
  );

  const favorites = filteredDocs.filter((d) => d.favorite);
  const recent    = filteredDocs.filter((d) => !d.favorite).slice(0, 8);

  return (
    <aside
      className="flex h-full flex-col bg-[var(--color-bg-elevated)] border-r border-[var(--color-border)]"
      aria-label="Editor sidebar"
    >
      {/* Section tabs */}
      <div
        role="tablist"
        className="flex shrink-0 border-b border-[var(--color-border)]"
        aria-label="Sidebar sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={section === tab.id}
            onClick={() => setSection(tab.id)}
            className={cn(
              'flex-1 py-2 text-[var(--text-2xs)] font-[var(--weight-medium)] transition-colors duration-[var(--duration-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              section === tab.id
                ? 'border-b-2 border-[var(--color-brand)] text-[var(--color-brand)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Documents ── */}
        {section === 'documents' && (
          <div className="flex flex-col gap-2 p-2">
            {/* Search + New */}
            <div className="flex items-center gap-1.5">
              <Input
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="sm"
                leadingIcon={SearchIcon}
                aria-label="Search documents"
                containerClassName="flex-1"
              />
              <Button
                variant="primary"
                size="icon"
                onClick={onCreate}
                aria-label="Create new document"
                className="h-8 w-8 shrink-0"
              >
                {PlusIcon}
              </Button>
            </div>

            {loading && !documents ? (
              <div className="flex flex-col gap-1.5 animate-pulse p-1">
                {[80, 65, 90, 75].map((w) => (
                  <div key={w} className="h-10 rounded-[var(--radius-md)] bg-[var(--color-bg-surface)]" style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : (
              <>
                {favorites.length > 0 && (
                  <div>
                    <p className="px-1 py-1 text-[var(--text-2xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
                      Favorites
                    </p>
                    <DocList docs={favorites} currentId={currentDocument?.id} onOpen={onOpen} onDelete={onDelete} />
                  </div>
                )}
                {recent.length > 0 && (
                  <div>
                    <p className="px-1 py-1 text-[var(--text-2xs)] font-[var(--weight-semibold)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
                      Recent
                    </p>
                    <DocList docs={recent} currentId={currentDocument?.id} onOpen={onOpen} onDelete={onDelete} />
                  </div>
                )}
                {filteredDocs.length === 0 && (
                  <p className="px-2 py-3 text-center text-[var(--text-xs)] text-[var(--color-text-muted)]">
                    {search ? 'No matches.' : 'No documents.'}
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Chapters ── */}
        {section === 'chapters' && (
          currentDocument ? (
            <ChapterList
              chapters={currentDocument.chapters ?? []}
              onAdd={onCreateChapter}
              onRename={onRenameChapter}
              onDelete={onDeleteChapter}
            />
          ) : (
            <p className="p-4 text-[var(--text-xs)] text-[var(--color-text-muted)]">Open a document first.</p>
          )
        )}

        {/* ── Stats ── */}
        {section === 'stats' && currentDocument && (
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            <WordCounter  content={currentDocument.content} />
            <ReadingStats content={currentDocument.content} />
          </div>
        )}
        {section === 'stats' && !currentDocument && (
          <p className="p-4 text-[var(--text-xs)] text-[var(--color-text-muted)]">Open a document first.</p>
        )}

        {/* ── History ── */}
        {section === 'history' && (
          currentDocument ? (
            <VersionHistory
              versions={currentDocument.versions ?? []}
              onRestore={onRestoreVersion}
            />
          ) : (
            <p className="p-4 text-[var(--text-xs)] text-[var(--color-text-muted)]">Open a document first.</p>
          )
        )}
      </div>
    </aside>
  );
}

// ── DocList helper ─────────────────────────────────────────────────────────────

function DocList({ docs, currentId, onOpen, onDelete }) {
  return (
    <ul className="flex flex-col gap-0.5" aria-label="Document list">
      {docs.map((doc) => (
        <li key={doc.id} className="group relative">
          <button
            onClick={() => onOpen(doc)}
            aria-label={`Open ${doc.title}`}
            aria-pressed={doc.id === currentId}
            className={cn(
              'flex w-full flex-col gap-0.5 rounded-[var(--radius-md)] px-2 py-2 text-left',
              'transition-colors duration-[var(--duration-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              doc.id === currentId
                ? 'bg-[var(--color-brand-subtle)]'
                : 'hover:bg-[var(--color-bg-surface)]',
            )}
          >
            <span className={cn(
              'truncate text-[var(--text-xs)] font-[var(--weight-medium)]',
              doc.id === currentId ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-primary)]',
            )}>
              {doc.title}
            </span>
            <div className="flex items-center gap-1.5">
              <Badge variant={GENRE_VARIANT[doc.genre] ?? 'default'} size="sm" className="leading-none">{doc.genre}</Badge>
              <span className="text-[var(--text-2xs)] text-[var(--color-text-muted)]">{relTime(doc.updatedAt)}</span>
            </div>
          </button>
          {/* Delete button */}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }}
            aria-label={`Delete ${doc.title}`}
            className={cn(
              'absolute right-1 top-1/2 -translate-y-1/2',
              'flex h-5 w-5 items-center justify-center rounded-[var(--radius-xs)]',
              'text-[var(--color-text-muted)] hover:text-[var(--color-error)]',
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'focus-visible:opacity-100 focus-visible:outline-none',
            )}
          >
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="10" y1="0" x2="0" y2="10" />
              <line x1="0"  y1="0" x2="10" y2="10" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
