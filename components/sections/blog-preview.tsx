"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// Preview blog posts (hardcoded for landing page)
const previewPosts = [
  {
    slug: "first-post",
    title: "Introducing Sossoldi 2.0",
    excerpt: "The next evolution of personal finance tracking with automated bank connections.",
    date: "2024-12-15",
    readTime: "5 min",
    tags: ["Release", "Product"],
  },
  {
    slug: "second-post",
    title: "Privacy-First Banking",
    excerpt: "How we handle your financial data with zero tracking and full transparency.",
    date: "2024-12-10",
    readTime: "4 min",
    tags: ["Privacy", "Security"],
  },
  {
    slug: "md-showcase",
    title: "Open Source Finance",
    excerpt: "Why building in the open matters for personal finance applications.",
    date: "2024-12-05",
    readTime: "6 min",
    tags: ["Open Source", "Community"],
  },
];

export function BlogPreview() {
  const t = useTranslations("blog");

  return (
    <SectionContainer id="blog" className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}{" "}
            <span className="gradient-text dark:gradient-text-dark">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/blog" className="group">
            {t("viewAll")}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>

      {/* Blog posts grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {previewPosts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <GlassCard delay={index * 0.1} className="group h-full cursor-pointer">
              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mb-4 text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-4" />
                  {post.readTime}
                </span>
              </div>

              {/* Read more indicator */}
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {t("readMore")}
                <ArrowRight className="size-4" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
