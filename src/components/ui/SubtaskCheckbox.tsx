"use client";

import { updateSubtaskStatusAction } from "@/features/tasks/action/tasks-action";
import { selectDashboard, toggleSubstackStatus } from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface SubtaskCheckboxProps {
  subtaskId: string;
}

export default function SubtaskCheckbox({ subtaskId }: SubtaskCheckboxProps) {
  const { currentTaskInView } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();
  const currentSubtask = currentTaskInView?.subtasks.find((subtask) => subtask.id === subtaskId);

  async function handleSubtaskStatusToggle() {
    dispatch(toggleSubstackStatus({ subtaskToUpdateId: subtaskId }));

    console.log(currentSubtask?.status, "current subtask");

    if (!currentSubtask?.id) return;

    const res = await updateSubtaskStatusAction(currentSubtask.id, !currentSubtask.status);

    if (res?.error) {
      toast.error(res.error);
    }
  }

  // current status update,
  // edit and delete task
  // theme feature
  // Sidebar closing

  return (
    <div
      className="bg-light-grey hover hover:bg-main-purple/25 dark:bg-very-dark-grey flex cursor-pointer items-center gap-4 rounded-sm px-4 py-3"
      onClick={handleSubtaskStatusToggle}
    >
      <div
        className={`border-medium-grey/25 size-4 rounded-xs ${currentSubtask?.status ? "bg-main-purple" : "dark:bg-dark-grey border bg-white"} flex cursor-pointer items-center justify-center`}
      >
        {currentSubtask?.status && <Check className="size-2.5 text-white" strokeWidth={5} />}
      </div>

      <p
        className={`body-m ${currentSubtask?.status && "dark:text-medium-grey text-black/50 line-through"}`}
      >
        {currentSubtask?.title}
      </p>
    </div>
  );
}
