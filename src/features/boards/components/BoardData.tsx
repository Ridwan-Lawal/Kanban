import BoardColumn from "@/features/boards/components/BoardColumn";
import EmptyColumns from "@/features/boards/components/EmptyColumns";
import NewColumnTab from "@/features/boards/components/NewColumn";
import { getBoardsById } from "@/features/boards/services/board-service";

export default async function DisplayBoardData({ boardId }: { boardId: string }) {
  const boardData = await getBoardsById(boardId);

  if (!boardData?.columns) {
    return (
      <div className="flex h-full items-center justify-center border">
        <EmptyColumns />
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex flex-1 gap-4 overflow-x-auto border-4 border-red-600 px-4 py-8">
      {boardData?.columns?.map((column, idx) => (
        <BoardColumn key={column.id} columnIdx={idx} column={column} />
      ))}

      <NewColumnTab />
    </div>
  );
}
