import { promises as fs } from "fs";
import { MDXContent } from "mdx/types";
import path from "path";

type Author = {
  name: string;
  bio: string;
  avatar: string;
};

type SEO = {
  metaTitle: string;
  metaDescription: string;
};

export type PostMetadata = {
  title: string;
  featuredImage?: string;
  publishDate: string;
  lastModified?: string;
  author: Author;
  excerpt: string;
  tags: string[];
  seo: SEO;
};

export type Post = PostMetadata & {
  slug: string;
  content: MDXContent;
};

export async function getPostSlugs() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const files = await fs.readdir(postsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await import(`@/content/blog/${slug}.mdx`);

    return {
      slug,
      ...post.metadata,
      content: post.default,
    } as Post;
  } catch (error) {
    console.error("Error loading blog post:", error);
    return null;
  }
}
