"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
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

// Preview blog posts (hardcoded for landing page)
const previewPosts = [
  {
    slug: "first-post",
    title: "Introducing Sossoldi 2.0",
    excerpt:
      "The next evolution of personal finance tracking with automated bank connections.",
    date: "2024-12-15",
    readTime: "5 min",
    tag: "Release",
  },
  {
    slug: "second-post",
    title: "Privacy-First Banking",
    excerpt:
      "How we handle your financial data with zero tracking and full transparency.",
    date: "2024-12-10",
    readTime: "4 min",
    tag: "Privacy",
  },
  {
    slug: "md-showcase",
    title: "Open Source Finance",
    excerpt:
      "Why building in the open matters for personal finance applications.",
    date: "2024-12-05",
    readTime: "6 min",
    tag: "Community",
  },
];

export function BlogPreview() {
  const t = useTranslations("blog");

  return (
    <section id="blog" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Blog"
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("subtitle")}
        />

        {/* Blog posts - horizontal list style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-0"
        >
          {previewPosts.map((post, index) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="flex flex-col gap-4 border-t border-border/40 py-8 transition-colors md:flex-row md:items-center md:justify-between">
                  {/* Left side - Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground md:w-48 md:shrink-0">
                    <span className="font-mono text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Center - Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {post.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Right side - Arrow */}
                  <div className="flex items-center md:ml-8">
                    <span className="flex size-10 items-center justify-center rounded-full border border-border/50 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex justify-center border-t border-border/40 pt-8"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("viewAll")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
