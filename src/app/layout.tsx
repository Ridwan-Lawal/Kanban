import "./globals.css";
import { plusJS } from "@/app/fonts";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s - Kanban",
    default: "Home - Kanban",
  },

  description:
    "Streamline your workflow with kanban, a high-performance Kanban tool. Track tasks, manage team projects in real-time, and boost productivity. Try it free.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${plusJS.className} antialiased`}>{children}</body>
    </html>
  );
}
