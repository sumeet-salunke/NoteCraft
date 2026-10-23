import "./EmptyState.css";
interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <section className="empty-state">
      <h2>Your ideas start here</h2>
      <p>Create your note to get started.</p>

      <button
        type="button"
        className="empty-state__button"
        onClick={onCreateNote}
      >
        Create a Note
      </button>
    </section>
  );
};

export default EmptyState;
