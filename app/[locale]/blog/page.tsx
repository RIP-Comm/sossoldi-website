import { setRequestLocale } from "next-intl/server";
import { getAllPosts } from "./[slug]/_queries/get-post";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowUpRight, Calendar, Clock, ArrowLeft } from "lucide-react";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Blog
            </span>
            <span className="h-px w-8 bg-border" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Insights & <span className="text-primary">Updates</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Financial tips, release notes, and technical deep-dives from the Sossoldi team.
          </p>
        </header>

        {/* Posts list */}
        <div className="space-y-0">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="flex flex-col gap-6 border-t border-border/40 py-10 transition-colors md:flex-row md:items-start">
                {/* Left side - Featured image or index */}
                <div className="flex items-start gap-6 md:w-64 md:shrink-0">
                  <span className="font-mono text-sm text-muted-foreground/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {post.featuredImage && (
                    <div className="relative h-32 w-full overflow-hidden rounded-xl border border-border/50 md:h-24 md:w-40">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* Center - Content */}
                <div className="flex-1">
                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-2xl">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-2 text-muted-foreground line-clamp-2">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {new Date(post.publishDate).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />5 min read
                    </span>
                  </div>
                </div>

                {/* Right side - Arrow */}
                <div className="flex items-center self-center md:ml-8">
                  <span className="flex size-12 items-center justify-center rounded-full border border-border/50 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}

          {/* Bottom border */}
          <div className="border-t border-border/40" />
        </div>

        {/* Back to home */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
