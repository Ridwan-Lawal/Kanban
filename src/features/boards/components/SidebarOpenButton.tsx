"use client";

import { selectDashboard, toggleSidebar } from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Eye } from "lucide-react";

export function SidebarOpenButton() {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(selectDashboard);

  return (
    !isSidebarOpen && (
      <button
        className="bg-main-purple hover:bg-main-purple-hover fixed bottom-10 left-0 z-30 hidden h-12 w-14 items-center justify-center rounded-r-3xl md:flex"
        onClick={() => dispatch(toggleSidebar())}
      >
        <Eye className="size-5 text-white" />
      </button>
    )
  );
}
