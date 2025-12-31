"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Github, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, Project } from "@/lib/projects";

// Simple markdown-like parser for rich text
function parseContent(content: string): React.ReactNode {
  if (!content) return null;

  const paragraphs = content.split(/\n\n+/);

  return paragraphs.map((paragraph, index) => {
    if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-12 mb-6 text-3xl font-black tracking-tight text-[#F3F3F3]">
          {paragraph.replace("## ", "")}
        </h2>
      );
    }
    if (paragraph.startsWith("### ")) {
      return (
        <h3 key={index} className="mt-8 mb-4 text-2xl font-bold text-[#F3F3F3]">
          {paragraph.replace("### ", "")}
        </h3>
      );
    }
    if (paragraph.startsWith("> ")) {
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-8 py-4 bg-blue-500/5 rounded-r-lg italic text-lg text-[#999999]">
          {paragraph.replace("> ", "")}
        </blockquote>
      );
    }
    if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
      const items = paragraph.split(/\n/).filter(item => item.trim());
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-6 ml-4">
          {items.map((item, i) => (
            <li key={i} className="text-lg leading-relaxed text-[#D1D5DB]">
              {item.replace(/^[-*]\s/, "")}
            </li>
          ))}
        </ul>
      );
    }
    if (paragraph.startsWith("```")) {
      const code = paragraph.replace(/```\w*\n?/, "").replace(/```$/, "");
      return (
        <pre key={index} className="bg-[#1F2937] p-6 rounded-lg overflow-x-auto my-6">
          <code className="text-sm text-[#F3F3F3] font-mono">{code}</code>
        </pre>
      );
    }

    let formattedText = paragraph;
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#F3F3F3]">$1</strong>');
    formattedText = formattedText.replace(/`(.*?)`/g, '<code class="bg-[#1F2937] px-2 py-1 rounded text-blue-400 font-mono text-sm">$1</code>');
    formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 underline underline-offset-4 hover:text-blue-300" target="_blank" rel="noopener noreferrer">$1</a>');

    return (
      <p 
        key={index} 
        className="text-lg leading-relaxed text-[#D1D5DB] my-6"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  });
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { slug } = await params;
        const fetchedProject = await getProjectBySlug(slug);
        
        if (!fetchedProject) {
          setNotFound(true);
        } else {
          setProject(fetchedProject);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#999999]" />
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#F3F3F3] mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-400 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

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
      {/* Hero Section */}
      <div className="relative">
        {project.coverImage && (
          <div className="absolute inset-0 h-[50vh]">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#999999] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            BACK TO PROJECTS
          </Link>

          <div className={project.coverImage ? "pt-[30vh]" : ""}>
            {/* Category & Status */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-[#999999] tracking-widest">
                {project.category?.toUpperCase()}
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${getStatusColor(project.status)}`}>
                {project.status?.toUpperCase()}
              </span>
              {project.featured && (
                <span className="text-xs font-mono px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                  FEATURED
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3] mb-6">
              {project.title.toUpperCase()}
            </h1>

            {/* Short Description */}
            <p className="text-xl text-[#666666] dark:text-[#999999] leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#0A0A0A] font-mono text-sm hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={16} />
                  VIEW LIVE SITE
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#111111]/20 dark:border-white/20 text-[#111111] dark:text-[#F3F3F3] font-mono text-sm hover:border-[#111111] dark:hover:border-white transition-colors"
                >
                  <Github size={16} />
                  VIEW CODE
                </a>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm font-mono text-[#666666] dark:text-[#999999]">
              {project.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(project.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  {project.endDate && ` — ${new Date(project.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">TECHNOLOGIES</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#F3F3F3] font-mono text-sm rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-6">ABOUT THIS PROJECT</h2>
            {parseContent(project.longDescription)}
          </div>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-6">GALLERY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
