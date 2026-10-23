import type { Note } from "../../types/note";
import "./NoteCard.css";

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onSelect: (noteId: string) => void;
  onDelete: (noteId: string) => void;
  onToggleFavorite: (noteId: string) =>void;
}

const NoteCard = ({ note, isSelected, onSelect, onDelete ,onToggleFavorite}: NoteCardProps) => {
  return (
    <article className={`note-card ${isSelected ? "note-card--selected" : ""}`}>
      <button
        type="button"
        className="note-card__select"
        onClick={() => onSelect(note.id)}
        aria-pressed={isSelected}
      >
        <div className="note-card__header">
          <h3 className="note-card__title">{note.title}</h3>

          {note.isFavorite && (
            <span className="note-card__favorite" aria-label="Favorite note">
              ★
            </span>
          )}
        </div>

        <p className="note-card__preview">
          {note.content.replace(/^#\s*/, "").replace(/\n/g, " ") ||
            "No content yet"}
        </p>

        <time className="note-card__date" dateTime={note.updatedAt}>
          {note.updatedAt}
        </time>
      </button>

      <button
        type="button"
        className="note-card__delete"
        onClick={() => onDelete(note.id)}
        aria-label={`Delete ${note.title}`}
      >
        Delete
      </button>
      <button
      type="button"
      className="note-card__favorite-toggle"
      onClick={() => onToggleFavorite(note.id)}
      aria-label={
        note.isFavorite? `Remove ${note.title} from favorites`:`Add ${note.title} to favorie`
      }
      aria-pressed={note.isFavorite}
      >{note.isFavorite? '★ Favorited' : '☆ Favorite'}</button>
    </article>
  );
};

export default NoteCard;
