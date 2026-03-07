"use client";

import { SingleColumnType } from "@/features/tasks/types/tasks-types";
import { AddCurrentTaskInView } from "@/lib/redux/dashboard-slice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { KANBAN_PALETTE } from "@/utils/constants";

interface BoardColumnType {
  column: SingleColumnType;
  columnIdx: number;
}

export default function BoardColumn({ column, columnIdx }: BoardColumnType) {
  const dispatch = useAppDispatch();
  const color = KANBAN_PALETTE[columnIdx % KANBAN_PALETTE.length];

  const totalSubtasksCompleted = (taskIdx: number) =>
    column.tasks[taskIdx].subtasks.reduce(
      (acc, subTask) => (subTask.status === true ? acc + 1 : acc),
      0,
    );

  return (
    <div className="w-70 shrink-0 space-y-6">
      {/* column header */}
      <header className="flex items-center gap-3">
        <div className="size-4 rounded-full" style={{ backgroundColor: color }} />
        <h2 className="heading-s text-medium-grey uppercase">
          {column.name} ({column.tasks.length})
        </h2>
      </header>

      <main className="">
        <ul className="space-y-4">
          {column.tasks.map((task, idx) => (
            <li
              key={task.id}
              className="dark:bg-dark-grey block cursor-pointer space-y-1 rounded-lg bg-white px-4 py-6 transition-transform duration-300 hover:scale-95"
              onClick={() => dispatch(AddCurrentTaskInView(task))}
            >
              <span className="heading-m block text-black dark:text-white">{task.title}</span>
              <span className="body-m text-medium-grey">
                {totalSubtasksCompleted(idx)} of {task.subtasks.length} subtasks
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
