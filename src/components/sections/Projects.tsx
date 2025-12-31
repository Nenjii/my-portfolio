"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, ExternalLink, Loader2, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPublishedProjects, Project } from "@/lib/projects";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const fetchedProjects = await getPublishedProjects();
        console.log("Fetched projects:", fetchedProjects); // Debug log
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Extract unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => {
      if (p.category) {
        // Simplify category names for filtering
        if (p.category.toLowerCase().includes("web")) cats.add("Web");
        else if (p.category.toLowerCase().includes("education") || p.category.toLowerCase().includes("software")) cats.add("Education");
        else if (p.category.toLowerCase().includes("system") || p.category.toLowerCase().includes("docker") || p.category.toLowerCase().includes("devops")) cats.add("DevOps");
        else if (p.category.toLowerCase().includes("security") || p.category.toLowerCase().includes("cyber")) cats.add("Security");
        else if (p.category.toLowerCase().includes("mobile")) cats.add("Mobile");
        else cats.add(p.category);
      }
    });
    return ["All", ...Array.from(cats)];
  }, [projects]);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects.slice(0, 6); // Show max 6 on homepage
    return projects.filter(p => {
      const cat = p.category?.toLowerCase() || "";
      if (activeFilter === "Web" && cat.includes("web")) return true;
      if (activeFilter === "Education" && (cat.includes("education") || cat.includes("software"))) return true;
      if (activeFilter === "DevOps" && (cat.includes("system") || cat.includes("docker") || cat.includes("devops"))) return true;
      if (activeFilter === "Security" && (cat.includes("security") || cat.includes("cyber"))) return true;
      if (activeFilter === "Mobile" && cat.includes("mobile")) return true;
      return cat === activeFilter.toLowerCase();
    }).slice(0, 6);
  }, [activeFilter, projects]);

  // Calculate grid layout - featured projects get special treatment
  const getGridClass = (index: number, total: number, project: Project) => {
    if (project.featured) return "md:col-span-2 md:row-span-2";
    const nonFeaturedCount = filteredProjects.filter(p => !p.featured).length;
    const isLastNonFeatured = index === total - 1 && !project.featured;
    if (isLastNonFeatured && nonFeaturedCount % 2 === 1) return "md:col-span-2";
    return "";
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400";
      case "in-progress": return "bg-yellow-500/20 text-yellow-400";
      case "planned": return "bg-blue-500/20 text-blue-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <section id="work" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(02) — WORK</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              SELECTED<br />WORKS
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#999999]" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="work" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(02) — WORK</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              SELECTED<br />WORKS
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 mb-2">{error}</p>
            <p className="text-sm text-[#666666] dark:text-[#999999]">
              Check browser console for details. Make sure your Firebase config is correct.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="work" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(02) — WORK</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              SELECTED<br />WORKS
            </h2>
          </div>
          <p className="text-center text-[#666666] dark:text-[#999999] py-12">
            No published projects yet. Add projects in your Firebase &quot;projects&quot; collection with isPublished: true.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10 transition-colors duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(02) — WORK</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              SELECTED<br />WORKS
            </h2>
          </div>
          <Link 
            href="/projects"
            className="group flex items-center gap-2 text-sm font-mono text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors"
          >
            VIEW ALL PROJECTS
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-xs font-mono tracking-wider border transition-all duration-200 ${
                activeFilter === category
                  ? "bg-[#111111] dark:bg-[#F3F3F3] text-white dark:text-[#0A0A0A] border-[#111111] dark:border-[#F3F3F3]"
                  : "bg-transparent text-[#111111] dark:text-[#F3F3F3] border-[#111111]/20 dark:border-white/20 hover:border-[#111111] dark:hover:border-white"
              }`}
              aria-pressed={activeFilter === category}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/20 p-6 flex flex-col transition-all duration-300 hover:border-[#111111] dark:hover:border-white/40 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] ${getGridClass(index, filteredProjects.length, project)}`}
            >
              {/* Featured Project with Browser Window Preview */}
              {project.featured && project.liveUrl && (
                <div className="relative w-full h-48 md:h-72 mb-6 bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#111111]/10 dark:border-white/10 rounded-lg overflow-hidden">
                  {/* Browser Chrome */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#e5e5e5] dark:bg-[#2a2a2a] flex items-center gap-2 px-3 z-10 border-b border-[#111111]/10 dark:border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white dark:bg-[#1a1a1a] rounded-md px-3 py-1 text-[10px] font-mono text-[#666666] dark:text-[#999999] truncate max-w-md">
                        {project.liveUrl}
                      </div>
                    </div>
                  </div>
                  {/* Live Preview iframe - always show live site */}
                  <div className="absolute inset-0 pt-8">
                    <iframe
                      src={project.liveUrl}
                      className="w-full h-full border-0 pointer-events-none scale-[0.5] origin-top-left"
                      style={{ width: "200%", height: "200%" }}
                      title={`${project.title} preview`}
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/40 transition-colors flex items-center justify-center"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-[#111111] text-white px-4 py-2 rounded-full flex items-center gap-2">
                      <ExternalLink size={14} />
                      VISIT LIVE SITE
                    </span>
                  </a>
                </div>
              )}

              {/* Cover Image for non-featured projects */}
              {!project.featured && project.coverImage && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Project Category & Status */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest">
                  {project.category?.toUpperCase() || "PROJECT"}
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${getStatusColor(project.status)}`}>
                  {project.status?.toUpperCase() || "COMPLETED"}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3 text-[#111111] dark:text-[#F3F3F3]">
                {project.title.toUpperCase()}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies?.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#999999] font-mono rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies && project.technologies.length > 5 && (
                  <span className="text-xs px-2 py-1 text-[#666666] dark:text-[#999999] font-mono">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>

              {/* Action Links */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#111111]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono flex items-center gap-1 text-[#111111] dark:text-[#F3F3F3] hover:text-blue-500 transition-colors"
                    >
                      <ExternalLink size={14} />
                      LIVE
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono flex items-center gap-1 text-[#111111] dark:text-[#F3F3F3] hover:text-blue-500 transition-colors"
                    >
                      <Github size={14} />
                      CODE
                    </a>
                  )}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-mono flex items-center gap-1 group-hover:gap-2 transition-all text-[#111111] dark:text-[#F3F3F3]"
                >
                  Details <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
