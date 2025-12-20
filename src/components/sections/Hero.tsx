import RoleTypewriter from "@/components/ui/RoleTypewriter";
import GradientText from "@/components/ui/GradientText";
import ProfileCard from "@/components/ui/ProfileCard";
import TechStackMarquee from "@/components/ui/TechStackMarquee";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center">
      <div className="px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main content grid with Profile Card - aligned from top */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left side - Typography and info */}
            <div className="lg:col-span-2 order-2 lg:order-1">
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
                    "IT INSTRUCTOR",
                  ]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  loop={true}
                  className="text-xl md:text-2xl font-mono text-[var(--muted)] tracking-widest"
                />
              </div>

              <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8">
                Hi! I am <GradientText>Niño</GradientText>
              </h1>

              <p className="text-lg text-[var(--muted)] leading-relaxed max-w-lg mb-8">
                System administrator and web developer crafting robust
                digital systems with clean, efficient code. Based in the
                Philippines.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#work"
                  className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-black text-sm tracking-widest text-center hover:opacity-80 transition-all"
                >
                  VIEW PROJECTS
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-transparent border border-[var(--foreground)] text-[var(--foreground)] font-black text-sm tracking-widest text-center hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>

            {/* Right side - Profile Card aligned with intro label */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <ProfileCard
                name="NIÑO DUQUE"
                systemId="SYS_ID // 2025"
                imageSrc="/profile.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee - Full width, seamless */}
      <div className="mt-16">
        <TechStackMarquee />
      </div>
    </section>
  );
}
