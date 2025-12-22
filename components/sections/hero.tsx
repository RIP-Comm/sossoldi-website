/** biome-ignore-all lint/performance/noImgElement: <explanation> */
"use client";

import { motion } from "framer-motion";
import { Apple, ArrowDown, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { GridPattern } from "@/components/ui/grid-pattern";
import { RotatingText } from "@/components/ui/rotating-text";

const AppStoreIcon = () => {
  return (
    <motion.img
      src="/appstore.svg"
      alt="App Store"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="h-12 shrink-0"
    />
  );
};

const PlayStoreIcon = () => {
  return (
    <motion.img
      src="/playstore.svg"
      alt="Play Store"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className=" h-12 shrink-0"
    />
  );
};

export function Hero() {
  const t = useTranslations("hero");

  const rotatingWords = [
    t("rotatingWords.track"),
    t("rotatingWords.grow"),
    t("rotatingWords.manage"),
    t("rotatingWords.control"),
  ];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Grid pattern background */}
      <GridPattern
        className="text-border/30 dark:text-border/15"
        cellSize={64}
        strokeWidth={1}
        fade={true}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 inline-flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {t("badge")}
          </span>
          <span className="h-px w-8 bg-border" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block">{t("headline")}</span>
          <span className="text-primary">
            <RotatingText words={rotatingWords} interval={2500} />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-12 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://apps.apple.com/us/app/sossoldi/id6740497000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppStoreIcon />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.ripcomm.sossoldi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStoreIcon />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-12 sm:gap-16"
        >
          <StatBadge value="100%" label={t("stats.openSource")} />
          <div className="h-12 w-px bg-border/50" />
          <StatBadge value="0" label={t("stats.trackers")} />
          <div className="h-12 w-px bg-border/50" />
          <StatBadge value="∞" label={t("stats.transparency")} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#features"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="font-mono text-xs font-medium tracking-wider uppercase">
            {t("scrollCta")}
          </span>
          <ArrowDown className="size-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">{value}</div>
      <div className="mt-1 font-mono text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
