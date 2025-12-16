export default function AboutContact() {
  const experiences = [
    {
      id: "01",
      role: "System Administrator",
      company: "Current Organization",
      period: "2024 - Present",
      description:
        "Managing server infrastructure, virtualization, and network security for enterprise systems.",
    },
    {
      id: "02",
      role: "Web Developer",
      company: "Freelance",
      period: "2023 - Present",
      description:
        "Building modern web applications using Next.js, React, and various backend technologies.",
    },
  ];

  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" className="section-full bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - About text */}
          <div>
            <p className="section-label">ABOUT ME</p>
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Coffee Driven<br />
              <span className="text-[#666]">Developer</span>
            </h2>
            <div className="space-y-6 text-[#888] leading-relaxed">
              <p>
                I am a multi-disciplinary developer focusing on robust system
                administration and clean code. My journey started with a passion for
                technology and has evolved into expertise across web development,
                server management, and cybersecurity.
              </p>
              <p>
                When not online, I am active in the local sports community organizing
                tennis events and running marathons. I believe in continuous learning
                and staying updated with the latest technologies.
              </p>
            </div>

            {/* Skills Terminal */}
            <div className="terminal-card mt-8">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="ml-4 text-xs text-[#666]">~/skills</span>
              </div>
              <div className="terminal-body">
                <p className="mb-2">
                  <span className="terminal-prompt">$~/FRONTEND</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
                <p className="mb-2">
                  <span className="terminal-prompt">$~/BACKEND</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["VB.NET", "Node.js", "MySQL", "PHP"].map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
                <p className="mb-2">
                  <span className="terminal-prompt">$~/INFRASTRUCTURE</span>
                </p>
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
            <p className="section-label">WORK EXPERIENCE</p>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#00ff88] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-[#00ff88]">{exp.id}</span>
                    <span className="text-xs text-[#666]">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-sm text-[#00ff88] mb-3">{exp.company}</p>
                  <p className="text-sm text-[#888] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-full bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <div>
            <p className="section-label">GET IN TOUCH</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Let&apos;s Work<br />
              <span className="gradient-text">Together</span>
            </h2>
            <p className="text-[#888] leading-relaxed mb-8 max-w-md">
              Got an idea or project you need help with? I&apos;m available for
              commissions and ready to dive in. Let&apos;s create something amazing.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:oninpoh@gmail.com"
                className="flex items-center gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#00ff88] transition-colors group"
              >
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Email</p>
                  <p className="font-medium group-hover:text-[#00ff88] transition-colors">
                    oninpoh@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#00ff88] transition-colors group"
              >
                <span className="text-2xl">💻</span>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">GitHub</p>
                  <p className="font-medium group-hover:text-[#00ff88] transition-colors">
                    github.com/ninoduque
                  </p>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#00ff88] transition-colors group"
              >
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">LinkedIn</p>
                  <p className="font-medium group-hover:text-[#00ff88] transition-colors">
                    linkedin.com/in/ninoduque
                  </p>
                </div>
              </a>
            </div>

            <div className="flex gap-4">
              <a href="mailto:oninpoh@gmail.com" className="btn-primary">
                Send Email
                <span>→</span>
              </a>
              <a href="#" className="btn-outline">
                Get Resume
              </a>
            </div>
          </div>

          {/* Right side - Availability card */}
          <div>
            <div className="terminal-card h-full">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="ml-4 text-xs text-[#666]">~/availability</span>
              </div>
              <div className="terminal-body h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="status-dot"></div>
                  <span className="text-[#00ff88] font-medium">
                    Currently Available for Projects
                  </span>
                </div>

                <p className="text-[#888] mb-6 leading-relaxed">
                  I&apos;m always happy to hear from fellow devs, founders, or curious
                  minds. But to make your message count, please keep the following in
                  mind:
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-[#00ff88] font-mono">01</span>
                    <div>
                      <p className="font-medium mb-1">Freelance & project inquiries</p>
                      <p className="text-sm text-[#666]">
                        Be specific about the scope, timeline, and your goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#00ff88] font-mono">02</span>
                    <div>
                      <p className="font-medium mb-1">Collaboration ideas</p>
                      <p className="text-sm text-[#666]">
                        I&apos;m open to meaningful, well-structured collabs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#00ff88] font-mono">03</span>
                    <div>
                      <p className="font-medium mb-1">Response time</p>
                      <p className="text-sm text-[#666]">
                        I usually reply within 1–2 business days.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[#888] italic">
                  Looking forward to connecting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}