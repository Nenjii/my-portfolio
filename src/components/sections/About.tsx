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

  return (
    <section id="about" className="min-h-screen py-24 px-6 border-t border-[var(--border)]/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(02) — ABOUT</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            ABOUT
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - About text */}
          <div>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
              I am a multi-disciplinary developer focusing on robust system
              administration and clean code. My journey started with a passion for
              technology and has evolved into expertise across web development,
              server management, and cybersecurity.
            </p>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-12">
              When not online, I am active in the local sports community organizing
              tennis events and running marathons. I believe in continuous learning
              and staying updated with the latest technologies.
            </p>

            {/* Skills - Plain list */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-[var(--muted)] mb-3">FRONTEND</p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-[var(--muted)] mb-3">BACKEND</p>
                <div className="flex flex-wrap gap-2">
                  {["VB.NET", "Node.js", "MySQL", "PHP"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-[var(--muted)] mb-3">INFRASTRUCTURE</p>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Linux", "VMWare", "Windows Server"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Experience */}
          <div>
            <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-8">EXPERIENCE</p>
            <div className="space-y-0">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="py-8 border-b border-[var(--border)]/20 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-[var(--muted)] group-hover:translate-x-1 transition-transform">({exp.id})</span>
                    <span className="text-xs font-mono text-[var(--muted)]">{exp.period}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">{exp.role.toUpperCase()}</h3>
                  <p className="text-sm font-mono text-[var(--muted)] mb-4">{exp.company}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}