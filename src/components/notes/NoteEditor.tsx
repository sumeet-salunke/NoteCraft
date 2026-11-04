
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, type NoteFormValues } from "../../validations/note.schema";
import MarkdownPreview from "./MarkdownPreview";
import "./NoteEditor.css";

interface NoteEditorProps {
  initialValues: NoteFormValues;
  onSave: (values: NoteFormValues) => void;
  onCancel: () => void;
}

const NoteEditor = ({ initialValues, onSave, onCancel }: NoteEditorProps) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const content = watch("content");

  const submitForm = (values: NoteFormValues) => {
    onSave(values);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="note-editor"
      noValidate
    >
      <label htmlFor="note-title">Title</label>
      <input
        id="note-title"
        type="text"
        maxLength={100}
        placeholder="Enter note title"
        {...register("title")}
        aria-invalid={Boolean(errors.title)}
      />
      {errors.title && (
        <p className="note-editor__error">{errors.title.message}</p>
      )}

      <div className="note-editor__tabs">
        <button
          type="button"
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => setActiveTab("edit")}
        >
          Edit
        </button>

        <button
          type="button"
          className={activeTab === "preview" ? "active" : ""}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {activeTab === "edit" ? (
        <>
          <label htmlFor="note-content">Content (Markdown supported)</label>
          <textarea
            id="note-content"
            rows={14}
            maxLength={20000}
            placeholder="Write your note here..."
            {...register("content")}
            aria-invalid={Boolean(errors.content)}
          />
          {errors.content && (
            <p className="note-editor__error">{errors.content.message}</p>
          )}
        </>
      ) : (
        <MarkdownPreview content={content} />
      )}

      <div className="note-editor__actions">
        <button
          className="note-editor__cancel"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button disabled={isSubmitting} type="submit">
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
