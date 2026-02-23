import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import AddNewBoardForm from "@/features/boards/components/AddNewBoardForm";
import { PropsWithChildren } from "react";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen w-full border border-black">
      <aside className="hidden border border-red-500 md:block md:w-65.25 lg:w-75">
        <Sidebar />
      </aside>
      <div className="flex w-full flex-col overflow-y-auto border border-blue-600 md:flex-1">
        <Navbar />
        <main className="bg-light-grey flex flex-1 flex-col border-4 border-black">
          {children}
          <AddNewBoardForm />
        </main>
      </div>
    </div>
  );
}
