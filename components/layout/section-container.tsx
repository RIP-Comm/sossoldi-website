"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export function SectionContainer({
  children,
  id,
  className,
  containerClassName,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn("mx-auto max-w-screen-xl px-4", containerClassName)}
      >
        {children}
      </motion.div>
    </section>
  );
}
