"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Wallet,
  Shield,
  Sparkles,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  featured?: boolean;
  index: number;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  featured = false,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "group relative p-8 text-center transition-all duration-300",
        "border-b border-r border-border/30",
        "hover:bg-muted/30",
        // Remove right border on last column items
        "lg:[&:nth-child(3n)]:border-r-0",
        "md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r",
        // Remove bottom border on last row
        "[&:nth-last-child(-n+3)]:lg:border-b-0",
        "[&:nth-last-child(-n+2)]:md:border-b-0 [&:nth-last-child(-n+2)]:lg:border-b",
        featured && "md:col-span-2 lg:col-span-2",
        className
      )}
    >
      {/* Index number */}
      <span className="absolute right-4 top-4 font-mono text-[10px] text-muted-foreground/40">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={cn(
          "mb-6 mx-auto inline-flex rounded-2xl border border-border/50 bg-background p-4 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5",
          iconClassName
        )}
      >
        <Icon className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      <h3 className="mb-3 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {featured && (
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="size-3" />
          <span>Coming Soon</span>
        </div>
      )}
    </motion.div>
  );
}

export function Features() {
  const t = useTranslations("features");

  const features = [
    {
      icon: Building2,
      titleKey: "bankConnections",
      featured: true,
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
    {
      icon: LineChart,
      titleKey: "analytics",
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Features"
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("subtitle")}
        />

        {/* Feature grid with border-based layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid border-l border-t border-border/30 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.titleKey}
              icon={feature.icon}
              title={t(`${feature.titleKey}.title`)}
              description={t(`${feature.titleKey}.description`)}
              featured={feature.featured}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
