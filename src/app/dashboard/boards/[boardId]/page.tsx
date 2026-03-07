import AddNewColumn from "@/features/boards/components/AddNewColumn";
import DisplayBoardData from "@/features/boards/components/BoardData";
import DeleteBoardModal from "@/features/boards/components/DeleteBoardModal";
import { getBoardsById, getUserBoards } from "@/features/boards/services/board-service";
import AddNewTask from "@/features/tasks/components/AddNewTask";
import DeleteTaskModal from "@/features/tasks/components/DeleteTaskModal";
import TaskDetailsView from "@/features/tasks/components/TaskDetailsView";
import { Suspense } from "react";

interface BoardDetailsProp {
  params: Promise<{ boardId: string }>;
}

export async function generateMetadata({ params }: BoardDetailsProp) {
  const { boardId } = await params;
  const currentBoard = await getBoardsById(boardId);

  return { title: currentBoard?.name };
}

export async function generateStaticParam() {
  const boards = await getUserBoards();
  return boards?.map((board) => ({ boardId: board.id }));
}

export default async function Page({ params }: BoardDetailsProp) {
  const { boardId } = await params;
  console.log(boardId);

  return (
    <div className="flex flex-1 flex-col">
      <Suspense fallback={<div>Board data Loading...</div>} key={boardId}>
        <DisplayBoardData boardId={boardId} />
      </Suspense>
      <DeleteBoardModal />
      <AddNewColumn />
      <AddNewTask />
      <TaskDetailsView />
      <DeleteTaskModal />
    </div>
  );
}
