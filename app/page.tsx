import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StatusHeader from "@/components/layout/StatusHeader";
import NavigationDock from "@/components/layout/NavigationDock";

export default function Home() {
  return (
    <main className="bg-[#F3F3F3] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#F3F3F3] transition-colors duration-300">
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

      {/* SERVICES SECTION */}
      <Services />

      {/* PROJECTS SECTION */}
      <Projects />

      {/* BLOGS SECTION */}
      <Blogs />

      {/* CONTACT SECTION */}
      <Contact />

      {/* FOOTER - With Location and Time */}
      <Footer />
    </main>
  );
}