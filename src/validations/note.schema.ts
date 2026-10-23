import {z} from "zod";

export const noteSchema = z.object({
  title: z.string().trim().min(1, "Title is Required.").
  max(100,"Title must be 100 characters or fewer"),
  content: z.string().max(20000, 'Content must be 20,000 charcaters or fewer.'),
});

export type NoteFormValues = z.infer<typeof noteSchema>;