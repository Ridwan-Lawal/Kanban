"use client";

import { deleteTaskAction } from "@/features/tasks/action/tasks-action";
import {
  AddCurrentTaskInView,
  handleDeleteTaskModalToggle,
  selectDashboard,
} from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteTaskModal() {
  const dispatch = useAppDispatch();
  const { isDeleteTaskModalOpen, currentTaskInView } = useAppSelector(selectDashboard);
  const [isDeletingTask, startTransition] = useTransition();

  const handleCloseDeleteModal = () => dispatch(handleDeleteTaskModalToggle(false));

  function handleTaskDeletion() {
    startTransition(async () => {
      if (!currentTaskInView?.id) return;
      const res = await deleteTaskAction(currentTaskInView?.id);

      if (res?.error) {
        toast.error("Task Deletion Failed", { description: res?.error });
      } else {
        toast.success("Task successfully deleted");
        handleCloseDeleteModal();
        dispatch(AddCurrentTaskInView(null));
      }
    });
  }

  console.log(isDeleteTaskModalOpen, "is delete modal open");

  return (
    <AnimatePresence>
      {isDeleteTaskModalOpen && (
        <motion.aside
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          exit={{ visibility: "hidden", opacity: 0 }}
          className="overlay fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20 px-4 backdrop-blur-[1px]"
        >
          <motion.div
            initial={{ scale: "80%" }}
            animate={{ scale: "100%" }}
            exit={{ scale: "80%" }}
            className="dark:bg-dark-grey z-50 max-w-120 rounded-[6px] bg-white px-6 py-6"
          >
            <h2 className="text-red heading-l">Delete this board?</h2>
            <p className="body-l text-medium-grey mt-5">
              Are you sure you want to delete the &lsquo;{currentTaskInView?.title}&rsquo; task?
              This action will remove the task and it subtasks and cannot be reversed.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <button
                className="btn btn-destructive w-full cursor-pointer py-2 text-white"
                onClick={handleTaskDeletion}
                disabled={isDeletingTask}
              >
                {isDeletingTask ? "Deleting task..." : "Delete"}
              </button>
              <button
                className="btn btn-secondary w-full cursor-pointer py-2 dark:bg-white"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>
            </div>
          </motion.div>
          <div className="fixed top-0 h-screen w-full" onClick={handleCloseDeleteModal} />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
