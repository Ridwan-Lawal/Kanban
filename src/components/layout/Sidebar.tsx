"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGetBoards } from "@/features/boards/hooks/useBoards";
import { useDisplayError } from "@/hooks/useDisplayError";
import { handleAddBoardFormToggle, handleAddBoardToEdit } from "@/lib/redux/dashboard-slice";
import { useAppDispatch } from "@/lib/redux/hooks";
import DarkModeThemeIcon from "@/public/dark-mode-icon.svg";
import LogoIcon from "@/public/icon.svg";
import LogoText from "@/public/kanban.svg";
import LightModeThemeIcon from "@/public/light-mode-icon.svg";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// use react query to fetch the boards for the side bar

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { data: boards, isPending, error } = useGetBoards();
  const currentPath = usePathname();
  console.log(currentPath);
  useDisplayError(error);

  // replace with skeletons

  return (
    <div className="flex h-full flex-col justify-between py-7">
      {/* logo and boards */}
      <div className="flex flex-col items-start gap-12">
        <div className="flex items-center gap-4 px-6">
          <Image src={LogoIcon} alt="The logo icon" quality={75} />
          <Image src={LogoText} alt="The logo icon" quality={75} />
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
      <div className="w-full px-3">
        <div className="bg-light-grey flex w-full items-center justify-center rounded-[6px] px-6 py-2.5">
          <div className="flex items-center justify-center gap-6">
            <Label id="airplane-mode">
              <Image src={LightModeThemeIcon} alt="Dark mode theme icon" quality={75} />
            </Label>
            <Switch
              style={{
                backgroundColor: `var(--color-main-purple)`,
              }}
            />
            <Label id="airplane-mode">
              <Image src={DarkModeThemeIcon} alt="Dark mode theme icon" quality={75} />
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

// copy the data fetching to the Navbar
