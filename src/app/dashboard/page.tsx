import EmptyBoard from "@/features/dashboard/EmptyBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center border">
      <EmptyBoard />
    </div>
  );
}
