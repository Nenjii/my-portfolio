import RoleTypewriter from "@/components/ui/RoleTypewriter";
import GradientText from "@/components/ui/GradientText";
import ProfileCard from "@/components/ui/ProfileCard";
import TechStackMarquee from "@/components/ui/TechStackMarquee";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center">
      <div className="px-6">
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
                "IT INSTRUCTOR",
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
              loop={true}
              className="text-xl md:text-2xl font-mono text-[var(--muted)] tracking-widest"
            />
          </div>

          {/* Main content grid with Profile Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left side - Typography and info */}
            <div className="lg:col-span-2">
              <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8">
                Hi! I am <GradientText>Niño</GradientText>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg text-[var(--muted)] leading-relaxed max-w-md">
                    System administrator and web developer crafting robust
                    digital systems with clean, efficient code. Based in the
                    Philippines.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[var(--muted)]">
                      [ROLE]
                    </span>
                    <span className="text-sm font-medium">
                      System Admin / Web Developer
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[var(--muted)]">
                      [LOCATION]
                    </span>
                    <span className="text-sm font-medium">
                      Tuguegarao, Cagayan
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[var(--muted)]">
                      [STATUS]
                    </span>
                    <span className="text-sm font-medium">
                      Available for Work
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Profile Card */}
            <div className="flex justify-center lg:justify-end">
              <ProfileCard
                name="Niño Duque"
                role="Creative Developer"
                imageSrc="/profile.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee - Full width */}
      <div className="mt-16">
        <TechStackMarquee />
      </div>
    </section>
  );
}
