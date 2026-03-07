import { getBoardsById } from "@/features/boards/services/board-service";

// 1. Get the full return type (e.g., Board | null)
type BoardDataType = Awaited<ReturnType<typeof getBoardsById>>;

// 2. Extract columns only if BoardData is not null
export type ColumnType = NonNullable<BoardDataType>["columns"];

// 3. To get the type of a SINGLE column (for mapping)
export type SingleColumnType = ColumnType[number];
