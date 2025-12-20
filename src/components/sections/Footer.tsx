"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    setCurrentTime(formatTime());

    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-[var(--border)]/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <p className="text-xs font-mono text-[var(--muted)]">
            © 2025 NINO DUQUE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/niño-filipen-duque-187421206"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com/Nenjii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              GITHUB
            </a>
            <a
              href="mailto:oninpoh@gmail.com"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>

        {/* Location and Time */}
        <div className="flex justify-center">
          <div className="text-xs font-mono text-[var(--muted)] tracking-widest">
            TUGUEGARAO, CAGAYAN, PH —{" "}
            <span className="text-[var(--foreground)]">
              [{currentTime || "--:--:--"}]
            </span>{" "}
            (UTC+8)
          </div>
        </div>
      </div>
    </footer>
  );
}
