"use client";

import { deleteBoardAction } from "@/features/boards/actions/board-actions";
import { handleDeleteBoardModalToggle, selectDashboard } from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteBoardModal() {
  const dispatch = useAppDispatch();
  const { isDeleteModalBoardOpen, boardToDeleteId } = useAppSelector(selectDashboard);
  const [isDeletingBoard, startTransition] = useTransition();

  const boardName = "boardName";

  const handleCloseDeleteModal = () => dispatch(handleDeleteBoardModalToggle(false));

  function handleBoardDeletion() {
    startTransition(async () => {
      const res = await deleteBoardAction(boardToDeleteId);

      if (res?.status) {
        toast.error("Board Deletion Failed", { description: res?.message });
      } else {
        toast.success("Board successfully deleted");
      }
    });
  }

  return (
    <AnimatePresence>
      {isDeleteModalBoardOpen && (
        <motion.aside
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          exit={{ visibility: "hidden", opacity: 0 }}
          className="overlay fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/20 px-4 backdrop-blur-[1px]"
        >
          <motion.div
            initial={{ scale: "80%" }}
            animate={{ scale: "100%" }}
            exit={{ scale: "80%" }}
            className="z-50 max-w-120 rounded-[6px] bg-white px-6 py-6"
          >
            <h2 className="text-red heading-l">Delete this board?</h2>
            <p className="body-l text-medium-grey mt-5">
              Are you sure you want to delete the &lsquo;{boardName}&rsquo; board? This action will
              remove all columns and tasks and cannot be reversed.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <button
                className="btn btn-destructive w-full cursor-pointer py-2 text-white"
                onClick={handleBoardDeletion}
                disabled={isDeletingBoard}
              >
                {isDeletingBoard ? "Deleting board..." : "Delete"}
              </button>
              <button
                className="btn btn-secondary w-full cursor-pointer py-2"
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
