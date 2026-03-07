"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGetBoards } from "@/features/boards/hooks/useBoards";
import { useDisplayError } from "@/hooks/useDisplayError";
import {
  handleAddBoardFormToggle,
  handleAddBoardToEdit,
  selectDashboard,
  toggleSidebar,
  toggleTheme,
} from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import DarkModeThemeIcon from "@/public/dark-mode-icon.svg";
import LogoIcon from "@/public/icon.svg";
import LogoText from "@/public/kanban.svg";
import LightModeThemeIcon from "@/public/light-mode-icon.svg";
import LogoTextForDarkMode from "@/public/logo-dark-mode.svg";
import { EyeOff, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// use react query to fetch the boards for the side bar

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { data: boards, isPending, error } = useGetBoards();
  const currentPath = usePathname();
  console.log(currentPath);
  useDisplayError(error);
  const { isSidebarOpen, isDarkmode } = useAppSelector(selectDashboard);

  // replace with skeletons

  useEffect(() => {
    const themeFromLs = localStorage.getItem("kanban-theme");
    if (themeFromLs) {
      const theme: boolean = JSON.parse(themeFromLs);
      dispatch(toggleTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    const htmlEl = document.querySelector("html");

    if (isDarkmode) {
      htmlEl?.classList.add("dark");
    } else {
      htmlEl?.classList.remove("dark");
    }

    localStorage.setItem("kanban-theme", JSON.stringify(isDarkmode));
  }, [isDarkmode]);

  return (
    <aside
      className={`hidden md:block ${isSidebarOpen ? "md:w-65.25 lg:w-75" : "w-0"} relative overflow-hidden border-r border-neutral-700 transition-all`}
    >
      <div className="dark:bg-dark-grey flex h-full flex-col justify-between bg-white py-7">
        {/* logo and boards */}
        <div className="flex flex-col items-start gap-12">
          <div className="flex items-center gap-4 px-6">
            <Image src={LogoIcon} alt="The logo icon" quality={75} />
            <Image
              src={isDarkmode ? LogoTextForDarkMode : LogoText}
              alt="The logo icon"
              quality={75}
            />
          </div>

          {/* boards */}
          <ul className="boards-dropdown no-scrollbar flex w-full max-w-105 flex-col overflow-auto pr-6">
            <h3 className="heading-s text-medium-grey mb-4.5 px-6 uppercase">
              all boards ({boards?.length ?? 0})
            </h3>
            {/* skeleton */}
            {isPending ? (
              <div>Loading...</div>
            ) : (
              boards?.map((board, idx) => (
                <Link href={`/dashboard/boards/${board.id}`} key={idx}>
                  <li
                    className={`flex items-center gap-3 rounded-r-3xl px-6 py-3 ${currentPath === `/dashboard/boards/${board?.id}` ? "bg-main-purple text-white" : "text-medium-grey"}`}
                  >
                    <LayoutDashboard className="size-4" />{" "}
                    <span className="heading-m capitalize">{board?.name}</span>
                  </li>
                </Link>
              ))
            )}

            {/* create */}
            <li
              className={`text-main-purple hover:text-main-purple-hover flex items-center gap-3 rounded-r-3xl px-6 py-3 hover:bg-transparent`}
              onClick={() => {
                dispatch(handleAddBoardFormToggle());
                dispatch(handleAddBoardToEdit(null));
              }}
            >
              <LayoutDashboard className="size-4" />{" "}
              <span className="heading-m capitalize">+ Create New Board</span>
            </li>
          </ul>
        </div>
        {/* Block for changing theme */}
        <div className="w-full space-y-8 px-3">
          <div className="bg-light-grey dark:bg-very-dark-grey flex w-full items-center justify-center rounded-[6px] px-6 py-2.5">
            <div className="flex items-center justify-center gap-6">
              <Label
                id="airplane-mode"
                onClick={() => dispatch(toggleTheme(false))}
                className="cursor-pointer"
              >
                <Image src={LightModeThemeIcon} alt="Dark mode theme icon" quality={75} />
              </Label>
              <Switch
                onClick={() => dispatch(toggleTheme())}
                className="[&_span]:bg-white dark:[&_span]:bg-slate-200"
                style={{
                  backgroundColor: `var(--color-main-purple)`,
                }}
                checked={isDarkmode}
              />
              <Label
                id="airplane-mode"
                onClick={() => dispatch(toggleTheme(true))}
                className="cursor-pointer"
              >
                <Image src={DarkModeThemeIcon} alt="Dark mode theme icon" quality={75} />
              </Label>
            </div>
          </div>

          {/* hide sidebar block */}
          <button
            className="flex items-center gap-2.5 px-3"
            onClick={() => dispatch(toggleSidebar())}
          >
            <EyeOff className="text-medium-grey size-5" />
            <span className="heading-m text-medium-grey capitalize">hide sidebar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// copy the data fetching to the Navbar
