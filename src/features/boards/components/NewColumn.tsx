"use client";

import { handleNewColumnsModalToggle } from "@/lib/redux/dashboard-slice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function NewColumnTab() {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(handleNewColumnsModalToggle())}
      className="bg-new-column-bg group hover:bg-new-column-bg/70 dark:bg-dark-grey flex h-full w-70 shrink-0 cursor-pointer items-center justify-center rounded-[6px] px-4 transition-all"
    >
      <h2 className="heading-l md:heading-xl text-medium-grey group-hover:text-main-purple capitalize transition-all">
        + new column
      </h2>
    </div>
  );
}
