import RoleTypewriter from "@/components/ui/RoleTypewriter";
import GradientText from "@/components/ui/GradientText";
import ProfileCard from "@/components/ui/ProfileCard";
import TechStackMarquee from "@/components/ui/TechStackMarquee";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center transition-colors duration-300 bg-transparent">
      <div className="px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main content grid with Profile Card - aligned from top */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left side - Typography and info */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-6">
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
                  className="text-xl md:text-2xl font-mono text-[#666666] dark:text-[#999999] tracking-widest"
                />
              </div>

              <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8 text-[#111111] dark:text-[#F3F3F3]">
                Hi! I am <GradientText>Niño</GradientText>
              </h1>

              <p className="text-lg text-[#666666] dark:text-[#999999] leading-relaxed max-w-lg mb-8">
                System administrator and web developer crafting robust
                digital systems with clean, efficient code. Based in the
                Philippines.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#work"
                  className="px-8 py-4 bg-[#111111] dark:bg-[#F3F3F3] text-[#F3F3F3] dark:text-[#0A0A0A] font-black text-sm tracking-widest text-center hover:opacity-80 transition-all"
                >
                  VIEW PROJECTS
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-transparent border border-[#111111] dark:border-[#F3F3F3] text-[#111111] dark:text-[#F3F3F3] font-black text-sm tracking-widest text-center hover:bg-[#111111] dark:hover:bg-[#F3F3F3] hover:text-[#F3F3F3] dark:hover:text-[#0A0A0A] transition-all"
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
