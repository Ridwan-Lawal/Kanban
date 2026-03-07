"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSession } from "@/features/auth/hooks/useSession";
import { useGetBoards } from "@/features/boards/hooks/useBoards";
import { useDisplayError } from "@/hooks/useDisplayError";
import { authClient } from "@/lib/auth-client";
import {
  handleAddBoardFormToggle,
  handleAddBoardToDeleteId,
  handleAddBoardToDeleteName,
  handleAddBoardToEdit,
  handleAddNewTaskModalToggle,
  handleDeleteBoardModalToggle,
  selectDashboard,
  toggleTheme,
} from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import DarkModeThemeIcon from "@/public/dark-mode-icon.svg";
import Logo from "@/public/icon.svg";
import LightModeThemeIcon from "@/public/light-mode-icon.svg";
import { BOARDS_ACTIONS } from "@/utils/constants";
import { ChevronDownIcon, EllipsisVertical, LayoutDashboard, LogOut, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isBoardsMenuListOpen, setIsBoardsMenuListOpen] = useState(false);
  const { user } = useSession();
  const dispatch = useAppDispatch();
  const { isPending, data: boardsData, error } = useGetBoards();
  useDisplayError(error);
  const pathname = usePathname();
  const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false);

  const { boardId } = useParams<{ boardId: string }>();
  const { isDarkmode } = useAppSelector(selectDashboard);
  const router = useRouter();

  useEffect(() => {
    const currentBoard = boardsData?.find((board) => board.id === boardId);
    dispatch(handleAddBoardToEdit(currentBoard));
  }, [boardId, boardsData, dispatch]);

  console.log(boardId, "board id");

  const handleBoardSettingsToggle = () => setIsBoardSettingsOpen((cur) => !cur);

  const userFirstName = user?.name?.split(" ")?.at(0) ?? "";
  const tasks = 0;

  const currentBoard = boardsData?.find(
    (boardData) => pathname === `/dashboard/boards/${boardData.id}`,
  );

  const handleBoardsMenuToggling = () => setIsBoardsMenuListOpen((curState) => !curState);

  async function handleSignout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  function handleBoardSettingActions(action: string) {
    if (action === "delete") {
      dispatch(handleAddBoardToDeleteId(boardId));
      dispatch(handleAddBoardToDeleteName(currentBoard?.name ?? ""));

      console.log(currentBoard, "current board in settings action");

      dispatch(handleDeleteBoardModalToggle());
      setIsBoardSettingsOpen(false);
    } else if (action === "edit") {
      const currentBoard = boardsData?.find((board) => board.id === boardId);
      dispatch(handleAddBoardToEdit(currentBoard));
      dispatch(handleAddBoardFormToggle());
      setIsBoardSettingsOpen(false);
    }
  }

  return (
    <div className="w-full">
      <nav className="dark:bg-dark-grey flex h-16 w-full items-center justify-between bg-white px-6 md:h-20">
        <div className="flex items-center gap-5">
          <Image src={Logo} alt="kanban logo" quality={75} className="md:hidden" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
              {userFirstName && currentBoard ? currentBoard.name : `${userFirstName} Boards`}
            </h1>
            <button
              aria-label="Boards menu"
              onClick={handleBoardsMenuToggling}
              className="md:hidden"
            >
              <ChevronDownIcon
                className={`text-main-purple size-4 ${isBoardsMenuListOpen ? "rotate-180" : "rotate-0"} transition-transform`}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleSignout}>
            <LogOut className="text-lines-dark size-5 dark:text-white" />
          </button>
          {/* button, for task. disable if no task */}
          <button
            aria-label="Add new task"
            className="btn btn-primary-s px-4 py-1.5 disabled:opacity-25 md:hidden"
            disabled={!boardId}
            onClick={() => dispatch(handleAddNewTaskModalToggle())}
          >
            <Plus className="size-4" />
          </button>

          <button
            className="btn-primary-l btn-primary-padding hidden disabled:opacity-25 md:block"
            disabled={!boardId}
            onClick={() => dispatch(handleAddNewTaskModalToggle())}
          >
            + add new task
          </button>

          {boardsData?.length ? (
            <div className="relative">
              <button
                aria-label="Edit and delete board menu z-50 absolute"
                onClick={handleBoardSettingsToggle}
              >
                <EllipsisVertical className="text-medium-grey z-50 size-5" />
              </button>

              <div
                className={`shadow-lines-light dark:shadow-very-dark-grey absolute top-12 right-0 z-20 flex h-22 w-44 flex-col items-start justify-center rounded-md bg-white px-1 shadow-md ${isBoardSettingsOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"} dark:bg-dark-grey transition-all`}
              >
                {BOARDS_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBoardSettingActions(action)}
                    className={`body-l dark:hover:bg-very-dark-grey w-full px-3 py-1.5 text-left capitalize transition-all hover:bg-gray-100 ${action === "edit" ? "text-medium-grey dark:text-white" : "text-red dark:text-red-400"}`}
                  >
                    {action} board
                  </button>
                ))}
              </div>

              {isBoardSettingsOpen && (
                <div
                  className="fixed top-0 left-0 z-10 h-screen w-full"
                  onClick={handleBoardSettingsToggle}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>

      {/* boards menu */}
      <AnimatePresence>
        {isBoardsMenuListOpen && (
          <motion.aside
            initial={{ visibility: "hidden", opacity: 0 }}
            animate={{ visibility: "visible", opacity: 1 }}
            exit={{ visibility: "hidden", opacity: 0 }}
            className="fixed z-50 flex h-screen w-full justify-center bg-black/50 py-8 backdrop-blur-xs md:hidden"
          >
            <motion.div
              initial={{ scale: "80%" }}
              animate={{ scale: "100%" }}
              exit={{ scale: "80%" }}
              className="dark:bg-dark-grey z-30 h-fit w-66 rounded-lg bg-white py-4 pr-6"
            >
              <ul className="boards-dropdown no-scrollbar flex max-h-75 flex-col overflow-auto">
                <h3 className="heading-s text-medium-grey mb-4.5 px-4 uppercase">
                  all boards ({boardsData?.length ?? 0})
                </h3>
                {isPending ? (
                  <div>Loading...</div>
                ) : (
                  boardsData?.map((boardData, idx) => (
                    <Link href={`/dashboard/boards/${boardData.id}`} key={idx}>
                      <li
                        key={idx}
                        className={`flex items-center gap-3 rounded-r-3xl px-4 py-3 ${boardData.id === currentBoard?.id ? "bg-main-purple text-white" : "text-medium-grey"}`}
                      >
                        <LayoutDashboard className="size-4" />{" "}
                        <span className="heading-m capitalize">{boardData.name}</span>
                      </li>
                    </Link>
                  ))
                )}

                {/* create */}
                <li
                  className={`text-main-purple flex items-center gap-3 rounded-r-3xl px-4 py-3`}
                  onClick={() => {
                    dispatch(handleAddBoardFormToggle());
                    dispatch(handleAddBoardToEdit(null));
                    setIsBoardsMenuListOpen(false);
                  }}
                >
                  <LayoutDashboard className="size-4" />{" "}
                  <span className="heading-m capitalize">+ Create New Board</span>
                </li>
              </ul>

              {/* theme switch */}
              <div className="pl-3">
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
              </div>
            </motion.div>
            <div
              className="fixed top-0 h-screen w-full"
              onClick={() => setIsBoardsMenuListOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
