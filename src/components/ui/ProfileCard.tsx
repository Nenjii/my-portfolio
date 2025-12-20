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
        <div className="absolute inset-0 bg-[var(--background)] border-2 border-[var(--foreground)] rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_var(--foreground)] transition-shadow duration-500 group-hover:shadow-[4px_4px_0px_0px_var(--foreground)]">
          {/* Image container - taller for face visibility */}
          <div className="relative w-full h-72 bg-[var(--foreground)]/5 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-30" />
          </div>

          {/* Content - System Identity style */}
          <div className="p-4">
            <p className="text-xs font-mono text-[var(--muted)] tracking-widest mb-1">
              {systemId}
            </p>
            <h3 className="text-xl font-black tracking-tight text-[var(--foreground)]">
              {name}
            </h3>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-[var(--muted)]">
                SYSTEM ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* "Hello" badge that appears on hover */}
        <div
          className="absolute -top-3 -right-3 px-3 py-1.5 bg-[var(--foreground)] text-[var(--background)] text-xs font-black tracking-wider rounded-full transition-all duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1) rotate(12deg)" : "scale(0.5) rotate(0deg)",
          }}
        >
          HELLO! 👋
        </div>

        {/* Decorative corner marks */}
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[var(--foreground)] opacity-50" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[var(--foreground)] opacity-50" />
      </div>
    </div>
  );
}
