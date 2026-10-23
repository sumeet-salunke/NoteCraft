import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, type NoteFormValues } from "../../validations/note.schema";
import "./NoteEditor.css";

interface NoteEditorProps {
  initialValues: NoteFormValues;
  onSave: (values: NoteFormValues) => void;
  onCancel: () => void;
}

const NoteEditor = ({ initialValues, onSave, onCancel }: NoteEditorProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

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

      <label htmlFor="note-content">Content</label>
      <textarea id="note-content"
      rows={14}
      maxLength={20000}
      placeholder="Write your note here...."
      {...register("content")}
      aria-invalid={Boolean(errors.content)}></textarea>
      {errors.content && (
        <p className="note-editor__error">{errors.content.message}</p>
      )}
      <div className="note-editor__actions">
        <button className="note-editor__cancel"
        type="button"
        onClick={onCancel}>Cancel</button>
        <button disabled={isSubmitting}
        type="submit">Save Note</button>
      </div>
    </form>
  );
};


export default NoteEditor;