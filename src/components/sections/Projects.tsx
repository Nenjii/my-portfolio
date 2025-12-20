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
    <section id="work" className="min-h-screen py-24 px-6 border-t border-[var(--border)]/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(03) — WORK</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            SELECTED<br />WORKS
          </h2>
        </div>

        {/* Project List */}
        <div className="border-t border-[var(--border)]/20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="py-12 border-b border-[var(--border)]/20 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                {/* Project number */}
                <span className="col-span-2 md:col-span-1 text-sm font-mono text-[var(--muted)] group-hover:translate-x-2 transition-transform">
                  ({project.id})
                </span>

                {/* Main content */}
                <div className="col-span-10 md:col-span-7">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black mb-3 group-hover:underline transition-colors tracking-tight">
                    {project.title.toUpperCase()}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 border border-[var(--border)]/30 text-[var(--muted)] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="col-span-12 md:col-span-4 flex md:flex-col md:items-end gap-4 mt-4 md:mt-0">
                  <span className="text-xs font-mono text-[var(--muted)]">
                    [{project.category.toUpperCase()}]
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                  <a
                    href={project.link}
                    className="text-sm font-mono text-[var(--foreground)] border border-[var(--border)] px-3 py-1 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all opacity-0 group-hover:opacity-100"
                  >
                    VIEW →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}