import { NextResponse } from "next/server";
import { getAllPosts } from "@/app/[locale]/blog/[slug]/_queries/get-post";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "3", 10);

    const allPosts = await getAllPosts();
    const recentPosts = allPosts.slice(0, limit).map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      publishDate: post.publishDate,
      featuredImage: post.featuredImage,
      tags: post.tags || [],
    }));

    return NextResponse.json(recentPosts);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

