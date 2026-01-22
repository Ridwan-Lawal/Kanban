"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DarkModeThemeIcon from "@/public/dark-mode-icon.svg";
import LogoIcon from "@/public/icon.svg";
import LogoText from "@/public/kanban.svg";
import LightModeThemeIcon from "@/public/light-mode-icon.svg";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const currentBoard = true;

  return (
    <div className="flex h-full flex-col justify-between py-7">
      {/* logo and boards */}
      <div className="flex flex-col items-start gap-12">
        <div className="flex items-center gap-4 px-6">
          <Image src={LogoIcon} alt="The logo icon" quality={75} />
          <Image src={LogoText} alt="The logo icon" quality={75} />
        </div>

        {/* boards */}
        <ul className="boards-dropdown flex w-full flex-col pr-6">
          <h3 className="heading-s text-medium-grey mb-4.5 px-6 uppercase">all boards (3)</h3>
          <li
            className={`flex items-center gap-3 rounded-r-3xl px-6 py-3 ${currentBoard ? "bg-main-purple text-white" : "text-medium-grey"}`}
          >
            <LayoutDashboard className="size-4" />{" "}
            <span className="heading-m capitalize">Platform launch</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-r-3xl px-6 py-3 ${false ? "bg-main-purple text-white" : "text-medium-grey"} hover:bg-main-purple-hover hover:text-white`}
          >
            <LayoutDashboard className="size-4" />{" "}
            <span className="heading-m capitalize">Platform launch</span>
          </li>

          {/* create */}
          <li
            className={`text-main-purple hover:text-main-purple-hover flex items-center gap-3 rounded-r-3xl px-6 py-3 hover:bg-transparent`}
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
