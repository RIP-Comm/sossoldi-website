import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  featuredImage?: string;
  tags?: string[];
};

type BlogCardProps = {
  post: BlogPost;
  index: number;
  locale?: string;
  maxTags?: number;
};

export function BlogCard({ post, index, locale = "en-US", maxTags = 2 }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex flex-col gap-6 border-t border-border/40 py-10 transition-colors md:flex-row md:items-start">
        {/* Left side - Number, Image, and Date */}
        <div className="flex items-start gap-6 md:w-64 md:shrink-0">
          <span className="font-mono text-sm text-muted-foreground/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 space-y-3">
            {post.featuredImage && (
              <div className="relative h-32 w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30 md:h-28 md:w-full">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              <time>
                {new Date(post.publishDate).toLocaleDateString(locale, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Center - Content */}
        <div className="flex-1">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {post.tags && post.tags.length > 0 && (
              <>
                {post.tags.slice(0, maxTags).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              5 min read
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-2xl">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </div>

        {/* Right side - Arrow */}
        <div className="flex items-center self-center md:ml-8">
          <span className="flex size-12 items-center justify-center rounded-full border border-border/50 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

