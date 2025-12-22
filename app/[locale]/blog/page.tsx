import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BlogCard } from "@/components/ui/blog-card";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "./[slug]/_queries/get-post";

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
