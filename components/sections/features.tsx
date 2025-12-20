"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  TrendingUp,
  Wallet,
  Shield,
  LucideIcon,
} from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  delay: number;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  delay,
}: FeatureCardProps) {
  return (
    <GlassCard delay={delay} className="relative h-full">
      {badge && (
        <Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground">
          {badge}
        </Badge>
      )}
      <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
        <Icon className="size-6 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </GlassCard>
  );
}

export function Features() {
  const t = useTranslations("features");

  const features = [
    {
      icon: Building2,
      titleKey: "bankConnections",
      badge: t("bankConnections.badge"),
    },
    {
      icon: TrendingUp,
      titleKey: "investmentTracking",
    },
    {
      icon: Wallet,
      titleKey: "netWorthDashboard",
    },
    {
      icon: Shield,
      titleKey: "privacyFirst",
    },
  ];

  return (
    <SectionContainer id="features" className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("title")}{" "}
          <span className="gradient-text dark:gradient-text-dark">
            {t("titleHighlight")}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Feature cards grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.titleKey}
            icon={feature.icon}
            title={t(`${feature.titleKey}.title`)}
            description={t(`${feature.titleKey}.description`)}
            badge={feature.badge}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Additional visual elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 flex justify-center"
      >
        <div className="glass flex items-center gap-8 rounded-2xl px-8 py-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Open Source</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-success">0</div>
            <div className="text-sm text-muted-foreground">Trackers</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-sossoldi-accent">∞</div>
            <div className="text-sm text-muted-foreground">Transparency</div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
