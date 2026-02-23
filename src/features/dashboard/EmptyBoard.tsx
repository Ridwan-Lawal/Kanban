"use client";

import { useGetBoards } from "@/features/boards/hooks/useBoards";
import { handleAddBoardFormToggle } from "@/lib/redux/dashboard-slice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function EmptyBoard() {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto flex h-full max-w-114.75 flex-col items-center justify-center gap-6">
      <p className="heading-l text-medium-grey text-center">
        There are no existing boards. Create a new board to get started
      </p>
      <button
        onClick={() => dispatch(handleAddBoardFormToggle())}
        className="btn-primary-l btn-primary-padding"
      >
        + add new board
      </button>
    </div>
  );
}
