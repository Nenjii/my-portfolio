"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, Briefcase, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { getAllExperiences, Experience } from "@/lib/experience";

// Format date range for display
function formatDateRange(startDate: string, endDate: string | null, isCurrent: boolean): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  
  if (isCurrent || !endDate) {
    return `${startStr} — Present`;
  }
  
  const end = new Date(endDate);
  const endStr = end.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${startStr} — ${endStr}`;
}

export default function About() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        const fetchedExperiences = await getAllExperiences();
        // Limit to 4 on homepage, ordered by startDate desc (already from service)
        setExperiences(fetchedExperiences.slice(0, 4));
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  // Smart grid: calculate span for last row items to fill the full width
  const getSmartGridClass = (index: number, total: number) => {
    const remainder = total % 3;
    const positionInLastRow = index - (total - remainder);
    
    if (remainder === 0) return "";
    if (index < total - remainder) return "";
    
    // Last row handling
    if (remainder === 1) {
      return "md:col-span-2 lg:col-span-3"; // Single item spans full width
    }
    if (remainder === 2) {
      if (positionInLastRow === 0) {
        return "lg:col-span-2";
      }
    }
    return "";
  };

  return (
    <section id="about" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10 transition-colors duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(01) — ABOUT</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
            ABOUT
          </h2>
        </div>

        {/* Content Grid - Top Row: Bio + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: About Me Bio */}
          <div>
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-6">BIO</p>
            <p className="text-lg text-[#111111] dark:text-[#F3F3F3]/80 leading-relaxed mb-6">
              I am a multi-disciplinary developer with a focus on robust system administration and "vibe coding." My journey began with a curiosity for technology and has evolved into deep expertise across Web Development, Server Management, and Cybersecurity.
            </p>
            <p className="text-lg text-[#111111] dark:text-[#F3F3F3]/80 leading-relaxed">
             When I'm not online, I am deeply active in the local sports community. I organize sports events (Badminton, Tennis, Volleyball) and train for marathons. I believe in the balance of continuous technical learning and maintaining a healthy, active lifestyle.
            </p>
          </div>

          {/* Right: Skills/Tech Stack */}
          <div>
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-6">TECH STACK</p>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-[#666666] dark:text-[#999999] mb-3">FRONTEND</p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-[#666666] dark:text-[#999999] mb-3">BACKEND</p>
                <div className="flex flex-wrap gap-2">
                  {["VB.NET", "Node.js", "MySQL", "PHP"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-[#666666] dark:text-[#999999] mb-3">INFRASTRUCTURE</p>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Linux", "VMWare", "Windows Server"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Experience - Smart 3-Column Grid */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest">EXPERIENCE</p>
            <Link 
              href="/experience"
              className="group flex items-center gap-2 text-sm font-mono text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors"
            >
              VIEW ALL
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#999999]" />
            </div>
          ) : error || experiences.length === 0 ? (
            <p className="text-center text-[#666666] dark:text-[#999999] py-12">
              {error || "No experience entries yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((exp, index) => {
                const spanClass = getSmartGridClass(index, experiences.length);
                
                return (
                  <div
                    key={exp.id}
                    className={`group p-6 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] hover:border-[#111111] dark:hover:border-white/30 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] ${spanClass}`}
                  >
                    {/* Header with date and current badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#666666] dark:text-[#999999]">
                        <Calendar size={12} />
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                      </div>
                      {exp.isCurrent && (
                        <span className="text-xs font-mono px-2 py-0.5 bg-green-500/20 text-green-500 rounded">
                          CURRENT
                        </span>
                      )}
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-lg font-black mb-1 tracking-tight text-[#111111] dark:text-[#F3F3F3] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {exp.position.toUpperCase()}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono text-[#666666] dark:text-[#999999] flex items-center gap-1">
                        <Briefcase size={12} />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="text-sm font-mono text-[#666666] dark:text-[#999999] flex items-center gap-1">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4 line-clamp-3">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#999999] font-mono rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 4 && (
                          <span className="text-xs px-2 py-0.5 text-[#666666] dark:text-[#999999] font-mono">
                            +{exp.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
