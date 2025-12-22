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

  return (
    <section id="work" className="min-h-screen py-24 px-6 border-t border-[var(--border)]/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(02) — WORK</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            SELECTED<br />WORKS
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative bg-[var(--background)] border border-[var(--foreground)] p-6 flex flex-col transition-all duration-300 hover:shadow-[4px_4px_0px_0px_var(--foreground)] ${
                project.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Featured Project with Live Preview */}
              {project.featured && project.livePreview && (
                <div className="relative w-full h-48 md:h-64 mb-6 bg-[var(--foreground)]/5 border border-[var(--border)]/20 rounded-sm overflow-hidden">
                  {/* Browser chrome */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-[var(--foreground)]/10 flex items-center gap-1.5 px-3 z-10">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="ml-2 text-[10px] font-mono text-[var(--muted)] truncate">
                      {project.livePreview}
                    </span>
                  </div>
                  {/* Preview iframe */}
                  <div className="absolute inset-0 pt-6">
                    <iframe
                      src={project.livePreview}
                      className="w-full h-full border-0 pointer-events-none scale-[0.5] origin-top-left"
                      style={{ width: "200%", height: "200%" }}
                      title={`${project.title} preview`}
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--foreground)]/0 group-hover:bg-[var(--foreground)]/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-[var(--foreground)] text-[var(--background)] px-3 py-1.5 flex items-center gap-2">
                      <ExternalLink size={14} />
                      VISIT LIVE SITE
                    </span>
                  </div>
                </div>
              )}

              {/* Project Number */}
              <span className="text-xs font-mono text-[var(--muted)] mb-3">({project.id})</span>

              {/* Category */}
              <span className="text-xs font-mono text-[var(--muted)] tracking-widest mb-2">
                [{project.category.toUpperCase()}]
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3 group-hover:underline">
                {project.title.toUpperCase()}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[var(--foreground)]/5 text-[var(--muted)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]/20">
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