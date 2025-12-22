"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
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

export function BlogPreview({ posts, locale }: { posts: BlogPost[]; locale: string }) {
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
        {posts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-0"
          >
            {posts.map((post, index) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} index={index} locale={locale} maxTags={1} />
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
