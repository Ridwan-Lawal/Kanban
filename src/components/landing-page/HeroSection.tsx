"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-main-purple/5 absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-main-purple-hover/5 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in-up mx-auto max-w-3xl">
          <div className="border-border bg-card text-medium-grey mb-6 inline-block rounded-full border px-4 py-1.5 text-sm font-medium">
            ✨ The modern way to manage projects
          </div>
          <h1 className="text-foreground mb-6 text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
            Organize your work, <span className="text-main-purple">beautifully.</span>
          </h1>
          <p className="text-medium-grey mx-auto mb-10 max-w-xl text-lg leading-relaxed">
            A clean, intuitive Kanban board that helps teams move fast. Track tasks, manage
            subtasks, and switch to dark mode — all in one place.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="bg-main-purple text-primary-foreground hover:bg-main-purple-hover hover:shadow-main-purple/25 rounded-3xl px-8 py-4 text-base font-bold transition-all hover:shadow-lg"
            >
              Get Started — It&apos;s Free
            </Link>
            <Link
              href="#features"
              className="border-border bg-card text-foreground hover:bg-accent rounded-3xl border px-8 py-4 text-base font-bold transition-colors"
            >
              See Features
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
