
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

type EditorMode = "edit" | "preview" | "split";

const NoteEditor = ({
  initialValues,
  onSave,
  onCancel,
}: NoteEditorProps) => {
  const [activeTab, setActiveTab] = useState<EditorMode>("edit");

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
      {/* Note Title */}
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
        <p className="note-editor__error">
          {errors.title.message}
        </p>
      )}

      {/* Editor Tabs */}
      <div className="note-editor__tabs">
        {(["edit", "preview", "split"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Editor Workspace */}
      <div
        className={`note-editor__workspace note-editor__workspace--${activeTab}`}
      >
        {/* Edit Panel */}
        {activeTab !== "preview" && (
          <div className="note-editor__edit-panel">
            <label htmlFor="note-content">
              Content (Markdown supported)
            </label>

            <textarea
              id="note-content"
              rows={14}
              maxLength={20000}
              placeholder="Write your note here..."
              {...register("content")}
              aria-invalid={Boolean(errors.content)}
            />

            {errors.content && (
              <p className="note-editor__error">
                {errors.content.message}
              </p>
            )}
          </div>
        )}

        {/* Preview Panel */}
        {activeTab !== "edit" && (
          <div className="note-editor__preview-panel">
            {activeTab === "split" && <h3>Live Preview</h3>}

            <MarkdownPreview content={content || ""} />
          </div>
        )}
      </div>

      {/* Form Actions */}
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
