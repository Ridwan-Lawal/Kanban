import z from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, "Title must have 3 or more characters").trim(),
  description: z.string().min(10, "Descriptions must have 10 or more characters").trim(),
  status: z.string("Choose a status for your task."),
  subtasks: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Can't be empty"),
    }),
  ),
});

export const ColumnSchema = z.object({
  columns: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "Column name is required"),
      }),
    )
    .min(1, "At least one column is required"),
});

export const BoardSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  columns: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "Column name is required"),
      }),
    )
    .min(1, "At least one column is required"),
});

export type BoardSchemaType = z.infer<typeof BoardSchema>;
export type ColumnSchemaType = Pick<BoardSchemaType, "columns">;
export type TaskSchemaType = z.infer<typeof TaskSchema>;
