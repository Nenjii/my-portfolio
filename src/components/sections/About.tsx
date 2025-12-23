"use client";

export default function About() {
  const experiences = [
    {
      id: "01",
      role: "Graphic Designer",
      company: "Freelance",
      period: "2019 — Present",
      description:
        "Creating posters and jerseys design using Photoshop, Illustrator, and Canva."
    },
    {
      id: "02",
      role: "Part-Time Instructor",
      company: "Cagayan State University",
      period: "2024 — Present",
      description:
        "Teaching major subjects including Ethical Hacking, Networks and Communications (Networking 1 & 2), Cybersecurity, System Administration and Maintenance, System Integration and Architecture, Advanced Web, VB.net, Information Assurance and Security, and Capstone Project 1."
    },
    {
      id: "03",
      role: "System Administrator",
      company: "Current Organization",
      period: "2024 — Present",
      description:
        "Managing server infrastructure, virtualization, and network security for enterprise systems."
    },
    {
      id: "04",
      role: "Web Developer",
      company: "Freelance",
      period: "2023 — Present",
      description:
        "Building modern web applications using Next.js, React, and various backend technologies."
    },
    {
      id: "05",
      role: "IT Intern",
      company: "Department of Agriculture - National Fisheries Research and Development Institute",
      period: "January 2024 — May 2024",
      description:
        "Performed networking management, developed a side web project for a procurement system, and engaged in computer system servicing."
    }
  ];

  // Smart grid: calculate span for last row items to fill the full width
  const getGridSpan = (index: number, total: number) => {
    const remainder = total % 3;
    const isLastRow = index >= total - remainder;
    
    if (remainder === 0 || !isLastRow) {
      return ""; // Normal single column
    }
    
    // Last row with odd items
    if (remainder === 1) {
      // 1 item in last row - span all 3 columns
      return "md:col-span-2 lg:col-span-3";
    } else if (remainder === 2) {
      // 2 items in last row - each spans 1.5 columns (so we use col-span-3/2 approach)
      // On lg: first item spans 2 cols, second spans 1 (or both span 1.5 via custom)
      // Simpler: both span 3 cols on lg grid of 6
      return "lg:col-span-1"; // Keep as is, but we'll use a 6-col grid for better math
    }
    
    return "";
  };

  // Better approach: use CSS grid with auto-fill
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
      // Two items: on lg, we want them to split the 3 columns
      // First gets 2 cols, second gets 1 col OR we do 1.5 each
      // Using a hack: first item col-span-2, second col-span-1 on lg (uneven but fills)
      // Better: both get roughly half - but CSS grid doesn't do .5
      // Solution: Use col-span-2 for first, col-span-1 for second at lg breakpoint
      // This creates 2/3 + 1/3 split, not ideal
      // Alternative: on last row with 2 items, make each col-span-1 but center them
      // Best UX: Make the grid container use a different layout for the last row
      return ""; // We'll handle this differently
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
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-8">EXPERIENCE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => {
              const total = experiences.length;
              const remainder = total % 3;
              const isLastRow = index >= total - remainder && remainder !== 0;
              
              // Calculate span for last row items
              let spanClass = "";
              if (isLastRow) {
                if (remainder === 1) {
                  // 1 item: span all 3 columns
                  spanClass = "md:col-span-2 lg:col-span-3";
                } else if (remainder === 2) {
                  // 2 items: on lg, each takes 1.5 cols (impossible), so first takes 2, second takes 1
                  // Or we can make them both span 1 and center - but that leaves gaps
                  // Best: first spans 2 cols on lg only
                  const posInLastRow = index - (total - remainder);
                  if (posInLastRow === 0) {
                    spanClass = "lg:col-span-2";
                  }
                }
              }
              
              return (
                <div
                  key={exp.id}
                  className={`p-6 border border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] hover:border-[#111111] dark:hover:border-white/30 transition-colors ${spanClass}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-[#666666] dark:text-[#999999]">({exp.id})</span>
                    <span className="text-xs font-mono text-[#666666] dark:text-[#999999]">{exp.period}</span>
                  </div>
                  <h3 className="text-lg font-black mb-1 tracking-tight text-[#111111] dark:text-[#F3F3F3]">{exp.role.toUpperCase()}</h3>
                  <p className="text-sm font-mono text-[#666666] dark:text-[#999999] mb-3">{exp.company}</p>
                  <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}