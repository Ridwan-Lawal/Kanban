"use client";

import { Check } from "lucide-react";

export default function SubtaskCheckbox() {
  const isSubtaskCompleted = true;

  return (
    <div className="space-y-4">
      <p className="body-m text-white capitalize">Subtask Checkbox</p>

      <div className="space-y-2 px-4">
        {/* each checkbox */}
        <div className="bg-light-grey hover hover:bg-main-purple/25 flex cursor-pointer items-center gap-4 rounded-sm px-4 py-3">
          <div
            className={`border-medium-grey/25 size-4 rounded-xs ${isSubtaskCompleted ? "bg-main-purple" : "dark:bg-dark-grey border bg-white"} flex cursor-pointer items-center justify-center`}
          >
            {isSubtaskCompleted && <Check className="size-2.5 text-white" strokeWidth={5} />}
          </div>

          <p className={`body-m ${isSubtaskCompleted && "text-black/50 line-through"}`}>Idle</p>
        </div>
      </div>
    </div>
  );
}
