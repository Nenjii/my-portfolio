import Link from "next/link";
import ProjectList from "./components/projectlist";
import AboutContact from "./components/aboutcontact";

export default function Home() {
  return (
    <main className="grid-bg min-h-screen flex flex-col justify-between p-6 md:p-12">
      {/* HEADER / NAVIGATION */}
      <nav className="flex justify-between items-start uppercase text-sm font-bold tracking-widest border-b border-black/10 pb-6">
        <div>
          <p>NINO DUQUE</p>
          <p className="text-gray-500">Developer Portfolio</p>
        </div>
        <div className="flex gap-8">
          <Link href="#work" className="hover:line-through decoration-2">Work</Link>
          <Link href="#about" className="hover:line-through decoration-2">About</Link>
          <Link href="#contact" className="hover:line-through decoration-2">Contact</Link>
        </div>
      </nav>

      {/* HERO SECTION - MASSIVE TEXT */}
      <section className="flex-grow flex flex-col justify-center py-20">
        <h1 className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-black mix-blend-multiply">
          Creative <br />
          <span className="text-gray-400">Developer</span>
        </h1>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-6">
          <p className="text-xl md:text-2xl max-w-md font-medium">
            Creating digital experiences with a focus on typography, minimalism, and code.
          </p>
          <div className="flex items-end justify-start md:justify-end">
             <div className="animate-bounce text-4xl">↓</div>
          </div>
        </div>
      </section>

      <ProjectList />
      <AboutContact />
      
      {/* FOOTER */}
      <footer className="flex justify-between items-end text-xs uppercase font-bold tracking-widest pt-6 border-t border-black/10">
        <p>© 2025</p>
        <p>Based in Philippines</p>
      </footer>
    </main>
  );
}