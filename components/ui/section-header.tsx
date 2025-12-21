"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  titleHighlight,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", align === "center" && "text-center", className)}
    >
      {label && (
        <div className={cn("mb-6 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {label}
          </span>
          <span className="h-px w-8 bg-border" />
        </div>
      )}

      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
        {titleHighlight && (
          <>
            {" "}
            <span className="text-primary">{titleHighlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "text-muted-foreground text-base sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
