import { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generator for Next.js
 * 
 * This file automatically generates sitemap.xml at build time.
 * Vercel will serve this at: https://ninoduque.vercel.app/sitemap.xml
 * 
 * For dynamic routes (blog posts, projects), you can fetch from Firebase
 * and include them here for better SEO.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ninoduque.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // TODO: Optionally fetch dynamic blog/project slugs from Firebase
  // and add them to the sitemap for full SEO coverage
  // 
  // Example:
  // const posts = await getAllPublishedPosts();
  // const blogPages = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.6,
  // }));

  return [...staticPages];
}
