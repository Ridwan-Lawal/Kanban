import { getUserBoards } from "@/features/boards/services/board-service";
import EmptyBoard from "@/features/dashboard/EmptyBoard";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const userBoards = await getUserBoards();

  if (userBoards.length) {
    const firstBoard = userBoards?.at(0);
    if (firstBoard) {
      redirect(`/dashboard/boards/${firstBoard?.id}`);
    }
  }

  return (
    <div className="flex h-full items-center justify-center border">
      <EmptyBoard />
    </div>
  );
}
