import "./globals.css";
import { plusJS } from "@/app/fonts";
import ReduxProvider from "@/components/ui/ReduxProvider";
import AuthClientProxy from "@/features/auth/AuthClientProxy";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

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
      <body className={`${plusJS.className} antialiased`}>
        <ReduxProvider>
          <AuthClientProxy>{children}</AuthClientProxy>
          <Toaster richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
