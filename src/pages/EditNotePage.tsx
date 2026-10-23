import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import NoteEditor from "../components/notes/NoteEditor";
import { loadNotes, saveNotes } from "../services/noteStorage";
import type { Note } from "../types/note";
import type { NoteFormValues } from "../validations/note.schema";
import "./EditNotePage.css";

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notes = loadNotes();
  const note = notes.find((item) => item.id === id);
  const handleSave = (values: NoteFormValues) => {
    if (!note) {
      return;
    }
    const updatedNotes: Note[] = notes.map((item) =>
      item.id === note.id
        ? {
            ...item,
            title: values.title,
            content: values.content,
            updatedAt: new Date().toISOString().slice(0, 10),
          }
        : item,
    );
    saveNotes(updatedNotes);
    navigate("/");
  };
  if (!note) {
    return (
      <main className="edit-note-page">
        <h1>Note not found</h1>
        <p>This note may have been deleted or URL may be invalid</p>
        <button type="button" onClick={() => navigate("/")}>
          Back to Notes
        </button>
      </main>
    );
  }

  return (
    <main className="edit-note-page">
      <Header title="Edit Note" />
      <NoteEditor
        initialValues={{
          title: note.title,
          content: note.content,
        }}
        onCancel={() => navigate("/")}
        onSave={handleSave}
      />
    </main>
  );
};

export default EditNotePage;
