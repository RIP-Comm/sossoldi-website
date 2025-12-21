"use client";

import { cn } from "@/lib/utils";

interface GridPatternProps {
  className?: string;
  cellSize?: number;
  strokeWidth?: number;
  fade?: boolean;
}

export function GridPattern({
  className,
  cellSize = 64,
  strokeWidth = 1,
  fade = true,
}: GridPatternProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </pattern>
        {fade && (
          <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        )}
        {fade && (
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid-pattern)"
        mask={fade ? "url(#grid-mask)" : undefined}
      />
    </svg>
  );
}

