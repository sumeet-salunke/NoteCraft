import { useState , useEffect} from "react";
import Sidebar, { type NotesView} from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import EmptyState from "../components/notes/EmptyState";
import NoteCard from "../components/notes/NoteCard";
import { loadNotes, saveNotes } from "../services/noteStorage";
import type { Note } from "../types/note";
import "./NotesPage.css";
import { useNavigate } from "react-router-dom";


const NotesPage = () => {
  const naviage = useNavigate();
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    notes[0]?.id ?? null,
  );
  const [activeView, setActiveView] = useState<NotesView>('all');

  useEffect(()=> {
    saveNotes(notes);
  },[notes]);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: "",
      updatedAt: new Date().toISOString().slice(0,10),
      isFavorite: false
    }
    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setSelectedNoteId(newNote.id);
  };

const handleDeleteNote = (noteId: string) => {
  const noteToDelete = notes.find((item) => item.id === noteId);
  if(!noteToDelete) return;
  const confirmed  = window.confirm(`Are you sure want to delete "${noteToDelete.title}"`);
  if(!confirmed) return;
  const updatedNotes = notes.filter((note) => note.id!== noteId);
  setNotes(updatedNotes);
  if(selectedNoteId===noteId){
    setSelectedNoteId(updatedNotes[0]?.id ?? null);
  }
}

const visibleNotes = activeView === 'favorites' ? notes.filter((note) => note.isFavorite) : notes;

const handleToggleFavorite = (noteId: string) => {
  setNotes((currentNotes) => 
  currentNotes.map((note)=>
  note.id === noteId ? {...note, isFavorite: !note.isFavorite}:note));
}

  return (
    <div className="notes-page">
      <Sidebar onCreateNote={handleCreateNote}
      activeView={activeView}
      onChangeView={setActiveView} />
      <main className="notes_page__workspace">
        <Header title="My Notes" />

        {notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreateNote} />
        ) : (
          <section className="notes-page__content">
            <div className="notes-page__list">
              <h2 className="notes-page__section-title">{activeView === 'favorites'? 'Favorite Notes':'All Notes'}</h2>
              {visibleNotes.map((note) => (
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
                  {activeView ==='favorites' ? 'No Favorites notes yet':"No notes yet, Create your first note."}
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
                  >Edit Note</button>
                </>
              ) : (
                <p>Select a note to view its content.</p>
              )}
            </section>
          </section>
        )}
      </main>
    </div>
  );
};

export default NotesPage;
