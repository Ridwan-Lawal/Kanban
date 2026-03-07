import { getUserBoardsForClient } from "@/features/boards/services/board-service-client";
import { handleAddNewTaskModalToggle, selectDashboard } from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export function useGetCurrentBoardColumns(boardId: string | undefined) {
  const dispatch = useAppDispatch();
  const { isAddNewTaskModalOpen } = useAppSelector(selectDashboard);

  useEffect(() => {
    if (isAddNewTaskModalOpen) {
      if (!boardId) {
        dispatch(handleAddNewTaskModalToggle(false));
      }
    }
  }, [boardId, dispatch, isAddNewTaskModalOpen]);

  const { data, error } = useSuspenseQuery({
    queryKey: ["board-columns"],
    queryFn: getUserBoardsForClient,
    retry: 3,
  });

  const currentBoardColumns = data.find((board) => board.id === boardId);

  useEffect(() => {
    if (isAddNewTaskModalOpen) {
      if (error) {
        toast.error(error.message);
      }
    }
  }, [error, isAddNewTaskModalOpen]);

  return { boardColumns: currentBoardColumns?.columns };
}
