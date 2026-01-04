"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

// Basic slugifier to avoid undefined/blank slugs.
function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper to format ISO date string to readable date
function formatDate(isoString: string | null): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Helper to estimate read time from content
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);

        // Use the posts service to fetch latest published posts
        const posts = await getLatestPosts(6);
        
        const formattedPosts: BlogPost[] = posts.map((post, index) => ({
          id: String(index + 1).padStart(2, "0"),
          title: post.title || "Untitled",
          excerpt: post.excerpt || "",
          date: formatDate(post.publishedAt),
          readTime: estimateReadTime(post.excerpt || ""),
          slug: post.slug || toSlug(post.title || ""),
        }));

        setBlogPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10 transition-colors duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(03) — WRITING</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              BLOGS &<br />ARTICLES
            </h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-mono hover:underline underline-offset-4 text-[#111111] dark:text-[#F3F3F3]">
            View All <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner text="Loading articles..." />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-24">
            <p className="text-[#666666] dark:text-[#999999] font-mono text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-[#666666] dark:text-[#999999] font-mono text-sm mb-2">No articles published yet.</p>
            <p className="text-[#999999] dark:text-[#666666] font-mono text-xs">Check back soon!</p>
          </div>
        )}

        {/* Smart 3-Column Grid */}
        {!loading && !error && blogPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => {
            const total = blogPosts.length;
            const remainder = total % 3;
            const isLastRow = index >= total - remainder && remainder !== 0;
            
            // Calculate span for last row items
            let spanClass = "";
            if (isLastRow) {
              if (remainder === 1) {
                // 1 item: span all 3 columns
                spanClass = "md:col-span-2 lg:col-span-3";
              } else if (remainder === 2) {
                // 2 items: first spans 2 cols on lg, second spans 1
                const posInLastRow = index - (total - remainder);
                if (posInLastRow === 0) {
                  spanClass = "lg:col-span-2";
                }
              }
            }
            
            return (
              <a
                key={post.id}
                href={`https://thewalkingparadox.vercel.app/posts/${post.slug || ""}`}
                className={`group block bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/10 p-5 transition-all duration-300 hover:border-[#111111] dark:hover:border-white/30 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] ${spanClass}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Meta Row */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#666666] dark:text-[#999999]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:underline underline-offset-2 line-clamp-2 text-[#111111] dark:text-[#F3F3F3]">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </a>
            );
          })}
        </div>
        )}

        {/* Mobile View All Link */}
        <div className="mt-8 md:hidden text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-mono hover:underline underline-offset-4 text-[#111111] dark:text-[#F3F3F3]">
            View All Articles <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
