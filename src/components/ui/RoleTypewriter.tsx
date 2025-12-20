"use client";

import { useEffect, useState } from "react";

interface RoleTypewriterProps {
  roles?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
}

export default function RoleTypewriter({
  roles = [
    "CREATIVE DEVELOPER",
    "GRAPHIC DESIGNER",
    "NETWORK ADMINISTRATOR",
    "SPORT ENTHUSIAST",
  ],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  className = "",
}: RoleTypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;

    const currentRole = roles[roleIndex];

    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(waitTimeout);
    }

    if (isDeleting) {
      if (currentText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deleteTimeout);
      } else {
        setIsDeleting(false);
        if (loop) {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        } else if (roleIndex < roles.length - 1) {
          setRoleIndex((prev) => prev + 1);
        }
      }
    } else {
      if (currentText.length < currentRole.length) {
        const typeTimeout = setTimeout(() => {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typeTimeout);
      } else {
        setIsWaiting(true);
      }
    }
  }, [currentText, roleIndex, isDeleting, isWaiting, roles, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-[#666]">_</span>
    </span>
  );
}
