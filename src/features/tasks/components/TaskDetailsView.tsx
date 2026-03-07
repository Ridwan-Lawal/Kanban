"use client";

import SubtaskCheckbox from "@/components/ui/SubtaskCheckbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTaskStatusAction } from "@/features/tasks/action/tasks-action";
import { useGetCurrentBoardColumns } from "@/features/tasks/hooks/useTask";
import {
  AddCurrentTaskInView,
  addTaskToEdit,
  handleAddNewTaskModalToggle,
  handleDeleteTaskModalToggle,
  selectDashboard,
} from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { BOARDS_ACTIONS } from "@/utils/constants";
import { EllipsisVertical } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskDetailsView() {
  const { currentTaskInView } = useAppSelector(selectDashboard);
  const { boardId } = useParams<{ boardId: string | undefined }>();
  const { boardColumns } = useGetCurrentBoardColumns(boardId);
  const [isTaskSettingsOpen, setIsTaskSettingsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const totalSubtasksCompleted = currentTaskInView?.subtasks.reduce(
    (acc, subTask) => (subTask.status === true ? acc + 1 : acc),
    0,
  );

  async function handleTaskStatus(newStatus: string) {
    if (!currentTaskInView?.id) return;
    const res = await updateTaskStatusAction(currentTaskInView?.id, newStatus);

    if (res?.error) {
      toast.error(res.error);
    }
  }

  function handleTaskSettingActions(action: string) {
    console.log(action, "action clicked");
    if (action === "delete") {
      dispatch(handleDeleteTaskModalToggle());
      setIsTaskSettingsOpen(false);
    } else {
      setIsTaskSettingsOpen(false);
      dispatch(handleAddNewTaskModalToggle());
      dispatch(addTaskToEdit(currentTaskInView));
      dispatch(AddCurrentTaskInView(null));
    }
  }

  return (
    <AnimatePresence>
      {currentTaskInView && (
        <motion.aside
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          exit={{ visibility: "hidden", opacity: 0 }}
          className="overlay fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-[1px]"
        >
          <motion.div
            initial={{ scale: "80%" }}
            animate={{ scale: "100%" }}
            exit={{ scale: "80%" }}
            className="form no-scrollbar dark:bg-dark-grey z-50 max-h-130 w-full max-w-100 space-y-6 overflow-auto rounded-[6px] bg-white px-5 py-5"
          >
            {/* title & menu */}
            <div className="flex items-center justify-between gap-2">
              <h2 className="heading-l text-black capitalize dark:text-white">
                {currentTaskInView.title}
              </h2>

              <div className="relative">
                <button
                  aria-label="edit and delete task"
                  onClick={() => setIsTaskSettingsOpen((cs) => !cs)}
                >
                  <EllipsisVertical className="text-medium-grey z-50 size-5" />
                </button>

                <div
                  className={`shadow-lines-light dark:bg-very-dark-grey dark:shadow-dark-grey absolute top-12 right-0 z-20 flex h-22 w-44 flex-col items-start justify-center rounded-md bg-white px-1 shadow-md ${isTaskSettingsOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"} transition-all`}
                >
                  {BOARDS_ACTIONS.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTaskSettingActions(action)}
                      className={`body-l dark:hover:bg-dark-grey w-full px-3 py-1.5 text-left capitalize transition-all hover:bg-gray-100 ${action === "edit" ? "text-medium-grey dark:text-white" : "text-red"} `}
                    >
                      {action} Task
                      {/* {action === "edit" ? (isDeletingBoard ? "editing..." : "edit") : ""}
                      {action === "delete" ? (isDeletingBoard ? "deleting..." : "delete") : ""} */}{" "}
                    </button>
                  ))}
                </div>

                {isTaskSettingsOpen && (
                  <div
                    className="fixed top-0 left-0 h-screen w-full"
                    onClick={() => setIsTaskSettingsOpen(false)}
                  />
                )}
              </div>
            </div>

            <p className="body-l text-medium-grey">{currentTaskInView.description}</p>

            <div className="space-y-4">
              <p className="text-medium-grey text-xs font-bold">
                Subtasks ({totalSubtasksCompleted} of {currentTaskInView.subtasks.length})
              </p>

              <ul className="flex flex-col gap-2">
                {currentTaskInView.subtasks.map((subtask) => (
                  <SubtaskCheckbox key={subtask.id} subtaskId={subtask.id} />
                ))}
              </ul>

              <div className="space-y-4">
                <p className="text-medium-grey text-xs font-bold">Current Status</p>

                <Select
                  defaultValue={currentTaskInView.status}
                  onValueChange={(value) => handleTaskStatus(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="status" className="input__field w-full" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {boardColumns?.map((column) => (
                        <SelectItem
                          key={column.id}
                          value={column.name}
                          className="input__field capitalize"
                        >
                          {column.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <div
            className="fixed top-0 h-screen w-full"
            onClick={() => {
              setIsTaskSettingsOpen(false);
              dispatch(AddCurrentTaskInView(null));
            }}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
