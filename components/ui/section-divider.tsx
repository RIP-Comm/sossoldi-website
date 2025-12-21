"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "dots" | "line" | "full" | "numbered";
  number?: string;
}

export function SectionDivider({ className, variant = "line", number }: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="flex items-center gap-2">
          <span className="size-1 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-primary/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
          <span className="size-1 rounded-full bg-border" />
        </div>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={cn("mx-auto max-w-4xl px-6 py-4", className)}>
        <div className="h-px w-full bg-border/50" />
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={cn("py-4", className)}>
        <div className="h-px w-full bg-border/30" />
      </div>
    );
  }

  if (variant === "numbered" && number) {
    return (
      <div className={cn("mx-auto max-w-4xl px-6 py-12", className)}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground/60">
            {number}
          </span>
          <div className="h-px flex-1 bg-border/40" />
        </div>
      </div>
    );
  }

  return null;
}
