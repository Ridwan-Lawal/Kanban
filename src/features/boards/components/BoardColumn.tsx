import { Column } from "@/features/boards/types/boards-service-interface";
import { KANBAN_PALETTE } from "@/utils/constants";

interface BoardColumnType {
  column: Column;
  columnIdx: number;
}

export default function BoardColumn({ column, columnIdx }: BoardColumnType) {
  const color = KANBAN_PALETTE[columnIdx % KANBAN_PALETTE.length];

  //   continue building the board interface

  return (
    <div className="w-70 shrink-0 space-y-6 border">
      {/* column header */}
      <header className="flex items-center gap-3">
        <div className="size-4 rounded-full" style={{ backgroundColor: color }} />
        <h2 className="heading-s text-medium-grey uppercase">{column.name} (2)</h2>
      </header>

      <main className="boarder">
        <ul className="space-y-4">
          <li className="block space-y-1 rounded-lg border bg-white px-4 py-6">
            <span className="heading-m block text-black">Build UI for onboarding flow</span>
            <span className="body-m text-medium-grey">0 of 3 subtasks</span>
          </li>
        </ul>
      </main>
    </div>
  );
}
