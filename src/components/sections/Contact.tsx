"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

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
              <button
                onClick={() => copyToClipboard("oninpoh@gmail.com", "email")}
                className="flex items-center gap-4 group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs font-mono text-[var(--muted)]">[EMAIL]</span>
                <span className="text-sm font-medium">
                  {copiedEmail ? "✓ COPIED!" : "oninpoh@gmail.com"}
                </span>
              </button>
              <button
                onClick={() => copyToClipboard("+63 905 8840 820", "phone")}
                className="flex items-center gap-4 group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs font-mono text-[var(--muted)]">[PHONE]</span>
                <span className="text-sm font-medium">
                  {copiedPhone ? "✓ COPIED!" : "+63 905 8840 820"}
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a href="https://www.linkedin.com/in/niño-filipen-duque-187421206" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--muted)] border border-[var(--border)] px-4 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">LINKEDIN</a>
              <a href="https://github.com/Nenjii" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--muted)] border border-[var(--border)] px-4 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">GITHUB</a>
              <a href="https://www.facebook.com/mynenjiii" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--muted)] border border-[var(--border)] px-4 py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">FACEBOOK</a>
            </div>

            {/* Download Resume Button */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--foreground)] text-[var(--foreground)] font-black text-sm tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
            >
              <Download size={16} />
              DOWNLOAD RESUME
            </a>
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