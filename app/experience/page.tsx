"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getAllExperiences, Experience } from "@/lib/experience";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Format date range for display
function formatDateRange(startDate: string, endDate: string | null, isCurrent: boolean): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  
  if (isCurrent || !endDate) {
    return `${startStr} — Present`;
  }
  
  const end = new Date(endDate);
  const endStr = end.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return `${startStr} — ${endStr}`;
}

// Calculate duration
function calculateDuration(startDate: string, endDate: string | null, isCurrent: boolean): string {
  const start = new Date(startDate);
  const end = isCurrent || !endDate ? new Date() : new Date(endDate);
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} yr${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  }
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        const fetchedExperiences = await getAllExperiences();
        setExperiences(fetchedExperiences);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          BACK TO HOME
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">CAREER</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3] mb-6">
            WORK<br />EXPERIENCE
          </h1>
          <p className="text-lg text-[#666666] dark:text-[#999999] max-w-2xl">
            My professional journey through various roles in technology, education, and design.
          </p>
        </div>

        {/* Experience Timeline */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner text="Loading experience..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : experiences.length === 0 ? (
          <p className="text-center text-[#666666] dark:text-[#999999] py-12">
            No experiences found.
          </p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#111111]/10 dark:bg-white/10 transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#111111] dark:bg-white transform -translate-x-1/2 border-4 border-[#fafafa] dark:border-[#0A0A0A]">
                  {exp.isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                  )}
                </div>

                {/* Date column */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-8 md:pl-0`}>
                  <div className="flex items-center gap-2 text-sm font-mono text-[#666666] dark:text-[#999999] md:justify-end">
                    <Calendar size={14} className={index % 2 === 0 ? "md:order-last" : ""} />
                    {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                  </div>
                  <p className="text-xs font-mono text-[#999999] dark:text-[#666666] mt-1">
                    {calculateDuration(exp.startDate, exp.endDate, exp.isCurrent)}
                  </p>
                </div>

                {/* Content card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"} pl-8 md:pl-0`}>
                  <div className="group bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/10 p-6 hover:border-[#111111] dark:hover:border-white/30 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#111111] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    {/* Status badge */}
                    {exp.isCurrent && (
                      <span className="inline-block text-xs font-mono px-2 py-0.5 bg-green-500/20 text-green-500 rounded mb-3">
                        CURRENT POSITION
                      </span>
                    )}

                    {/* Role */}
                    <h3 className="text-xl font-black tracking-tight text-[#111111] dark:text-[#F3F3F3] mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {exp.position.toUpperCase()}
                    </h3>

                    {/* Company & Location */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-sm font-mono text-[#666666] dark:text-[#999999] flex items-center gap-1">
                        <Briefcase size={14} />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="text-sm font-mono text-[#666666] dark:text-[#999999] flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      )}
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-blue-500 hover:text-blue-400 flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          Website
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-mono text-[#666666] dark:text-[#999999] mb-2">KEY RESPONSIBILITIES</p>
                        <ul className="space-y-1">
                          {exp.responsibilities.slice(0, 4).map((resp, i) => (
                            <li key={i} className="text-sm text-[#666666] dark:text-[#999999] flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 bg-[#f0f0f0] dark:bg-white/10 text-[#666666] dark:text-[#999999] font-mono rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
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
