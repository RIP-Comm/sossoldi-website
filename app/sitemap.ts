import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPostSlugs, getAllPosts } from "@/app/[locale]/blog/[slug]/_queries/get-post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";
  const currentDate = new Date().toISOString();

  // Get all blog posts with metadata
  const allPosts = await getAllPosts();
  const postsMap = new Map(allPosts.map((post) => [post.slug, post]));

  // Generate sitemap entries for each locale
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Home page for each locale
  for (const locale of routing.locales) {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });

    // Blog listing page for each locale
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/blog`])
        ),
      },
    });

    // Blog post pages for each locale
    for (const [slug, post] of postsMap.entries()) {
      const lastModified = post.lastModified
        ? new Date(post.lastModified).toISOString()
        : new Date(post.publishDate).toISOString();

      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return sitemapEntries;
}

