import z from "zod";

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
