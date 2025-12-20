import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPost, getPostSlugs } from "./_queries/get-post";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

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
      <div className="mx-auto max-w-screen-md px-4 py-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <article>
          <header className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              {new Date(post.publishDate).toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

            {post.featuredImage && (
              <div className="relative mt-8 h-64 w-full md:h-[400px]">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="rounded-xl object-cover"
                  priority
                />
              </div>
            )}
          </header>

          <section className="prose prose-lg prose-li:mb-2 prose-ul:mt-4 hover:prose-a:text-primary hover:prose-a:decoration-primary prose-a:underline prose-p:mt-2 prose-p:mb-4 max-w-none dark:prose-invert prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-2 mt-12">
            <Content />
          </section>

          <footer className="mt-16">
            <div className="flex items-center gap-4 rounded-xl border bg-card p-6">
              {post.author.avatar && (
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                {post.author.bio && (
                  <p className="text-sm text-muted-foreground">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
