"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Discord SVG Icon
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function DiscordCTA() {
  const t = useTranslations("discordCta");

  return (
    <section className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Community"
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* CTA Card - border-based sharp design */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden border border-border/30"
          >
            {/* Discord purple shader effects - contained in the box */}
            <div className="pointer-events-none absolute -right-32 -top-32 size-80 bg-[#5865F2]/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 bg-[#5865F2]/8 blur-3xl" />

            {/* Index number */}
            <span className="absolute right-4 top-4 z-10 font-mono text-[10px] text-muted-foreground/40">
              01
            </span>

            <div className="relative flex flex-col items-center p-10 text-center md:p-16">
              {/* Discord icon container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-10"
              >
                <div className="group relative inline-flex items-center justify-center border border-border/50 bg-background p-5 transition-colors hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5">
                  <DiscordIcon className="size-10 text-muted-foreground transition-colors group-hover:text-[#5865F2]" />
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.a
                href="https://discord.gg/2A3SkHhw5H"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center rounded-full gap-3 bg-[#5865F2] px-8 py-4 font-semibold text-white transition-all hover:bg-[#4752C4]"
              >
                <DiscordIcon className="size-5" />
                <span>{t("button")}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-wrap items-center justify-center gap-12 sm:gap-16"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground sm:text-3xl">
                    500+
                  </div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {t("members")}
                  </div>
                </div>
                <div className="h-12 w-px bg-border/50" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                    Live
                  </div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {t("online")}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
