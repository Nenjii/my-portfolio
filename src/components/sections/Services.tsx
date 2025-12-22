"use client";

import { Code, Server, Palette, Shield, Database, Globe } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Services() {
  const services: Service[] = [
    {
      icon: <Globe size={28} />,
      title: "Web Development",
      description: "Building modern, responsive web applications using Next.js, React, and Tailwind CSS.",
    },
    {
      icon: <Server size={28} />,
      title: "System Administration",
      description: "Managing servers, virtualization, and network infrastructure for enterprise systems.",
    },
    {
      icon: <Shield size={28} />,
      title: "Cybersecurity",
      description: "Implementing security protocols, penetration testing, and vulnerability assessments.",
    },
    {
      icon: <Database size={28} />,
      title: "Database Management",
      description: "Designing and optimizing MySQL, PostgreSQL, and NoSQL database solutions.",
    },
    {
      icon: <Palette size={28} />,
      title: "Graphic Design",
      description: "Creating visual content including posters, jerseys, and brand identity materials.",
    },
    {
      icon: <Code size={28} />,
      title: "IT Education",
      description: "Teaching programming, networking, and cybersecurity courses at university level.",
    },
  ];

  return (
    <section id="services" className="py-24 px-6 border-t border-[#111111]/10 dark:border-white/10 bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="mb-16">
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">(05) — SERVICES</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
              WHAT I DO
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} animation="fade-up" delay={index * 100}>
              <div className="group p-6 bg-white dark:bg-[#111111] border border-[#111111]/10 dark:border-white/10 hover:border-[#111111] dark:hover:border-white/30 transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center mb-4 text-[#111111] dark:text-[#F3F3F3] group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-black mb-2 tracking-tight text-[#111111] dark:text-[#F3F3F3]">
                  {service.title.toUpperCase()}
                </h3>
                <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
