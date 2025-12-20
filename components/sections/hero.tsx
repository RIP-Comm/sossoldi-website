"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGraph } from "@/components/ui/animated-graph";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Apple, Play, Github, ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-sossoldi-accent/10 blur-[100px]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col items-center justify-center gap-12 px-4 py-20 lg:flex-row lg:gap-16">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {t("headline")}
            <br />
            <span className="gradient-text dark:gradient-text-dark">
              {t("headlineHighlight")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0"
          >
            {t("subheadline")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <a
                href="https://apps.apple.com/us/app/sossoldi/id6740497000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Apple className="mr-2 size-5" />
                {t("cta.appStore")}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.ripcomm.sossoldi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="mr-2 size-5" />
                {t("cta.playStore")}
              </a>
            </Button>
          </motion.div>

          {/* GitHub link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6"
          >
            <a
              href="https://github.com/RIP-Comm/Sossoldi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
              {t("cta.github")}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            <StatItem label={t("stats.netWorth")} value={125000} prefix="€" />
            <StatItem label={t("stats.income")} value={4500} prefix="€" color="success" />
            <StatItem label={t("stats.expenses")} value={2800} prefix="€" color="destructive" />
            <StatItem label={t("stats.savings")} value={38} suffix="%" color="accent" />
          </motion.div>
        </motion.div>

        {/* Right content - Animated Graph */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1"
        >
          <div className="relative">
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-lg font-semibold">{t("stats.netWorth")}</h3>
              <AnimatedGraph />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-xl bg-primary/20 blur-2xl" />
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-sossoldi-accent/20 blur-2xl" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1"
        >
          <motion.div className="h-2 w-1 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color?: "default" | "success" | "destructive" | "accent";
}

function StatItem({ label, value, prefix, suffix, color = "default" }: StatItemProps) {
  const colorClasses = {
    default: "text-foreground",
    success: "text-success",
    destructive: "text-destructive",
    accent: "text-sossoldi-accent",
  };

  return (
    <div className="text-center lg:text-left">
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>
        {prefix}
        <AnimatedCounter value={value} />
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
