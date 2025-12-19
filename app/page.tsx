import ProjectList from "./components/projectlist";
import About from "./components/about";
import Contact from "./components/contact";
import StatusHeader from "./components/StatusHeader";
import RoleTypewriter from "./components/RoleTypewriter";
import GradientText from "./components/GradientText";
import NavigationDock from "./components/NavigationDock";

export default function Home() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* STATUS HEADER - Separate component for easy modification */}
      <StatusHeader
        statuses={["Brewing Coffee ☕", "Accepting Projects 🚀", "Available for Work ✨"]}
        showTime={true}
        timezone="Asia/Manila"
        timezoneLabel="UTC+8"
      />

      {/* DOCK NAVIGATION - Icon-only floating dock */}
      <NavigationDock />

      {/* HERO SECTION - Massive Typography */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-6">
            (01) — INTRODUCTION
          </p>
          
          {/* Role Typewriter - Cycles through roles */}
          <div className="mb-4">
            <RoleTypewriter
              roles={[
                "CREATIVE DEVELOPER",
                "GRAPHIC DESIGNER",
                "NETWORK ADMINISTRATOR",
                "SPORT ENTHUSIAST",
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
              loop={true}
              className="text-xl md:text-2xl font-mono text-[var(--muted)] tracking-widest"
            />
          </div>

          <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter mb-8">
            Hi! I am <GradientText>Niño</GradientText>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-[var(--muted)] leading-relaxed max-w-md">
                System administrator and web developer crafting robust digital systems with clean, efficient code. Based in the Philippines.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[var(--muted)]">[ROLE]</span>
                <span className="text-sm font-medium">System Admin / Web Developer</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[var(--muted)]">[LOCATION]</span>
                <span className="text-sm font-medium">Philippines</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[var(--muted)]">[STATUS]</span>
                <span className="text-sm font-medium">Available for Work</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 pt-8 border-t border-[var(--border)]/20">
            <p className="text-xs font-mono text-[var(--muted)] mb-4">TECH STACK</p>
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
      <footer className="border-t border-[var(--border)]/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono text-[var(--muted)]">© 2025 NINO DUQUE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">LINKEDIN</a>
            <a href="#" className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">GITHUB</a>
            <a href="#" className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">EMAIL</a>
          </div>
        </div>
      </footer>
    </main>
  );
}