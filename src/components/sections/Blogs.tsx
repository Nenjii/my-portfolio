"use client";

import { Clock, Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
}

export default function Blogs() {
  const blogPosts: BlogPost[] = [
    {
      id: "01",
      title: "Self-hosting n8n on my \"Home Server\"",
      excerpt: "Since AI automation is the trend these days, I started exploring different tools — but wow, they're expensive! So I decided to self-host n8n on my home server...",
      date: "October 17, 2025",
      readTime: "3 mins read",
      tags: ["ai", "linux", "automation", "n8n"],
      link: "#",
    },
    {
      id: "02",
      title: "How I Built My Own Blogging Site with Sanity and Next",
      excerpt: "I've been posting on dev.to for a while, but my \"toxic dev trait\" kicked in and I thought: I can build my own blogging platform...",
      date: "August 28, 2025",
      readTime: "4 mins read",
      tags: ["cms", "nextjs", "learning", "web development", "sanity"],
      link: "#",
    },
    {
      id: "03",
      title: "Why Web Development Is Still One of the Best Skills You Can Learn Today",
      excerpt: "Still choosing your major? Web development offers flexibility, freedom, and a future-proof career path that's worth considering...",
      date: "June 23, 2025",
      readTime: "8 mins read",
      tags: ["web development", "programming", "learning", "developers"],
      link: "#",
    },
    {
      id: "04",
      title: "How I Automated OBS Streaming with JavaScript (And Saved Our Office Hours of Setup Time)",
      excerpt: "At our workplace, we operate multiple mini PCs in a remote location — each with 2 monitors for OBS streaming. Setting them up manually was a nightmare...",
      date: "May 4, 2025",
      readTime: "3 mins read",
      tags: ["javascript", "python", "automation", "productivity", "websockets"],
      link: "#",
    },
    {
      id: "05",
      title: "Exploring HuggingFace and Building an AI Exam Question Generator",
      excerpt: "You've probably heard of HuggingFace—a powerful platform for AI enthusiasts and developers. I built an exam question generator using their models...",
      date: "December 24, 2024",
      readTime: "3 mins read",
      tags: ["web", "ai", "huggingface", "python"],
      link: "#",
    },
    {
      id: "06",
      title: "Essential Web Resources for Stunning Front-End Design",
      excerpt: "Creating an eye-catching front end for a website often means diving into a variety of resources. Here are some essential tools and libraries...",
      date: "November 11, 2024",
      readTime: "2 mins read",
      tags: ["web development", "react", "web components", "web resources", "programming"],
      link: "#",
    },
  ];

  return (
    <section id="blogs" className="min-h-screen py-24 px-6 border-t border-[var(--border)]/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(03) — WRITING</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              PUBLISHED BLOGS
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--muted)] tracking-widest">
            FEATURED ARTICLES
          </span>
        </div>

        {/* Blog List */}
        <div className="space-y-0">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className="group block py-8 border-b border-[var(--border)]/20 hover:bg-[var(--foreground)]/5 transition-colors -mx-4 px-4"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Post Number */}
                <span className="text-xs font-mono text-[var(--muted)] shrink-0">
                  {post.id}
                </span>

                {/* Main Content */}
                <div className="flex-grow">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 group-hover:underline">
                    {post.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 text-xs font-mono text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 max-w-2xl">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-[var(--foreground)]/5 text-[var(--muted)] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-1 text-sm font-mono shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
