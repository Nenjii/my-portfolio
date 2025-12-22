"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileCardProps {
  name?: string;
  systemId?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProfileCard({
  name = "NIÑO DUQUE",
  systemId = "SYS_ID // 2025",
  imageSrc = "/profile.jpg",
  imageAlt = "Profile photo",
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card container with tilt effect - larger size */}
      <div
        className="relative w-80 h-[420px] transition-all duration-500 ease-out"
        style={{
          transform: isHovered
            ? "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)"
            : "perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1)",
        }}
      >
        {/* Card background with border */}
        <div className="absolute inset-0 bg-[#F3F3F3] dark:bg-[#0A0A0A] border-2 border-[#111111] dark:border-[#F3F3F3] rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_#111111] dark:shadow-[8px_8px_0px_0px_#F3F3F3] transition-shadow duration-500 group-hover:shadow-[4px_4px_0px_0px_#111111] dark:group-hover:shadow-[4px_4px_0px_0px_#F3F3F3]">
          {/* Image container - taller for face visibility */}
          <div className="relative w-full h-72 bg-[#111111]/5 dark:bg-[#F3F3F3]/5 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F3F3F3] dark:from-[#0A0A0A] to-transparent opacity-30" />
          </div>

          {/* Content - System Identity style */}
          <div className="p-4">
            <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-1">
              {systemId}
            </p>
            <h3 className="text-xl font-black tracking-tight text-[#111111] dark:text-[#F3F3F3]">
              {name}
            </h3>

            {/* Status indicator with heartbeat */}
            <div className="flex items-center gap-2 mt-3">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-heartbeat" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-heartbeat-ripple" />
              </div>
              <span className="text-xs font-mono text-[#666666] dark:text-[#999999]">
                SYSTEM ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* "Hello" badge that appears on hover */}
        <div
          className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#111111] dark:bg-[#F3F3F3] text-[#F3F3F3] dark:text-[#0A0A0A] text-xs font-black tracking-wider rounded-full transition-all duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1) rotate(12deg)" : "scale(0.5) rotate(0deg)",
          }}
        >
          HELLO! 👋
        </div>

        {/* Decorative corner marks */}
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[#111111] dark:border-[#F3F3F3] opacity-50" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[#111111] dark:border-[#F3F3F3] opacity-50" />
      </div>
    </div>
  );
}
