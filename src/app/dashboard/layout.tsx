import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import AddNewBoardForm from "@/features/boards/components/AddNewBoardForm";
import { PropsWithChildren } from "react";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex w-full flex-col overflow-y-auto md:flex-1">
        <Navbar />
        <main className="bg-light-grey dark:bg-very-dark-grey flex flex-1 flex-col">
          {children}
          <AddNewBoardForm />
        </main>
      </div>
    </div>
  );
}
