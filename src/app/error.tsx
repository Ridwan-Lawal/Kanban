"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive h-10 w-10" />
        </div>

        <h1 className="text-foreground mb-2 text-2xl font-semibold">Something went wrong</h1>

        <p className="text-muted-foreground mb-6">
          We&apos;re sorry, but something unexpected happened. Please try refreshing the page or go
          back to the home page.
        </p>

        <div className="bg-muted/50 mb-6 rounded-lg p-4 text-left">
          <p className="text-foreground text-sm font-medium">Error details:</p>
          <p className="text-muted-foreground mt-1 font-mono text-sm break-all">{error.message}</p>

          <button onClick={reset} className="gap-2 bg-[#635FC7] font-medium text-white">
            <RefreshCw className="size-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
