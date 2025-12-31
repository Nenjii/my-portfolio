"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ExternalLink, Github, Loader2, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getPublishedProjects, Project } from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const fetchedProjects = await getPublishedProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return ["All", ...Array.from(cats)];
  }, [projects]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;
    
    // Apply category filter
    if (activeFilter !== "All") {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies?.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [activeFilter, searchQuery, projects]);

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400";
      case "in-progress": return "bg-yellow-500/20 text-yellow-400";
      case "planned": return "bg-blue-500/20 text-blue-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          BACK TO HOME
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">ALL PROJECTS</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3] mb-6">
            MY WORKS
          </h1>
          <p className="text-lg text-[#666666] dark:text-[#999999] max-w-2xl">
            A collection of projects I've worked on, from web applications to infrastructure setups and everything in between.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/10 text-[#111111] dark:text-[#F3F3F3] placeholder-[#999999] font-mono text-sm focus:outline-none focus:border-[#111111] dark:focus:border-white/30 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-xs font-mono tracking-wider border transition-all duration-200 ${
                  activeFilter === category
                    ? "bg-[#111111] dark:bg-[#F3F3F3] text-white dark:text-[#0A0A0A] border-[#111111] dark:border-[#F3F3F3]"
                    : "bg-transparent text-[#111111] dark:text-[#F3F3F3] border-[#111111]/20 dark:border-white/20 hover:border-[#111111] dark:hover:border-white"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm font-mono text-[#666666] dark:text-[#999999] mb-6">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#999999]" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center text-[#666666] dark:text-[#999999] py-12">
            No projects found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/20 flex flex-col transition-all duration-300 hover:border-[#111111] dark:hover:border-white/40 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
              >
                {/* Cover Image */}
                {project.coverImage && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {project.featured && (
                      <span className="absolute top-3 left-3 text-xs font-mono px-2 py-1 bg-blue-500 text-white rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest">
                      {project.category?.toUpperCase() || "PROJECT"}
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${getStatusColor(project.status)}`}>
                      {project.status?.toUpperCase() || "COMPLETED"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black tracking-tight mb-3 text-[#111111] dark:text-[#F3F3F3]">
                    {project.title.toUpperCase()}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#999999] font-mono rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="text-xs px-2 py-0.5 text-[#666666] dark:text-[#999999] font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#111111]/10 dark:border-white/10">
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
                      className="text-sm font-mono flex items-center gap-1 text-[#111111] dark:text-[#F3F3F3] hover:gap-2 transition-all"
                    >
                      Details <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
