import { db } from "@/db";
import { subtasks, tasks } from "@/db/schema";
import { TaskSchemaType } from "@/lib/schema/dashboard-zod-schema";
import { checkIfUserIsAuthenticated } from "@/utils/verify-user-auth";
import { and, eq, inArray } from "drizzle-orm";
import { cache } from "react";

export async function editTask(taskToEdit: TaskSchemaType, taskToEditId: string) {
  const { user } = await checkIfUserIsAuthenticated();

  const { subtasks: subtasksData, ...restOfTaskData } = taskToEdit;

  //   updating task
  await db
    .update(tasks)
    .set(restOfTaskData)
    .where(and(eq(tasks.id, taskToEditId), eq(tasks.userId, user.id)));

  // updating subtask

  const subtasksIds = await db
    .select({ id: subtasks.id })
    .from(subtasks)
    .where(eq(subtasks.taskId, taskToEditId));

  const taskToEditSubTasksIds = subtasksData?.map((subtask) => subtask.id);

  const subtaskToDelFromDb = subtasksIds.filter(
    (subtask) => !taskToEditSubTasksIds.includes(subtask.id),
  );

  console.log({ subtasksIds, taskToEditSubTasksIds, subtaskToDelFromDb });

  if (subtaskToDelFromDb?.length > 0) {
    await db.delete(subtasks).where(
      inArray(
        subtasks.id,
        subtaskToDelFromDb.map((c) => c.id),
      ),
    );
  }

  if (taskToEdit?.subtasks?.length > 0) {
    for (const subtask of taskToEdit.subtasks) {
      if (subtask?.id) {
        await db.update(subtasks).set({ title: subtask.title }).where(eq(subtasks.id, subtask.id));
      } else {
        await db.insert(subtasks).values({
          title: subtask.title,
          status: false,
          taskId: taskToEditId,
          userId: user.id,
        });
      }
    }
  }
}

export async function deleteTask(taskToDelId: string) {
  const { user } = await checkIfUserIsAuthenticated();

  await db.delete(tasks).where(and(eq(tasks.id, taskToDelId), eq(tasks.userId, user.id)));
}

export async function updateTaskStatus(taskToUpdateId: string, newStatus: string) {
  const { user } = await checkIfUserIsAuthenticated();
  await db
    .update(tasks)
    .set({ status: newStatus })
    .where(and(eq(tasks.id, taskToUpdateId), eq(tasks.userId, user.id)));
}

export const getUserTasks = cache(async function () {
  const { user } = await checkIfUserIsAuthenticated();

  try {
    const userTasks = await db.select().from(tasks).where(eq(tasks.userId, user.id));

    return userTasks;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    throw new Error("Something went wrong getting user's tasks");
  }
});

export async function updateSubtaskStatus(subtaskId: string, newStatus: boolean) {
  await db.update(subtasks).set({ status: newStatus }).where(eq(subtasks.id, subtaskId));
}

export async function addNewTask(formData: TaskSchemaType, columnId: string) {
  const { user } = await checkIfUserIsAuthenticated();
  const { subtasks: formSubtasks, ...restOfFormData } = formData;
  const [{ id: taskId }] = await db
    .insert(tasks)
    .values({ ...restOfFormData, columnId, userId: user.id })
    .returning({ id: tasks.id });

  if (formData.subtasks?.length > 0) {
    await db.insert(subtasks).values(
      formSubtasks?.map((subtask) => ({
        title: subtask.title,
        status: false,
        taskId,
        userId: user.id,
      })),
    );
  }
}
