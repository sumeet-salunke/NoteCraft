import './Sidebar.css'

export type NotesView = 'all' | 'favorites'

interface SidebarProps {
  onCreateNote: () => void
  activeView: NotesView
  onChangeView: (view: NotesView) => void
}

const Sidebar = ({
  onCreateNote,
  activeView,
  onChangeView,
}: SidebarProps) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__brand">NoteCraft</h2>

      <button
        type="button"
        className="sidebar__new-note"
        onClick={onCreateNote}
      >
        + New Note
      </button>

      <nav className="sidebar__nav" aria-label="Main navigation">
        <button
          type="button"
          className={`sidebar__nav-item ${
            activeView === 'all' ? 'sidebar__nav-item--active' : ''
          }`}
          onClick={() => onChangeView('all')}
          aria-current={activeView === 'all' ? 'page' : undefined}
        >
          All Notes
        </button>

        <button
          type="button"
          className={`sidebar__nav-item ${
            activeView === 'favorites' ? 'sidebar__nav-item--active' : ''
          }`}
          onClick={() => onChangeView('favorites')}
          aria-current={activeView === 'favorites' ? 'page' : undefined}
        >
          Favorites
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar