"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Calendar, Share2, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  author: string;
  content: string;
  tags: string[];
}

// Helper to estimate read time from content
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Simple markdown-like parser for rich text
function parseContent(content: string): React.ReactNode {
  if (!content) return null;

  // Split by paragraphs
  const paragraphs = content.split(/\n\n+/);

  return paragraphs.map((paragraph, index) => {
    // Check for headings
    if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-12 mb-6 text-3xl font-black tracking-tight text-[#111111] dark:text-[#F3F3F3]">
          {paragraph.replace("## ", "")}
        </h2>
      );
    }
    if (paragraph.startsWith("### ")) {
      return (
        <h3 key={index} className="mt-8 mb-4 text-2xl font-bold text-[#111111] dark:text-[#F3F3F3]">
          {paragraph.replace("### ", "")}
        </h3>
      );
    }

    // Check for blockquotes
    if (paragraph.startsWith("> ")) {
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-8 py-4 bg-blue-500/5 rounded-r-lg italic text-lg text-[#666666] dark:text-[#999999]">
          {paragraph.replace("> ", "")}
        </blockquote>
      );
    }

    // Check for ordered lists
    if (/^\d+\.\s/.test(paragraph)) {
      const items = paragraph.split(/\n/).filter(item => item.trim());
      return (
        <ol key={index} className="list-decimal list-inside space-y-3 my-6 ml-4">
          {items.map((item, i) => (
            <li key={i} className="text-lg leading-relaxed text-[#666666] dark:text-[#D1D5DB]">
              {item.replace(/^\d+\.\s/, "")}
            </li>
          ))}
        </ol>
      );
    }

    // Check for unordered lists
    if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
      const items = paragraph.split(/\n/).filter(item => item.trim());
      return (
        <ul key={index} className="list-disc list-inside space-y-3 my-6 ml-4">
          {items.map((item, i) => (
            <li key={i} className="text-lg leading-relaxed text-[#666666] dark:text-[#D1D5DB]">
              {item.replace(/^[-*]\s/, "")}
            </li>
          ))}
        </ul>
      );
    }

    // Check for code blocks
    if (paragraph.startsWith("```")) {
      const code = paragraph.replace(/```\w*\n?/, "").replace(/```$/, "");
      return (
        <pre key={index} className="bg-[#e5e7eb] dark:bg-[#1F2937] p-6 rounded-lg overflow-x-auto my-6">
          <code className="text-sm text-[#111111] dark:text-[#F3F3F3] font-mono">{code}</code>
        </pre>
      );
    }

    // Regular paragraph with inline formatting
    let formattedText = paragraph;
    
    // Bold text **text**
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111111] dark:text-[#F3F3F3]">$1</strong>');
    
    // Italic text *text* or _text_
    formattedText = formattedText.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, '<em class="italic text-[#666666] dark:text-[#999999]">$1</em>');
    formattedText = formattedText.replace(/_(.*?)_/g, '<em class="italic text-[#666666] dark:text-[#999999]">$1</em>');
    
    // Inline code `code`
    formattedText = formattedText.replace(/`(.*?)`/g, '<code class="bg-[#e5e7eb] dark:bg-[#1F2937] px-2 py-1 rounded text-blue-600 dark:text-blue-400 font-mono text-sm">$1</code>');
    
    // Links [text](url)
    formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-500 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer">$1</a>');

    return (
      <p 
        key={index} 
        className="text-lg leading-relaxed text-[#666666] dark:text-[#D1D5DB] my-6"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  });
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { slug } = await params;
        
        // Use the posts service to fetch by slug
        const fetchedPost = await getPostBySlug(slug);
        
        if (!fetchedPost) {
          setNotFoundState(true);
          setLoading(false);
          return;
        }

        // Format the date
        let formattedDate = "";
        if (fetchedPost.publishedAt) {
          const date = new Date(fetchedPost.publishedAt);
          formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        }

        setPost({
          id: fetchedPost.id,
          slug: fetchedPost.slug,
          title: fetchedPost.title || "Untitled",
          date: formattedDate,
          readTime: estimateReadTime(fetchedPost.content || ""),
          category: fetchedPost.category || "General",
          excerpt: fetchedPost.excerpt || "",
          author: "Niño Duque",
          content: fetchedPost.content || "",
          tags: fetchedPost.tags || [],
        });
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFoundState(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (notFoundState) {
    notFound();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafafa] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#F3F3F3] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#666666] dark:text-[#999999]">
          <Loader2 size={24} className="animate-spin" />
          <span className="font-mono text-sm">Loading article...</span>
        </div>
      </main>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#F3F3F3] pt-32 pb-24">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-[#F3F3F3] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>
      </div>

      {/* Article Container */}
      <article className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="mb-16">
          {/* Category Badge */}
          <div className="inline-block mb-6">
            <span className="text-xs font-mono tracking-widest px-3 py-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-[#666666] dark:text-[#999999] mb-8 pb-8 border-b border-[#111111]/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
            <div className="text-[#999999] dark:text-[#666666]">by {post.author}</div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-[#666666] dark:text-[#999999] leading-relaxed italic">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="mb-16">
          {parseContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-16 pb-16 border-b border-[#111111]/10 dark:border-white/10">
            <p className="text-xs font-mono text-[#666666] tracking-widest mb-4">TAGS</p>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#999999] text-sm font-mono rounded-full hover:bg-[#e5e5e5] dark:hover:bg-white/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share & Author */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-[#666666] tracking-widest mb-2">WRITTEN BY</p>
            <p className="text-lg font-bold">{post.author}</p>
            <p className="text-sm text-[#666666] dark:text-[#999999]">Developer, System Administrator & IT Instructor</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-3 bg-[#f0f0f0] dark:bg-white/10 hover:bg-[#e5e5e5] dark:hover:bg-white/20 text-[#666666] dark:text-[#999999] rounded-lg transition-colors"
            onClick={handleShare}
          >
            {copied ? (
              <>
                <Check size={18} className="text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Share2 size={18} />
                Share
              </>
            )}
          </button>
        </div>
      </article>

      {/* Related Articles CTA */}
      <div className="max-w-3xl mx-auto px-6 mt-24 pt-16 border-t border-[#111111]/10 dark:border-white/10">
        <h2 className="text-2xl font-black mb-6">Ready to explore more?</h2>
        <Link
          href="/#blogs"
          className="inline-block px-8 py-4 bg-[#111111] dark:bg-[#111111] border border-[#111111]/20 dark:border-white/20 text-white font-black text-sm tracking-widest hover:bg-[#333333] dark:hover:bg-white/10 transition-all"
        >
          Back to All Articles →
        </Link>
      </div>
    </main>
  );
}
