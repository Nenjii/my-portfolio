export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[#666] tracking-widest mb-4">(04) — CONTACT</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            LET'S<br />CONNECT
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div>
            <p className="text-lg text-[#666] leading-relaxed mb-8">
              Feel free to reach out for collaborations or just a friendly chat. I am
              always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#666]">[EMAIL]</span>
                <span className="text-sm font-medium">ninoduque@example.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#666]">[PHONE]</span>
                <span className="text-sm font-medium">+1 234 567 890</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs font-mono text-[#666] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-[#F3F3F3] transition-all">LINKEDIN</a>
              <a href="#" className="text-xs font-mono text-[#666] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-[#F3F3F3] transition-all">GITHUB</a>
              <a href="#" className="text-xs font-mono text-[#666] border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-[#F3F3F3] transition-all">TWITTER</a>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-[#666] mb-3 tracking-widest">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 bg-transparent border border-[#111111] focus:outline-none focus:bg-white transition-colors font-mono"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[#666] mb-3 tracking-widest">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 bg-transparent border border-[#111111] focus:outline-none focus:bg-white transition-colors font-mono"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[#666] mb-3 tracking-widest">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-4 bg-transparent border border-[#111111] focus:outline-none focus:bg-white transition-colors font-mono resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#111111] text-[#F3F3F3] font-black text-sm tracking-widest hover:bg-[#333] transition-colors"
              >
                SEND MESSAGE →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}