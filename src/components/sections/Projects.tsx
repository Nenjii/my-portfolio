"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  link: string;
  featured?: boolean;
  livePreview?: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "01",
      title: "Manoa Hawaii Ilokano",
      category: "Web Development",
      year: "2024",
      description:
        "Official website for the University of Hawaii at Mānoa's Ilokano Language and Literature Program. A comprehensive resource for Ilokano language learners and cultural preservation.",
      tags: ["Web Design", "Education", "Cultural Preservation"],
      link: "https://manoa.hawaii.edu/ilokano/",
      featured: true,
      livePreview: "https://manoa.hawaii.edu/ilokano/",
    },
    {
      id: "02",
      title: "VB.NET Learning Modules",
      category: "Education / Software",
      year: "2025",
      description:
        "Interactive educational modules for students focusing on MDI forms and code refactoring.",
      tags: ["VB.NET", "Education", "Windows Forms"],
      link: "#",
    },
    {
      id: "03",
      title: "Private Cloud Infrastructure",
      category: "System Admin / Docker",
      year: "2025",
      description:
        "Self-hosted Nextcloud instance running on virtualized hardware with automated backups.",
      tags: ["Docker", "Linux", "Nextcloud", "VM"],
      link: "#",
    },
    {
      id: "04",
      title: "Tennis Club Management",
      category: "Web / Organization",
      year: "2025",
      description:
        "SEC-registered platform for tournament scheduling and club membership management.",
      tags: ["Next.js", "React", "MySQL", "Tailwind"],
      link: "#",
    },
    {
      id: "05",
      title: "Network Security Framework",
      category: "Cybersecurity",
      year: "2024",
      description:
        "Comprehensive troubleshooting and security protocols for local government units.",
      tags: ["Security", "Networking", "Documentation"],
      link: "#",
    },
  ];

  // Calculate grid layout - last item spans 2 cols if odd number
  const getGridClass = (index: number, total: number) => {
    // Featured project always spans 2 cols and 2 rows
    if (projects[index].featured) return "md:col-span-2 md:row-span-2";
    // Last item spans 2 cols if odd number of remaining items (excluding featured)
    const nonFeaturedCount = projects.filter(p => !p.featured).length;
    const isLastNonFeatured = index === total - 1 && !projects[index].featured;
    if (isLastNonFeatured && nonFeaturedCount % 2 === 1) return "md:col-span-2";
    return "";
  };

  return (
    <section id="work" className="py-24 px-6 border-t border-[var(--border)]/20 bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(02) — WORK</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
            SELECTED<br />WORKS
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative bg-white dark:bg-[#111111] border border-[#111111] dark:border-white/20 p-6 flex flex-col transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] ${getGridClass(index, projects.length)}`}
            >
              {/* Featured Project with Browser Window Preview */}
              {project.featured && project.livePreview && (
                <div className="relative w-full h-48 md:h-72 mb-6 bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#111111]/10 dark:border-white/10 rounded-lg overflow-hidden">
                  {/* Browser Chrome */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#e5e5e5] dark:bg-[#2a2a2a] flex items-center gap-2 px-3 z-10 border-b border-[#111111]/10 dark:border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white dark:bg-[#1a1a1a] rounded-md px-3 py-1 text-[10px] font-mono text-[var(--muted)] truncate max-w-md">
                        {project.livePreview}
                      </div>
                    </div>
                  </div>
                  {/* Preview iframe */}
                  <div className="absolute inset-0 pt-8">
                    <iframe
                      src={project.livePreview}
                      className="w-full h-full border-0 pointer-events-none scale-[0.5] origin-top-left"
                      style={{ width: "200%", height: "200%" }}
                      title={`${project.title} preview`}
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-[#111111] text-white px-4 py-2 rounded-full flex items-center gap-2">
                      <ExternalLink size={14} />
                      VISIT LIVE SITE
                    </span>
                  </div>
                </div>
              )}

              {/* Project Number & Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[var(--muted)]">({project.id})</span>
                <span className="text-xs font-mono text-[var(--muted)] tracking-widest">
                  {project.category.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3 group-hover:underline underline-offset-4">
                {project.title.toUpperCase()}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#f0f0f0] dark:bg-white/10 text-[var(--muted)] font-mono rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#111111]/10 dark:border-white/10">
                <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                <span className="text-sm font-mono flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Project <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}