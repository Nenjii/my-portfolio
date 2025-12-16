import Link from "next/link";
import ProjectList from "./components/projectlist";
import About from "./components/about";
import Contact from "./components/contact";

export default function Home() {
  return (
    <main className="bg-[#F3F3F3] text-[#111111]">
      {/* SWISS STYLE FIXED NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F3F3F3]/90 backdrop-blur-sm border-b border-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-black tracking-tight">NINO DUQUE</span>
          <div className="flex items-center gap-8">
            <a href="#home" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">HOME</a>
            <a href="#about" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">ABOUT</a>
            <a href="#work" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">WORK</a>
            <a href="#contact" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Massive Typography */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-xs font-mono text-[#666] tracking-widest mb-6">(01) — INTRODUCTION</p>
          <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter mb-8">
            CREATIVE<br />DEVELOPER
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <p className="text-lg text-[#666] leading-relaxed max-w-md">
                System administrator and web developer crafting robust digital systems with clean, efficient code. Based in the Philippines.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#666]">[ROLE]</span>
                <span className="text-sm font-medium">System Admin / Web Developer</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#666]">[LOCATION]</span>
                <span className="text-sm font-medium">Philippines</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#666]">[STATUS]</span>
                <span className="text-sm font-medium">Available for Work</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 pt-8 border-t border-[#111111]">
            <p className="text-xs font-mono text-[#666] mb-4">TECH STACK</p>
            <div className="flex flex-wrap gap-3">
              {["Next.js", "React", "TypeScript", "Tailwind", "VB.NET", "Docker", "Linux", "MySQL"].map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <About />

      {/* PROJECTS SECTION */}
      <ProjectList />

      {/* CONTACT SECTION */}
      <Contact />

      {/* FOOTER */}
      <footer className="border-t border-[#111111] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono text-[#666]">© 2025 NINO DUQUE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">LINKEDIN</a>
            <a href="#" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">GITHUB</a>
            <a href="#" className="text-xs font-mono text-[#666] hover:text-[#111] transition-colors">EMAIL</a>
          </div>
        </div>
      </footer>
    </main>
  );
}