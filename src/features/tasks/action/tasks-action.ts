"use server";

import {
  addNewTask,
  deleteTask,
  editTask,
  getUserTasks,
  updateSubtaskStatus,
  updateTaskStatus,
} from "@/features/tasks/services/tasks-service";
import { TaskSchema, TaskSchemaType } from "@/lib/schema/dashboard-zod-schema";
import { checkIfUserIsAuthenticated } from "@/utils/verify-user-auth";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function editTaskAction(taskToEdit: TaskSchemaType, taskToEditId: string) {
  await checkIfUserIsAuthenticated();

  const userTask = await getUserTasks();
  const doesTaskBelongToUser = userTask.some((task) => task.id === taskToEditId);
  if (!doesTaskBelongToUser) {
    return { error: "You do have the permission to delete this data." };
  }

  const validatedTaskData = TaskSchema.safeParse(taskToEdit);
  if (!validatedTaskData.success) {
    const error = z.treeifyError(validatedTaskData.error);
    const formFieldWithErrors = Object.keys(error.properties ?? {});

    return {
      error: `Please check the following fields: ${formFieldWithErrors.join(", ")} and try again`,
    };
  }

  try {
    await editTask(taskToEdit, taskToEditId);

    revalidatePath("/dashboard/boards");

    return { success: "Task successfully updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong trying to edit this task. Please try again" };
  }
}

export async function deleteTaskAction(taskToDelId: string) {
  await checkIfUserIsAuthenticated();

  const userTask = await getUserTasks();
  const doesTaskBelongToUser = userTask.some((task) => task.id === taskToDelId);
  if (!doesTaskBelongToUser) {
    return { error: "You do have the permission to delete this data." };
  }

  try {
    await deleteTask(taskToDelId);
    revalidatePath(`/dashboard/boards`);

    return { success: "Task successfully deleted" };
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong trying to delete this task. Please try again" };
  }
}

export async function updateTaskStatusAction(taskToUpdateId: string, newStatus: string) {
  await checkIfUserIsAuthenticated();

  const userTask = await getUserTasks();
  const doesTaskBelongToUser = userTask.some((task) => task.id === taskToUpdateId);
  if (!doesTaskBelongToUser) {
    return { error: "You do have the permission to update this data." };
  }

  try {
    await updateTaskStatus(taskToUpdateId, newStatus);
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong trying to update task status. Please try again" };
  }
}

export async function updateSubtaskStatusAction(subtaskId: string, newStatus: boolean) {
  await checkIfUserIsAuthenticated();

  try {
    await updateSubtaskStatus(subtaskId, newStatus);
    revalidatePath(`/dashboard/boards`);
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong while trying to update this subtask. Please try again." };
  }
}

export async function addNewTaskAction(
  formData: TaskSchemaType,
  columnId: string,
  boardId: string,
) {
  await checkIfUserIsAuthenticated();

  const validatedTaskData = TaskSchema.safeParse(formData);
  if (!validatedTaskData.success) {
    const error = z.treeifyError(validatedTaskData.error);
    const formFieldWithErrors = Object.keys(error.properties ?? {});

    return {
      error: `Please check the following fields: ${formFieldWithErrors.join(", ")} and try again`,
    };
  }

  console.log(boardId, columnId, formData);

  try {
    await addNewTask(formData, columnId);
    revalidatePath(`/dashboard/boards`);

    return { success: "Task successfully added" };
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong while trying to add this task. Please try again." };
  }
}
