export default function ProjectList() {
  const projects = [
    {
      id: "01",
      title: "VB.NET Learning Modules",
      category: "Education / Software",
      year: "2025",
      description: "Interactive educational modules for students focusing on MDI forms and code refactoring."
    },
    {
      id: "02",
      title: "Private Cloud Infrastructure",
      category: "System Admin / Docker",
      year: "2025",
      description: "Self-hosted Nextcloud instance running on virtualized hardware with automated backups."
    },
    {
      id: "03",
      title: "Tennis Club Management",
      category: "Web / Organization",
      year: "2025",
      description: "SEC-registered platform for tournament scheduling and club membership management."
    },
    {
      id: "04",
      title: "Network Security Framework",
      category: "Cybersecurity",
      year: "2024",
      description: "Comprehensive troubleshooting and security protocols for local government units."
    }
  ];

  return (
    <section id="work" className="py-20 border-t border-black/10">
      <h2 className="text-4xl md:text-6xl font-black uppercase mb-12">Selected Works</h2>
      
      <div className="flex flex-col">
        {projects.map((project) => (
          <div key={project.id} className="group border-t border-black/10 py-8 hover:bg-white hover:pl-4 transition-all duration-300 cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              {/* ID */}
              <div className="md:col-span-1 text-xs font-bold text-gray-400">
                ({project.id})
              </div>
              
              {/* TITLE */}
              <div className="md:col-span-5 text-2xl md:text-4xl font-bold uppercase group-hover:text-gray-600 transition-colors">
                {project.title}
              </div>

              {/* CATEGORY */}
              <div className="md:col-span-3 text-sm font-mono uppercase tracking-wider text-gray-500">
                [{project.category}]
              </div>

              {/* YEAR */}
              <div className="md:col-span-3 text-right text-sm font-bold">
                {project.year}
              </div>
            </div>
            
            {/* HIDDEN DESCRIPTION (Reveals on hover if you want, or just sits below) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300">
               <div className="md:col-start-2 md:col-span-5 text-gray-600">
                 {project.description}
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}