import { useState, useEffect } from "react";
import Sidebar, { type NotesView } from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import EmptyState from "../components/notes/EmptyState";
import NoteCard from "../components/notes/NoteCard";
import { loadNotes, saveNotes } from "../services/noteStorage";
import type { Note } from "../types/note";
import "./NotesPage.css";
import { useNavigate } from "react-router-dom";

type SortOption = "updated" | "created" | "favorites";

const NotesPage = () => {
  const naviage = useNavigate();
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    notes[0]?.id ?? null,
  );
  const [activeView, setActiveView] = useState<NotesView>("all");
  const [searchQuery, setSecarchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const today = new Date().toISOString().slice(0, 10);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      updatedAt: today,
      createdAt: today,
      isFavorite: false,
    };
    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setSelectedNoteId(newNote.id);
  };

  const handleDeleteNote = (noteId: string) => {
    const noteToDelete = notes.find((item) => item.id === noteId);
    if (!noteToDelete) return;
    const confirmed = window.confirm(
      `Are you sure want to delete "${noteToDelete.title}"`,
    );
    if (!confirmed) return;
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(updatedNotes[0]?.id ?? null);
    }
  };

  const visibleNotes =
    activeView === "favorites"
      ? notes.filter((note) => note.isFavorite)
      : notes;

  const handleToggleFavorite = (noteId: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note,
      ),
    );
  };

  const searchedNotes = visibleNotes.filter((note) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  const sortedNotes = [...searchedNotes].sort((a, b) => {
    if (sortBy === "favorites") {
      return Number(b.isFavorite) - Number(a.isFavorite);
    }
    const dateA = sortBy === "created" ? a.createdAt : a.updatedAt;
    const dateB = sortBy === "created" ? b.createdAt : b.updatedAt;

    return dateB.localeCompare(dateA);
  });

  const totalPages = Math.ceil(sortedNotes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedNotes = sortedNotes.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeView, sortBy]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(1, totalPages)));
  }, [totalPages]);

  return (
    <div className="notes-page">
      <Sidebar
        onCreateNote={handleCreateNote}
        activeView={activeView}
        onChangeView={setActiveView}
      />
      <main className="notes_page__workspace">
        <Header title="My Notes" />

        <input
          type="search"
          className="notes-page__search"
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={(event) => setSecarchQuery(event.target.value)}
          aria-label="Search notes"
        />

        <label htmlFor="notes-sort">Sort notes by: </label>
        <select
          id="notes-sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortOption)}
        >
          <option value="updated">Recently Updated</option>
          <option value="created">Recently Created</option>
          <option value="favorites">Favorites First</option>
        </select>

        {sortedNotes.length === 0 ? (
          <EmptyState onCreateNote={handleCreateNote} />
        ) : (
          <section className="notes-page__content">
            <div className="notes-page__list">
              <h2 className="notes-page__section-title">
                {activeView === "favorites" ? "Favorite Notes" : "All Notes"}
              </h2>
              {paginatedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isSelected={note.id === selectedNoteId}
                  onSelect={setSelectedNoteId}
                  onDelete={handleDeleteNote}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
              {visibleNotes.length === 0 && (
                <p>
                  {activeView === "favorites"
                    ? "No Favorites notes yet"
                    : "No notes yet, Create your first note."}
                </p>
              )}
            </div>
            <section className="notes-page__detail">
              {selectedNote ? (
                <>
                  <h2>{selectedNote.title}</h2>
                  <p className="notes-page__detail-date">
                    Last updated: {selectedNote.updatedAt}
                  </p>
                  <pre className="notes-page__detail-content">
                    {selectedNote.content}
                  </pre>
                  <button
                    type="button"
                    onClick={() => naviage(`/notes/${selectedNote.id}/edit`)}
                  >
                    Edit Note
                  </button>
                </>
              ) : (
                <p>Select a note to view its content.</p>
              )}
            </section>
            {sortedNotes.length > 0 && (
              <div className="notes-page__pagination">
                <label htmlFor="notes-page-size">Notes per page:</label>

                <select
                  id="notes-page-size"
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => page - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default NotesPage;
