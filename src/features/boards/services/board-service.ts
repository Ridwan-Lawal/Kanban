import { db } from "@/db/index";
import { boards, columns } from "@/db/schema/boards-schema";
import { BoardSchemaType, ColumnSchemaType } from "@/lib/schema/dashboard-zod-schema";
import { getFetchError } from "@/utils/db-utils";
import { checkIfUserIsAuthenticated } from "@/utils/verify-user-auth";
import { and, eq, inArray } from "drizzle-orm";
import { cache } from "react";

export async function addUserColumn(userColumns: ColumnSchemaType, columnsBoardId: string) {
  await db
    .insert(columns)
    .values(userColumns?.columns.map((column) => ({ ...column, boardId: columnsBoardId })));
}

export async function editUserBoard(boardData: BoardSchemaType, boardToEditId: string) {
  const { user } = await checkIfUserIsAuthenticated();

  await db
    .update(boards)
    .set({ name: boardData.name })
    .where(and(eq(boards.id, boardToEditId), eq(boards.userId, user.id)));

  const boardColumns = await db.select().from(columns).where(eq(columns.boardId, boardToEditId));

  const boardColumnsIds = boardData.columns.map((col) => col?.id);

  // Delete columns from db that has be deleted in the UI
  const boardColumnsToDelete = boardColumns.filter(
    (column) => !boardColumnsIds.includes(column.id),
  );

  if (boardColumnsToDelete?.length > 0) {
    await db.delete(columns).where(
      inArray(
        columns.id,
        boardColumnsToDelete.map((c) => c.id),
      ),
    );
  }

  // Add or update columns

  for (const col of boardData.columns) {
    if (col?.id) {
      // update existing
      await db.update(columns).set({ name: col.name }).where(eq(columns.id, col.id));
    } else {
      // add new columns
      await db.insert(columns).values({ name: col.name, boardId: boardToEditId });
    }
  }
}

export const getBoardsById = cache(async function (boardId: string | undefined) {
  const { user } = await checkIfUserIsAuthenticated();

  if (!boardId) {
    throw new Error("Something went wrong trying to get this board!");
  }

  try {
    const board = await db.query.boards.findFirst({
      where: (t, { eq, and }) => and(eq(t?.userId, user.id), eq(t.id, boardId)),
      with: {
        columns: {
          with: {
            tasks: {
              with: {
                subtasks: true,
              },
            },
          },
        },
      },
    });

    return board;
  } catch (error) {
    const { error: errorMessage } = getFetchError(
      error,
      "Something went wrong trying to get this board!",
    );
    throw new Error(errorMessage);
  }
});

export async function deleteBoardFromDb(boardId: string, userId: string) {
  await db.delete(boards).where(and(eq(boards.id, boardId), eq(boards.userId, userId)));
}

export const getUserBoards = cache(async function () {
  const { user } = await checkIfUserIsAuthenticated();

  try {
    const usersBoards = await db.query.boards.findMany({
      where: (t, { eq }) => eq(t.userId, user.id),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
      with: {
        columns: true,
      },
    });

    return usersBoards;
  } catch (error) {
    const { error: errorMessage } = getFetchError(
      error,
      "Something went wrong while fetching user boards.",
    );

    throw new Error(errorMessage);
  }
});

export async function addBoardToDB(boardData: BoardSchemaType, userId: string) {
  const [newBoard] = await db
    .insert(boards)
    .values({ name: boardData.name, userId })
    .returning({ id: boards.id });

  if (boardData.columns?.length > 0) {
    await db
      .insert(columns)
      .values(boardData.columns?.map((column) => ({ ...column, boardId: newBoard.id })));
  }

  return newBoard.id;
}
