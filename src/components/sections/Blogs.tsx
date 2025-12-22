"use client";

import { Clock, ArrowUpRight } from "lucide-react";

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
      date: "Oct 2025",
      readTime: "3 min",
      tags: ["ai", "linux", "automation"],
      link: "#",
    },
    {
      id: "02",
      title: "How I Built My Own Blogging Site with Sanity and Next",
      excerpt: "I've been posting on dev.to for a while, but my \"toxic dev trait\" kicked in and I thought: I can build my own blogging platform...",
      date: "Aug 2025",
      readTime: "4 min",
      tags: ["cms", "nextjs", "sanity"],
      link: "#",
    },
    {
      id: "03",
      title: "Why Web Development Is Still One of the Best Skills",
      excerpt: "Still choosing your major? Web development offers flexibility, freedom, and a future-proof career path that's worth considering...",
      date: "Jun 2025",
      readTime: "8 min",
      tags: ["career", "web dev"],
      link: "#",
    },
    {
      id: "04",
      title: "Automating OBS Streaming with JavaScript",
      excerpt: "At our workplace, we operate multiple mini PCs in a remote location — each with 2 monitors for OBS streaming. Setting them up manually was a nightmare...",
      date: "May 2025",
      readTime: "3 min",
      tags: ["javascript", "automation"],
      link: "#",
    },
    {
      id: "05",
      title: "Building an AI Exam Question Generator",
      excerpt: "You've probably heard of HuggingFace—a powerful platform for AI enthusiasts. I built an exam question generator using their models...",
      date: "Dec 2024",
      readTime: "3 min",
      tags: ["ai", "huggingface"],
      link: "#",
    },
    {
      id: "06",
      title: "Essential Web Resources for Front-End Design",
      excerpt: "Creating an eye-catching front end for a website often means diving into a variety of resources. Here are some essential tools...",
      date: "Nov 2024",
      readTime: "2 min",
      tags: ["resources", "frontend"],
      link: "#",
    },
  ];

  return (
    <section id="blogs" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10 bg-[#F3F3F3] dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(03) — WRITING</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              BLOGS &<br />ARTICLES
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-mono hover:underline underline-offset-4 text-[#111111] dark:text-[#F3F3F3]">
            View All <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Smart 3-Column Grid */}
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
                href={post.link}
                className={`group block bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/10 p-5 transition-all duration-300 hover:border-[#111111] dark:hover:border-white/30 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] ${spanClass}`}
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
                <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#999999] font-mono rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 md:hidden text-center">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-mono hover:underline underline-offset-4">
            View All Articles <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
