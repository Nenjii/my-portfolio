import Link from "next/link";
import ProjectList from "./components/projectlist";
import AboutContact from "./components/aboutcontact";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-[#ededed]">
      {/* FIXED NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="status-dot"></div>
            <span className="font-bold text-sm tracking-wide">NINO DUQUE</span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="#home" className="nav-link">Home</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#work" className="nav-link">Projects</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="section-full relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div>
            <p className="section-label">Web Developer / System Administrator</p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Hi, I&apos;m <span className="gradient-text">Nino</span>
            </h1>
            <p className="text-lg md:text-xl text-[#888] max-w-lg mb-8 leading-relaxed">
              Dynamic developer and system administrator with a passion for creating
              robust digital systems and clean, efficient code. Based in the Philippines.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#work" className="btn-primary">
                View Projects
                <span>→</span>
              </Link>
              <Link href="#contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right side - Terminal card */}
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="ml-4 text-xs text-[#666]">~/information</span>
            </div>
            <div className="terminal-body">
              <p><span className="terminal-prompt">$</span> cat profile.json</p>
              <div className="mt-4 text-[#888]">
                <p>{`{`}</p>
                <p className="ml-4">&quot;name&quot;: <span className="text-[#00ff88]">&quot;Nino Duque&quot;</span>,</p>
                <p className="ml-4">&quot;location&quot;: <span className="text-[#00ff88]">&quot;Philippines&quot;</span>,</p>
                <p className="ml-4">&quot;focus&quot;: <span className="text-[#00ff88]">&quot;System Admin & Web Dev&quot;</span>,</p>
                <p className="ml-4">&quot;status&quot;: <span className="text-[#00ff88]">&quot;Available for work&quot;</span></p>
                <p>{`}`}</p>
              </div>
              <p className="mt-4"><span className="terminal-prompt">$</span> <span className="animate-pulse">_</span></p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#666] mb-3 font-mono">~/TECH STACK</p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind", "VB.NET", "Docker", "Linux", "MySQL"].map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="text-xs">Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <AboutContact />

      {/* PROJECTS SECTION */}
      <ProjectList />

      {/* FOOTER */}
      <footer className="border-t border-[#2a2a2a] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#666]">© 2025 Nino Duque. All rights reserved.</p>
          <p className="text-sm text-[#666]">Caffeine Driven Developer ☕</p>
        </div>
      </footer>
    </main>
  );
}