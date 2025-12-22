import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPost, getPostSlugs } from "./_queries/get-post";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Generate params for all locales and slugs
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const imageUrl = post.featuredImage
    ? `${baseUrl}${post.featuredImage.startsWith("/") ? "" : "/"}${post.featuredImage}`
    : `${baseUrl}/logo.png`;
  const postUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const publishDate = new Date(post.publishDate).toISOString();
  const modifiedDate = post.lastModified
    ? new Date(post.lastModified).toISOString()
    : publishDate;

  return {
    title,
    description,
    keywords: post.tags || [],
    authors: [{ name: post.author.name }],
    publishedTime: publishDate,
    modifiedTime: modifiedDate,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${slug}`])
      ),
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      locale: locale === "it" ? "it_IT" : "en_US",
      url: postUrl,
      siteName: "Sossoldi",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: publishDate,
      modifiedTime: modifiedDate,
      authors: [post.author.name],
      tags: post.tags || [],
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@sossoldi",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";
  const imageUrl = post.featuredImage
    ? `${baseUrl}${post.featuredImage.startsWith("/") ? "" : "/"}${post.featuredImage}`
    : `${baseUrl}/logo.png`;

  // Structured data for blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: post.lastModified
      ? new Date(post.lastModified).toISOString()
      : new Date(post.publishDate).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.bio,
      image: post.author.avatar
        ? `${baseUrl}${post.author.avatar.startsWith("/") ? "" : "/"}${post.author.avatar}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Sossoldi",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${slug}`,
    },
    keywords: post.tags?.join(", ") || "",
    inLanguage: locale === "it" ? "it" : "en",
    articleSection: "Finance",
    wordCount: post.excerpt.split(" ").length, // Approximate
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p>

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
            <span className="font-mono text-xs text-muted-foreground/50">•••</span>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          {/* Content */}
          <section className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-li:mb-2 prose-ul:mt-4 prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border/50 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
            <Content />
          </section>

          {/* Share section */}
          <div className="mt-16 flex items-center justify-center gap-4 border-t border-border/40 pt-8">
            <span className="text-sm text-muted-foreground">Share this article</span>
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
                  <p className="mt-1 text-sm text-muted-foreground">{post.author.bio}</p>
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
