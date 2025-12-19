"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;

        backgroundRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, #007AFF, #F3F3F3)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(circle at 50% 50%, #007AFF, #F3F3F3)",
        transition: "background 0.1s ease",
      }}
    ></div>
  );
}