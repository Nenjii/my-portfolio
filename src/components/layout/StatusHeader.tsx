"use client";

import { useEffect, useState } from "react";
import TypewriterText from "@/components/ui/TypewriterText";

interface StatusHeaderProps {
  statuses?: string[];
  showTime?: boolean;
  timezone?: string;
  timezoneLabel?: string;
}

export default function StatusHeader({
  statuses = ["Brewing Coffee ☕", "Accepting Projects 🚀", "Available for Work ✨"],
  showTime = true,
  timezone = "Asia/Manila",
  timezoneLabel = "UTC+8",
}: StatusHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    // Set initial time
    setCurrentTime(
      new Date().toLocaleString("en-US", {
        timeZone: timezone,
        hour12: false,
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          timeZone: timezone,
          hour12: false,
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [timezone]);

  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-[#111111]/10 dark:border-white/10 fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm z-40">
      {/* Left: Status Section */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-[#111111] dark:text-white">Available</span>
        <div className="status-dot shrink-0"></div>
        <TypewriterText
          texts={statuses}
          typingSpeed={80}
          deletingSpeed={40}
          pauseDuration={3000}
          loop={true}
          className="text-xs font-medium text-[#666] dark:text-[#999]"
          showCursor={false}
        />
      </div>

      {/* Center: Logo Placeholder - Replace with your logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        {/* TODO: Replace this placeholder with your actual logo */}
        {/* Example: <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
        <div className="w-10 h-10 border border-dashed border-[#111111]/30 dark:border-white/30 rounded flex items-center justify-center text-xs text-[#666] dark:text-[#999] font-mono">
          LOGO
        </div>
      </div>

      {/* Right: Date/Time */}
      {showTime && currentTime && (
        <div className="text-xs font-mono text-[#666] dark:text-[#999]">
          {currentTime} {timezoneLabel}
        </div>
      )}
    </header>
  );
}
