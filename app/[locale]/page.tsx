import { setRequestLocale, getMessages } from "next-intl/server";
import { getAllPosts } from "@/app/[locale]/blog/[slug]/_queries/get-post";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BlogPreview } from "@/components/sections/blog-preview";
import { DiscordCTA } from "@/components/sections/discord-cta";
import { FAQ } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";

  // Fetch recent blog posts server-side for SEO
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    publishDate: post.publishDate,
    featuredImage: post.featuredImage,
    tags: post.tags || [],
  }));

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sossoldi",
    applicationCategory: "FinanceApplication",
    operatingSystem: ["iOS", "Android"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: metadata?.description || "Personal finance made transparent",
    url: `${baseUrl}/${locale}`,
    sameAs: [
      "https://github.com/RIP-Comm/sossoldi",
      // Add other social media URLs when available
    ],
    author: {
      "@type": "Organization",
      name: "Sossoldi Team",
    },
    inLanguage: locale === "it" ? "it" : "en",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BlogPreview posts={recentPosts} locale={locale} />
        <DiscordCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
