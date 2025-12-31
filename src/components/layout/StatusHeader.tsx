"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [currentTimeShort, setCurrentTimeShort] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      // Full format for desktop
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
      // Short format for mobile (time only)
      setCurrentTimeShort(
        new Date().toLocaleString("en-US", {
          timeZone: timezone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    // Set initial time
    updateTime();

    // Update time every second
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, [timezone]);

  return (
    <header className="flex items-center justify-between py-4 px-4 md:px-6 border-b border-[#111111]/10 dark:border-white/10 fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm z-40">
      {/* Left: Status Section */}
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-xs font-medium text-[#111111] dark:text-white">Available</span>
        <div className="status-dot shrink-0"></div>
        {/* Typewriter hidden on small screens */}
        <TypewriterText
          texts={statuses}
          typingSpeed={80}
          deletingSpeed={40}
          pauseDuration={3000}
          loop={true}
          className="hidden sm:block text-xs font-medium text-[#666] dark:text-[#999]"
          showCursor={false}
        />
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Image 
          src="/Portfolio_BLogo.svg" 
          alt="Portfolio Logo" 
          width={30} 
          height={30}
          className="dark:invert"
          priority
        />
      </div>

      {/* Right: Date/Time */}
      {showTime && currentTime && (
        <>
          {/* Full datetime on md+ screens */}
          <div className="hidden md:block text-xs font-mono text-[#666] dark:text-[#999]">
            {currentTime} {timezoneLabel}
          </div>
          {/* Time only on small screens */}
          <div className="block md:hidden text-xs font-mono text-[#666] dark:text-[#999]">
            {currentTimeShort}
          </div>
        </>
      )}
    </header>
  );
}
