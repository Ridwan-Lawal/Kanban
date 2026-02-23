"use client";

import { handleNewColumnsModalToggle } from "@/lib/redux/dashboard-slice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function EmptyColumns() {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto flex h-full max-w-114.75 flex-col items-center justify-center gap-6 border">
      <p className="heading-l text-medium-grey text-center">
        There are no existing Tasks. Create a new Column to beginning adding tasks.
      </p>
      <button
        onClick={() => dispatch(handleNewColumnsModalToggle(true))}
        className="btn-primary-l btn-primary-padding"
      >
        + add new columns
      </button>
    </div>
  );
}
