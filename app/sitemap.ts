import { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/projects";

/**
 * Dynamic Sitemap Generator for Next.js
 *
 * Generates sitemap.xml at build time, served at /sitemap.xml.
 * Includes the static pages plus a URL per published project
 * (/projects/[slug]). Project fetching is wrapped in try/catch so a
 * Firestore hiccup at build time degrades to the static pages instead of
 * failing the build.
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

  // Dynamic: one URL per published project detail page
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await getPublishedProjects();
    projectPages = projects
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.warn("sitemap: could not fetch projects, using static pages only:", error);
  }

  return [...staticPages, ...projectPages];
}
