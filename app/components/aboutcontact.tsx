export default function AboutContact() {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh] border-t border-black/10">
      
      {/* LEFT COLUMN: ABOUT & SKILLS */}
      <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-400">
            (03) — About
          </h3>
          <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-md mb-12">
            I am a multi-disciplinary developer focusing on robust system administration and clean code. 
            When not online, I am active in the local sports community organizing tennis events and running marathons.
          </p>
        </div>

        {/* SKILL TAGS */}
        <div>
          <h4 className="text-xs font-bold uppercase mb-4">Tech Stack</h4>
          <div className="flex flex-wrap gap-3 mt-4">
  {["Next.js", "VB.NET", "System Admin", "Docker", "Cybersecurity", "Tailwind"].map((tech) => (
    <span key={tech} className="px-3 py-1 bg-white border border-black rounded-full text-xs uppercase font-bold hover:bg-black hover:text-white transition-colors">
      {tech}
    </span>
  ))}
</div>
        </div>
      </div>

      {/* RIGHT COLUMN: CONTACT */}
      <div id="contact" className="p-6 md:p-12 flex flex-col justify-between bg-white/50">
        <div>
           <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-400">
            (04) — Contact
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Currently open for new opportunities and collaborations.
          </p>
        </div>

        <div>
          <a 
            href="mailto:your-email@example.com" 
            className="group block"
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-2 group-hover:text-gray-500">
              Drop me a line
            </span>
            <span className="text-3xl md:text-5xl font-black uppercase underline decoration-2 underline-offset-4 group-hover:no-underline">
              Get in Touch ↗
            </span>
          </a>
          
          <div className="mt-12 flex gap-6 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="hover:line-through">LinkedIn</a>
            <a href="#" className="hover:line-through">GitHub</a>
            <a href="#" className="hover:line-through">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}