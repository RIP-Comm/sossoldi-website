"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BlogCard, type BlogPost } from "@/components/ui/blog-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Link } from "@/i18n/navigation";

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
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
};

// Skeleton component for loading state
function BlogPostSkeleton() {
  return (
    <div className="flex flex-col gap-6 border-t border-border/40 py-10 md:flex-row md:items-start">
      {/* Left side - Number, Image, and Date skeleton */}
      <div className="flex items-start gap-6 md:w-64 md:shrink-0">
        <div className="h-4 w-6 animate-pulse rounded bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-32 w-full animate-pulse rounded-xl bg-muted md:h-28" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Center - Content skeleton */}
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-muted md:h-8" />
        <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-5/6 animate-pulse rounded bg-muted" />
      </div>

      {/* Right side - Arrow skeleton */}
      <div className="flex items-center self-center md:ml-8">
        <div className="size-12 animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}

export function BlogPreview() {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const response = await fetch("/api/blog/recent?limit=3");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentPosts();
  }, []);

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
        {isLoading ? (
          <div className="space-y-0">
            {[1, 2, 3].map((i) => (
              <BlogPostSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-0"
          >
            {posts.map((post, index) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} index={index} locale="en-US" maxTags={1} />
              </motion.div>
            ))}
          </motion.div>
        )}

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
