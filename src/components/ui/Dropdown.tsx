"use client";

import { STATUS } from "@/utils/constants";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setIsDropdownOpen((cs) => !cs);

  return (
    <div className="p-8">
      <label htmlFor="" className="body-m text-medium-grey dark:text-white">
        Dropdown
      </label>

      <div className="relative space-y-2">
        <div className="input__field__container bg-" onClick={handleDropdownToggle}>
          <p className="body-l dark:text-white">Doing</p>
          <ChevronDown
            className={`text-main-purple size-5 cursor-pointer ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        <ul
          className={`border-medium-grey/20 dark:bg-very-dark-grey absolute flex w-full transform flex-col gap-2 rounded-lg border p-4 shadow-md transition-all duration-300 ${isDropdownOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"} `}
        >
          {STATUS?.map((stat) => (
            <li
              key={stat}
              className="body-l text-medium-grey cursor-pointer capitalize transition-colors hover:text-black"
            >
              {stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
