import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StatusHeader from "@/components/layout/StatusHeader";
import NavigationDock from "@/components/layout/NavigationDock";

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

      {/* HERO SECTION - With Profile Card and Tech Stack Marquee */}
      <Hero />

      {/* ABOUT SECTION */}
      <About />

      {/* PROJECTS SECTION */}
      <Projects />

      {/* CONTACT SECTION */}
      <Contact />

      {/* FOOTER - With Location and Time */}
      <Footer />
    </main>
  );
}