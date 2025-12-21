import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPost, getPostSlugs } from "./_queries/get-post";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const Content = post.content;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        {/* Back link */}
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-border/50 transition-colors group-hover:border-foreground/20 group-hover:bg-muted">
            <ArrowLeft className="size-4" />
          </span>
          <span>Back to blog</span>
        </Link>

        <article>
          {/* Header */}
          <header className="text-center">
            {/* Meta info */}
            <div className="mb-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {new Date(post.publishDate).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />5 min read
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Featured image */}
            {post.featuredImage && (
              <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/50">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Divider */}
          <div className="my-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-border/40" />
            <span className="font-mono text-xs text-muted-foreground/50">
              •••
            </span>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          {/* Content */}
          <section className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-li:mb-2 prose-ul:mt-4 prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border/50 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
            <Content />
          </section>

          {/* Share section */}
          <div className="mt-16 flex items-center justify-center gap-4 border-t border-border/40 pt-8">
            <span className="text-sm text-muted-foreground">
              Share this article
            </span>
            <button className="flex size-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted hover:text-foreground">
              <Share2 className="size-4" />
            </button>
          </div>

          {/* Author */}
          <footer className="mt-12">
            <div className="flex items-center gap-5 rounded-2xl border border-border/50 p-6 md:p-8">
              {post.author.avatar && (
                <div className="relative size-16 flex-shrink-0 md:size-20">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Written by
                </span>
                <h3 className="mt-1 text-lg font-semibold">{post.author.name}</h3>
                {post.author.bio && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
          </footer>
        </article>

        {/* More posts link */}
        <div className="mt-16 flex justify-center border-t border-border/40 pt-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            View all posts
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
