export default function ProjectList() {
  const projects = [
    {
      id: "01",
      title: "VB.NET Learning Modules",
      category: "Education / Software",
      year: "2025",
      description:
        "Interactive educational modules for students focusing on MDI forms and code refactoring.",
      tags: ["VB.NET", "Education", "Windows Forms"],
      link: "#",
    },
    {
      id: "02",
      title: "Private Cloud Infrastructure",
      category: "System Admin / Docker",
      year: "2025",
      description:
        "Self-hosted Nextcloud instance running on virtualized hardware with automated backups.",
      tags: ["Docker", "Linux", "Nextcloud", "VM"],
      link: "#",
    },
    {
      id: "03",
      title: "Tennis Club Management",
      category: "Web / Organization",
      year: "2025",
      description:
        "SEC-registered platform for tournament scheduling and club membership management.",
      tags: ["Next.js", "React", "MySQL", "Tailwind"],
      link: "#",
    },
    {
      id: "04",
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
    <section id="work" className="section-full bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto w-full">
        <p className="section-label">SELECTED WORK</p>
        <h2 className="text-4xl md:text-5xl font-black mb-12">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
            >
              {/* Project number */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-[#00ff88]">
                  {project.id}
                </span>
                <span className="text-xs text-[#666]">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#00ff88] transition-colors">
                {project.title}
              </h3>

              {/* Category */}
              <p className="text-sm text-[#666] font-mono mb-4">
                [{project.category}]
              </p>

              {/* Description */}
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#1a1a1a] rounded text-[#888]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View link */}
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View Project <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}