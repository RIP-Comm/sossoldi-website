import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BlogCard } from "@/components/ui/blog-card";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "./[slug]/_queries/get-post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const blogMessages = messages.blog as {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";
  const title = `Blog - ${blogMessages?.title || "Latest"} ${blogMessages?.titleHighlight || "Posts"} | Sossoldi`;
  const description =
    blogMessages?.subtitle ||
    "Financial tips, release notes, and technical deep-dives from the Sossoldi team.";

  return {
    title,
    description,
    keywords: [
      "finance blog",
      "personal finance tips",
      "wealth management",
      "investment advice",
      "financial transparency",
      locale === "it" ? "blog finanza" : undefined,
      locale === "it" ? "consigli finanziari" : undefined,
    ].filter(Boolean) as string[],
    alternates: {
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/blog`])),
      canonical: `${baseUrl}/${locale}/blog`,
    },
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_US",
      url: `${baseUrl}/${locale}/blog`,
      siteName: "Sossoldi",
      title,
      description,
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";

  // Structured data for blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sossoldi Blog",
    description: "Financial tips, release notes, and technical deep-dives from the Sossoldi team.",
    url: `${baseUrl}/${locale}/blog`,
    inLanguage: locale === "it" ? "it" : "en",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishDate,
      dateModified: post.lastModified || post.publishDate,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      image: post.featuredImage
        ? `${baseUrl}${post.featuredImage.startsWith("/") ? "" : "/"}${post.featuredImage}`
        : `${baseUrl}/logo.png`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            <BlogCard key={post.slug} post={post} index={index} locale={locale} maxTags={2} />
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
