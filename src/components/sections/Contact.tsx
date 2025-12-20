export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 px-6 border-t border-[var(--border)]/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(04) — CONTACT</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            LET'S<br />CONNECT
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
              Feel free to reach out for collaborations or just a friendly chat. I am
              always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[var(--muted)]">[EMAIL]</span>
                <span className="text-sm font-medium">oninpoh@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[var(--muted)]">[PHONE]</span>
                <span className="text-sm font-medium">+63 905 8840 820</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="www.linkedin.com/in/niño-filipen-duque-187421206" className="text-xs font-mono text-[var(--muted)] border border-[var(--border)] px-4 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">LINKEDIN</a>
              <a href="https://github.com/Nenjii" className="text-xs font-mono text-[var(--muted)] border border-[var(--border)] px-4 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">GITHUB</a>
              <a href="https://www.facebook.com/mynenjiii" className="text-xs font-mono text-[var(--muted)] border border-[var(--border)] px-4 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">TWITTER</a>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-[var(--muted)] mb-3 tracking-widest">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 bg-transparent border border-[var(--border)]/30 focus:outline-none focus:border-[var(--foreground)] transition-colors font-mono text-[var(--foreground)]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[var(--muted)] mb-3 tracking-widest">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 bg-transparent border border-[var(--border)]/30 focus:outline-none focus:border-[var(--foreground)] transition-colors font-mono text-[var(--foreground)]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[var(--muted)] mb-3 tracking-widest">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-4 bg-transparent border border-[var(--border)]/30 focus:outline-none focus:border-[var(--foreground)] transition-colors font-mono resize-none text-[var(--foreground)]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] font-black text-sm tracking-widest hover:opacity-80 transition-all"
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