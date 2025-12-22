"use client";

import { useState } from "react";
import { Download, Mail, Copy, Check } from "lucide-react";

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

  const handleEmailClick = () => {
    // Try mailto first, fallback to copy
    window.location.href = "mailto:oninpoh@gmail.com";
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-[var(--border)]/20 bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Content Grid - Form on right aligned with header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Header and Contact info */}
          <div>
            {/* Section Header */}
            <div className="mb-12">
              <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-4">(04) — CONTACT</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#111111] dark:text-[#F3F3F3]">
                LET'S<br />CONNECT
              </h2>
            </div>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
              Feel free to reach out for collaborations or just a friendly chat. I am
              always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4 mb-8">
              <button
                onClick={() => copyToClipboard("oninpoh@gmail.com", "email")}
                className="flex items-center gap-4 group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs font-mono text-[var(--muted)]">[EMAIL]</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      oninpoh@gmail.com
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </span>
              </button>
              <button
                onClick={() => copyToClipboard("+63 905 8840 820", "phone")}
                className="flex items-center gap-4 group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs font-mono text-[var(--muted)]">[PHONE]</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {copiedPhone ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      +63 905 8840 820
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#111111] dark:border-white text-[#111111] dark:text-white font-bold text-sm tracking-wide hover:bg-[#111111]/5 dark:hover:bg-white/10 transition-all"
              >
                <Download size={18} />
                Download Resume
              </a>
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-bold text-sm tracking-wide hover:opacity-90 transition-all"
              >
                <Mail size={18} />
                Send an Email
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[var(--muted)] mr-2">SOCIALS:</span>
              <a href="https://www.linkedin.com/in/niño-filipen-duque-187421206" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--muted)] border border-[#111111]/20 dark:border-white/20 px-4 py-2 hover:bg-[#111111] dark:hover:bg-white hover:text-white dark:hover:text-[#111111] transition-all">LINKEDIN</a>
              <a href="https://github.com/Nenjii" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--muted)] border border-[#111111]/20 dark:border-white/20 px-4 py-2 hover:bg-[#111111] dark:hover:bg-white hover:text-white dark:hover:text-[#111111] transition-all">GITHUB</a>
              <a href="https://www.facebook.com/mynenjiii" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--muted)] border border-[#111111]/20 dark:border-white/20 px-4 py-2 hover:bg-[#111111] dark:hover:bg-white hover:text-white dark:hover:text-[#111111] transition-all">FACEBOOK</a>
            </div>
          </div>

          {/* Right side - Contact form (aligned with header) */}
          <div>
            <form className="space-y-5 bg-white dark:bg-[#111111] p-6 border border-[#111111]/10 dark:border-white/10">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-[var(--muted)] mb-2 tracking-widest">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full p-4 bg-[#F3F3F3] dark:bg-[#0A0A0A] border border-[#111111]/10 dark:border-white/10 focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors font-mono text-[#111111] dark:text-[#F3F3F3] placeholder:text-[#111111]/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[var(--muted)] mb-2 tracking-widest">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="w-full p-4 bg-[#F3F3F3] dark:bg-[#0A0A0A] border border-[#111111]/10 dark:border-white/10 focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors font-mono text-[#111111] dark:text-[#F3F3F3] placeholder:text-[#111111]/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[var(--muted)] mb-2 tracking-widest">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full p-4 bg-[#F3F3F3] dark:bg-[#0A0A0A] border border-[#111111]/10 dark:border-white/10 focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors font-mono resize-none text-[#111111] dark:text-[#F3F3F3] placeholder:text-[#111111]/30 dark:placeholder:text-white/30"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-black text-sm tracking-widest hover:opacity-90 transition-all"
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