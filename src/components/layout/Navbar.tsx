"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DarkModeThemeIcon from "@/public/dark-mode-icon.svg";
import Logo from "@/public/icon.svg";
import LightModeThemeIcon from "@/public/light-mode-icon.svg";
import { ChevronDownIcon, EllipsisVertical, LayoutDashboard, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isBoardsMenuListOpen, setIsBoardsMenuListOpen] = useState(true);
  const tasks = 0;
  const currentBoard = true;

  const handleBoardsMenuToggling = () => setIsBoardsMenuListOpen((curState) => !curState);

  return (
    <div className="w-full">
      <nav className="flex h-16 w-full items-center justify-between border border-green-500 bg-white px-6 md:h-20">
        <div className="flex items-center gap-5">
          <Image src={Logo} alt="kanban logo" quality={75} className="md:hidden" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold md:text-xl lg:text-2xl">Platform Launch</h1>
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
          {/* button, for task. disable if no task */}
          <button
            aria-label="Add new task"
            className="btn btn-primary-s px-4 py-1.5 disabled:opacity-25 md:hidden"
            disabled={!tasks}
          >
            <Plus className="size-4" />
          </button>

          <button
            className="btn-primary-l btn-primary-padding hidden disabled:opacity-25 md:block"
            disabled={!tasks}
          >
            + add new task
          </button>

          <button aria-label="Edit and delete board menu">
            <EllipsisVertical className="text-medium-grey size-5" />
          </button>
        </div>
      </nav>

      {/* boards menu */}
      <AnimatePresence>
        {isBoardsMenuListOpen && (
          <motion.aside
            initial={{ visibility: "hidden", opacity: 0 }}
            animate={{ visibility: "visible", opacity: 1 }}
            exit={{ visibility: "hidden", opacity: 0 }}
            className="fixed flex h-screen w-full justify-center bg-black/50 py-8 backdrop-blur-xs md:hidden"
          >
            <motion.div
              initial={{ scale: "80%" }}
              animate={{ scale: "100%" }}
              exit={{ scale: "80%" }}
              className="h-fit w-66 rounded-lg bg-white py-4 pr-6"
            >
              <ul className="boards-dropdown flex flex-col">
                <h3 className="heading-s text-medium-grey mb-4.5 px-4 uppercase">all boards (3)</h3>
                <li
                  className={`flex items-center gap-3 rounded-r-3xl px-4 py-3 ${currentBoard ? "bg-main-purple text-white" : "text-medium-grey"}`}
                >
                  <LayoutDashboard className="size-4" />{" "}
                  <span className="heading-m capitalize">Platform launch</span>
                </li>
                <li
                  className={`flex items-center gap-3 rounded-r-3xl px-4 py-3 ${false ? "bg-main-purple text-white" : "text-medium-grey"} hover:bg-main-purple-hover hover:text-white`}
                >
                  <LayoutDashboard className="size-4" />{" "}
                  <span className="heading-m capitalize">Platform launch</span>
                </li>

                {/* create */}
                <li className={`text-main-purple flex items-center gap-3 rounded-r-3xl px-4 py-3`}>
                  <LayoutDashboard className="size-4" />{" "}
                  <span className="heading-m capitalize">+ Create New Board</span>
                </li>
              </ul>

              {/* theme switch */}
              <div className="pl-3">
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
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
