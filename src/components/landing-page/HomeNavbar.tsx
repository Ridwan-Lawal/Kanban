"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-border bg-card/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <div className="flex gap-[3px]">
              <div className="bg-main-purple h-6 w-[3px] rounded-full" />
              <div className="bg-main-purple h-6 w-[3px] rounded-full opacity-75" />
              <div className="bg-main-purple h-6 w-[3px] rounded-full opacity-50" />
            </div>
          </div>
          <span className="text-foreground text-xl font-bold">kanban</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-main-purple text-primary-foreground hover:bg-main-purple-hover rounded-3xl px-5 py-2.5 text-sm font-bold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
