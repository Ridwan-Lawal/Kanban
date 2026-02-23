"use server";

import {
  addBoardToDB,
  addUserColumn,
  deleteBoardFromDb,
  editUserBoard,
  getUserBoards,
} from "@/features/boards/services/board-service";
import {
  BoardSchema,
  BoardSchemaType,
  ColumnSchema,
  ColumnSchemaType,
} from "@/lib/schema/dashboard-zod-schema";
import { getActionError } from "@/utils/db-utils";
import { checkIfUserIsAuthenticated } from "@/utils/verify-user-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function addNewColumnsAction(formData: ColumnSchemaType, columnsBoardId: string) {
  const { user } = await checkIfUserIsAuthenticated();
  if (!user.id) {
    redirect("/login");
  }

  const validateData = ColumnSchema.safeParse(formData);
  if (!validateData?.success) {
    const error = z.treeifyError(validateData.error);
    console.log(error.errors);
    return { status: "error", message: "Check your column fields, and try again." };
  }

  try {
    await addUserColumn(formData, columnsBoardId);

    revalidatePath(`/dashboard/boards/${columnsBoardId}`);

    const addSToWordColumn = formData.columns.length > 1 ? "s" : "";

    return { status: "success", message: `Column${addSToWordColumn} added successfully` };
  } catch (error) {
    return getActionError(error, "Something went wrong trying to add board columns");
  }
}

export async function editBoardAction(
  boardToEditId: string | undefined,
  boardData: BoardSchemaType,
) {
  await checkIfUserIsAuthenticated();

  if (!boardToEditId) return { status: "error", message: "You can't perform this operation." };

  const userBoards = await getUserBoards();
  const doesBoardToEditBelongToUser = userBoards.some((board) => board.id === boardToEditId);
  if (!doesBoardToEditBelongToUser) {
    return { status: "error", message: "You do not have the permission to perform this action" };
  }

  try {
    await editUserBoard(boardData, boardToEditId);

    revalidatePath(`/dashboard/boards/${boardToEditId}`);

    return { status: "success", message: "Board successfully updated." };
  } catch (error) {
    return getActionError(error, "Something went wrong trying to delete board");
  }
}

export async function deleteBoardAction(boardToDelId: string | null) {
  const { user } = await checkIfUserIsAuthenticated();
  console.log(boardToDelId, "delete");

  if (!boardToDelId) {
    return { status: "error", message: "You are not permitted to perform this action." };
  }

  const userBoards = await getUserBoards();

  const doesBoardToDelBelongToUser = userBoards.some((board) => boardToDelId === board.id);

  if (!doesBoardToDelBelongToUser) {
    return { status: "error", message: "You do not have the permission to perform this action" };
  }

  let isQuerySuccessful = false;

  try {
    await deleteBoardFromDb(boardToDelId, user.id);

    revalidatePath("/dashboard");

    isQuerySuccessful = true;
  } catch (error) {
    return getActionError(error, "Something went wrong trying to delete board");
  }

  if (isQuerySuccessful) {
    redirect("/dashboard");
  }
}

export async function addNewBoardAction(formData: BoardSchemaType) {
  const { user } = await checkIfUserIsAuthenticated();

  const verifyFormData = BoardSchema.safeParse(formData);
  if (!verifyFormData.success) {
    const inputFieldsWithErrors = Object.keys(
      z.treeifyError(verifyFormData.error).properties ?? {},
    );

    return {
      error: `Check the following fields and try again: ${inputFieldsWithErrors.join(", ")}`,
    };
  }

  const verifiedFormData = verifyFormData?.data;

  try {
    const newBoardId = await addBoardToDB(verifiedFormData, user.id);

    return { success: "Board added successfully", newBoardId };
  } catch (error: unknown) {
    console.log(error);

    return { error: "Something went wrong adding new board" };
  }
}
