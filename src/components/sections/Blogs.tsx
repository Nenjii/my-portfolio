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
      title: "Choosing Your Major: Why Network Management Matters",
      excerpt: "A breakdown of IT specializations—Programming, Web Dev, and Business Intelligence—with a deep dive into why I chose Network Management & Security as the backbone of modern tech...",
      date: "Oct 2025",
      readTime: "3 min",
      tags: ["Programming", "Web Development", "Business Intelligence", "Network Management"],
      link: "#",
    },
    {
      id: "02",
      title: "Mastering Google Workspace & Gemini AI",
      excerpt: "A guide to maximizing productivity using Docs, Sheets, Slides, and Drive, featuring insights on how to integrate Gemini for smarter workflows...",
      date: "Aug 2025",
      readTime: "4 min",
      tags: ["Google Workspace", "Gemini AI", "Productivity"],
      link: "#",
    },
    {
      id: "03",
      title: "Cybersecurity Essentials & Cyber Hygiene",
      excerpt: "ey takeaways from my workshops on data privacy, protecting digital assets, and maintaining robust security practices in daily life...",
      date: "Jun 2025",
      readTime: "8 min",
      tags: ["Cybersecurity", "Cyber Hygiene"],
      link: "#",
    },
    {
      id: "04",
      title: "From Irregular Student to IT Instructor: An Unexpected Journey",
      excerpt: "I wasn't the top of my class. I started as an Engineering student, struggled, and shifted to IT. I navigated college as an \"irregular\" student and athlete during the pandemic. Yet, I found my calling. Here is how I went from a quiet student to being recommended for a teaching position immediately after graduation...",
      date: "May 2025",
      readTime: "3 min",
      tags: ["Education", "Career"],
      link: "#",
    },
    {
      id: "05",
      title: "Building My First Network Architecture",
      excerpt: "A retrospective on my Capstone Project: Implementing security and efficiency through Windows Server, RADIUS, and Network Access Control (NAC)...",
      date: "Dec 2024",
      readTime: "3 min",
      tags: ["Network Architecture", "Windows Server", "RADIUS", "NAC"],
      link: "#",
    },
    {
      id: "06",
      title: "I AM A WALKING PARADOX",
      excerpt: "Exploring the duality of my life—balancing the logic of code with the chaos of sports, and the solitude of development with the public nature of teaching...",
      date: "Nov 2024",
      readTime: "2 min",
      tags: ["Life", "Paradox"],
      link: "#",
    },
  ];

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
