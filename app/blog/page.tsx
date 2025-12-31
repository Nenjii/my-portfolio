"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/posts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
}

// Helper to format ISO date string to readable date
function formatDate(isoString: string | null): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
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

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);

        // Use the posts service to fetch all published posts
        const posts = await getAllPublishedPosts(20);
        
        const formattedPosts: BlogPost[] = posts.map((post) => ({
          id: post.id,
          title: post.title || "Untitled",
          excerpt: post.excerpt || "",
          date: formatDate(post.publishedAt),
          readTime: estimateReadTime(post.excerpt || ""),
          slug: post.slug,
          category: post.category || "General",
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
    <main className="min-h-screen bg-[#0A0A0A] text-[#F3F3F3] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#999999] hover:text-[#F3F3F3] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16">
          <p className="text-xs font-mono text-[#999999] tracking-widest mb-4">ALL ARTICLES</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            BLOGS &<br />ARTICLES
          </h1>
          <p className="mt-6 text-lg text-[#999999] max-w-2xl">
            Thoughts, tutorials, and insights about technology, development, networking, and life.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex items-center gap-3 text-[#999999]">
              <Loader2 size={24} className="animate-spin" />
              <span className="font-mono text-sm">Loading articles...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-24">
            <p className="text-[#999999] font-mono text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-[#999999] font-mono text-sm mb-2">No articles published yet.</p>
            <p className="text-[#666666] font-mono text-xs">Check back soon!</p>
          </div>
        )}

        {/* Articles List */}
        {!loading && !error && blogPosts.length > 0 && (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-[#111111] border border-white/10 p-6 md:p-8 transition-all duration-300 hover:border-white/30 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    {/* Category */}
                    <span className="text-xs font-mono text-blue-400 tracking-widest mb-2 block">
                      {post.category.toUpperCase()}
                    </span>
                    
                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:underline underline-offset-4 text-[#F3F3F3]">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[#999999] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 text-xs font-mono text-[#666666] md:text-right shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
