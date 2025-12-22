"use client";

import Image from "next/image";

const techStack = [
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Tailwind", logo: "/logos/tailwind.svg" },
  { name: "Node.js", logo: "/logos/nodejs.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
  { name: "Linux", logo: "/logos/linux.svg" },
  { name: "MySQL", logo: "/logos/mysql.svg" },
  { name: "VB.NET", logo: "/logos/vbnet.svg" },
];

export default function TechStackMarquee() {
  // Double the items for seamless loop
  const items = [...techStack, ...techStack];

  return (
    <div className="w-full overflow-hidden py-8">
      <p className="text-xs font-mono text-[#666666] dark:text-[#999999] mb-6 px-6 max-w-7xl mx-auto tracking-widest">
        TECH STACK
      </p>
      
      <div className="relative">
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F3F3F3] dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F3F3F3] dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee container */}
        <div className="flex animate-marquee">
          {items.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-8 py-4 mx-2 shrink-0 hover:opacity-70 transition-opacity"
            >
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  fill
                  className="object-contain dark:invert-0"
                  style={{ filter: tech.name === "Next.js" ? "var(--logo-filter, none)" : "none" }}
                />
              </div>
              <span className="text-sm font-medium text-[#111111] dark:text-[#F3F3F3] whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
